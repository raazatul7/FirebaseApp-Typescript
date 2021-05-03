import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainStack from './mainStack';
import firebase from 'firebase';


const Route: FC = () => {
    const [user, setUser] = useState<any>(false);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        firebase.auth().onAuthStateChanged(_user => {
            if (_user) {
                setUser(_user)
            }
        })
    }

    if (user == null) {
        return (<View />)
    }
    return (
        <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Route;