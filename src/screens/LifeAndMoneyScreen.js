import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

import { useSelector } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import Card from '../components/UI/Card';
import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';

const LifeAndMoneyScreen = props => {

	const cigarsNotSmoken = useSelector(state => state.achievement.cigarsNotSmoken);
	const lifeTimeSaved = useSelector(state => state.achievement.lifeTimeSaved);
	const moneySaved = useSelector(state => state.achievement.moneySaved);

	const mes = lifeTimeSaved > 43800 ? Math.floor(lifeTimeSaved / 43800) : 0;
	const mesPercent = mes >= 1 ? lifeTimeSaved % 43800 : lifeTimeSaved;

	const dia = mesPercent > 1440 ? Math.floor(mesPercent / 1440) : 0;
	const diaPercent = dia >= 1 ? mesPercent % 1440 : mesPercent;

	const hora = diaPercent > 60 ? Math.floor(diaPercent / 60) : 0;
	const horaPercent = hora >= 1 ? diaPercent % 60 : diaPercent; //minutos

	const lifeTimeSavedText = `${mes === 1 ? `${mes} ${Traducao.t('months')}` : `${mes} ${Traducao.t('month')}`}, ${dia === 1 ? `${dia} ${Traducao.t('day')}` : `${dia} ${Traducao.t('days')}`}, ${hora === 1 ? `${hora} ${Traducao.t('hour')}` : `${hora} ${Traducao.t('hours')}`} e ${horaPercent === 1 ? `${horaPercent} ${Traducao.t('minute')}` : `${horaPercent} ${Traducao.t('minutes')}`}`;

	//EM MÉDIA :	
	//1 hora = 60 minutos
	//1 dia = 24h = 1440 minutos
	//1 mês = 30.4166667 dias = 730h = 43800 minutos

    return (
        <View style={styles.background}>
			<View style={styles.containerTitle}>
				<DefaultText style={styles.title}>{Traducao.t('yourConquests')}</DefaultText>
			</View>
			<Card style={styles.conquistaContainer}>
				<DefaultText style={styles.conquistaTitle}>{Traducao.t('nonSmokedCigarettes')}</DefaultText>
				<DefaultText style={styles.conquistaTxt}>{cigarsNotSmoken}</DefaultText>
				<SimpleLineIcons name="emotsmile" size={24} color='#fca311' />
			</Card>
			{/* '0 meses, 3 dias, 16 horas e 44 minutos' */}
			<Card style={styles.conquistaContainer}>
				<DefaultText style={styles.conquistaTitle}>{Traducao.t('lifetimeSaved')}</DefaultText>
				<DefaultText style={styles.conquistaTxt} numberOfLines={2}>{lifeTimeSavedText}</DefaultText>
				<FontAwesome name="heartbeat" size={24} color='#BF0603' />
			</Card>
			<Card style={styles.conquistaContainer}>
				<DefaultText style={styles.conquistaTitle}>{Traducao.t('moneySaved')}</DefaultText>
				<DefaultText style={styles.conquistaTxt}>R${moneySaved.toFixed(2)}</DefaultText>
				<MaterialIcons name="attach-money" size={24} color='#40916C' />
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
		marginBottom: 10,
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
      headerTitle: Traducao.t('lifeAndMoneyScreen'),
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