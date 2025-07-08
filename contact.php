<?php
// Block direct access (only allow POST)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit();
}

// Sanitize inputs
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Validate inputs
if (empty($name) || empty($email) || empty($message)) {
    echo "<script>alert('All fields are required.'); window.history.back();</script>";
    exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Please enter a valid email address.'); window.history.back();</script>";
    exit();
}

// Prepare email
$to = 'nehasdevadiga5@gmail.com'; // Change to your email
$subject = 'New Contact Message from Portfolio';
$body = "You have received a new message from your portfolio contact form.\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Message:\n$message\n";
$headers = "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n" .
           "Reply-To: $email\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "<script>alert('Thank you, Neha! Your message has been sent.'); window.location.href='index.html';</script>";
    exit();
} else {
    echo "<script>alert('Sorry, there was an error sending your message. Please try again later.'); window.history.back();</script>";
    exit();
} 