import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { SpotifyAuthListener } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './logged.css'
import { teams } from './teams.json'
import { ratings } from './teams.json'
import background from './bball.jpg'
import Card from './card';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Logged = () => {
    const navigate = useNavigate();
    const [playl, setPlay] = useState(null);
    const [tok, setToke] = useState(null);
    const [frame, setFr] = useState(null);
    const [starters, setStart] = useState(null);
    const [bench, setBench] = useState(null);
    const [simTeam, setTeam] = useState("Choose a time frame to see a similar team");
    const [forUrl, setURL] = useState("");
    const [potentialFriends, setFriends] = useState([]);

    const euclidDist = (arr1, arr2) => {
        let tot = 0;
        for (let m = 0; m < arr1.length; m++){
            let diff = arr1[m] - arr2[m];
            diff = diff*diff;
            tot = tot + diff;
        }
        return tot;
    }

    const normalize = (arr1) => {
        let tot = 0;
        for (let m = 0; m < arr1.length; m++){
            tot = tot + arr1[m];
        }
        var new_array = arr1.map(rat => { 
            return (rat/tot);
        });
        return new_array;
    }

    const printToken = async (token) => {
        setToke(token);
    }

    const timeout = (delay) => {
        return new Promise( res => setTimeout(res, delay) );
    }

    const short = async (token) => {
        if (tok === undefined || tok === null){
            navigate('/');
        }
        const play = await axios.get(`/spotify/artists/short/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            let team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            if (dist < min_dist){
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
                setURL(team_name.toLowerCase());
            }
        }
        setBench(artists.slice(5)); 
        setFriends([]);
        setPlay(artists);
        setFr("short");
    }

    const medium = async (token) => {
        if (tok === undefined || tok === null){
            navigate('/');
        }
        const play = await axios.get(`/spotify/artists/medium/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            let team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            if (dist < min_dist){
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
                setURL(team_name.toLowerCase());
            }
        }
        setStart(artists.slice(0, 5)); 
        setBench(artists.slice(5)); 
        setFriends([]);
        setPlay(artists);
        setFr("medium");
    }

    const long = async () => {
        if (tok === undefined || tok === null){
            navigate('/');
        }
        const play = await axios.get(`/spotify/artists/long/${tok}`);
        let artists = assnPos(play.data);
        let starter_rat = [];
        setStart(artists.slice(0, 5)); 
        let total = 0;
        (artists.slice(0, 5)).map(artist => {
            total = total + artist['popularity']
            starter_rat.push(artist['popularity'])
        })

        var new_array = starter_rat.map(rat => { 
            return (rat/total);
        });

        let min_dist = 1000000000;
        let team_name = "";
        for (let n = 0; n < teams.length; n++){
            let team1_rat = ratings[n];
            let team2_rat = normalize(team1_rat);
            let dist = euclidDist(new_array, team2_rat);
            console.log(dist);
            if (dist < min_dist){
                console.log(teams[n]);
                min_dist = dist;
                team_name = teams[n];
                setTeam(team_name);
                setURL(team_name.toLowerCase());
            }
        }
        setStart(artists.slice(0, 5)); 
        setBench(artists.slice(5)); 
        setFriends([]);
        setPlay(artists);
        setFr("long");
    }

    const assnPos = (data) => {
        data[0]['position'] = "PG ";
        data[1]['position'] = "SG ";
        data[2]['position'] = "SF ";
        data[3]['position'] = "PF ";
        data[4]['position'] = "C ";
        for (let f = 5; f < data.length; f++){
            data[f]['position'] = "Bench "
        }
        return data;
    }

    const addTeam = async() => {
        const userN = await axios.get(`/spotify/userName/${tok}`);
        let username = userN["data"];

        const userID = await axios.get(`/spotify/userID/${tok}`);
        let id = userID["data"];

        const teamName = username + "'s" + " " + frame + " term team";
        const { data } = await axios.post('/discovery/addTeam', null, 
            { params : 
                {artists: playl, 
                team: teamName,
                user: username,
                comp: simTeam,
                id: id }});
        if ( data !== "Added user!"){
            alert("Couldn't add!")
        } else {
            alert("Added team!");
        }
    }

    const findFriends = async() => {
        if (potentialFriends.length > 0){
            setFriends([])
        } else {
            const userN = await axios.get(`/spotify/userName/${tok}`);
            let username = userN["data"];
            const { data } = await axios.post('/discovery/findFriends', null, 
                { params : 
                    {comp: simTeam,
                    currUser:  username}});
            
            if ( data !== "err"){
                console.log(data);
                setFriends(data)
            } else {
                alert("Wrong!");
            }
        }
    }

    const addFriend = async(id) => {
        const { data } = await axios.put(`/spotify/addFriend/${tok}`, null, 
            { params : 
                {id: id }});
        if (data === "Added!"){
            alert("Friend added");
        }
    }

    const logout = async () => {
        navigate('/');
    }

    const related = async () => {
       let art_names = [];
       for (let f = 0; f < playl.length; f++){
           art_names.push(playl[f]['name']);
       }
        navigate(`related`, {state: {
            artists: starters,
            token: tok,
            art_names: art_names
        }});
    }

    const chooseButtonColor = (team) => {
        let red = ["76ers", "Hawks", "Bulls", "Rockets", "Heat"]
        let blue = ["Knicks", "Clippers", "Pistons", "Hornets", "Mavs", "Nuggets", "Grizzlies", "Timberwolves", "Pelicans", "Magic", "Jazz", "Thunder", "Wizards"]
        let black = ["Nets", "Blazers", "Raptors", "Spurs"]
        let yellow = ["Warriors", "Cavs", "Pacers", "Lakers"]
        let green = ["Celtics", "Bucks"]
        let orange = ["Suns"]
        if (red.includes(team)){
            return "btn btn-danger btn-lg"
        } else if (blue.includes(team)){
            return "btn btn-primary btn-lg"
        } else if (black.includes(team)){
            return "btn btn-dark btn-lg"
        } else if (yellow.includes(team)){
            return "btn btn-warning btn-lg"
        } else if (green.includes(team)) {
            return "btn btn-success btn-lg"
        } else if (orange.includes(team)){
            return "btn btn-deep-orange btn-lg"
        } else {
            return "btn btn-deep-purple btn-lg"
        }
    }

    if (playl === null){
        return (
            <div style={{width: '100%', minHeight: '100%', minWidth: '1024px', top:0, left:0 , height: 'auto', backgroundImage: `url(${background})`}}>
                <SpotifyAuthListener
                    onAccessToken={printToken}
                />
                <div className="test">
                    <h1 style={{color: "#FFFFFF"}}>
                        Welcome to Hoopify!
                    </h1>
                </div>
                <div className="mode">
                        <Button variant="success" className="btn btn-success custom" onClick={short}>Last 4 Weeks</Button>
                        <Button variant="success" className="btn btn-success custom" onClick={medium}>Last 6 Months</Button>
                        <Button variant="success" className="btn btn-success custom" onClick={long}>All-time</Button>
                </div>
                <hr>
                </hr>
            </div>
        )
    } else {
        return (
            <div style={{width: '100%', minHeight: '100%', minWidth: '1024px', top:0, left:0 , height: 'auto', backgroundImage: `url(${background})`}}>
                <SpotifyAuthListener
                    onAccessToken={printToken}
                />
                <div className="test">
                    <h1 style={{color: "#FFFFFF"}}>
                        Welcome to Hoopify!
                    </h1>
                </div>
                <div className="mode">
                        <Button variant="success" className="btn btn-success custom" onClick={short}>Last 4 Weeks</Button>
                        <Button variant="success" className="btn btn-success custom" onClick={medium}>Last 6 Months</Button>
                        <Button variant="success" className="btn btn-success custom" onClick={long}>All-time</Button>
                </div>
                <br>
                </br>
                <div className="mode">
                    <Button variant="danger" className="btn btn-danger custom" onClick={related}> Open Related Pack!</Button>
                    <Button variant="danger" className="btn btn-danger custom" onClick={logout} href="https://accounts.spotify.com/logout" target="_blank">Logout</Button>
                </div>
                <hr>
                </hr>


                <div className="rowC">
                 {starters.map(artist => 
                    <div>
                        <div>
                            <Card artist={artist} token={tok}></Card>
                        </div>
                     </div>)}
                </div>
                <br>
                </br>


                <div className="rowC">
                 {bench.map(artist => 
                        <div>
                            <Card artist={artist} token={tok}></Card>
                        </div>
                      )}
                </div>

                <hr>
                </hr>
                <div className="test" >
                    <a href={`https://www.nba.com/${forUrl}/?tmd=1`} className={chooseButtonColor(simTeam)} role="button">Your team comparison is the {simTeam} </a>
                </div>
                <hr>
                </hr>
                <div className="rowC">
                    <Button variant="info" className="btn btn-info custom2" onClick={addTeam}>Add team to database!</Button>
                    <Button variant="info" className="btn btn-info custom2" onClick={findFriends}>Find potential friends!</Button>
                    <hr>
                    </hr>
                    <br>
                    </br>
                </div>
                <div className="test">
                    <br>
                    </br>
                    {potentialFriends.map(friend =>
                    <div>
                    <Button variant="success" className="btn btn-success custom" onClick={() => addFriend(friend['id'])}>{friend['name']}</Button> <br></br> <br></br> </div>)}
                </div>
                
            </div>
            
        )
    }

}

export default Logged;
