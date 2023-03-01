<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';

$name = $_POST['username'];
$email = $_POST['email'];
$form = $_POST['form_message'];


try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'gitlera811@gmail.com';                     //SMTP username
    $mail->Password   = 'Adolf811';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    

    //Attachments
    $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail-setFrom('gitlera811@gmail.com');
    $mail->addAddress('logiko9813@hostovz.com');
    $mail->isHTML(true);

    $mail->Subject = 'Заявка с тестового сайта';
    $mail->Body = '' .$name . 'отсавил заявку, его почта ' .$email;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: ');
}

?>
