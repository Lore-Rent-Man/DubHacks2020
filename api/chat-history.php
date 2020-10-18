<?php
## chat-history.php
## returns the latest 10 chat messages once new chat message has been posted
## will keep the request pending until a new message is found
##
## Params: $_POST["cids"] - array of cid
## Return: an array of JSON objects, listed in reverse order


include 'common.php';

// set php runtime to unlimited
set_time_limit(0);


$last_chat_list = isset($_POST["cids"]) ? $_POST["cids"] : array();

while (true) {
    $rows = db_query($db);

    $curr_chat_list = array();
    foreach ($rows as $row) {
        // echo var_dump($row);
        array_push($curr_chat_list, $row["cid"]);
        // echo $row["tid"];
        // echo var_dump($curr_chat_list);
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
                "cid" => $row["cid"],
                "message" => $row["message"],
                "username" => $row["username"]
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
        $rows = $db->query("SELECT  TOP 20 * FROM Chats ORDER BY cid DESC;");
    }
    catch (PDOException $ex) {
        db_error_message("Can not query the database.", $ex);
    }
    return $rows;
}

?>