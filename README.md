# Demo for Selenium Remote

Download selenium server standalone jars (selenium-server-x.y.z.jar) from https://www.selenium.dev/downloads/ and put them in the jars folder.


Run test via

```
SELENIUM_VERSION=4.7.1 npm test
```

You can select any version you have downloaded.

## Perquisites

You need the following software (in parentheses my versions in case you want to reproduce the bug)

- Java (openjdk 17.0.2)
- Node.js (v18.15.0)
- Firefox (12.0.1)
- and a Selenium standalone server jar

## Run tests

1. Clone and run `npm install`
2. Put some selenium-server-x.y.z.jar (downloaded from https://www.selenium.dev/downloads/) in the jars folder
3. Run a test with the specific version. The version must match an existing server-jar. To specify the version, use the environment variable `SELENIUM_VERSION`, e.g.
   ```
   SELENIUM_VERSION=4.7.1 npm test
   ```

## Bug report

It seems as if versions of the standalone server up to (including) 4.8.1 are working (on macos).
Version 4.8.2 and newer (including 4.16.1) are not working (on macos).

To reproduce this bug report, download version [4.8.1](https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.8.0/selenium-server-4.8.1.jar) and [4.8.2](https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.8.0/selenium-server-4.8.2.jar), put hte files in the jars folder of the project and run

   ```
   SELENIUM_VERSION=4.8.1 npm test
   ```

and

   ```
   SELENIUM_VERSION=4.8.2 npm test
   ```

Be careful when running the tests. On macos, you probably need to allow execution of the jar and maybe other settings. Keep an eye on the activity monitor for java processes and firefox instances.

The first one (4.8.1) should work, the second one (4.8.2) fails.

Bug reported as [#13318](https://github.com/SeleniumHQ/selenium/issues/13318).