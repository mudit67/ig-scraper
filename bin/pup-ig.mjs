import puppeteer from "puppeteer";
import * as meta_ from "../trash/meta.json" assert { type: "json" };
let meta = JSON.parse(JSON.stringify(meta_));
meta = meta.default;
const { username, sessionId, authUser, authPsw } = meta;
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.instagram.com/accounts/login/");
	await page.waitForSelector('input[name="username"]');
	await page.type('input[name="username"]', authUser);
	await page.type('input[name="password"]', authPsw);
	await page.click('button[type="submit"]');
	await page.waitForNavigation();
	// Add a wait for some selector on the home page to load to ensure the next step works correctly
	await page.pdf({ path: "page.pdf", format: "A4" });
	await browser.close();
})();
