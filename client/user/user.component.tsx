import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeSong, changeUser } from '../store/actions';
import { UserState } from '../store/store';
import { thunkGetSongs, thunkGetUsers } from '../store/thunks';
import { User } from './user';
import userService from './user.service';

interface UserProps {
    data: User;
}

function UserComponent({data}: UserProps){
    const nav = useNavigation();

	//const userContext = useSelector((state: UserState) => state.users);
	const dispatch = useDispatch();

	const goToUser = () => {
		nav.navigate('UserDetails', {
			username: data.username,
            role: data.role,
            playlist: data.playlist,
            favorites: data.favorites,
            bought: data.bought,
            credits: data.credits
		});
	};

    function handleDelete() {
		if (data.username) {
			userService.deleteByUsername(data.username).then(() => {
				dispatch(changeUser(new User()));
				dispatch(thunkGetUsers());
				nav.navigate('Home');
			});
		}
	}

    return (
        <View >
            <Text>User: {data.username} Role: {data.role} Credits: {data.credits} Favorites: {data.favorites} </Text> 
            <Button title='User Details' onPress={goToUser} />
            <Button title='Delete User' onPress={handleDelete} />
        </View>
    );
}

export default UserComponent;