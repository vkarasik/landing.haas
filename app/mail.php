<?php
if( ! empty($_POST) ) {

    $data = (object) $_POST;
    $to = 'v.karasik@cd-life.by';
    $subject = 'Обратный звонок (Haas)';
    $message = 'Имя: ' . $data->name . ' Телефон: ' . $data->tel;

    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: haas.by <from@example.com>\r\n";

    mail($to, $subject, $message, $headers);

    //echo ('Ваш запрос отправлен!');
} 
?>