<?php
session_start();
include '../db_connect.php';

// 1. Session Security
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// 2. Fetch User Data - Matching your phpMyAdmin column 'full_name'
$query = "SELECT full_name, profile_pic FROM users WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

// 3. Fallback logic for the Profile Picture
// If 'profile_pic' is empty in DB, it uses the default avatar
$profile_img = !empty($user['profile_pic']) ? $user['profile_pic'] : "../images/profile.jpg"; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UPMart | Dashboard</title>
    <link rel="stylesheet" href="mainpanel.css">
    <link rel="icon" href="favicon.png" type="image/png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
    <nav class="sidebar">
        <div class="sidebar-brand">
            <img src="../images/logo.png" class="logo-img sidebar-logo" alt="UPMart Logo">
        </div>

        <img src="<?= $profile_img ?>" alt="Profile" class="profile-img">
        
        <div class="profile-info">
            <span class="profile-name"><?= htmlspecialchars($user['full_name']) ?></span>
        </div>

        <ul class="nav-links">
            <li class="active">
                <a href="mainweb.php"><span class="icon">🏠︎</span> Dashboard</a>
            </li>
            <li>
                <a href="#"><span class="icon">🛒</span> Marketplace</a>
            </li>

            <div class="logout-container">
                <a href="logout.php" class="logout-btn" style="text-decoration: none; display: block; text-align: center;">Logout</a>
            </div>
        </ul>
    </nav>

    <div class="main-content">
        <nav class="top-nav">
            <h1 style="font-size: 1.4rem; margin-top: 10px;"><span class="icon">🏠︎</span> Dashboard</h1>
            <div class="status-indicators">
                <button class="icon-btn" id="notifBtn"><span class="material-icons">notifications</span></button>
                <button class="icon-btn" id="helpBtn"><span class="material-icons">report</span></button>
            </div>
        </nav>

        <div class="content-row">
            <div class="about-text">
                <h1 style="color: maroon;">Welcome back, <?= htmlspecialchars($user['full_name']) ?>!</h1>
                <p>Start exploring our marketplace and discover amazing products!</p>
            </div>
        </div>

        
        <section class="stats-section">
            <div class="chart-container">
                <h3>Top Categories</h3>
                <canvas id="myChart"></canvas>
            </div>

            <div class="product-inventory">
                <div class="bulletin-board">
                    <div class="bulletin-header">
                        <h3>UPMart Bulletin</h3>
                        <span class="limit-info">Max 100 chars</span>
                    </div>

                    <div class="bulletin-input">
                        <textarea id="bulletinText" placeholder="Post a quick update..." maxlength="100"></textarea>
                        <button id="postBtn">Post</button>
                    </div>

                    <div id="bulletinList" class="bulletin-list">
                        <div class="post">Welcome to the UPMart Bulletin! Keep it friendly.</div>
                    </div>
                </div>
            </div>
        </section>

        <div class="footer">
            <p>&copy;2026 UPMart. All rights reserved.</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="maindash.js"></script>
</body>
</html>
