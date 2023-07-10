const meta = require("./../trash/meta.json");
const { username } = meta;

const Insta = require("scraper-instagram");
const InstaClient = new Insta();

InstaClient.getProfile(username)
	.then((profile) => console.log(profile))
	.catch((err) => console.error(err));
