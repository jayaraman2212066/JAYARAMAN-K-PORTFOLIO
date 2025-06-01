<?php
session_start();

// Basic authentication
$admin_username = "admin";
$admin_password = "your_secure_password"; // Change this to a secure password

if (!isset($_SESSION['admin_logged_in'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if ($_POST['username'] === $admin_username && $_POST['password'] === $admin_password) {
            $_SESSION['admin_logged_in'] = true;
        } else {
            $error = "Invalid credentials";
        }
    }
    
    if (!isset($_SESSION['admin_logged_in'])) {
        ?>
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="text-center">Admin Login</h3>
                            </div>
                            <div class="card-body">
                                <?php if (isset($error)) echo "<div class='alert alert-danger'>$error</div>"; ?>
                                <form method="POST">
                                    <div class="mb-3">
                                        <label>Username</label>
                                        <input type="text" name="username" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" class="form-control" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// Database connection
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "portfolio_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get visitor statistics
$total_visitors = $conn->query("SELECT COUNT(*) as count FROM visitors")->fetch_assoc()['count'];
$today_visitors = $conn->query("SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_date) = CURDATE()")->fetch_assoc()['count'];
$recent_visitors = $conn->query("SELECT * FROM visitors ORDER BY visit_date DESC LIMIT 10");

?>
<!DOCTYPE html>
<html>
<head>
    <title>Visitor Statistics</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container mt-4">
        <h2>Visitor Statistics</h2>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Total Visitors</h5>
                        <h2><?php echo $total_visitors; ?></h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Today's Visitors</h5>
                        <h2><?php echo $today_visitors; ?></h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-header">
                <h5>Recent Visitors</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Visit Date</th>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while($visitor = $recent_visitors->fetch_assoc()): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($visitor['name']); ?></td>
                                <td><?php echo htmlspecialchars($visitor['email']); ?></td>
                                <td><?php echo htmlspecialchars($visitor['subject']); ?></td>
                                <td><?php echo $visitor['visit_date']; ?></td>
                                <td><?php echo $visitor['ip_address']; ?></td>
                            </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <a href="logout.php" class="btn btn-danger">Logout</a>
        </div>
    </div>
</body>
</html>
<?php
$conn->close();
?> 