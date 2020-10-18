<?php
  ## signup.php
  ## processes sign up data from a client

  include 'common.php';

  if (!isset($_POST["username"]) || !isset($_POST["password"])) {
    error_message("Missing at least one of your parameters!");
  }
  
  $username = $_POST["username"];
  $password = $_POST["password"];

  try {
    $results = $db->query("SELECT COUNT(*) FROM Users WHERE username = '{$username}';");
    echo var_dump($results);
  }
  catch (PDOException $ex) {
    db_error_message("Can not query the database.", $ex);
  }

  foreach ($results as $result) {
      echo "finding duplicates";
      echo var_dump($result);
      $duplicate = $result[0];
      echo var_dump($duplicate);
      echo "num of duplicates found: " . $duplicate;
  }

  echo $duplicate;
  if ($duplicate != 0) {
      header("Content-Type: application/json");
      $result = Array(
        "status" => "denied",
        "message" => "username $username has already been taken, " .
                     "please try again"
      );
      echo(json_encode($result));
  } else {
      $sql = "INSERT INTO Users (username, password) " .
      "VALUES (:username, :password );";
      $stmt = $db->prepare($sql);
      $params = array(
      "username" => $username,
      "password" => $password
      );
      $stmt->execute($params);
    
      $rows = $db->query("SELECT pid FROM Users WHERE username = '{$username}';");
      foreach ($rows as $row) {
          $pid = $row["pid"];
      }

      header("Content-type: application/json");
      $result = Array(
          "status" => "success",
          "pid" => $pid,
          "username" => $username
      );
      echo(json_encode($result));
  }
?>