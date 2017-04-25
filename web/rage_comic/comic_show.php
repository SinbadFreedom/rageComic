<?php
/**
 * Created by PhpStorm.
 * User: LiJianhua
 * Date: 2015/11/16
 * Time: 16:30
 */
$ret['state'] = -1;
if (!isset($_POST['aid'])) {
    echo json_encode($ret);
    exit();
}

$aID = intval($_POST['aid']);
try {
    $m = new MongoClient();
    $db = $m->apetools;
    $data = $db->artifact->findOne(array('aid' => $aID));
    if ($data) {
        $ret['state'] = 0;
        $ret['data'] = $data;
    } else {
        $ret['state'] = -2;
    }
} catch (MongoConnectionException $e) {
    $ret['state'] = -3;
}

echo json_encode($ret);
