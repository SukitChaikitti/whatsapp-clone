import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './Sidebarchat';

function Sidebar() {
    return (
        <div className = 'sidebar'>
            <div className = 'sidebar__header'>
                <div className = 'sidebar__avatar'>
                    <Avatar/>
                </div>
                
                <div className = 'sidebar__header--option'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>     
                </div>
            </div>
            <div className = 'sidebar__search'>
                <div className = 'sidebar__searchContainer'>
                    <SearchIcon/>
                    <input placeholder = 'Search ...' type = 'text'/>   
                </div>
                
            </div>
            <div className = 'sidebar__container'>
                <h1>Contact</h1>
                <Sidebarchat/>
                <Sidebarchat/>
                <Sidebarchat/>
                <Sidebarchat/>
            </div>
        </div>
    )
}

export default Sidebar;
