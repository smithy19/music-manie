import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { changeUser, getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View, Alert } from 'react-native';
import style from '../global-styles';
import { User } from './user';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Function Component
interface LogoutProp {
	navigation: any;
}

function LogoutComponent({ navigation }: LogoutProp) {
	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	function submitForm() {
		// userService.login(user).then((user) => {
		// 	console.log(user);
		// 	/*
        //         When logged in, a new user with the same credentials is created. 
        //         That way, when we click the back to the home page, the previous user is no longer logged in.
        //     */
		// 	let newUser = new User();
		// 	newUser.username = user.username;
		// 	newUser.password = user.password;
		// 	newUser.role = user.role;
		// 	dispatch(getUser(newUser));
		// 	console.log(newUser);
		// 	navigation.navigate('Home'); //*
        // });
        userService.logout().then( (user) => {
            console.log(`user: ${user}`);
            navigation.navigate('Login')
		})
		user.username = '';
		user.password = '';
		user.role = '';
		user.credits = 0;
		user.userId = 0;
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
			<h1>Are you sure you want to log out?</h1>
			<Text></Text>
			<Button onPress={submitForm} title="Logout" />
			<br></br>
			<Button onPress={stayLoggedIn} title="Cancel"/>
		</View>
	);
}

export default LogoutComponent;