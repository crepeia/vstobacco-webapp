import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../constants/Colors';

const SignUpScreen = props => {
    return (
        <View style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text>SignUp Screen</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignUpScreen;