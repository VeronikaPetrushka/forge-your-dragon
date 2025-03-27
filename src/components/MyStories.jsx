import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const MyStories = () => {
    const navigation = useNavigation();
    const [stories, setStories] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchStories();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            fetchStories();
        }, [stories])
    );

    const fetchStories = async () => {
        try {
            const storedStories = await AsyncStorage.getItem("stories");

            if (storedStories) {
                const parsedStories = JSON.parse(storedStories);
                const sortedStories = parsedStories.sort((a, b) => new Date(b.date) - new Date(a.date));

                setStories(sortedStories);
            }
        } catch (error) {
            console.error("Error retrieving stories:", error);
        }
    };

    const groupedStories = stories.reduce((acc, story) => {
        const formattedDate = formatDate(story.date);
        if (!acc[formattedDate]) {
            acc[formattedDate] = [];
        }
        acc[formattedDate].push(story);
        return acc;
    }, {});

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

                {
                    stories.length > 0 && (
                        <ScrollView style={{ width: '100%' }}>
                            {Object.entries(groupedStories).map(([date, stories]) => (
                                <View key={date} style={{ marginBottom: 20 }}>
                                    <Text style={styles.date}>{date}</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {stories.map((story, index) => (
                                            <TouchableOpacity 
                                                key={index} 
                                                style={styles.storyBtn}
                                                onPress={() => navigation.navigate('StoryDetailsScreen', { story })}
                                            >
                                                <Text style={styles.storyBtnText}>{story.title}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            ))}
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

    date: {
        color: '#fff', 
        fontSize: 14, 
        fontWeight: '500',
        marginBottom: 16
    },

    storyBtn: {
        padding: 8,
        backgroundColor: '#b0261a',
        margin: 2
    },

    storyBtnText: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
    }


});

export default MyStories;