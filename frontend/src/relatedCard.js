import React, { useState, useEffect } from 'react'
import "react-spotify-auth/dist/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './logged.css'
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';

const RelatedCard = (props) => {




    const [back, setBack] = useState(false);
    const [flipped, setFlip] = useState(props.flipped);

    useEffect(async () =>{
        setFlip(false);
    }, [props])

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
        setBack(!back);
        setFlip(!flipped);
    }

    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                <div onClick={flip}>
                    <div style={{backgroundColor: chooseColor(props.artist['popularity']), width: 170, height: 220}}> 

                    <div className="vert" style={{fontSize: 20}}>
                        <b>Click to reveal!</b>
                    </div>
                    
                    </div>
                    <br>
                    </br>
                    <div style={{width: 70, height:70}}>
                    </div>
                </div>

                <div>
                    <div onClick={flip} style={{backgroundColor: chooseColor(props.artist['popularity']), width: 170, height: 220}}> 
                        <div className="test" style={{backgroundColor: chooseColorTop(props.artist['popularity'])}}><b>Suggested</b></div>
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
                    <br>
                    </br>
                    <div className = "test">
                            <a href={props.artist['art_link']} target="_blank">
                                <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" alt="Logo" width="70" height="70" />
                            </a>
                    </div>
                </div>    
        </ReactCardFlip>
    )
    }

export default RelatedCard;