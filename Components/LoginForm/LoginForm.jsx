import { Box, Button, Container, Grid } from '@material-ui/core';
import firebase from 'firebase';
import React, { useContext } from 'react'
import { Context } from '../..';
export const LoginForm = () => {

   const { auth, firestore } = useContext(Context)
   const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await auth.signInWithPopup(provider);
      console.log(user);
      await firestore.collection('users').doc(user.uid).set({
         email: user.email,
         photoURL: user.photoURL,
         uid: user.uid,
         displayName: user.displayName,
      })

   }


   return (
      <Container>
         <Grid container
            style={{ height: window.innerHeight - 50 }}
            alignItems={'center'}
            justify={'center'}
         >
            <Grid style={{ width: 400, background: '#f1f1f1' }}
               container alignItems={'center'}
               justify={'center'}
            >
               <Box p={5}>
                  <Button variant={'outlined'} onClick={login}>Войти с помощью гугл</Button>
               </Box>
            </Grid>
         </Grid>
      </Container >

   );
}
