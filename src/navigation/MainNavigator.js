import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//telas
import AboutScreen from '../screens/AboutScreen';
import AddCigarrosScreen from '../screens/AddCigarrosScreen';
import DesafiosScreen from '../screens/DesafiosScreen';
import DicasScreen from '../screens/DicasScreen';
import HomeScreen from '../screens/HomeScreen';
import LifeAndMoneyScreen from '../screens/LifeAndMoneyScreen';
import LoginScreen from '../screens/LoginScreen'; // não consta no drawer
import OptionsScreen from '../screens/OptionsScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RankingScreen from '../screens/RankingScreen';
import SignUpScreen from '../screens/SignUpScreen'; // estará relacionada à tela Login futuramente

// tela Login e Cadastro ainda não estão corretamente manuseadas

//constante
import Colors from '../constants/Colors';

const defaultNavOptionsStack = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTitleStyle: {
        // fontFamily: ,
        color: Colors.accent,
        fontSize: 24
    },
    headerTintColor: Colors.primaryColor
};

const SignUpStackNavigator = createStackNavigator();

const SignUpNavigator = () => {
    return (
        <SignUpStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <SignUpStackNavigator.Screen
                name='SignUp'
                component={SignUpScreen}
            />
        </SignUpStackNavigator.Navigator>
    )
}

const LoginStackNavigator = createStackNavigator();

const LoginNavigator = () => {
    return (
        <LoginStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <LoginStackNavigator.Screen
                name='Login'
                component={LoginScreen}
            />
        </LoginStackNavigator.Navigator>
    )
}

const PerfilStackNavigator = createStackNavigator();

const PerfilNavigator = () => {
    return (
        <PerfilStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <PerfilStackNavigator.Screen
                name='Perfil'
                component={PerfilScreen}
            />
        </PerfilStackNavigator.Navigator>
    )
}

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <HomeStackNavigator.Screen
                name='Home'
                component={HomeScreen}
            />
        </HomeStackNavigator.Navigator>
    )
}

const AddCigarrosStackNavigator = createStackNavigator();

const AddCigarrosNavigator = () => {
    return (
        <AddCigarrosStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <AddCigarrosStackNavigator.Screen
                name='AddCigarros'
                component={AddCigarrosScreen}
            />
        </AddCigarrosStackNavigator.Navigator>
    )
}

const DesafiosStackNavigator = createStackNavigator();

const DesafiosNavigator = () => {
    return (
        <DesafiosStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <DesafiosStackNavigator.Screen
                name='Desafios'
                component={DesafiosScreen}
            />
        </DesafiosStackNavigator.Navigator>
    )
}

const DicasStackNavigator = createStackNavigator();

const DicasNavigator = () => {
    return (
        <DicasStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <DicasStackNavigator.Screen
                name='Dicas'
                component={DicasScreen}
            />
        </DicasStackNavigator.Navigator>
    )
}

const AboutStackNavigator = createStackNavigator();

const AboutNavigator = () => {
    return (
        <AboutStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <AboutStackNavigator.Screen
                name='About'
                component={AboutScreen}
            />
        </AboutStackNavigator.Navigator>
    )
};

const RankingStackNavigator = createStackNavigator();

const RankingNavigator = () => {
    return (
        <RankingStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <RankingStackNavigator.Screen
                name='Ranking'
                component={RankingScreen}
            />
        </RankingStackNavigator.Navigator>
    )
};

const LifeAndMoneyStackNavigator = createStackNavigator();

const LifeAndMoneyNavigator = () => {
    return (
        <LifeAndMoneyStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <LifeAndMoneyStackNavigator.Screen
                name='Life and Money'
                component={LifeAndMoneyScreen}
            />
        </LifeAndMoneyStackNavigator.Navigator>
    )
}

const OptionsStackNavigator = createStackNavigator();

const OptionsNavigator = () => {
    return (
        <OptionsStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <OptionsStackNavigator.Screen
                name='Options'
                component={OptionsScreen}
            />
        </OptionsStackNavigator.Navigator>
    )
}

const MenuDrawerNavigator = createDrawerNavigator();

const MenuNavigator = () => {
    return (
        <MenuDrawerNavigator.Navigator initialRouteName='Home'>
            <MenuDrawerNavigator.Screen name='Home' component={HomeNavigator}/>
            <MenuDrawerNavigator.Screen name='Cigarros fumados' component={AddCigarrosNavigator}/>
            <MenuDrawerNavigator.Screen name='Desafios' component={DesafiosNavigator}/>
            <MenuDrawerNavigator.Screen name='Dicas' component={DicasNavigator}/>
            <MenuDrawerNavigator.Screen name='Ranking' component={RankingNavigator}/>
            <MenuDrawerNavigator.Screen name='Conquistas' component={LifeAndMoneyNavigator}/>
            <MenuDrawerNavigator.Screen name='Perfil' component={PerfilNavigator}/>
            <MenuDrawerNavigator.Screen name='Sobre' component={AboutNavigator}/>
            <MenuDrawerNavigator.Screen name='Opções' component={OptionsNavigator}/>
        </MenuDrawerNavigator.Navigator>
    );
};

const MainNavigator = props => {
    return (
        <NavigationContainer>
            {/* <LoginNavigator /> */}
            <MenuNavigator /> 
        </NavigationContainer>
    );
};

export default MainNavigator;