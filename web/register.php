<?php
/**
 * Created by PhpStorm.
 * User: LiJianhua
 * Date: 2015/11/17
 * Time: 18:01
 */
$res = array();
$res['state'] = -1;

if (!isset($_POST['account']) || !isset($_POST['pwd']) || !isset($_POST['name'])) {
    echo json_encode($res);
    exit();
}

$account = $_POST['account'];
$pwd = $_POST['pwd'];
$name = $_POST['name'];

try {
    $m = new MongoClient();
    $db = $m->apetools;
    $dbInfo = $db->account->findOne(array('acc' => $account));
    if ($dbInfo) {
        $res['state'] = -2;
    } else {
        $m = new MongoClient();
        $query = array('inc_key' => 'inc_uid');
        $update = array('$inc' => array("uid" => 1));
        $command = array('findandmodify' => 'increase', 'query' => $query, 'update' => $update, 'upsert' => true, 'new' => true);
        $uIDObj = $db->command($command);
        $uID = $uIDObj['value']['uid'];
        $db->account->insert(array('uid' => $uID, 'acc' => $account, 'pwd' => $pwd, 'name' => $name, 'time' => $_SERVER['REQUEST_TIME']));
        // register success
        $res['state'] = 0;
        $res['uid'] = $uID;
        $res['pwd'] = $pwd;
        $res['name'] = $name;
    }
} catch (MongoConnectionException $e) {
    $res['state'] = -3;
}

echo json_encode($res);