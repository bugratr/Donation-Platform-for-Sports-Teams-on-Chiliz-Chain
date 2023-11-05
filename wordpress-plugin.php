<?php
/**
 * Plugin Name: Donation Plugin
 * Description: A simple plugin to add a donation button to posts.
 * Version: 1.0
 * Author: bugratr
 */

// Hook for adding admin menus
add_action('admin_menu', 'donation_menu');

// Action function for the above hook
function donation_menu() {
    add_menu_page('Donation Plugin Settings', 'Donation Plugin', 'manage_options', 'donation_plugin', 'donation_plugin_page');
}

// Function to display the plugin admin page
function donation_plugin_page() {
    ?>
    <div class="wrap">
        <h2>Donation Plugin</h2>
        <form method="post" action="options.php">
            <?php wp_nonce_field('update-options') ?>
            <p><strong>Team Wallet Address:</strong><br />
                <input type="text" name="team_wallet" size="45" value="<?php echo get_option('team_wallet'); ?>" />
            </p>
            <p><input type="submit" name="Submit" value="Store Options" /></p>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="page_options" value="team_wallet" />
        </form>
    </div>
    <?php
}

// Function to add the donation button to the content
function donation_button($content) {
    if(is_single()) {
        $button = '<button id="donateBtn">Donate to Your Favorite Team</button>';
        $content = $content . $button;
    }
    return $content;
}

add_filter('the_content', 'donation_button');

// Function to add inline JavaScript
function donation_script() {
    ?>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            var donateBtn = document.getElementById('donateBtn');
            donateBtn.addEventListener('click', function() {
                var teamWallet = "<?php echo get_option('team_wallet'); ?>";
                alert('You are donating to: ' + teamWallet);
                // Here you can integrate with Chiliz Chain or Web3
            });
        });
    </script>
    <?php
}

add_action('wp_footer', 'donation_script');
?>
