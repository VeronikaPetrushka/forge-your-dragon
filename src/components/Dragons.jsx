import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Dragons = () => {
    const navigation = useNavigation();
    const [dragons, setDragons] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchDragons();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchDragons();
        }, [dragons])
    );

    const fetchDragons = async () => {
        try {
            const storedDragons = await AsyncStorage.getItem("dragons");
            if (storedDragons) {
                setDragons(JSON.parse(storedDragons));
            }
        } catch (error) {
            console.error("Error retrieving dragons:", error);
        }
    };

    console.log(dragons)

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

                <Text style={styles.title}>FORGE YOUR DRAGON</Text>

                <Text style={styles.text}>Shape the legend of your dragon! Fill in the details or let fate decide!</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateDragonScreen')}>
                    <Image source={require('../assets/buttons/start.png')} style={styles.image} />
                </TouchableOpacity>

                {
                    dragons.length > 0 && (
                        <ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            {
                                dragons.map((dragon, index) => (
                                    <TouchableOpacity 
                                        key={index} 
                                        style={{width: '47%', alignItems: 'center', marginBottom: 24}}
                                        onPress={() => navigation.navigate('DragonDetailsScreen', { dragon })}
                                        >
                                        <Image source={typeof dragon.image === 'string' ? { uri: dragon.image } : dragon.image} style={{width: '100%', height: 205, resizeMode: 'cover', marginBottom: 7}} />
                                        <Text style={styles.name}>{dragon.name}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{height: 200}} />
                        </ScrollView>
                    )
                }

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
    },

    name: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '500',
    }

});

export default Dragons;