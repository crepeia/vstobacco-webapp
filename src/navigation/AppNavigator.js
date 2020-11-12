import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { MenuNavigator, LoginNavigator, StartupNavigator } from '../navigation/MainNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => state.user.token);
    const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

    return (
        //No lugar do MenuNavigator chamar o StartupNavigator e nele usar o Navigate pro Menu
        <NavigationContainer>
            {isAuth && <StartupNavigator />}
            {!isAuth && didTryAutoLogin && <LoginNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
};

export default AppNavigator;
