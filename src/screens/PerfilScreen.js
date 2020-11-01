import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Linking from 'expo-linking';
import { Gravatar } from 'react-native-gravatar';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import HeaderButton from '../components/UI/HeaderButton';
import DefaultTitle from '../components/DefaultTitle';
import Card from '../components/UI/Card';

import { AntDesign } from '@expo/vector-icons'; 

const PerfilScreen = (props) => {

	// const user 
	const evaluation = true;

	const logout = () => {
		Alert.alert("Logout", "Você saiu do Viva sem Tabaco.")
  };
  
  const options = { email: 'luciananssantana@gmail.com', secure: true };

	return (
		<ScrollView style={styles.background}>
			<View style={styles.container}>
				<Gravatar options={options} style={styles.avatar} />

				<DefaultText style={styles.nickname}>Luciana Nascimento</DefaultText>
				<DefaultText style={styles.email}>luciananssantana@gmail.com</DefaultText>

        <TouchableOpacity onPress={logout} style={{marginTop: 25}}>
          <AntDesign name="logout" size={40} color={Colors.errorColor} />
				</TouchableOpacity>

        {/* Caso a pessoa não tenha plano preenchido: */}
				{!evaluation && (
					<View style={styles.containerEval}>
						<DefaultText style={styles.createPlanText}>Você ainda não preencheu seu plano para diminuir o consumo!</DefaultText>
						<TouchableOpacity
							onPress={() =>
								Linking.openURL(
									`http://www.vivasemtabaco.com.br/wati/programa.xhtml`
								)
							}
							style={styles.button}
						>
							<DefaultText style={styles.buttonText}>Criar plano</DefaultText>
						</TouchableOpacity>
						
					</View>
				)}

        {/* Caso a pessoa tenha plano preenchido: */}
				{evaluation && (
					<Card style={styles.plano}>
						<DefaultTitle style={styles.tituloPlano}>Seu plano de parada</DefaultTitle>

						<DefaultText style={styles.labelPlano}>Data de parada:</DefaultText>
						<DefaultText style={styles.textoPlano}>2020-10-15</DefaultText>

						<DefaultText style={styles.labelPlano}>Técnicas para a fissura:</DefaultText>
						<DefaultText style={styles.textoPlano}>Fazer exercício de relaxamento em áudio mp3.</DefaultText>
            <TouchableOpacity activeOpacity={0.4} onPress={() => Linking.openURL('http://vivasemtabaco.com.br/wati/download/surfandoafissura.mp3')}>
                <DefaultText style={{color: Colors.primaryColor, fontSize: 12, paddingBottom: 10}}>DOWNLOAD</DefaultText>
              </TouchableOpacity>
						<DefaultText style={styles.textoPlano}>Beber um copo de água pausadamente.</DefaultText>
						<DefaultText style={styles.textoPlano}>Comer alimentos com baixa quantidade de calorias como frutas cristalizadas (uva passas), balas dietéticas e chicletes dietéticos.</DefaultText>
						<DefaultText style={styles.textoPlano}>Ler um cartão com suas razões para ter parado de fumar.</DefaultText>

						<DefaultText style={styles.labelPlano}>Estratégias para resistir ao cigarro:</DefaultText>
						<DefaultText style={styles.textoPlano}>Comer cenouras e beber água.</DefaultText>
					</Card>
				)}

				{/* <TouchableOpacity onPress={toggleConsultant} style={{...styles.button, width: null}}>
					<DefaultText style={styles.buttonText}>Alternar tipo de usuário</DefaultText>
				</TouchableOpacity> */}
			</View>
		</ScrollView>
	);
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Perfil',
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
	container: {
		flex: 1,
    alignItems: 'center',
	},
	containerEval: {
		alignItems: 'center',
		paddingTop: 25,
		paddingHorizontal: 20,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginTop: 30,
	},
	nickname: {
		marginTop: 30,
		fontSize: 25,
		fontWeight: 'bold',
	},
	email: {
		fontSize: 20,
		paddingHorizontal: 5,
	},
	createPlanText: {
		paddingHorizontal: 5,
	},
	button: {
		width: Dimensions.get('window').width * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
		padding: 10,
		backgroundColor: Colors.primaryColor,
		borderRadius: 5,
		elevation: 3,
	},
	buttonText: {
		fontSize: 20,
		color: 'white',
		// textAlign: 'center'
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	plano: {
		marginVertical: 25,
		padding: 20,
	},
	tituloPlano: {
		color: Colors.primaryColor,
		marginBottom: 5,
	},
	labelPlano: {
		fontFamily: 'open-sans-bold',
		textAlign: 'left',
		fontSize: 15,
	},
	textoPlano: {
		textAlign: 'justify',
		fontSize: 15,
		paddingBottom: 10,
	},
});

export default PerfilScreen;