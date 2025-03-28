import React, { useState, useCallback } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, Modal } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Dragons = () => {
    const navigation = useNavigation();
    const [dragons, setDragons] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dragonToDelete, setDragonToDelete] = useState(null);

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

    const handleLongPress = (dragon) => {
        setDragonToDelete(dragon);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setDragonToDelete(null);
        setModalVisible(false);
    };

    const deleteDragon = async () => {
        if (!dragonToDelete) return;
    
        try {
            const storedDragons = await AsyncStorage.getItem("dragons");
            if (storedDragons) {
                const parsedDragons = JSON.parse(storedDragons);
                const updatedDragons = parsedDragons.filter(dragon => dragon.id !== dragonToDelete.id);
    
                await AsyncStorage.setItem("dragons", JSON.stringify(updatedDragons));
                setDragons(updatedDragons);
            }
        } catch (error) {
            console.error("Error deleting dragon:", error);
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
                                        onLongPress={() => handleLongPress(dragon)}
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

                <Modal 
                    visible={modalVisible} 
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleModalClose}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Delete</Text>
                            <Text style={styles.modalText}>Are you sure you want to delete dragon {dragonToDelete?.name} ?</Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={deleteDragon}>
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

    name: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '500',
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

export default Dragons;