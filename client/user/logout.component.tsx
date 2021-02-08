import React from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser } from '../store/actions';
import { Button, Text, View, Platform } from 'react-native';
import style from '../global-styles';
import styles from '../global-styles';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

// Function Component
interface LogoutProp {
	navigation: any;
}

function LogoutComponent({ navigation }: LogoutProp) {
	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	function submitForm() {
		userService.logout().then((user) => {
			console.log(`user: ${user}`);
			navigation.navigate('Login');
		});
		user.username = '';
		user.password = '';
		user.role = '';
		user.credits = 0;
		user.playlist = undefined;
		user.favorites = undefined;
		console.log('Logged out');
		dispatch(getUser(user));
	}

	function stayLoggedIn() {
		navigation.navigate('Home');
	}

	return (
		<View style={style.container}>
			<Text style={styles.label}>Are you sure you want to log out?</Text>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
				}}
			>
				<Button onPress={submitForm} title="Logout" />
			</View>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
					marginTop: 0,
				}}
			>
				<Button onPress={stayLoggedIn} title="Cancel" />
			</View>
		</View>
	);
}

export default LogoutComponent;
