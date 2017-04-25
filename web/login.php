<?php
/**
 * Created by PhpStorm.
 * User: LiJianhua
 * Date: 2015/11/13
 * Time: 11:35
 */
$res = array();
$res['state'] = -1;

if (!isset($_POST['acc']) || !isset($_POST['pwd'])) {
    echo json_encode($res);
    exit();
}

$account = $_POST['acc'];
$pwd = $_POST['pwd'];
try {
    $m = new MongoClient();
    $collection = $m->apetools->account;
    $dbInfo = $collection->findOne(array('acc' => $account));
    if ($dbInfo) {
        if ($dbInfo['pwd'] === $pwd) {
            $res['state'] = 0;
            $res['uid'] = $dbInfo['uid'];
            $res['pwd'] = $dbInfo['pwd'];
            $res['name'] = $dbInfo['name'];
        } else {
            $res['state'] = -2;
        }
    } else {
        $res['state'] = -3;
    }
} catch (MongoConnectionException $e) {
    $res['state'] = -4;
}

echo json_encode($res);