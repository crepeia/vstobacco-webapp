import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import MainNavigator from './src/navigation/MainNavigator';

const fetchFonts = () => {
	return Font.loadAsync({
		"montserrat": require("./assets/fonts/Montserrat-Regular.ttf"),
		"montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
	return (
		<AppLoading 
			startAsync={fetchFonts} 
			onFinish={() => setFontLoaded(true)} 
			onError={err => console.log(err)}
		/>
	)
  } else {
		return (
			<MainNavigator />
		);
  }
}

