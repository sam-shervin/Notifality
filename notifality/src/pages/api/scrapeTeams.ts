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
        await page.setViewport({ width: 1920, height: 1080, isMobile: false });

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

        await page.waitForSelector("span[class=ts-popover-label]", {
            timeout: 50000,
        });
        await page.click("span[class=ts-popover-label]");
        // make a mouse movement
        await page.mouse.move(10, 400);
        await delay(2000);
        //use try catch block to handle the error
        try {
            await page.waitForSelector("button[aria-label=Assignments]", {
                timeout: 50000,
            });
            await page.click("button[aria-label=Assignments]");
        } catch (error) {
            await page.waitForSelector("button[aria-label=View more apps]", {
                timeout: 50000,
            });
            await page.click("button[aria-label=View more apps]");

            await page.waitForSelector("button[aria-label=Assignments]", {
                timeout: 50000,
            });
            await page.click("button[aria-label=Assignments]");
        }

        await delay(20000);
        const elementHandle = await page.$("iframe[data-tid=hwc-iframe]");
        console.log(elementHandle);
        if (elementHandle) {
            const frame = await elementHandle.contentFrame();

            // class="tab-contents__7nQDH" -- query selector
            const textContent = await frame.evaluate(() => {
                const element = document.querySelector(".tab-contents__7nQDH");

                return element?.textContent;
            });

            // write the HTML content to a file
            const fs = require("fs");
            fs.writeFileSync("pageContent.html", textContent);
        }

        const responseData = { message: "Received your request!" };

        res.status(200).json(responseData);
    }
}
