import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { SpotifyAuthListener } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './logged.css'
import background from './bball.jpg'
import './logged.css'
import background from './bball.jpg'
import RelatedCard from './relatedCard';
import { useLocation } from 'react-router';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

const Related = (props) => {
    const navigate = useNavigate();
    const state = useLocation();
    const [currArt, setCurr] = useState([]);
    const [allArtist, setAll] = useState([]);
    const [flipped, setF] = useState(false);

    useEffect(async () =>{
        if (state === null || state.state === null){
            navigate('/');
        }
        let artists = state.state.artists;
        let relatedArtist = [];
        console.log(artists.length);
        for (let i = 0; i < artists.length; i++){
            const userN = await axios.get(`/spotify/related/${state.state.token}`, 
                { params : 
                {id: artists[i]['id']}});
            let temp = userN.data;
            for (let j = 0; j < temp.length; j++){
                console.log("Push " + j);
                relatedArtist.push(temp[j]);
            }
        }
        console.log(relatedArtist);
        setAll(relatedArtist);
        let curr = [];
        let currArts = [];
        for (let m = 0; m < 5; m++){
            let ran = Math.floor(Math.random() * relatedArtist.length);
            let nameC = relatedArtist[ran]['name'];
            while (currArts.includes(nameC) || state.state.art_names.includes(nameC)){
                ran = Math.floor(Math.random() * relatedArtist.length);
                nameC = relatedArtist[ran]['name'];
            }
            curr.push(relatedArtist[ran]);
            currArts.push(relatedArtist[ran]['name'])
        }
        setCurr(curr);
    }, [state])


    const refresh = () => {
        let curr = [];
        let currArts = [];
        for (let m = 0; m < 5; m++){
            let ran = Math.floor(Math.random() * allArtist.length);
            let nameC = allArtist[ran]['name'];
            while (currArts.includes(nameC) || (state.state.art_names.includes(nameC))){
                ran = Math.floor(Math.random() * allArtist.length);
                nameC = allArtist[ran]['name'];
            }
            curr.push(allArtist[ran]);
            currArts.push(allArtist[ran]['name'])
        }
        setF(false);
        setCurr(curr);
    }



    return (
         <div className="test2" style={{width: '100%', height: '100%', backgroundImage: `url(${background})`}}>
             <br>
             </br>
             <br>
             </br>
             <br>
             </br>
            <div className="test">
                <h1 style={{color: "#FFFFFF"}}>
                    Suggested Artists!
                </h1>
                <div style={{color: "#FFFFFF", fontSize: 20}}>
                    Welcome to your hub for finding new artists! Open up your first pack by clicking on the cards, or request a new pack!
                </div>

                <Button variant="success" className="btn btn-success custom" onClick={refresh}>New Pack</Button>
            </div>
             <div className="vert">
                <div className="rowC">
                    {currArt.map(artist => 
                        <div>
                            <div>
                                <RelatedCard artist={artist} token={state.state.token} flipped={flipped}></RelatedCard>
                            </div>
                    </div>)}
                </div>
             </div>
        </div>
    )
}

export default Related;