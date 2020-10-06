import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, InsertEmoticon, Mic, AttachFile, MoreVert } from '@material-ui/icons'
import './Chat.css';
import db from './firebase';
import { useStateValues } from './StateProvider';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
function Chat() {
   const [seed, setSeed] = useState('');
   const [input, setInput] = useState('');
   const { id } = useParams();
   const [roomName, setRoomName] = useState('');
   const [messages, setMessages] = useState([]);
   const [{ user }] = useStateValues();
   // link react Router => https://medium.com/@djoepramono/react-router-4-gotchas-2ecd1282de65
   // <HashRouter>, basically it uses the hash in the URL to render the component.
   // <BrowserRouter>, it uses HTML5 history API to render the component.

   useEffect(() => {
      if (id) {
         db.collection('rooms')
            .doc(id)
            .onSnapshot(snapshot => (setRoomName(snapshot.data().name)))
         db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot(snapshot => (
               setMessages(snapshot.docs.map(doc => doc.data()))
            ))
      }
   }, [id])

   useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
   }, [])

   const sendMessage = e => {
      e.preventDefault();
      db.collection('rooms')
         .doc(id)
         .collection("messages")
         .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
      setInput("");
   }
   return (
      <div className="chat">
         <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat__headerInfo">
               <h3>{roomName}</h3>
               <p>last seen at{" "}
                  {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
               </p>
            </div>
            <div className="chat__headerRight">
               <IconButton children={<SearchOutlined />} />
               <IconButton children={<AttachFile />} />
               <IconButton children={<MoreVert />} />
            </div>
         </div>
         {/* ending */}
         <div className="chat__body">
            {messages.map(message => (
               <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                  <span className="chat__name">
                     {message.name}
                  </span>
                  {message.message}
                  <span className="chat__timestamp">
                     {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
               </p>
            ))}
         </div>

         <div className="chat__footer">
            <InsertEmoticon />
            <form>
               <input value={input} placeholder="Ketikan Pesan" onChange={e => setInput(e.target.value)} type="text" />
               <button type="submit" onClick={sendMessage}>Send</button>
            </form>
            <Mic />
         </div>
      </div>
   )
}

export default Chat
