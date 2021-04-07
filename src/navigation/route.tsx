import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainStack from './mainStack';
import firebase from 'firebase';
import { View } from 'react-native';


const Route: FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        firebase.auth().onAuthStateChanged((data: any | null) => {
            if (data) {
                setUser(data);
            } else {
                setUser(false);
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