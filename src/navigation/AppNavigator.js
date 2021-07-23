import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { LoginNavigator, StartupNavigator } from '../navigation/MainNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => state.user.token);
    const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

    return (
        <NavigationContainer>
            {isAuth && <StartupNavigator />}
            {!isAuth && didTryAutoLogin && <LoginNavigator />}
            {!isAuth && !didTryAutoLogin && <StartupScreen />}
        </NavigationContainer>
    )
};

export default AppNavigator;
