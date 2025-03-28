import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, Modal } from "react-native";
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
    const [modalVisible, setModalVisible] = useState(false);
    const [storyToDelete, setStoryToDelete] = useState(null);

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

    const handleLongPress = (story) => {
        setStoryToDelete(story);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setStoryToDelete(null);
        setModalVisible(false);
    };

    const deleteStory = async () => {
        if (!storyToDelete) return;
    
        try {
            const storedStories = await AsyncStorage.getItem("stories");
            if (storedStories) {
                const parsedStories = JSON.parse(storedStories);
                const updatedStories = parsedStories.filter(story => story.id !== storyToDelete.id);
    
                await AsyncStorage.setItem("stories", JSON.stringify(updatedStories));
                setStories(updatedStories);
            }
        } catch (error) {
            console.error("Error deleting story:", error);
        }
    
        handleModalClose();
    };    

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
                                                onLongPress={() => handleLongPress(story)}
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

                <Modal 
                    visible={modalVisible} 
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleModalClose}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete</Text>
                            <Text style={styles.modalText}>Are you sure you want to delete {storyToDelete?.title} ?</Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={deleteStory}>
                                <Text style={styles.modalResetText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn} onPress={handleModalClose}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
    },

    modalContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },

    modalContent: {
        width: '80%',
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderRadius: 12,
        alignItems: 'center'
    },

    modalTitle: { 
        color: '#000', 
        fontSize: 17, 
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 3,
        marginTop: 15
    },
    
    modalText: { 
        color: '#000', 
        fontSize: 13, 
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'center',
        width: '85%',
        marginBottom: 16
    },
    
    modalBtn: { 
        width: '100%',
        paddingVertical: 11, 
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0.3,
        borderColor: '#3c3c3c' 
    },
    
    modalResetText: { 
        color: '#ff3b30', 
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22
    },

    modalCloseText: {
        color: '#000', 
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22 
    }

});

export default MyStories;