import React from 'react';
import 
{ 
    View,
    StyleSheet, 
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback
} from 'react-native';

import DefaultText from './DefaultText';

const HourContainer = props =>
{
    let ButtonComponent = TouchableOpacity;

    // Só a versão 21 pra frente do android suporta o ripple effect
    // Com os arquivos do MainButton.android / ios , não precisaria mais de checar esse Platform dentro do if
    if(Platform.OS === 'android' && Platform.Version >= 21)
    {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        //Colocando essa View pra arrumar o toque no botão do Android, pro efeito respeitar o borderRadius do botão
        //Aí coloca nessa View a mesma borderRadius que você colocou no botão como estilo
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.button}>
					<DefaultText style={styles.buttonText}>{props.data}</DefaultText>
				</View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create
(
    {
        buttonContainer:
        {
            borderTopWidth: 1,
            borderColor: '#ccc',
            borderRadius: 30,
            overflow: 'hidden',
            marginHorizontal: 10,
            // O hidden fará com que qualquer componente filho que ultrapasse os limites desse componente (nesse caso
            // desse container), é basicamente "cortado" . Isso assegura que o efeito cascata do Android (que agora é
            // um componente filho desse container) será cortado e ficará entre as bordas do botão.
        },
        button:
        {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
        },
        buttonText:
        {
            fontSize: 20,
            letterSpacing: 3,
        },
    }
)

export default HourContainer;