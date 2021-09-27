import { Button, TextField } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { MainLoader } from '..';
import { Context } from '../../index';
import './style.css';

export const ChatSettings = () => {
   const currentChat = useSelector((state) => state.Words.currentChat);
   console.log(currentChat);
   const { auth, firestore } = useContext(Context);
   const [chatName, setName] = useState('');
   const [userList, setList] = useState(false);
   console.log(userList);
   const [users, loading] = useCollectionData(
      firestore.collection('users')
   )
   console.log(users);
   const changeName = async () => {
      firestore.collection("chats").doc(currentChat).update({
         'chatName': chatName,
      })
         .then(() => { console.log('ee boy') })
      setName('');
   }
   const addUser = async (e) => {
      firestore.collection("chats").doc(currentChat).update({
         users: firebase.firestore.FieldValue.arrayUnion(e.currentTarget.name)
      })

   }
   if (loading) {
      return (
         <MainLoader></MainLoader>
      )
   }
   return (
      <div className="ChatSettings">
         <h2>Настройки</h2>
         <div className="ChatSettings__name">
            <TextField id="outlined-basic" label="Название чата" value={chatName} variant="outlined" onChange={(e) => setName(e.target.value)} />
            <Button variant="outlined" onClick={changeName}>Сохранить</Button>
         </div>

         <div className='ChatSettings__users'>
            <button onClick={() => setList((state) => !state)}>Добавить в чат</button>
            {false ? ' ' : (users.map((elem) => {
               return (
                  <div className="ChatSettings__userCard" style={{ display: userList || 'none' }}>
                     <img src={elem.photoURL} alt="AVATAR" className='avatar' />
                     {elem.email}
                     <button onClick={addUser} name={elem.uid}>+</button>
                  </div>
               )
            }))}
         </div>
      </div >
   )
}