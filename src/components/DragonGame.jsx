import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, TextInput, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import dragonGame from '../constants/dragonGame';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const DragonGame = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [teams, setTeams] = useState(['Team 1', 'Team 2']);
    const [started, setStarted] = useState(false);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctWordsState, setCorrectWordsState] = useState(new Array(dragonGame[selectedCategory]?.words.length).fill(false));
    const [correctWords, setCorrectWords] = useState([0, 0]);
    const [countdown, setCountdown] = useState(5);
    const [gameTimer, setGameTimer] = useState(60);
    const [paused, setPaused] = useState(false);
    const [roundStarted, setRoundStarted] = useState(false);
    const [nextWordAvailable, setNextWordAvailable] = useState(true);
    const [finished, setFinished] = useState(false);
    const [key, setKey] = useState(0);

    const currentTeam = teams[currentTeamIndex];

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    };

    useEffect(() => {
        setKey((prev) => prev + 1);
    }, [finished, started, roundStarted, paused, countdown]);

    useEffect(() => {
        if (started && countdown > 0) {
            const timer = setInterval(() => {
                if (!paused && countdown > 0) {
                    setCountdown(prev => prev - 1);
                } else if (countdown === 0 && !roundStarted) {
                    startRound();
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, paused, started, roundStarted]);

    useEffect(() => {
        if (roundStarted && gameTimer > 0 && !paused) {
            const timer = setInterval(() => {
                if (gameTimer > 0 && !paused) {
                    setGameTimer(prev => prev - 1);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [roundStarted, gameTimer, paused]); 

    useEffect(() => {
        if (countdown === 0 && !roundStarted) {
            startRound();
        }
    }, [countdown]);

    useEffect(() => {
        if (roundStarted && gameTimer === 0) {
            handleNextTeam();
        }
    }, [gameTimer, roundStarted]);

    const toggleCategory = (item) => {
        if(selectedCategory === item) {
            setSelectedCategory(null)
        } else {
            setSelectedCategory(item);
        }
    };

    const handleTeamChange = (index, value) => {
        const newTeams = [...teams];
        newTeams[index] = value;
        setTeams(newTeams);
    };

    const addTeam = () => {
        if (teams.length < 5) {
            setTeams([...teams, '']);
        }
    };

    const removeTeam = (index) => {
        const newTeams = teams.filter((_, idx) => idx !== index);
        setTeams(newTeams);
    };

    const startRound = () => {
        setRoundStarted(true);
        setGameTimer(60);
        setCountdown(0);
        setNextWordAvailable(true);
    };

    const handleCorrectWord = () => {
        const newCorrectWords = [...correctWords];
        newCorrectWords[currentTeamIndex]++;
        
        const newCorrectWordsState = [...correctWordsState];
        newCorrectWordsState[currentWordIndex] = true;
    
        setCorrectWords(newCorrectWords);
        setCorrectWordsState(newCorrectWordsState);
        setNextWordAvailable(true);
    };

    const handleNextWord = () => {
        if (currentWordIndex < selectedCategory.words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            handleNextTeam();
        }
    };

    const handleNextTeam = () => {
        if (currentTeamIndex < teams.length - 1) {
            setRoundStarted(false);
            setCurrentTeamIndex((prevIndex) => prevIndex + 1);
            setCurrentWordIndex(0);
            setGameTimer(60);
            setCorrectWordsState(new Array(dragonGame[selectedCategory]?.words.length).fill(false));
            setTimeout(() => {
                setRoundStarted(true);
            }, 2000);
        } else {
            setFinished(true)
        }
    };

    const winnerIndex = correctWords.indexOf(Math.max(...correctWords));

    const resetGame = () => {
        setKey((prev) => prev + 1);
        setStarted(false);
        setFinished(false);
        setCorrectWords([0, 0]);
        setCurrentTeamIndex(0);
        setCurrentWordIndex(0);
        setCountdown(5);
        setGameTimer(60);
        setTeams(['Team 1', 'Team 2']);
        setSelectedCategory(null);
        setRoundStarted(false);
        setModalVisible(false);  
        setPaused(false);
        setCorrectWordsState(new Array(dragonGame[selectedCategory]?.words.length).fill(false));
    };

    const handlePause = () => {
        setPaused(true);
        setModalVisible(true);
    };

    const handleResume = () => {
        setPaused(false);
        setModalVisible(false);  
    }

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                {
                    (!started && !finished) && (
                        <TouchableOpacity 
                            style={{position: 'absolute', top: height * 0.07, left: 24, flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => navigation.navigate('MainScreen')}
                            >
                            <View style={{width: 18, height: 24, marginRight: 10}}>
                                <Icons type={'back'} />
                            </View>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    )
                }

                {
                    (started && !finished) && (
                        <TouchableOpacity 
                            style={{position: 'absolute', top: height * 0.07, right: 24}}
                            onPress={handlePause}
                            >
                            <View style={{width: 32, height: 32}}>
                                <Icons type={'pause'} />
                            </View>
                        </TouchableOpacity>    
                    )
                }

                {
                    (!started && !finished) && (
                        <View style={{width: '100%', flexGrow: 1, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <Text style={[styles.title, {marginRight: 24}]}>🐉 DRAGON CHARADES</Text>
                                <TouchableOpacity style={{width: 32, height: 32}} onPress={() => navigation.navigate('RulesScreen')}>
                                    <Icons type={'rules'} />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.text}>A thrilling word-guessing game for dragon enthusiasts! Compete with friends in a battle of wits and speed</Text>

                            <Text style={styles.label}>Choose a Category</Text>
                            {
                                dragonGame.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.button} onPress={() => toggleCategory(item)}>
                                        <Image source={selectedCategory === item ? require('../assets/buttons/red.png') : require('../assets/buttons/grey.png')} style={styles.image} />
                                        <View style={styles.buttonInner}>
                                            <Text style={styles.buttonText}>{item.category}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }

                            <View style={{width: '100%', marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={[styles.label, {marginBottom: 0}]}>Team Names</Text>
                                <TouchableOpacity style={{width: 32, height: 32}} onPress={addTeam}>
                                    <Icons type={'plus'} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={{width: '100%'}}>
                                {teams.map((team, index) => (
                                    <View key={index} style={[styles.inputContainer, index >= 2 && {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                                        <Image source={require('../assets/buttons/input.png')} style={[styles.image, index >= 2 && {width: '85%'}]} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder={`Team ${index + 1}`}
                                            placeholderTextColor='#fff'
                                            value={team}
                                            onChangeText={(text) => handleTeamChange(index, text)}
                                        />
                                        {index >= 2 && (
                                            <TouchableOpacity onPress={() => removeTeam(index)} style={{ width: 32, height: 32 }}>
                                                <Icons type={'minus'} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </ScrollView>   

                            <TouchableOpacity 
                                style={[styles.button, {marginTop: 12}]} 
                                onPress={() => setStarted(true)}
                                disabled={!selectedCategory || !teams}
                                >
                                <Image source={(selectedCategory && teams) ? require('../assets/buttons/start-red.png') : require('../assets/buttons/start-grey.png')} style={styles.image} />
                            </TouchableOpacity>      
                        </View>
                    )
                }

                {(started && countdown > 0 && !finished) && (
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                        <Text style={[styles.gameText, {marginBottom: 24}]}>{currentTeam.toUpperCase()}</Text>
                        <Text style={[styles.gameText, {fontSize: 24, marginBottom: 36}]}>ARE YOU READY ?</Text>
                        <Text style={styles.gameText}>{formatTime(countdown)}</Text>
                    </View>
                )}

                {(countdown === 0 && !roundStarted && !finished && started) && (
                    <Text style={[styles.gameText, {marginVertical: 'auto', fontSize: 24}]}>ARE YOU READY, {currentTeam.toUpperCase()} ?</Text>
                )}

                {(roundStarted && !finished && started) && (
                    <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                        <Text style={[styles.gameText, {marginBottom: 20}]}>{formatTime(gameTimer)}</Text>
                        <View style={{width: 345, height: 321, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', marginVertical: height * 0.08}}>
                            <Text style={styles.word}>{selectedCategory.words[currentWordIndex]}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleCorrectWord}>
                            <Image source={correctWordsState[currentWordIndex] ? require('../assets/buttons/green.png') : require('../assets/buttons/grey.png')} style={styles.image} />
                            <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>{correctWordsState[currentWordIndex] ? 'Correct guess!' : 'Wrong guess!'}</Text>
                            </View>
                        </TouchableOpacity>

                        {nextWordAvailable && (
                            <TouchableOpacity style={styles.button} onPress={handleNextWord}>
                            <Image source={require('../assets/buttons/input.png')} style={styles.image} />
                            <View style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Next word</Text>
                            </View>
                        </TouchableOpacity>
                        )}
                    </View>
                )}

                {
                    finished && (
                        <View style={{width: '100%', alignItems: 'center', flexGrow: 1}}>
                            <Text style={[styles.gameText, {marginBottom: 24, fontSize: 26}]}>🏆 WINNER</Text>
                            <Text style={[styles.gameText, {marginBottom: 50, fontSize: 24}]}>{teams[winnerIndex].toUpperCase()}</Text>
                            {teams.map((team, index) => (
                                <View key={index} style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 24, paddingHorizontal: 20}}>
                                    <Text style={styles.results}>{team.toUpperCase()}</Text>
                                    <Text style={styles.results}>{correctWords[index]}</Text>
                                </View>
                            ))}
                            <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 30, alignSelf: 'center'}]} onPress={resetGame}>
                                <Image source={require('../assets/buttons/menu.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                    )
                }

                <Modal 
                    visible={modalVisible} 
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleResume}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Game Paused</Text>
                            <Text style={styles.modalText}>The dragons are catching their breath... Take a moment and get ready to continue!</Text>
                            <TouchableOpacity style={styles.modalBtn} onPress={handleResume}>
                                <Text style={styles.modalResetText}>Resume</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalBtn} onPress={resetGame}>
                                <Text style={styles.modalCloseText}>Exit</Text>
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
    },

    label: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: '500',
        marginBottom: 12,
        alignSelf: 'flex-start'
    },

    text: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
        marginBottom: 24
    },

    word: {
        color: '#fff', 
        fontSize: 20, 
        fontWeight: '400',
    },

    gameText: {
        color: '#fff', 
        fontSize: 40, 
        fontWeight: '600',
        textAlign: 'center'
    },

    results: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: '400',
    },

    button: {
        width: '100%',
        height: 53,
        marginBottom: 12,
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
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 16.5
    },

    buttonText: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
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

export default DragonGame;