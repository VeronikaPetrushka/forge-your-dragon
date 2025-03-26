import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const titles = [
    'Who is your dragon?',
    'How does your dragon look?',
    'What powers does your dragon have?',
    'Where does your dragon rule?',
    'Add the finishing touches!',
    'Choose Your Dragon’s Appearance'
];

const texts = [
    'Start by naming your dragon and defining its personality!',
    'Customize its appearance to match its personality!',
    'Choose how your dragon dominates the skies!',
    'Every great dragon needs a domain!',
    'Define your dragon’s hidden traits and weaknesses!',
    'Select an image from our gallery or upload your own to bring your dragon to life!'
];

const dragons = [
    require('../assets/dragons/1.png'),
    require('../assets/dragons/2.png'),
    require('../assets/dragons/3.png'),
    require('../assets/dragons/4.png'),
    require('../assets/dragons/5.png'),
    require('../assets/dragons/6.png'),
    require('../assets/dragons/7.png'),
]

const CreateDragon = ({ dragon }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [name, setName] = useState(dragon?.name || null);
    const [origin, setOrigin] = useState(dragon?.origin || null);
    const [personality, setPersonality] = useState(dragon?.personality || null);
    const [scale, setScale] = useState(dragon?.scale || null);
    const [body, setBody] = useState(dragon?.body || null);
    const [eyes, setEyes] = useState(dragon?.eyes || null);
    const [tail, setTail] = useState(dragon?.tail || null);
    const [power, setPower] = useState(dragon?.power || null);
    const [ability, setAbility] = useState(dragon?.ability || null);
    const [combat, setCombat] = useState(dragon?.combat || null);
    const [territory, setTerritory] = useState(dragon?.territory || null);
    const [habitat, setHabitat] = useState(dragon?.habitat || null);
    const [weakness, setWeakness] = useState(dragon?.weakness || null);
    const [traits, setTraits] = useState(dragon?.traits || null);
    const [symbol, setSymbol] = useState(dragon?.symbol || null);
    const [uploadedImage, setUploadedImage] = useState(dragon?.uploadedImage || null);
    const [image, setImage] = useState(dragon?.image || null);

    const handleNext = () => {
        if(index === 5) {
            saveDragon();
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 6);
        }
    };

    const uploadDragon = async () => {
        try {
            const result = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: "photo", quality: 0.8 }, ({ assets, errorMessage }) => {
                    if (errorMessage) reject(errorMessage);
                    else resolve(assets?.[0]?.uri || null);
                });
            });
    
            if (result) {
                setUploadedImage(result);
                setImage(null);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to select image.");
        }
    };

    const chooseDragon = (dragon) => {
        if(uploadedImage) {
            setUploadedImage(null);
            setImage(dragon)
        } else (
            setImage(dragon)
        )
    };

    const saveDragon = async () => {
        try {
            const newDragon = {
                id: dragon?.id || Date.now().toString(),
                name,
                origin,
                personality,
                scale,
                body,
                eyes,
                tail,
                power,
                ability,
                combat,
                territory,
                habitat,
                weakness,
                traits,
                symbol,
                image: uploadedImage || image
            };

            for (const key in newDragon) {
                if (!newDragon[key]) {
                    console.error(`Field ${key} must be filled!`);
                    return;
                }
            }
    
            const storedDragons = await AsyncStorage.getItem("dragons");
            let dragons = storedDragons ? JSON.parse(storedDragons) : [];
    
            if (dragon) {
                dragons = dragons.map(d => (d.id === dragon.id ? newDragon : d));
            } else {
                dragons.push(newDragon);
            }
    
            await AsyncStorage.setItem("dragons", JSON.stringify(dragons));
    
            alert(dragon ? "Dragon updated successfully!" : "Dragon saved successfully!");

            navigation.navigate('DragonsScreen');
        } catch (error) {
            alert("Error saving dragon:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back/2.png')} style={{flex: 1}}>
            <View style={styles.container}>

                {
                    index !== 0 && (
                        <TouchableOpacity 
                            style={{position: 'absolute', top: height * 0.07, left: 24, flexDirection: 'row', alignItems: 'center'}}
                            onPress={() => setIndex((prev) => prev - 1)}
                            >
                            <View style={{width: 18, height: 24, marginRight: 10}}>
                                <Icons type={'back'} />
                            </View>
                            <Text style={styles.backButtonText}>Previous</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={styles.count}>{index + 1}/6</Text>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, right: 24}}
                    onPress={() => navigation.goBack('')}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'cross'} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.title}>{titles[index].toUpperCase()}</Text>

                <Text style={styles.text}>{texts[index]}</Text>

                {
                    index === 0 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Name</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <Text style={styles.label}>Origin</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={origin}
                                    onChangeText={setOrigin}
                                />
                            </View>

                            <Text style={styles.label}>Personality</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={personality}
                                    onChangeText={setPersonality}
                                />
                            </View>
                        </View>
                    )
                }

                {
                    index === 1 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Scale Color</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={scale}
                                    onChangeText={setScale}
                                />
                            </View>

                            <Text style={styles.label}>Body Type</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={body}
                                    onChangeText={setBody}
                                />
                            </View>

                            <Text style={styles.label}>Eye Color</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={eyes}
                                    onChangeText={setEyes}
                                />
                            </View>

                            <Text style={styles.label}>Tail Type</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={tail}
                                    onChangeText={setTail}
                                />
                            </View>
                        </View>
                    )
                }

                {
                    index === 2 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Breath Power</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={power}
                                    onChangeText={setPower}
                                />
                            </View>

                            <Text style={styles.label}>Special Ability</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={ability}
                                    onChangeText={setAbility}
                                />
                            </View>

                            <Text style={styles.label}>Combat Style</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={combat}
                                    onChangeText={setCombat}
                                />
                            </View>
                        </View>
                    )
                }

                {
                    index === 3 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Territory Type</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={territory}
                                    onChangeText={setTerritory}
                                />
                            </View>

                            <Text style={styles.label}>Habitat Size</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={habitat}
                                    onChangeText={setHabitat}
                                />
                            </View>
                        </View>
                    )
                }

                {
                    index === 4 && (
                        <View style={{width: '100%'}}>
                            <Text style={styles.label}>Weakness</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={weakness}
                                    onChangeText={setWeakness}
                                />
                            </View>

                            <Text style={styles.label}>Special Traits</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={traits}
                                    onChangeText={setTraits}
                                />
                            </View>

                            <Text style={styles.label}>Dragon Symbol</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <TextInput
                                    style={styles.input}
                                    value={symbol}
                                    onChangeText={setSymbol}
                                />
                            </View>
                        </View>
                    )
                }

                {
                    index === 5 && (
                        <View style={{width: '100%'}}>
                            <TouchableOpacity style={[styles.button, {marginBottom: 24}]} onPress={uploadDragon}>
                                <Image source={require('../assets/buttons/grey.png')} style={styles.image} />
                                <View style={styles.buttonInner}>
                                    <Text style={styles.buttonText}>{uploadedImage ? 'Uploaded' : 'Upload picture'}</Text>
                                    <View style={{width: 24, height: 24}}>
                                        <Icons type={'upload'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                                {
                                    dragons.map((dragon, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={{width: '30%', height: 140, marginBottom: 10, ...(image === dragon ? { borderWidth: 4, borderColor: '#ff6700' } : {})}} 
                                            onPress={() => chooseDragon(dragon)}>
                                            <Image source={dragon} style={[styles.image, {resizeMode: 'cover'}]} />
                                        </TouchableOpacity>
                                    ))
                                }
                                <View style={{height: 530}} />
                            </ScrollView>
                        </View>
                    )
                }

                <View style={{width: '100%', position: 'absolute', bottom: 40}}>
                    <View style={[styles.button, {marginBottom: 12}]}>
                        <Image source={require('../assets/buttons/sparkles.png')} style={styles.image} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Image source={index === 5 ? require('../assets/buttons/save.png') : require('../assets/buttons/next.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>

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

    count: {
        color: '#fff', 
        fontSize: 22, 
        fontWeight: '500',
        position: 'absolute',
        top: height * 0.073,
        alignSelf: 'center'
    },

    title: {
        color: '#fff', 
        fontSize: 22, 
        fontWeight: '500',
        marginBottom: 24,
        textAlign: 'center'
    },

    text: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
        marginBottom: 24
    },

    label: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '500',
        marginBottom: 7
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

    button: {
        width: '100%',
        height: 53,
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

});

export default CreateDragon;