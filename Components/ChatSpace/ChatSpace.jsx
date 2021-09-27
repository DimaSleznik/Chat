import React from 'react';
import { Chat, Users } from '..';
import './style.css';

export const ChatSpace = () => {
   return (
      <div className="ChatSpace">
         <Users></Users>
         <Chat></Chat>
      </div>
   )
}