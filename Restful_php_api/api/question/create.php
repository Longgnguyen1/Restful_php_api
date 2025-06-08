<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

include_once('../../config/db.php');
include_once('../../model/question.php');

$db = new db();
$connect = $db->connect();

$question = new Question($connect);

// đọc và kiểm tra dữ liệu đầu vào
$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    echo json_encode(['message' => 'No input data or invalid JSON']);
    exit;
}
$question->id_cauhoi = $data->id_cauhoi;
$question->title     = $data->title;
$question->cau_a     = $data->cau_a;
$question->cau_b     = $data->cau_b;
$question->cau_c     = $data->cau_c;
$question->cau_d     = $data->cau_d;
$question->cau_dung  = $data->cau_dung;

if($question->create()){
    echo json_encode(['message' => 'Question Created']);
} else {
    echo json_encode(['message' => 'Question Not Created']);
}
?>
