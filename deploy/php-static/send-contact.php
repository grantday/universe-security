<?php
require __DIR__ . '/includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . url('contact.php'));
    exit;
}

$c = site_config();

// Honeypot — bots only
if (!empty($_POST['website'] ?? '')) {
    header('Location: ' . url('contact.php') . '?sent=1');
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? 'General enquiry'));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . url('contact.php') . '?sent=error');
    exit;
}

$body = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\n$message\n";
$headers = 'From: noreply@' . ($_SERVER['HTTP_HOST'] ?? 'universe-security.org') . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($c['contact_to'], '[Website] ' . $subject, $body, $headers);

if (!$sent) {
    $dataDir = __DIR__ . '/data';
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0750, true);
    }
    $record = [
        'at' => gmdate('c'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ];
    $file = $dataDir . '/inquiries-' . date('Y-m') . '.jsonl';
    $ok = @file_put_contents($file, json_encode($record) . "\n", FILE_APPEND | LOCK_EX);
    header('Location: ' . url('contact.php') . ($ok ? '?sent=saved' : '?sent=error'));
    exit;
}

header('Location: ' . url('contact.php') . '?sent=1');
exit;
