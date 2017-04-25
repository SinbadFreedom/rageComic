<?php
/**
 * Created by PhpStorm.
 * User: LiJianhua
 * Date: 2015/10/23
 * Time: 13:56
 */
$res = array();
$res['state'] = -1;
if (!isset($_POST['uid']) || !isset($_POST['pwd']) || !isset($_POST['name']) || !isset($_POST['data']) || !isset($_POST['title'])) {
    echo json_encode($res);
    exit();
}

$uID = intval($_POST['uid']);
$pwd = $_POST['pwd'];
$name = $_POST['name'];
$title = $_POST['title'];
$hn = $_POST['hn'];
$vn = $_POST['vn'];
$sw = $_POST['sw'];
$sh = $_POST['sh'];
$data = $_POST['data'];
/*
$data format
{
    "aid": 1,
    "uid": 1,
    "author": "水手",
    "title": "无敌的老王",
    "time": 100000000,
    "data": [
        [
            {
                "id": 0,
                "z": 0,
                "w": 300,
                "h": 300,
                "t": 0,
                "l": 0,
                "type": 1,
                "s": "http: //localhost/image/rage_comic/12.jpg"
            },
            {
                "id": 1,
                "z": 1,
                "w": 300,
                "h": 300,
                "t": 0,
                "l": 0,
                "type": 2,
                "ff": "MicrosoftYaHei",
                "fs": 32,
                "fw": "normal",
                "c": "#FFFFFF"
            }
        ]
    ]
}
*/

// verify account
$m = new MongoClient();
$db = $m->apetools;
$accInfo = $db->account->findOne(array('uid' => $uID));
if ($accInfo && $accInfo['pwd'] === $pwd) {
    // save artifact
    try {
        $query = array('inc_key' => 'inc_aid');
        $update = array('$inc' => array("aid" => 1));
        $command = array('findandmodify' => 'increase', 'query' => $query, 'update' => $update, 'upsert' => true, 'new' => true);
        $artifactIDObj = $db->command($command);
        $aID = $artifactIDObj['value']['aid'];
        // save to DB
        $db->artifact->insert(array('aid' => $aID, 'uid' => $uID, 'name' => $name, 'title' => $title, 'hn' => $hn, 'vn' => $vn, 'sw' => $sw, 'sh' => $sh, 'data' => $data, 'time' => $_SERVER['REQUEST_TIME']));
        $res['state'] = 0;
    } catch (MongoConnectionException $e) {
        $res['state'] = -3;
    }
} else {
    $res['state'] = -2;
}

echo json_encode($res);