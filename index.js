// index.js
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function openFullscreen() {
    // Create Chrome options with additional arguments
    const options = new chrome.Options();
    
    // Add regular arguments
    options.addArguments('--start-maximized');
    options.addArguments('--disable-infobars');
    options.addArguments('--disable-notifications');
    options.addArguments('--kiosk');
    options.addArguments('--disable-automation-controlled-banner');
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--no-sandbox');
    
    // Add prefs using setUserPreferences
    options.addArguments(`--disable-blink-features=AutomationControlled`);
    
    // Initialize the driver with options
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the HTML file
        await driver.get('C:/html/selenium/pages/index.html');

        // Wait a bit for the page to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Execute JavaScript for fullscreen
        await driver.executeScript(`
            async function enterFullscreen() {
                try {
                    await document.documentElement.requestFullscreen();
                } catch (e) {
                    try {
                        // Fallback for older browsers
                        await document.documentElement.mozRequestFullScreen();
                    } catch (e2) {
                        try {
                            await document.documentElement.webkitRequestFullscreen();
                        } catch (e3) {
                            try {
                                await document.documentElement.msRequestFullscreen();
                            } catch (e4) {
                                console.error('Fullscreen not supported');
                            }
                        }
                    }
                }
            }
            enterFullscreen();
        `);

        // Keep the browser open (you can adjust the time or remove this)
        await new Promise(resolve => setTimeout(resolve, 30000));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

// Run the function
openFullscreen().catch(console.error);