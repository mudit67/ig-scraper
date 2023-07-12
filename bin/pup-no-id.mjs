import puppeteer from "puppeteer";
import * as meta_ from "../trash/meta.json" assert { type: "json" };
import * as fs from "fs";
let meta = JSON.parse(JSON.stringify(meta_));
meta = meta.default;
const { username, sessionId, authUser, authPsw } = meta;
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let url = `https://www.instagram.com/${username}/`;
  await page.goto(url);
  await page.waitForNetworkIdle();
  await page.pdf({ path: "../trash/page.pdf" });

  // await page.close();
})();
