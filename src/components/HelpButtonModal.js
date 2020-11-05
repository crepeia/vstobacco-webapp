import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';


import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';

const HelpButtonModal = props => {
    const [modalVisible, setModalVisible] = useState(false)

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    
    return (
    
        <View style={styles.toggleContainer}>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                hideModalContentWhileAnimating={true}
                deviceWidth={deviceWidth}
                deviceHeight={deviceHeight}
                backdropOpacity={0.5}
                animationIn='lightSpeedIn'
                animationOut='lightSpeedOut'
                animationInTiming={500}
                animationOutTiming={400}
                backdropTransitionInTiming={400}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modaltoggleContainer}>

                            <DefaultText style={styles.title}>{props.title}</DefaultText>
                           
                            <TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(false)}>
                                <Ionicons
                                    name='md-close'
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.helpInfo}>
                            {props.children}
                        </View>
                    </View>
                </View>
            </Modal>
            
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={() => setModalVisible(true)}>
                {!props.showLink ?
                    <MaterialIcons 
                        style={styles.helpIcon} 
                        name="help" 
                        size={24} 
                        color={Colors.primaryColor} 
                    />
                    :
                    <DefaultText style={{color:Colors.primaryColor, textDecorationLine: 'underline'}}>
                        Saiba mais
                    </DefaultText>
                }
            </TouchableOpacity>

        </View>
    )
    
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 25,
        color:Colors.primaryColor
    },
    modaltoggleContainer:
    {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 5,
        marginBottom:15
    },
    modalContainer:
    {
        borderRadius: 15,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        minHeight: Dimensions.get('window').height * 0.5,
        paddingBottom: 20,
        paddingHorizontal:15
    },
    helpInfo: {
        justifyContent: 'space-around',
    }
});

export default HelpButtonModal;



