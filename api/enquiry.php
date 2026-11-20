<?php
/**
 * Manas Lifestyle Resort — enquiry endpoint.
 * Receives every website form (accommodation, wedding, banquet, corporate, school, general),
 * validates it, blocks spam (honeypot + minimum fill time + per-IP rate limit), emails the
 * right desk and stores a copy. Returns JSON for the JS form, or redirects for no-JS posts.
 *
 * CONFIGURE before launch (see docs/06-deployment.md):
 *   - $ROUTES email addresses
 *   - $FROM must be an address on the site's own domain (SPF/DKIM), e.g. website@manaslifestyleresort.in
 *   - Prefer SMTP (e.g. PHPMailer) over mail() if the host's mail() is unreliable.
 */
declare(strict_types=1);

$FROM = 'website@manaslifestyleresort.in';
$ROUTES = [
    'accommodation' => ['sales@manaslifestyleresort.in'],
    'wedding'       => ['vivaah@manaslifestyleresort.in', 'sales@manaslifestyleresort.in'],
    'banquet'       => ['vivaah@manaslifestyleresort.in', 'sales@manaslifestyleresort.in'],
    'corporate'     => ['sales@manaslifestyleresort.in'],
    'school'        => ['sales@manaslifestyleresort.in'],
    'general'       => ['sales@manaslifestyleresort.in'],
];
$DATA_DIR = __DIR__ . '/data';          // protected by api/data/.htaccess
$MIN_SECONDS = 3;                        // humans take longer than this to fill a form
$MAX_PER_HOUR = 8;                       // per IP

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $msg, int $code = 200, string $ref = ''): void {
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'ref' => $ref, 'error' => $ok ? null : $msg]);
    } else {
        $back = $_POST['page'] ?? '/contact/';
        if (!preg_match('#^/[a-z0-9\-/]*$#i', $back)) $back = '/contact/';
        header('Location: ' . $back . '?' . ($ok ? 'sent=1&ref=' . rawurlencode($ref) : 'error=1') . '#enquire', true, 303);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Method not allowed', 405);

$type = $_POST['type'] ?? 'general';
if (!isset($ROUTES[$type])) $type = 'general';

// --- Spam protection -----------------------------------------------------
if (!empty($_POST['website'])) respond(true, '', 200, 'OK');            // honeypot: pretend success
$ts = (int)(($_POST['ts'] ?? 0) / 1000);
if ($ts > 0 && (time() - $ts) < $MIN_SECONDS) respond(false, 'Please take a moment and try again.', 429);

if (!is_dir($DATA_DIR)) @mkdir($DATA_DIR, 0750, true);
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = $DATA_DIR . '/rate-' . hash('sha256', $ip . date('YmdH')) . '.cnt';
$count = (int)@file_get_contents($rateFile);
if ($count >= $MAX_PER_HOUR) respond(false, 'Too many enquiries from this connection. Please call us.', 429);
@file_put_contents($rateFile, (string)($count + 1));

// --- Validation ------------------------------------------------------------
$clean = static fn($v, int $max = 500) => trim(mb_substr(strip_tags((string)$v), 0, $max));
$name  = $clean($_POST['name'] ?? '', 80);
$phone = preg_replace('/[^0-9+()\-\s]/', '', (string)($_POST['phone'] ?? ''));
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$consent = !empty($_POST['consent']);

$errors = [];
if (mb_strlen($name) < 2) $errors[] = 'name';
if (strlen(preg_replace('/\D/', '', $phone)) < 10) $errors[] = 'phone';
if (!$email) $errors[] = 'email';
if (!$consent) $errors[] = 'consent';
if ($errors) respond(false, 'Please check: ' . implode(', ', $errors), 422);

$fields = ['company', 'school', 'checkin', 'checkout', 'eventDate', 'guests', 'guestCount', 'roomType', 'functions', 'eventType', 'venue', 'stay', 'message', 'page'];
$lines = ["Type: $type", "Name: $name", "Phone: $phone", "Email: $email"];
$row = [date('c'), $type, $name, $phone, $email];
foreach ($fields as $f) {
    $v = $clean($_POST[$f] ?? '', $f === 'message' ? 2000 : 200);
    $row[] = $v;
    if ($v !== '') $lines[] = ucfirst($f) . ': ' . $v;
}
// Links in the message are a strong spam signal.
if (preg_match_all('#https?://#i', (string)($_POST['message'] ?? '')) > 2) respond(false, 'Please remove links from your message.', 422);

$ref = strtoupper(substr($type, 0, 1)) . date('ymd') . '-' . substr(bin2hex(random_bytes(3)), 0, 5);
$row[] = $ref;

// --- Store + notify ---------------------------------------------------------
$fh = @fopen($DATA_DIR . '/enquiries.csv', 'ab');
if ($fh) { fputcsv($fh, $row); fclose($fh); }

$subject = "Website enquiry ($type) — $name [$ref]";
$headers = [
    'From: Manas Website <' . $FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
$sent = @mail(implode(',', $ROUTES[$type]), '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $lines) . "\n\nReference: $ref\n", implode("\r\n", $headers));

// Only report success if the enquiry was actually stored or emailed.
if (!$sent && !$fh) respond(false, 'Server could not record the enquiry.', 500);
respond(true, '', 200, $ref);
