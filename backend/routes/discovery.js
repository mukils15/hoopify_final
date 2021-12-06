const express = require("express");
const router = express.Router();
const axios = require('axios');
const querystring = require("querystring");
const Team = require('../models/team')

router.post("/addTeam", async(req, res) => {
    const teamNew = new Team({
        starting_pg: JSON.parse(req.query.artists[0])['popularity'],
        starting_sg: JSON.parse(req.query.artists[1])['popularity'],
        starting_sf: JSON.parse(req.query.artists[2])['popularity'],
        starting_pf: JSON.parse(req.query.artists[3])['popularity'],
        starting_c: JSON.parse(req.query.artists[4])['popularity'],
        team_name: req.query.team,
        user: req.query.user,
        comp: req.query.comp,
        id: req.query.id
    });

    teamNew.save(function (err) {
        if (err){
            console.log(err);
        } else {
            res.send("Added user!")
        }
    });
    
})

router.post("/findFriends", async(req, res) => {
    let team = req.query.comp;
    let useName = req.query.currUser;
    let users = [];
    Team.find({comp: team}, 
        function(err, teams){
            if (err){
                console.log(err);
            } else {
                for (let h = 0; h < Math.min(5, teams.length); h++){
                    if (teams[h]['user'] !== useName){
                        let user = {};
                        user['name'] = teams[h]["user"];
                        user['id'] = teams[h]['id']
                        users.push(user);
                    }
                }
                res.send(users);
            } 
        })    
})


module.exports = router