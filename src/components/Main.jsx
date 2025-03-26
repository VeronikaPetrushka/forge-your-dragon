import { ImageBackground, View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Main = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{height: height * 0.4}} />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DragonGameScreen')}>
                    <Image source={require('../assets/buttons/game.png')} style={styles.image} />
                </TouchableOpacity>     

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DragonsScreen')}>
                    <Image source={require('../assets/buttons/dragons.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyStoriesScreen')}>
                    <Image source={require('../assets/buttons/stories.png')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 50}]} onPress={() => navigation.navigate('SettingsScreen')}>
                    <Image source={require('../assets/buttons/settings.png')} style={styles.image} />
                </TouchableOpacity>

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
    }

});

export default Main;