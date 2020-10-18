<?php
  ## signup.php
  ## records a chat message from a client
  ##
  ## Params: $_POST["username"], $_POST["message"]

  include 'common.php';

  if (!isset($_POST["username"]) || !isset($_POST["message"])) {
    error_message("Missing at least one of your parameters!");
  }
  
  $username = $_POST["username"];
  $message = $_POST["message"];

  try {
    $sql = "INSERT INTO Chats (message, username) " .
      "VALUES (:message, :username );";
      $stmt = $db->prepare($sql);
      $params = array(
      "message" => $message,
      "username" => $username
      );
      $stmt->execute($params);
    // echo var_dump($results);
  }
  catch (PDOException $ex) {
    db_error_message("Can not query the database.", $ex);
  }

?>