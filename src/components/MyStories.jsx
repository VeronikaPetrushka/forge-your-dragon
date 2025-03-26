import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const MyStories = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, left: 24, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => navigation.navigate('MainScreen')}
                    >
                    <View style={{width: 18, height: 24, marginRight: 10}}>
                        <Icons type={'back'} />
                    </View>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>MY DRAGON STORIES</Text>

                <Text style={styles.text}>Write epic tales featuring your dragons, filled with adventure, mystery, and legendary battles!</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateStoryScreen')}>
                    <Image source={require('../assets/buttons/create.png')} style={styles.image} />
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 24,
        paddingTop: height * 0.12
    },

    backButtonText: {
        color: '#ff6700', 
        fontSize: 17, 
        fontWeight: '400',
        lineHeight: 22,
    },

    title: {
        color: '#fff', 
        fontSize: 22, 
        fontWeight: '500',
        marginBottom: 24
    },

    text: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
        marginBottom: 24
    },

    button: {
        width: '100%',
        height: 53,
        marginBottom: height * 0.065,
        zIndex: 10
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }

});

export default MyStories;