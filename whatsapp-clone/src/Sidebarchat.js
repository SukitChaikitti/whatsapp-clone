import { Avatar } from '@material-ui/core';
import React from 'react';
import './Sidebarchat.css';

function Sidebarchat() {
    return (
        <div className = 'sidebar__chat'>
            <div className = 'sidebar__chatAvatar'>
                <Avatar/>
            </div>
            <div className = 'sidebar__chatContainer'>
                <h3>Room</h3>
                <p>name</p>
            </div>
            
            
        </div>
    )
}

export default Sidebarchat
