import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { enableScreens } from 'react-native-screens';

import AppNavigator from './src/navigation/AppNavigator';

//redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

//Redux-Offline
// import { offline } from "@redux-offline/redux-offline";
// import offlineConfig from "@redux-offline/redux-offldefaultsine/lib/";

//Reducers
import tipsReducer from "./src/store/reducers/tips";
import challengesReducer from "./src/store/reducers/challenge";
import userReducer from "./src/store/reducers/user";
import evaluationReducer from "./src/store/reducers/evaluation";
import recordReducer from './src/store/reducers/record';
import achievementReducer from './src/store/reducers/achievement';
import optionsReducer from './src/store/reducers/options';


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
	evaluation: evaluationReducer,
	record: recordReducer,
	achievement: achievementReducer,
	options: optionsReducer,
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
	compose(applyMiddleware(ReduxThunk))
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

