const express = require("express");
const router = express.Router();
const axios = require('axios');
const querystring = require("querystring");


router.get("/login", async (req, res) => {
    console.log('ewfwe');
    let scope = "user-modify-playback-state user-read-playback-state user-read-currently-playing";
    console.log(scope);
    res.redirect(`https://accounts.spotify.com/authorize?client_id=fcdb3f0ea44f416ab19bfd90179b5ef3&response_type=code&redirect_url=nba.com&scope=${scope}&show_dialog=true`);
})

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

router.get("/logged", async (req, res) => {
    let body = {
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: "nba.com",
        client_id: "fcdb3f0ea44f416ab19bfd90179b5ef3",
        client_secret: "964f88801b6444f7993f9f5d5750feb4"
    }

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }

    await axios.post("https://accounts.spotify.com/api/token", encodeFormData(body), {
        headers: headers
    }).then(resp => resp.json())
    .then(data => {
        let query = querystring.stringify(data);
        res.redirect(`http://localhost:3000/${query}`);
    });
})

module.exports = router;