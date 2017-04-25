<?php
/**
 * Created by PhpStorm.
 * User: Lijianhua
 * Date: 2015/10/29
 * Time: 18:09
 */
if (!isset($_POST['data'])) {
    echo -1;
    exit();
}

$data = $_POST['data'];

try {
    $m = new MongoClient();
    $collection = $m->apetools->advice;
    $collection->insert(array('data' => $data));
    echo 'OK!';
} catch (MongoConnectionException $e) {
    echo 'error';
    exit();
}