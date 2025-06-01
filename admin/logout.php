<?php
session_start();
session_destroy();
header('Location: visitor_stats.php');
exit;
?> 