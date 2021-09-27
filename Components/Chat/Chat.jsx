import React, { useContext, useEffect, useRef } from 'react'
import firebase from 'firebase';
import { Context } from '../../index';
import { useState } from 'react';
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatSettings, MainLoader } from '..';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import options from '../../img/menu.png';
export const Chat = () => {
   const currentChat = useSelector((state) => state.Words.currentChat);
   const { auth, firestore } = useContext(Context);
   const messagesEndRef = useRef(null);
   const [user] = useAuthState(auth);
   const [value, setValue] = useState('');
   const [settings, setSettings] = useState(true);
   const [messages, loading, error] = useCollectionData(
      firestore.collection('messagess').where('chatID', '==', currentChat)
   )
   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
   }
   useEffect(() => {
      scrollToBottom();
   }, [messages])
   const sendMessage = async (e) => {
      e.preventDefault();
      if (value !== '') {
         firestore.collection('messagess').add({
            chatID: currentChat,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
         })
         setValue('');
      }

   }
   if (loading) {
      return (
         <MainLoader></MainLoader>
      )
   }
   return (
      <div className="Chat">
         <div className="Chat_send">
            <form>
               <input type='text' className='text_area' onChange={e => setValue(e.target.value)} value={value}></input>
               <input type='button' className='send_button' value='Отправить' onClick={(e) => sendMessage(e)}></input>
            </form>
         </div>
         <div className='Chat__menu'>
            <img src={options} alt="" width='15px' height="15px" className='options_img' onClick={() => setSettings((s) => !s)} /></div>
         <div className="Chat_messages">
            {messages ? messages.map((message) => {

               return (
                  <div className={user.uid === message.uid ? 'Chat_my_message' : 'Chat_user_message'} key={v4()}>
                     <div className='Chat_message_userName'>
                        <img src={message.photoURL} alt="Avatar_photo" className={'Avatar_photo'} />
                        {message.displayName}
                     </div>
                     {message.text}


                  </div>)
            }) :
               <div>{JSON.stringify(error)}</div>
            }
            <div ref={messagesEndRef} className='space_block'></div>
         </div>
         {(currentChat && settings) ? <ChatSettings></ChatSettings> : ''}
      </div>

   );
}
