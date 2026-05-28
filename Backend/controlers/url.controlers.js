import URL from "../models/url.model.js";
import shortid from "shortid";


const handleGenerateShorturl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ msg: "url not provided" });
    const shorturl1 = shortid.generate();
    const originalUrl = /^https?:\/\//i.test(body.url) ? body.url : `https://${body.url}`;

    await URL.create({ shorturl: shorturl1, originalUrl });

    return res.json({ id: shorturl1 });
};

export default handleGenerateShorturl;
