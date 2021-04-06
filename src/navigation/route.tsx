import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainStack from './mainStack';
import firebase from 'firebase';


const Route: FC = () => {
    const [user, setUser] = useState<any>(null);

    const getUser = async () => {
        firebase.auth().onAuthStateChanged(data => {
            setUser(data)
        })
    }
    useEffect(() => {
        getUser();
    }, [])

    console.log('user=>', user)
    return (
        <NavigationContainer>
            {user !== null ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Route;