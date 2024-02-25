import puppeteer from "puppeteer";

const user = "";
const pass = "";
const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export default async function handler() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://teams.microsoft.com");
    await page.setViewport({ width: 1710, height: 986, isMobile: false });

    await page.waitForSelector("input[type=email]");
    await page.type("input[type=email]", user);
    await page.click("input[type=submit]", { delay: 100 });
    await page.waitForSelector("input[type=password]");
    await delay(2000);
    await page.type("input[type=password]", pass);
    await page.click("input[type=submit]"), { delay: 100 };
    await delay(2000);
    await page.click("input[type=submit]"), { delay: 100 };
    await delay(10000);

    await page.waitForSelector("span[class=ts-popover-label]");
    await page.click("span[class=ts-popover-label]");

    await delay(3000);
    await page.waitForSelector("button[aria-label=Assignments]");
    await page.click("button[aria-label=Assignments]");

    const url = page.url();
    const content = await page.content();
    console.log(url);

    const teams = await page.evaluate(() => {});
}
