import React from 'react'
import ReactDOM from 'react-dom'
import Login from './src/login'
import {BrowserRouter} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Logged from './src/logged';
import Related from  './src/related'


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="logged" element={<Logged/>}></Route>
            <Route exact path="logged/related" element={<Related/>}></Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('react-root'))