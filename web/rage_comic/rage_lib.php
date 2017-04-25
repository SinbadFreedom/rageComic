<?php
/**
 * Created by PhpStorm.
 * User: LiJianhua
 * Date: 2015/10/29
 * Time: 14:24
 */
$MAX_NUM = 100;
$actorLib = array();
$cursor = null;
try {
    $m = new MongoClient();
    $collection = $m->apetools->artifact;
    if (isset($_POST['uid'])) {
        // get self artifact
        $uID = intval($_POST['uid']);
        $query = array('uid' => $uID);
    } else {
        $query = array();
    }
    $sort = array("_id" => -1);
    $cursor = $collection->find($query)->limit($MAX_NUM)->sort($sort);
    if (null != $cursor) {
        while ($cursor->hasNext()) {
            array_push($actorLib, $cursor->getNext());
        }
    }
} catch (MongoConnectionException $e) {

}

echo json_encode($actorLib);
