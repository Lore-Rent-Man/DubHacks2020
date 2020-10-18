<?php
  ## common.php
  ## Configs the php data object for sql database;

  header("Access-Control-Allow-Origin: *");

  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  #Flag to set debugging on or off
  $debug = TRUE;

//   $host = 'lansong.database.windows.net';
//   $port = '1433';
//   $user = 'lansong@lansong';
//   $password = 'Yl-010802';
//   $dbname = 'dubhacksgame';
  
//   #access azure mysql database through ssl
//   $options = array(
//     PDO::MYSQL_ATTR_SSL_CA => 'BaltimoreCyberTrustRoot.crt'
//   );

//   # Make a data source string that will be used in creating the PDO object
//   $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

  


  # Function to print an error message for an invalid request
  #
  # param $msg The 400 error message to print as plain text
  function error_message($msg) {
    header("HTTP/1.1 400 Invalid Request");
    header("Content-Type: text/plain");
    die($msg);
  }


  # Connects to the mysql database
  try {
    $db = new PDO("sqlsrv:server = tcp:lansong.database.windows.net,1433; Database = dubhacksgame", "lansong", "Yl-010802");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // $db = new PDO($ds, $user, $password, $options);
    // $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection successful!";
  }
  catch (PDOException $ex) {
    db_error_message("Can not connect to the database.", $ex);
  }

  # Function to print an error message and, depending on the debug flag,
  # add the exception error information.
  #
  # param $msg The 503 error message to print as plain text
  # param $ex The exception that is being passed in to this function, which will be
  #            printed if the global $debug flag is set to true. This can be null as well
  function db_error_message($msg, $ex) {
    global $debug;

    header("HTTP/1.1 503 Internal Database Error");
    header("Content-Type: text/plain");

    if ($debug) {
      $msg .= "\n Error details: $ex \n";
    }
    die($msg);
  }
?>

