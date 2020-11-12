import React from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultText from './DefaultText';

const OfflineWarning = props => {
    return props.show ? <DefaultText style={styles.offline}>{'Conecte-se à internet para sincronizar seus dados'}</DefaultText> : <View></View>
}


const styles = StyleSheet.create({
    offline: {
		paddingVertical: 2,
		paddingHorizontal: 10,
        backgroundColor: '#fcbb5b',
        opacity: 0.5,
        width: '100%',
		textAlign: 'center'
    }
});

export default OfflineWarning;