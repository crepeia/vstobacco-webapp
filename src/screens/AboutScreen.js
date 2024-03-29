import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import Card from '../components/UI/Card';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import Traducao from '../components/Traducao/Traducao';

const AboutScreen = props => {
  return (
    <View style={styles.background}>
      <View style={styles.containerTitle}>
        <DefaultText style={styles.title}>Viva sem Tabaco</DefaultText>
      </View>
      <Card style={styles.card}>
        <DefaultText style={styles.text}>{Traducao.t('about')}</DefaultText>
        <DefaultText style={styles.text}>{Traducao.t('codeOfEthics')}</DefaultText>
        <TouchableOpacity activeOpacity={0.4} onPress={() => Linking.openURL('http://www.vivasemtabaco.com.br/wati/index.xhtml')}>
          <DefaultText style={{ ...styles.text, ...styles.textBold, fontSize: 16 }}>{Traducao.t('visitWebsite')}</DefaultText>
        </TouchableOpacity>
        <DefaultText style={styles.text}>{Traducao.t('contentBasement')}</DefaultText>
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
    headerTitle: Traducao.t('aboutScreen'),
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