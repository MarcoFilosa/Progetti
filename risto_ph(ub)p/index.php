<?php

if(isset($_GET['id']) && isset($_GET['rec'])){
    require 'single.php';
}
else if(isset($_GET['id'])){
    require 'single.php';
}
else{
    require 'main.php';
}