import React from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultText from './DefaultText';
import Traducao from '../components/Traducao/Traducao';

const OfflineWarning = props => {
    return props.show ? <DefaultText style={styles.offline}>{Traducao.t('withoutConnection')}</DefaultText> : <View></View>
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