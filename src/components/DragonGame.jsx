import React, { useState, useEffect } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import dragonGame from '../constants/dragonGame';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const DragonGame = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [teams, setTeams] = useState(['Team 1', 'Team 2']);
    const [started, setStarted] = useState(false);
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctWords, setCorrectWords] = useState([0, 0]);
    const [countdown, setCountdown] = useState(5);
    const [gameTimer, setGameTimer] = useState(60);
    const [paused, setPaused] = useState(false);
    const [roundStarted, setRoundStarted] = useState(false);
    const [nextWordAvailable, setNextWordAvailable] = useState(true);
    const [finished, setFinished] = useState(false);
    const [key, setKey] = useState(0);

    const currentTeam = teams[currentTeamIndex];

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
            handleNextWord();
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
        setCorrectWords(newCorrectWords);
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
    };

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
                    <Text style={styles.text}>Get ready! Starting in {countdown} seconds... </Text>
                )}

                {(countdown === 0 && !roundStarted && !finished && started) && (
                    <Text style={styles.text}>Are you ready, {currentTeam} ?</Text>
                )}

                {(roundStarted && !finished && started) && (
                    <View>
                        <Text style={styles.text}>Time remaining: {gameTimer} s</Text>
                        <Text style={styles.text}>{selectedCategory.words[currentWordIndex]}</Text>
                        <TouchableOpacity onPress={handleCorrectWord} style={styles.button}>
                            <Text style={styles.buttonText}>Correct word</Text>
                        </TouchableOpacity>

                        {nextWordAvailable && (
                            <TouchableOpacity onPress={handleNextWord} style={styles.button}>
                                <Text style={styles.buttonText}>Next word</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {
                    finished && (
                        <>
                            <Text style={styles.text}>Winner: {teams[winnerIndex]} with {correctWords[winnerIndex]} correct words!</Text>
                            <TouchableOpacity onPress={resetGame}>
                                <Text style={styles.text}>Go back</Text>
                            </TouchableOpacity>
                        </>
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

});

export default DragonGame;