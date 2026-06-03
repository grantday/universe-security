<?php

require dirname(__DIR__) . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$site = Content::site();
$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

if (!empty($_POST['website'] ?? '')) {
    echo json_encode(['ok' => true, 'message' => 'Thank you — your message was sent.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? 'General enquiry'));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please check the form fields.']);
    exit;
}

$body = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\n$message\n";
$headers = 'From: noreply@' . ($_SERVER['HTTP_HOST'] ?? 'universe-security.org') . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($site['email'], '[Website] ' . $subject, $body, $headers);

if (!$sent) {
    $dataDir = dirname(__DIR__) . '/data';
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
    ];
    $file = $dataDir . '/inquiries-' . date('Y-m') . '.jsonl';
    $ok = @file_put_contents($file, json_encode($record) . "\n", FILE_APPEND | LOCK_EX);
    echo json_encode([
        'ok' => (bool) $ok,
        'message' => $ok
            ? 'Thank you — your message was received.'
            : 'Could not save message. Please email ' . $site['email'] . ' directly.',
    ]);
    exit;
}

if (!$wantsJson) {
    header('Location: ' . url('/contact') . '?sent=1');
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Thank you — your message was sent. We will respond shortly.']);
