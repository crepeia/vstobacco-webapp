import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

//redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppNavigator from './src/navigation/AppNavigator';

//Reducers
import tipsReducer from "./src/store/reducers/tips";
import challengesReducer from "./src/store/reducers/challenge";
import userReducer from "./src/store/reducers/user";


import { LOGOUT } from "./src/store/actions/user";

enableScreens();

const fetchFonts = () => {
	return Font.loadAsync({
		"montserrat": require("./assets/fonts/Montserrat-Regular.ttf"),
		"montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

const appReducer = combineReducers({
	user: userReducer,
	tips: tipsReducer,
	challenges: challengesReducer,
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT) {
		// for all keys defined in your persistConfig(s)
		//AsyncStorage.removeItem('persist:root')
		// storage.removeItem('persist:otherKey')

		state = undefined;
	}
	return appReducer(state, action);
};

const store = createStore(
	rootReducer,
	// compose(applyMiddleware(ReduxThunk), offline(newConfig), Reactotron.createEnhancer())
);

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
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		);
  }
}

