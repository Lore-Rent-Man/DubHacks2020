<?php

include 'common.php';

// set php runtime to unlimited
set_time_limit(0);


$last_chat_list = isset($_POST["cids"]) ? $_POST["cids"] : array();

while (true) {
    $rows = db_query($db);

    $curr_chat_list = array();
    foreach ($rows as $row) {
        echo var_dump($row);
        array_push($curr_char_list, $row["cid"]);
        // echo $row["tid"];
    }

    // if last chat list is null or there's a difference between the last and
    //  current chat list, send the client the new chat list
    if (!(empty(array_diff($last_chat_list, $curr_chat_list))
        && empty(array_diff($curr_chat_list, $last_chat_list)))) {
        
        $rows = db_query($db);

        header("Content-type: application/json");
        $output = array();
        foreach ($rows as $row) {
            $chat_info = array(
                cid => $row["cid"],
                message => $row["message"],
                username => $row["username"]
            );
            array_push($output, $chat_info);
        }

        echo json_encode($output);
        break;
    } else {
        sleep(1);
        continue;
    }
}

// returns the last 10 rows from the database
function db_query($db) {
    try {
        $rows = $db->query("SELECT  TOP 10 * FROM Chats ORDER BY cid DESC;");
    }
    catch (PDOException $ex) {
        db_error_message("Can not query the database.", $ex);
    }
    return $rows;
}
?>