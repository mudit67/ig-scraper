import puppeteer from "puppeteer";
import * as meta_ from "../trash/meta.json" assert { type: "json" };
import * as fs from "fs";
let meta = JSON.parse(JSON.stringify(meta_));
meta = meta.default;
const { username, sessionId, authUser, authPsw } = meta;
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1980 });

  await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', authUser);
  await page.type('input[name="password"]', authPsw);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.waitForSelector(
    ".x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1.x1dr59a3.xixxii4.x13vifvy.xeq5yr9.x1n327nk"
  );
  // Add a wait for some selector on the home page to load to ensure the next step works correctly
  //   await page.pdf({ path: "./../trash/page.pdf", format: "A4" });
  await page.click('button[type="button"]');
  //   await page.waitForNavigation();
  //   await page.waitForSelector("[style='max-width: 630px; width: 100%;']");
  await page.waitForTimeout(4000);
  //   await page.waitForNetworkIdle();

  //   await page.click("::-p-text(Not Now)");
  //   await page.waitForSelector("._a9_1");
  const pre_click = await page.content();
  fs.writeFileSync("../trash/pre_click.html", pre_click);
  let buttonFild = page.evaluate(() => {
    console.log(document.querySelectorAll("button"));
  });
  await page.click("button._a9_1").catch((err) => console.log(err));
  await page.waitForTimeout(2000);
  let url = `https://www.instagram.com/${username}/`;
  await page.goto(url);
  //   await page.waitForNetworkIdle();
  await page.waitForSelector("._ac7v._al3n");
  await page.pdf({ path: "../trash/page_before_closing.pdf" });
  let li = await page.evaluate(() => {
    let res = [];
    console.log("Evaluation starts");
    const images = document.querySelectorAll("img");
    images.forEach((i) => {
      let sup = i.attributes.src.value;
      res.push(sup);
      console.log(sup);
    });
    return res;
  });
  //   console.log(li);
  li.filter((i) => i.includes("cdn")).forEach((li, index) => {
    console.log(li);
    // var base64Data = li.replace(/^data:image\/png;base64,/, "");
    // fs.writeFile(
    //   `../trash/image${index}.png`,
    //   base64Data,
    //   "base64",
    //   function (err) {
    //     console.log(err);
    //   }
    // );
  });
  await page.waitForTimeout(10000);
  // await browser.close();
})();
