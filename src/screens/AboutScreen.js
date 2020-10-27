import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import Card from '../components/UI/Card';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const AboutScreen = props => {
    return (
        <View style={styles.centered}>
          <View>
            <DefaultText style={styles.title}>VIVA SEM TABACO</DefaultText>
          </View>
          <Card style={{height: 300}}>
              
          </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
      color: Colors.primaryColor,
      fontSize: 30
    }
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