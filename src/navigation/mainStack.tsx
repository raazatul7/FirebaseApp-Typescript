import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens';
import Dashboard from '../screens/main/Dashboard';

const { Navigator, Screen } = createStackNavigator()

const MainStack: FC = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} />
            <Screen name='dashboard' component={Dashboard} />
        </Navigator>
    )
}

export default MainStack;