import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import ChatListItem from '../components/ChatListItem';
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { useEffect } from 'react';

const SearchScreen = ({navigation}) => {
    const [input, setInput] = useState('');
    const [chats, setChats] = useState([]);

    const findChat = (substr) => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""), where("chatName", '>=', substr), where("chatName", '<=', substr + '\uf8ff'));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                chats.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setChats(chats);
        });
        return unsubscribe;
    }

    useLayoutEffect(() => {
            findChat("");
            navigation.setOptions({
                title: "Find chat",
                // Только iOS
                headerBackTitle: "Chats",

            })
        }, [navigation]);

    const enterChat = (id, chatName) => {
            navigation.navigate("Chat", {id, chatName,})
    }

      return (
        <SafeAreaView>
            <View style={styles.container}>
                <Input placeholder='Enter a chat name to find' value={input}
                    onChangeText={(text) => {
                        setInput(text);
                        findChat(text);
                    }}
                    leftIcon={
                        <Icon name="wechat" type="antdesign" size={24} color="black"/>
                    }
                />
            </View>
            <ScrollView style={styles.container}>
                {chats.map( ({id, data: { chatName }}) => (
                    <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


export default SearchScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
    }
})

