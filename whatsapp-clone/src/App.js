import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';


function App() {

  const [message , setMessage] = useState([])


  useEffect(() => {
    axios.get('/message/sync').then(res => {
      setMessage(res.data);
    })
  }, []);

  useEffect(() => {

    const pusher = new Pusher('12ace8c78b93f1d8d158', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setMessage([...message , data])
    });


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [message])

  console.log(message)

  return (
    <div className="app">
      <div className = 'app__body'>
        <Sidebar/>
        <Chat messages = {message}/>
      </div>
    </div>
  );
}

export default App;
