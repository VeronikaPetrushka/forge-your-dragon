import { ImageBackground, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Share } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const DragonDetails = ({ dragon }) => {
    const navigation = useNavigation();

    const shareDragon = () => {
        const dragonDetails = `
            🐉 Dragon Details:
            📜 Name: ${dragon.name}
            🌍 Origin: ${dragon.origin}
            🧠 Personality: ${dragon.personality}
            🎨 Scale Color: ${dragon.scale}
            🦴 Body Type: ${dragon.type}
            🔥 Breath Power: ${dragon.power}
            ⚔️ Special Ability: ${dragon.ability}
            🏔️ Territory: ${dragon.territory}
            ⚔️ Weakness: ${dragon.weakness}
            🔮 Special Traits: ${dragon.traits}
        `;
    
        Share.share({
            message: dragonDetails,
            title: `Meet my Dragon: ${dragon.name}`,
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    };
    

    return (
        <ImageBackground source={require('../assets/back/3.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.09, left: 34, zIndex: 10}}
                    onPress={() => navigation.navigate('CreateDragonScreen', { dragon })}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'edit'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.09, left: 80, zIndex: 10}}
                    onPress={shareDragon}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'share'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.09, right: 34, zIndex: 10}}
                    onPress={() => navigation.navigate('DragonsScreen')}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'cross'} />
                    </View>
                </TouchableOpacity>

                <Image source={typeof dragon.image === 'string' ? { uri: dragon.image } : dragon.image} style={{width: '100%', height: 417, resizeMode: 'cover', marginBottom: 32}} />
            
                <ScrollView style={{width: '100%'}}>

                    <Text style={styles.label}>📜 Name</Text>
                    <Text style={styles.value}>{dragon.name}</Text>

                    <Text style={styles.label}>🌍 Origin</Text>
                    <Text style={styles.value}>{dragon.origin}</Text>

                    <Text style={styles.label}>🧠 Personality</Text>
                    <Text style={styles.value}>{dragon.personality}</Text>

                    <Text style={styles.label}>🎨 Scale Color</Text>
                    <Text style={styles.value}>{dragon.scale}</Text>

                    <Text style={styles.label}>🦴 Body Type</Text>
                    <Text style={styles.value}>{dragon.type}</Text>

                    <Text style={styles.label}>🔥 Breath Power</Text>
                    <Text style={styles.value}>{dragon.power}</Text>

                    <Text style={styles.label}>⚔️ Special Ability</Text>
                    <Text style={styles.value}>{dragon.ability}</Text>

                    <Text style={styles.label}>🏔️ Territory</Text>
                    <Text style={styles.value}>{dragon.territory}</Text>

                    <Text style={styles.label}>⚔️ Weakness</Text>
                    <Text style={styles.value}>{dragon.weakness}</Text>

                    <Text style={styles.label}>🔮 Special Traits</Text>
                    <Text style={styles.value}>{dragon.traits}</Text>

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
        paddingTop: height * 0.07
    },

    label: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 8
    },

    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 16
    }

});

export default DragonDetails;