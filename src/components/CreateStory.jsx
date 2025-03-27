import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const tags = [
    '🏹 Epic Adventure',
    '🏛️ Ancient Legends',
    '⏳ Race Against Time',
    '💔 Tragic Love',
    '💡 Coming of Age',
    '🕊️ Sacrifice & Honor',
    '🕵️ Deception & Secrets'
];

const CreateStory = ({ story }) => {
    const navigation = useNavigation();
    const [dragons, setDragons] = useState([]);
    const [selectedDragon, setSelectedDragon] = useState(story?.selectedDragon || null);
    const [showDragons, setShowDragons] = useState(false);
    const [title, setTitle] = useState(story?.title || null);
    const [content, setContent] = useState(story?.content || null);
    const [selectedTags, setSelectedTags] = useState(story?.selectedTags || []);

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

    const toggleDragons = () => {
        setShowDragons((prev) => !prev);
    };

    const handleTagPress = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            } else if (prevTags.length < 2) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };

    const saveStory = async () => {
        try {
            const newStory = {
                id: story?.id || Date.now().toString(),
                title,
                content,
                selectedTags,
                selectedDragon,
                date: new Date()
            };

            for (const key in newStory) {
                if (!newStory[key]) {
                    console.error(`Field ${key} must be filled!`);
                    return;
                }
            }
    
            const storedStories = await AsyncStorage.getItem("stories");
            let stories = storedStories ? JSON.parse(storedStories) : [];
    
            if (story) {
                stories = stories.map(s => (s.id === story.id ? newStory : s));
            } else {
                stories.push(newStory);
            }
    
            await AsyncStorage.setItem("stories", JSON.stringify(stories));
    
            alert(story ? "Story updated successfully!" : "Story saved successfully!");

            navigation.navigate('MyStoriesScreen');

        } catch (error) {
            alert("Error saving story:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, left: 24}}
                    onPress={saveStory}
                    >
                    <Text style={styles.backButtonText}>SAVE</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, right: 24}}
                    onPress={() => navigation.goBack('')}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'cross'} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.title}>WRITE YOUR DRAGON TALE</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        dragons.length > 0 && (
                            <>
                                <Text style={styles.label}>🐉 Attach a Dragon</Text>
                                <TouchableOpacity style={styles.button} onPress={toggleDragons}>
                                    <Image source={require('../assets/buttons/input.png')} style={styles.image} />
                                    <View style={styles.buttonInner}>
                                        <Text style={styles.buttonText}>{selectedDragon?.name}</Text>
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'arrow'} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {
                                    showDragons && (
                                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                            {
                                                dragons.map((dragon, index) => (
                                                    <TouchableOpacity 
                                                        key={index} 
                                                        style={{width: '47%', alignItems: 'center', marginBottom: 24, ...(selectedDragon?.id === dragon.id ? { borderWidth: 4, borderColor: '#ff6700' } : {})}} 
                                                        onPress={() => setSelectedDragon(dragon)}
                                                        >
                                                        <Image source={typeof dragon.image === 'string' ? { uri: dragon.image } : dragon.image} style={{width: '100%', height: 205, resizeMode: 'cover', marginBottom: 7}} />
                                                        <Text style={styles.name}>{dragon.name}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    )
                                }
                            </>
                        )
                    }

                    <Text style={styles.label}>Story Title</Text>
                    <View style={styles.inputContainer}>
                        <Image source={require('../assets/buttons/input.png')} style={styles.image} />
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <Text style={styles.label}>Story Content</Text>
                    <TextInput
                        style={styles.contentInput}
                        value={content}
                        onChangeText={setContent}
                        multiline
                    />

                    <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            tags.map((tag, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[styles.tagBtn, selectedTags.includes(tag) && {backgroundColor: '#b0261a'}]}
                                    onPress={() => handleTagPress(tag)}
                                    >
                                    <Text style={styles.tagBtnText}>{tag}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                </ScrollView>

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
        paddingTop: height * 0.15
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

    name: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '500',
    },

    button: {
        width: '100%',
        height: 53,
        marginBottom: 24,
        zIndex: 10
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    buttonInner: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 14
    },

    buttonText: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
    },

    label: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '500',
        marginBottom: 7,
        alignSelf: 'flex-start'
    },

    inputContainer: {
        width: '100%',
        height: 53,
        zIndex: 10,
        marginBottom: 16
    },

    input: {
        width: '100%',
        paddingVertical: 16.5,
        paddingHorizontal: 30,
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
        position: 'absolute',
        top: 0,
        alignSelf: 'center'
    },

    contentInput: {
        width: '100%',
        minHeight: 244,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
        marginBottom: 22
    },

    tagBtn: {
        padding: 8,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        margin: 2
    },

    tagBtnText: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
    }

});

export default CreateStory;