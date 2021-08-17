//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessage.js';
import Pusher from 'pusher';
import Cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1250404",
    key: "12ace8c78b93f1d8d158",
    secret: "d71da563d10023610d0f",
    cluster: "ap1",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(Cors());

app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers' , '*');
    next();
});

//DB config
mongoose.connect('mongodb+srv://admin:YaQFMT49weCiRCZN@cluster0.1tljr.mongodb.net/whatsappdb?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.once('open', () => {
    console.log("db connected");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("new message" , change);

    if(change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger('messages','inserted',{
            name:messageDetails.name,
            message:messageDetails.message
        })
    }else{
        console.log('error')
    }

    });
});


//api Route
app.get('/',(req , res) => res.status(200).send("hello world"));

app.get('/message/sync' , (req , res) => {
    Messages.find((err , data) => {
        if(err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
        }
    })
})
    
app.post('/message/new' , (req , res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage , (err , data) => {
        if(err) {
            res.status(500).send(err)
        }else {
            res.status(201).send(`new Message created ${data}`)
        }
    })
})

//listens

app.listen(port , () => console.log(`show ${port}`));

//YaQFMT49weCiRCZN