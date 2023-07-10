import * as meta_ from "../trash/meta.json" assert { type: "json" };
import * as fs from "fs";
let meta = JSON.parse(JSON.stringify(meta_));
meta = meta.default;
const { username, sessionId } = meta;
import * as cheerio from "cheerio";
import fetch from "node-fetch";
(async function () {
	const url = `https://www.instagram.com/${username}`;
	console.log("fetching: ", url);
	const pageHtmlText = await fetch(url)
		.then((data) => data.text())
		.catch((err) => {
			console.error(err);
		});
	fs.writeFile("index.html", pageHtmlText, (err) => {
		console.log(err);
	});
	const $ = cheerio.load(pageHtmlText);
	const imageUrls = [];
	const imageTags = $("img")
		.get()
		.map((el, index) => {
			const imageTag = cheerio.load(el);
			// console.log(imageTag);
			const imageUrl = imageTag("img").attr("src");
			var base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
			fs.writeFile(
				`image${index}.png`,
				base64Data,
				"base64",
				function (err) {
					console.log(err);
				}
			);
			imageUrls.push(imageUrl);
		});
	console.log(
		"🚀 ~ file: get-ig-posts.mjs:13 ~ imageUrls:",
		imageUrls,
		imageUrls.length
	);
	imageUrls
		.filter((i) => i.includes("cdn"))
		.map((i) => {
			console.log("🚀 ~ file: get-ig-posts.mjs:25 ~ i:", i);
		});
})();
