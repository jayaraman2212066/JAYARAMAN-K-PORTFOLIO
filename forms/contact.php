<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();

// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$visit_date = date('Y-m-d H:i:s');
$ip_address = $_SERVER['REMOTE_ADDR'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO visitors (name, email, subject, message, visit_date, ip_address) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $email, $subject, $message, $visit_date, $ip_address);

// Execute the statement
if ($stmt->execute()) {
    // Send email notification
    $to = "jayaraman2212066@gmail.com";
    $email_subject = "New Portfolio Contact: $subject";
    $email_body = "You have received a new message from your portfolio contact form.\n\n".
                  "Name: $name\n".
                  "Email: $email\n".
                  "Subject: $subject\n".
                  "Message: $message\n";
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";
    
    mail($to, $email_subject, $email_body, $headers);
    
    echo json_encode(['status' => 'success', 'message' => 'Your message has been sent. Thank you!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error sending your message.']);
}

$stmt->close();
$conn->close();
?>
