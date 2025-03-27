import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Linking, Switch, Share, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useMusic } from '../constants/music';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Settings = () => {
    const navigation = useNavigation();
    const { isPlaying, togglePlay } = useMusic();
    const [notifications, setNotifications] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleNotifications = () => {
        setNotifications((prev) => !prev);
    };

    const shareApp = async () => {
        try {
            const result = await Share.share({
                title: "Check out 'Forge Your Dragon' app!",
                message: "Hey! I found this amazing app. Download now!",
                url: "https://yourappdownloadlink.com", // change
            });
    
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared via", result.activityType);
                } else {
                    console.log("App link shared successfully");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share action dismissed");
            }
        } catch (error) {
            console.error("Error sharing app link:", error.message);
        }
    };

    // change
    const seeTerms = () => {
        Linking.openURL('https://yourwebsite.com/privacy-policy').catch((err) =>
            Alert.alert("Error", "Unable to open Privacy Policy")
        );
    };

    const resetData = async () => {
        try {
            await AsyncStorage.removeItem('dragons');
            await AsyncStorage.removeItem('stories');
            Alert.alert("Success", "Entire data has been reset.");
        } catch (error) {
            console.error("Failed to reset data", error);
            Alert.alert("Error", "Failed to reset data.");
        }
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, left: 24, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => navigation.goBack('')}
                    >
                    <View style={{width: 18, height: 24, marginRight: 10}}>
                        <Icons type={'back'} />
                    </View>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>SETTINGS</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DragonGameScreen')}>
                    <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                    <View style={styles.buttonInner}>
                        <Text style={styles.buttonText}>Background music</Text>
                        <Switch value={isPlaying} onValueChange={togglePlay} thumbColor="#fff" trackColor={{ false: "#78880", true: "#1a0100" }} />
                    </View>
                </TouchableOpacity>     

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DragonGameScreen')}>
                    <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                    <View style={styles.buttonInner}>
                        <Text style={styles.buttonText}>Notifications</Text>
                        <Switch value={notifications} onValueChange={toggleNotifications} thumbColor="#fff" trackColor={{ false: "#78880", true: "#1a0100" }} />
                    </View>
                </TouchableOpacity>     

                <TouchableOpacity style={styles.button} onPress={shareApp}>
                    <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                    <View style={[styles.buttonInner, {paddingVertical: 14}]}>
                        <Text style={styles.buttonText}>Share the app</Text>
                        <View style={{width: 24, height: 24}}>
                            <Icons type={'share'} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                    <View style={[styles.buttonInner, {paddingVertical: 14}]}>
                        <Text style={styles.buttonText}>Reset all data</Text>
                        <View style={{width: 24, height: 24}}>
                            <Icons type={'reset'} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={seeTerms}>
                    <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                    <View style={[styles.buttonInner, {paddingVertical: 16.5}]}>
                        <Text style={styles.buttonText}>Terms of use</Text>
                    </View>
                </TouchableOpacity>

                <Modal 
                    visible={modalVisible} 
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Reset Data</Text>
                            <Text style={styles.modalText}>Are you sure you want to erase your entire progress ?</Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={resetData}>
                                <Text style={styles.modalResetText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
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
        marginBottom: 32
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
        paddingVertical: 10.5
    },

    buttonText: {
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

export default Settings;