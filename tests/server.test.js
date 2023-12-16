const path = require('node:path');
const remote = require("selenium-webdriver/remote");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");

const version = process.env.SELENIUM_VERSION || "4.7.1";
let seleniumServer;

// cf. https://www.selenium.dev/documentation/webdriver/troubleshooting/logging/
// but has no effect:
const logging = require('selenium-webdriver/lib/logging')
logger = logging.getLogger('webdriver')
logger.setLevel(logging.Level.ALL)
logging.installConsoleHandler()


beforeAll(async () => {
    const jarPath = path.resolve('jars/selenium-server-' + version + '.jar');
    console.log(`Load selenium server, version ${version}`)
    // start selenium server
    console.time("Starting Server");
    seleniumServer = new remote.SeleniumServer(jarPath, {
        port: 4444,
        env: {
            ...process.env,
            // "SE_NODE_MAX_SESSIONS": "4",
            // "SE_NODE_OVERRIDE_MAX_SESSIONS": "true"
        }
    });
    const address = await seleniumServer.start(8000);
    console.timeEnd("Starting Server");
    console.log(`Selenium server started at ${address}`);

});

afterAll(async () => {
    await seleniumServer.kill();
    console.log("Selenium server stopped");
});

test(`Selenium server ${version}`, async () => {
    // start remote firefox and retrieve driver
    const options = new firefox.Options();
    // options.headless(); -- headless() is deprecated and should not be used.
    // instead, argument "--headless" should be passed to the browser:
    options.addArguments("-headless"); // but it does not fix the problem...
    options.setAcceptInsecureCerts(true);
    console.time("Starting (Remote) Firefox")
    const driver = await new webdriver.Builder()
        .forBrowser('firefox')
        .usingServer("http://127.0.0.1:4444/wd/hub")
        // .withCapabilities(webdriver.Capabilities.firefox()) // redundant, only use options:
        .setFirefoxOptions(options)
        .build();
    console.timeEnd("Starting (Remote) Firefox")

    try {
        // open some page
        console.time("Loading page")
        await driver.get("https://google.com");
        console.timeEnd("Loading page")

    } finally {
        // tear down
        await driver.quit();
        console.log("(Remote) Firefox closed");
    }


}, 15000);