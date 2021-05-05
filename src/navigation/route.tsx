import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainStack from './mainStack';
import firebase from 'firebase';


const Route: FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        firebase.auth().onAuthStateChanged(_user => {
            console.log('_user=>', _user)
            if (_user) {
                setUser(_user)
            }
        })
    }
    console.log('user=>', user)

    // if (user == null) {  
    //     return (<View />)
    // }
    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Route;