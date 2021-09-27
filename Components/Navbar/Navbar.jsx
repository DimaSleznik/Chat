import React from 'react'
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { path } from '../../constans';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
export const Navbar = function () {
   const { auth } = useContext(Context);
   const [user] = useAuthState(auth);
   return (
      <AppBar position="static" color='secondary'>

         <Toolbar variant={'dense'}>
            <Grid container justify={'flex-end'}>

               {user ?
                  <Button variant={'outlined'} onClick={() => auth.signOut()}>Выйти</Button>
                  :
                  <NavLink to={path.LOGIN_ROUTE}>
                     <Button variant={'outlined'}>Логин</Button>
                  </NavLink>
               }


            </Grid>
         </Toolbar>
      </AppBar>

   );
}
