import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { path } from "../constans";
import { privateRoutes, publicRoutes } from "./routes";
import { v4 as uuid } from "uuid";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
export const Router = function () {
   const { auth } = useContext(Context);
   const [user] = useAuthState(auth);
   return user ?
      (
         <Switch>
            {privateRoutes.map(({ path, Component }) => {

               return (<Route path={path} exact={true} key={uuid()} ><Component></Component></Route>)

            })}
            <Redirect to={path.CHAT_ROUTE}></Redirect>
         </Switch >
      )
      :
      (
         <Switch>
            {publicRoutes.map(({ path, Component }) => {
               return (<Route path={path} exact={true} key={uuid()} ><Component></Component></Route>)

            })}
            <Redirect to={path.LOGIN_ROUTE}></Redirect>
         </Switch>
      );
}
