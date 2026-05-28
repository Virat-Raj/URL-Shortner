import express from "express";
import handleGenerateShorturl from "../controlers/url.controlers.js";
import URL from "../models/url.model.js";

const Router = express.Router();

Router.get('/:shortId', async (req, res) => {
    const shortId1 = req.params.shortId;
    console.log(shortId1);
    const entry = await URL.findOne({ shorturl: shortId1 });
    if (!entry) {
        return res.status(404).json({ msg: "Short url not found" });
    }
    return res.redirect(entry.originalUrl);
});

Router.post("/", handleGenerateShorturl);

export default Router;