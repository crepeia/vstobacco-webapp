import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { FontAwesome } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import HeaderButton from '../components/UI/HeaderButton';
import Card from '../components/UI/Card';
import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors';

const LifeAndMoneyScreen = props => {
    return (
        <View style={styles.background}>
          <View style={styles.containerTitle}>
            <DefaultText style={styles.title}>Suas conquistas</DefaultText>
          </View>
          <Card style={styles.conquistaContainer}>
            <DefaultText style={styles.conquistaTitle}>Cigarros não fumados</DefaultText>
            <DefaultText style={styles.conquistaTxt}>1400</DefaultText>
            <SimpleLineIcons name="emotsmile" size={24} color={Colors.primaryColor} />
          </Card>
          <Card style={styles.conquistaContainer}>
            <DefaultText style={styles.conquistaTitle}>Tempo de vida salvo</DefaultText>
            <DefaultText style={styles.conquistaTxt} numberOfLines={2}>0 meses, 3 dias, 16 horas e 44 minutos</DefaultText>
            <FontAwesome name="heartbeat" size={24} color={Colors.primaryColor} />
          </Card>
          <Card style={styles.conquistaContainer}>
            <DefaultText style={styles.conquistaTitle}>Dinheiro economizado</DefaultText>
            <DefaultText style={styles.conquistaTxt}>R$479.09</DefaultText>
            <MaterialIcons name="attach-money" size={24} color={Colors.primaryColor} />
          </Card>
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
    conquistaContainer: {
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      padding: 10
    },
    conquistaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.primaryColor
    },
    conquistaTxt: {
      fontSize: 16,
      marginVertical: 10,
      textAlign: "center"
    }
});

export const screenOptions = navData => {
    return {
      headerTitle: 'Conquistas',
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

export default LifeAndMoneyScreen;