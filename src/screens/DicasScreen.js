import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import TipCard from '../components/UI/TipCard';

const dicas = [
	{
		id: 1,
		title: 'Dica 1',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel ipsum eros. Fusce accumsan a purus quis fermentum. Vivamus porta lectus eu purus tempus malesuada a eu dolor. Mauris iaculis vitae magna sed convallis.'
	},
	{
		id: 2,
		title: 'Dica 2',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel ipsum eros. Fusce accumsan a purus quis fermentum. Vivamus porta lectus eu purus tempus malesuada a eu dolor. Mauris iaculis vitae magna sed convallis.'
	}
]

const DicasScreen = props => {

    return (
		<View style={styles.background}>
			<FlatList 
				data={dicas}
				keyExtractor={item => item.id.toString()}
				contentContainerStyle={{ flexGrow: 1, width: Dimensions.get('window').width }}
				renderItem={itemData => (
					<TipCard 
						title={itemData.item.title}
						description={itemData.item.description}
						onPressTip={() => {
							props.navigation.navigate('DicasDetalhe', { 
								title: itemData.item.title,
								description: itemData.item.description
							})
						}}
					/>
				)}
			/>
		</View>
    );
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export const screenOptions = navData => {
    return {
		headerTitle: 'Dicas',
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

export default DicasScreen;