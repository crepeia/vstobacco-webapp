import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

//telas
import AboutScreen, { screenOptions as aboutOptions } from '../screens/AboutScreen';
import AddCigarrosScreen, { screenOptions as addCigarrosOptions } from '../screens/AddCigarrosScreen';
import DesafiosScreen, { screenOptions as desafiosOptions } from '../screens/DesafiosScreen';
import DicasScreen, { screenOptions as dicasOptions } from '../screens/DicasScreen';
import DicasDetalheScreen, { screenOptions as dicasDetalheOptions } from '../screens/DicasDetalheScreen';
import HomeScreen, { screenOptions as homeOptions } from '../screens/HomeScreen';
import LifeAndMoneyScreen, { screenOptions as conquistasOptions } from '../screens/LifeAndMoneyScreen';
import LoginScreen from '../screens/LoginScreen'; // não consta no drawer
import OptionsScreen, { screenOptions as configOptions } from '../screens/OptionsScreen';
import PerfilScreen, { screenOptions as perfilOptions } from '../screens/PerfilScreen';
import RankingScreen, { screenOptions as rankingOptions } from '../screens/RankingScreen';
import RankingJoinScreen, { screenOptions as rankingJoinOptions } from '../screens/RankingJoinScreen';
import RecordScreen from '../screens/RecordScreen';
import SignUpScreen from '../screens/SignUpScreen'; 
import StartupLogin from '../screens/StartupLogin'; 
import TermosUso from '../screens/TermosUso';
import TermoConsentimento from '../screens/TermoConsetimento';

//constante
import Colors from '../constants/Colors';

const defaultNavOptionsStack = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTitleStyle: {
        // fontFamily: ,
        color: 'white',
        fontSize: 20
    },
    headerTintColor: 'white'
};

// const SignUpStackNavigator = createStackNavigator();

const LoginStackNavigator = createStackNavigator();

export const LoginNavigator = () => {
    return (
        <LoginStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <LoginStackNavigator.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <LoginStackNavigator.Screen
                name='Cadastro'
                component={SignUpScreen}
            />
            <LoginStackNavigator.Screen
                name='TermosUso'
                component={TermosUso}
                options={{
                    title: 'Termos de Uso',
                }}
            />
            <LoginStackNavigator.Screen
                name='TermoConsentimento'
                component={TermoConsentimento}
                options={{
                    title: 'Termo de Consentimento',
                }}
            />
            {/* <LoginStackNavigator.Screen
                name='StartupLogin'
                component={StartupNavigator}
                options={{
                    headerShown: false
                }}
            /> */}
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
                options={perfilOptions}
            />
            <PerfilStackNavigator.Screen
                name='Login'
                component={LoginNavigator}
                options={{
                    headerShown: false
                }}
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
                options={homeOptions}
            />
        </HomeStackNavigator.Navigator>
    )
}

const AddCigarrosStackNavigator = createStackNavigator();

const AddCigarrosNavigator = () => {
    return (
        <AddCigarrosStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <AddCigarrosStackNavigator.Screen
                name='Cigarros Fumados'
                component={AddCigarrosScreen}
                options={addCigarrosOptions}
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
                options={desafiosOptions}
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
                options={dicasOptions}
            />
            <DicasStackNavigator.Screen
                name='DicasDetalhe'
                component={DicasDetalheScreen}
                options={dicasDetalheOptions}
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
                options={aboutOptions}
            />
        </AboutStackNavigator.Navigator>
    )
};

const RankingStackNavigator = createStackNavigator();

const RankingNavigator = () => {
    return (
        <RankingStackNavigator.Navigator screenOptions={defaultNavOptionsStack}>
            <RankingStackNavigator.Screen
                name='RankingJoin'
                component={RankingJoinScreen}
                options={rankingJoinOptions}
            />
            <RankingStackNavigator.Screen
                name='Ranking'
                component={RankingScreen}
                options={rankingOptions}
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
                options={conquistasOptions}
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
                options={configOptions}
            />
        </OptionsStackNavigator.Navigator>
    )
}

const MenuDrawerNavigator = createDrawerNavigator();

export const MenuNavigator = () => {
    return (
        <MenuDrawerNavigator.Navigator initialRouteName='Home' drawerContentOptions={{
            activeTintColor: Colors.primaryColor
        }}>
            <MenuDrawerNavigator.Screen 
                name='Home' 
                component={HomeNavigator}
                options={{
                    drawerIcon: props => (
                        <SimpleLineIcons 
                        name={'graph'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name='Cigarros fumados' 
                component={AddCigarrosNavigator}
                options={{
                    drawerIcon: props => (
                        <MaterialIcons 
                        name={'smoke-free'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name='Desafios' 
                component={DesafiosNavigator}
                options={{
                    drawerIcon: props => (
                        <SimpleLineIcons 
                        name={'trophy'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name='Dicas' 
                component={DicasNavigator}
                options={{
                    drawerIcon: props => (
                        <MaterialCommunityIcons 
                        name={'lightbulb-on-outline'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name=' Ranking' 
                component={RankingNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                        name={'md-medal'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name=' Conquistas' 
                component={LifeAndMoneyNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                        name={'md-heart-empty'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name='Perfil' 
                component={PerfilNavigator}
                options={{
                    drawerIcon: props => (
                        <MaterialIcons 
                        name={'person-outline'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name=' Sobre' 
                component={AboutNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                        name={'md-information-circle-outline'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
            <MenuDrawerNavigator.Screen 
                name='Opções' 
                component={OptionsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                        name={'md-options'}
                        size={24}
                        color={Colors.primaryColor}
                        />
                    )
                }}
            />
        </MenuDrawerNavigator.Navigator>
    );
};

const StartupStackNavigator = createStackNavigator();

export const StartupNavigator = () => {
    return (

        <StartupStackNavigator.Navigator>
            <StartupStackNavigator.Screen
                name='StartupLogin'
                component={StartupLogin}
                options={{
                    headerShown: false
                }}
            />
            <StartupStackNavigator.Screen
                name='Record'
                component={RecordScreen}
                options={{
                    headerShown: false
                }}
            />
            <StartupStackNavigator.Screen
                name='Menu'
                component={MenuNavigator}
                options={{
                    headerShown: false
                }}
            />

        </StartupStackNavigator.Navigator>

    )
};


// const MainNavigator = props => {
//     return (
//         <NavigationContainer>
//             <LoginNavigator />
//             {/* <MenuNavigator />  */}
//         </NavigationContainer>
//     );
// };

// export default MainNavigator;