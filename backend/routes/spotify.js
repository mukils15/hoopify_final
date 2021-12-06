const express = require("express");
const router = express.Router();
const axios = require('axios');
const querystring = require("querystring");

router.get("/getUser/:token", async (req, res) => {
  await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(response => response.json())
  .then(data => {
    userID = data.id;
    res.json(data);
  })
})

router.get("/playlists/:token", async(req, res) => {
  let playlist_names = [];
  axios.get(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      playlist_names.push(element['name']);
    });
  }).then(() => res.send(playlist_names));
})


router.get("/artists/short/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      obj['id'] = element['id'];
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/artists/medium/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      obj['id'] = element['id'];
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/artists/long/:token", async(req, res) => {
  let artist_names = [];
  axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=13&offset=0`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.items)
  .then(data => {
    data.forEach(element => {
      let obj = {}
      obj['name'] = element['name'];
      obj['popularity'] =element['popularity']
      obj['url'] = element['images'][0]['url']
      obj['id'] = element['id'];
      artist_names.push(obj);
    });
  }).then(() => res.send(artist_names));
})

router.get("/artist/:token", async(req, res) => {
  let artist_songs = [];
  let id = "" + req.query.id;
  axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, { headers:
      {
        "Authorization": `Bearer ${req.params.token}`
      } 
  }
  ).then(resp => resp.data.tracks).then(data => {
      for (let n = 0; n < 3; n++){
        let obj = {};
        obj['song'] = data[n]['name'];
        obj['url'] = data[n]['album']['images']['0']['url']
        obj['song_link'] = data[n]['external_urls']['spotify']
        artist_songs.push(obj);
      }
    }).then(() => res.send(artist_songs));
  })

  router.get("/related/:token", async(req, res) => {
    let related = [];
    let id = "" + req.query.id;
    axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, { headers:
        {
          "Authorization": `Bearer ${req.params.token}`
        } 
    }
    ).then(resp => resp.data.artists).then(data => {
        for (let n = 0; n < 5; n++){
          let obj = {}
          let element = data[n];
          obj['name'] = element['name'];
          obj['popularity'] =element['popularity']
          obj['url'] = element['images'][0]['url']
          obj['id'] = element['id'];
          obj['art_link'] = element['external_urls']['spotify'];
          related.push(obj);
        }
      }).then(() => res.send(related));
    })
  

router.get("/logout", async(req, res) => {
  res.redirect("accounts.spotify.com/logout")
})


router.get("/userName/:token", async(req, res) => {
  axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.display_name).then(data => res.send(data));
})

router.put("/addFriend/:token", async(req, res) => {
  const headers = {
    'Authorization': `Bearer ${req.params.token}`
  }
  axios.put(`https://api.spotify.com/v1/me/following?type=user&ids=${req.query.id}`, null, { headers }
  ).then(() => res.send("Added!"))
})

router.get("/userID/:token", async(req, res) => {
  axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.data.id).then(data => res.send(data));
})



router.post("/search/:token", async(req, res) => {
  let unchangedBody = req.query.message.split(" ");
  let changed = unchangedBody.join("%20");
  axios.post(`https://api.spotify.com/v1/search?q=${changed}&type=artist,track`, {
    headers: {
      "Authorization": `Bearer ${req.params.token}`
    }
  }).then(resp => resp.json())
  .then(data => res.json(data));
})

module.exports = router