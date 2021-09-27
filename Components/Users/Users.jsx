import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useContext } from "react";
import { Context } from "../..";
import firebase from 'firebase';
import { MainLoader } from "..";
import './style.css';
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store";
import { Button } from "@material-ui/core";
export const Users = () => {
   const { auth, firestore } = useContext(Context);
   const [user] = useAuthState(auth);
   const dispatch = useDispatch();
   const [chats, loading] = useCollectionData(
      firestore.collection('chats').where("users", "array-contains", user.uid)
   )
   const selectChat = (currentChat) => {
      dispatch(profileActions.setCurrentChat(currentChat))


   }
   const createChat = async () => {
      const id = v4();
      firestore.collection('chats').doc(id).set({
         chatName: user.displayName + ' Chat',
         users: [user.uid],
         chatID: id,
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

   }
   if (loading) {
      return (<MainLoader></MainLoader>)
   }
   return (
      <div className="Chats">
         <button onClick={createChat} className='Chats__create'>Создать чат</button>
         {chats.map((elem) => {
            console.log(elem);
            return (<div className="Chats__card" onClick={() => { selectChat(elem.chatID) }}>
               {elem.chatName}
            </div>)
         })}
      </div >
   )
}