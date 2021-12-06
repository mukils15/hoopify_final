import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SpotifyAuth } from "react-spotify-auth"
import "react-spotify-auth/dist/index.css"
import { Scopes } from 'react-spotify-auth';
import './logged.css'
import background from './bball.jpg'

const Login = () => {
    return (
         <div className="test2" style={{width: '100%', height: '100%', backgroundImage: `url(${background})`}}>
             <div className="vert" style={{ backgroundColor: "#000000", width: 350, height: 150}}>
                <h1 style={{color: "#FFFFFF"}}> Log In </h1>
                <p style={{color: "#FFFFFF"}}> Click here to login with Spotify!</p>
                <div className="c">
                <SpotifyAuth
                    redirectUri = "http://localhost:3000/logged"
                    clientID="ac96f36b33c744c2a7e9f26f2b59cdf6"
                    scopes={[Scopes.userReadCurrentlyPlaying, Scopes.userTopRead, Scopes.userFollowModify, Scopes.userLibraryModify]}
                    onAccessToken ={console.log("wewe")}
                />
                </div>
                <br></br>
             </div>
            

        </div>
    )
}

export default Login;