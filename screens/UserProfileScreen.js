import { StyleSheet, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Экран входа
// В props принимает объект навигации, который неявно передается от родительского компонента Stack
const UserProfileScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <View style={styles.Container}>
            <img className="Avatar" src={auth?.currentUser?.photoURL } />
            <p> {auth?.currentUser?.email}</p>
            <p> {auth?.currentUser?.displayName}</p>
        </View>
    </View>
  );
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
});