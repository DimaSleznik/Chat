import React from 'react'
import Loader from "react-loader-spinner";
import './style.css';
export const MainLoader = () => {


   return (
      <div className="MainLoader">
         <Loader
            type="ThreeDots"
            color="red"
            height={100}
            width={100}
            timeout={32000} //3 secs
         />
      </div>

   );
}
