import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import './Chat.css';
import {Search , AttachFile , MoreVert} from '@material-ui/icons';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import axios from './axios';

function Chat({messages}) {

    const [input , setInput] = useState('')

    const sendMessage = (e) => {
        e.preventDefault();
        
        axios.post('/message/new', {
            message: input,
            name: "Barfi",
            timestamp: "example",
            recieved: false
        })

        setInput("");
    }

    return (
        <div className = 'chat'>
            <div className = 'chat__header'>
                <div className = 'chat__headerAvatar'>
                    <Avatar/>
                </div>
                <div className = 'chat__headerInfo'>
                    <h3>Room</h3>
                    <p>just something</p>
                </div>
                <div className = 'chat__headerOption'>
                    <IconButton>
                        <Search/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className = 'chat__body'>
                {messages.map((message) => {
                    return !message.recieved ? (<p className = 'chat__message'>
                    <span className = 'chat__name'>
                        {message.name}
                    </span>
                    {message.message}
                    <span className = 'chat__date'>
                        {message.timestamp}
                    </span>
                </p>):(<p className = 'chat__message chat__reciever'>
                    <span className = 'chat__name'>
                        {message.name}
                    </span>
                    {message.message}
                    <span className = 'chat__date'>
                        {message.timestamp}
                    </span>
                </p>)
                })}
               


            </div>

            <div className = 'chat__footer'>
                <EmojiEmotionsIcon/>
                <form>
                    <input value = {input} onChange = {(e) => setInput(e.target.value)} placeholder = 'Type the message...' type = 'text'/>
                    <button type = 'submit' onClick = {sendMessage}>button</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
