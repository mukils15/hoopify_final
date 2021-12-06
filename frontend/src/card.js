import React, { useState, useEffect } from 'react'
import "react-spotify-auth/dist/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './logged.css'
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';

const Card = (props) => {

    const [back, setBack] = useState(false);
    const [songs, setSongs] = useState([]);
    const [flipped, setFlip] = useState(false);
    const [clc, setClicked] = useState(false);
    let clicked = false;
    const chooseColor = (rating) => {
        rating = parseInt(rating);
        if (rating > 0 && rating <= 80){
            return "#8c8371"
        } else if (rating <= 85){
            return "#c48f18"
        } else if (rating <= 90){
            return "#206714"
        } else if (rating <= 95){
            return "#7C49C6"
        } else {
            return "#c64978"
        }
    }

    const chooseColorTop = (rating) => {
        rating = parseInt(rating);
        if (rating > 0 && rating <= 80){
            return "#b7b5b0"
        } else if (rating <= 85){
            return "#e8b951"
        } else if (rating <= 90){
            return "#40a72e"
        } else if (rating <= 95){
            return "#AD8DDB"
        } else {
            return "#dc99b2"
        }
    }

    const chooseColorBottom = (rating) => {
        rating = parseInt(rating);
        if (rating > 0 && rating <= 80){
            return "#a4a29c"
        } else if (rating <= 85){
            return "#e5aa28"
        } else if (rating <= 90){
            return "#2d801e"
        } else if (rating <= 95){
            return "#9469d2"
        } else {
            return "#cf6e93"
        }
    }


    const flip = async () => {
        const userN = await axios.get(`/spotify/artist/${props.token}`, 
        { params : 
            {id: props.artist['id']}});
        let dat = userN.data;
        console.log(dat);

        setSongs(dat);
        setBack(!back);
        if (!clicked){
            setFlip(!flipped);
        } else {
            clicked = false;
        }
    }

    const prev = () => {
        clicked = true;
    }

    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                <div onClick={flip}>
                    <div style={{backgroundColor: chooseColor(props.artist['popularity']), width: 170, height: 220}}> 
                        <div className="test" style={{backgroundColor: chooseColorTop(props.artist['popularity'])}}><b>{props.artist['position']}</b></div>
                        <div className="test">
                            <img src={props.artist['url']} alt="Logo" width="150" height="150" />
                        </div>    
                        <div className="test" style={{backgroundColor:  chooseColorBottom(props.artist['popularity'])}}>
                            <b>{props.artist['name']}</b>
                        </div>
                        <div className="test" style={{backgroundColor:  chooseColorBottom(props.artist['popularity'])}}>
                            <b>{props.artist['popularity']}</b>
                        </div>
                    </div>
                </div>

                <div onClick={flip}>
                    <div style={{backgroundColor: chooseColor(props.artist['popularity']), width: 170, height: 220}}> 
                        <div className="test" style={{backgroundColor: chooseColorTop(props.artist['popularity'])}}><b>{props.artist['name']}</b></div>
                            <div className="test" style={{backgroundColor:  chooseColorBottom(props.artist['popularity'])}}>
                                <b>{props.artist['popularity']}</b>
                            </div>
                        <div style={{fontSize: 10}}>
                            {songs.map(song => 
                                <figure>
                                        <img src={song['url']} alt="Logo" width="46" height="46"></img>
                                        <figcaption> <a target="_blank" onClick={prev} href={song['song_link']}>{song['song']}</a> </figcaption>
                                </figure>
                            )}
                        </div>
                    </div>
                </div>    
        </ReactCardFlip>
    )

    }

export default Card;