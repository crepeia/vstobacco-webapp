import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors';

const HomeScreen = props => {
    return (
        <View style={styles.background}>
            <View style={styles.containerTitle}>
            <DefaultText style={styles.title}>Cigarros fumados na semana</DefaultText>
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
});

export const screenOptions = navData => {
    return {
      headerTitle: 'Home',
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

export default HomeScreen;