import { ImageBackground, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Rules = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/3.png')} style={{flex: 1}}>
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

                <ScrollView style={{width: '100%'}}>

                    <Text style={styles.title}>RULES</Text>

                    <Text style={styles.text}>One player at a time gets a random word or phrase related to dragons.</Text>
                    <Text style={styles.text}>The player must describe it using words or gestures – but they CANNOT say the actual word or part of the word!</Text>
                    <Text style={styles.text}>The other players must guess the word before the timer runs out.</Text>
                    <Text style={styles.text}>The team gets 1 point per correct answer.</Text>
                    <Text style={styles.text}>The game continues until all players have taken turns.</Text>
                    <Text style={styles.text}>The team with the highest score wins!  </Text>

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
        marginBottom: 24,
        textAlign: 'center'
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        marginBottom: 16
    },

});

export default Rules;