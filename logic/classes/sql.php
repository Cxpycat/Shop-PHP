<?php
ini_set('display_errors', 0);
$conn = mysqli_connect('127.0.0.1', 'root', '', 'biolife');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>