import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { time } from "console";

interface DetailsType {
    Teams: {
        username: string;
        password: string;
    };
    LMS: {
        username: string;
        password: string;
    };
}

const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));
// this async function to take in a json object and return a json object and response

export default async function scrape(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const data = req.body;
        console.log("Received data:", data);

        const user = req.body.Teams.username;
        const pass = req.body.Teams.password;
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://teams.microsoft.com");
        await page.setViewport({ width: 1600, height: 900, isMobile: false });
        console.log("Page opened");

        await page.waitForSelector("input[type=email]", {
            timeout: 50000,
        });
        await page.type("input[type=email]", user);
        await delay(2000);
        await page.click("input[type=submit]", { delay: 100 });
        await page.waitForSelector("input[type=password]", {
            timeout: 50000,
        });
        await delay(2000);
        await page.type("input[type=password]", pass);
        await page.click("input[type=submit]"), { delay: 100 };
        await delay(2000);
        await page.click("input[type=submit]"), { delay: 100 };
        console.log("Logged in");
        await delay(10000);

        await page.waitForSelector("span[class=ts-popover-label]", {
            timeout: 50000,
        });
        //click until it;s present in the screen, use while loop
        while (true) {
            try {
                await page.click("span[class=ts-popover-label]");
            } catch (error) {
                break;
            }
        }
        // make a mouse movement
        await page.mouse.move(10, 400);
        await delay(2000);
        console.log("Clicked on the v2 icon");
        //use try catch block to handle the error
        try {
            await page.waitForSelector("button[aria-label=Assignments]", {
                timeout: 15000,
            });
            await page.click("button[aria-label=Assignments]");
            console.log("Clicked on the assignments");
        } catch (error) {
            //use while loop to click on the view more apps
            while (true) {
                try {
                    await page.waitForSelector(
                        "span[class=fui-Button__icon rywnvv2]",
                    );
                    break;
                } catch (error) {
                    await page.mouse.move(10, 400);
                    await delay(2000);
                }
            }
            await page.click("span[class=fui-Button__icon rywnvv2]");
            console.log("Clicked on the view more apps");
            await page.waitForSelector("button[aria-label=Assignments]", {
                timeout: 15000,
            });

            await page.click("button[aria-label=Assignments]");
            console.log("Clicked on the assignments");
        }

        await delay(30000);
        //use try catch block to handle the error elementHandle = await page.$("iframe[data-tid=hwc-iframe]");
        let elementHandle;
        while (true) {
            try {
                elementHandle = await page.$("iframe[data-tid=hwc-iframe]");
                break;
            } catch (error) {
                await delay(2000);
            }
        }

        if (elementHandle) {
            await delay(20000);
            const frame = await elementHandle.contentFrame();

            const data = await frame.evaluate(() => {
                // select all text content one by one from class="tab-contents__7nQDH" and add it to an array
                const result: (string | null)[] = [];
                const elements = document.querySelectorAll(
                    ".tab-contents__7nQDH",
                );
                Array.from(elements).forEach((element) => {
                    result.push(element.textContent);
                });
                console.log(result);
                console.log("Scraped data");
                return result;
            });

            const fs = require("fs");
            fs.writeFileSync("pageContent.json", JSON.stringify(data));
        }

        const responseData = { message: "Received your request!" };
        console.log(responseData);
        res.status(200).json(responseData);
    }
}
