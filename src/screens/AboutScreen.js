import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import Card from '../components/UI/Card';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const AboutScreen = props => {
    return (
        <View style={styles.background}>
          <View style={styles.containerTitle}>
            <DefaultText style={styles.title}>Viva sem Tabaco</DefaultText>
          </View>
          <Card style={styles.card}>
              <DefaultText style={styles.text}>Programa gratuito feito por especialistas em tabagismo, fumantes e ex-fumantes.</DefaultText>
              <DefaultText style={styles.text}>O Viva sem Tabaco cumpre o Código de Ética da Health on the Net Foundation.</DefaultText>
              <DefaultText style={{...styles.text, ...styles.textBold, fontSize: 16}}>Visite o site clicando aqui</DefaultText>
              <DefaultText style={styles.text}>Todo o conteúdo foi criado a partir de pesquisas científicas e protocolos para o tratamento do tabagismo do Ministério da Saúde e do Instituto Nacional do Câncer - INCA.</DefaultText>
          </Card>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={require('../../assets/images/logo_sobre.png')} />
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerTitle: {
      marginVertical: 20
    },
    title: {
      color: Colors.primaryColor,
      fontSize: 22,
      fontWeight: "bold"
    },
    card: {
      height: 300,
      padding: 16
    },
    text: {
      textAlign: 'center',
      fontSize: 14,
      marginTop: 10
    },
    textBold: {
      fontWeight: 'bold',
      color: Colors.primaryColor
    },
    logoContainer: {
      alignItems: 'center',
      marginVertical: 15
    },
    logoImg: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.5,
        resizeMode: 'contain'
    },
});

export const screenOptions = navData => {
    return {
      headerTitle: 'Sobre',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title='Menu'
            iconName={'md-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    }
};

export default AboutScreen;