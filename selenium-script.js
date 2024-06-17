const { Builder, By, until, Options } = require('selenium-webdriver'); // Import Options class
const firefox = require('selenium-webdriver/firefox');
const { exec } = require('child_process');
const fs = require('fs');

(async function example() {
  // Start the server.js script
  
  const extPath = 'C:/Users/Jovana/Email Server/tampermonkey.xpi';
  const script = fs.readFileSync('C:/Users/Jovana/Email Server/PriceChecker.js','utf-8');
  if(!fs.existsSync(extPath))
    {
        console.error("Tampermonkey extension not found!");
        return;
    } 
    
  const serverProcess = exec('node server.js');
  serverProcess.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });
  // Give the server some time to start
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let options = new firefox.Options();
  options.addExtensions(extPath);

  

  // Launch Firefox browser
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
  try {
    // Navigate to the target page
    await driver.get('https://www.bigblue.rs/sr/hotel/grcka/skopelos/delphi-studio?PL=30755-37-285-5031222');
    await driver.executeScript(script);
    // Wait for a specific element to ensure Tampermonkey script has executed
    await driver.wait(until.elementLocated(By.css('.txtPackagePrice')), 100000); // Adjust the selector as needed

    // Perform any other actions if needed, e.g., keep checking the price

    
  } 
  catch (err) {
    console.error('Error:', err);
    await driver.quit();
    serverProcess.kill(); // Ensure the server is stopped on error
  }
})();
