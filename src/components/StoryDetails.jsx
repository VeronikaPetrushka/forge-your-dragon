import { ImageBackground, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Share } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const StoryDetails = ({ story }) => {
    const navigation = useNavigation();

    const shareStory = () => {
        const storyDetails = `
            ${story.title}
            ${story.content}
    
            - Share the adventure with others! 
        `;
    
        Share.share({
            message: storyDetails,
            title: `Check out this amazing dragon story: ${story.title}`,
        })
        .then((result) => console.log("Shared successfully", result))
        .catch((error) => console.log("Error sharing the story", error));
    };    

    return (
        <ImageBackground source={require('../assets/back/3.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, left: 24, zIndex: 10}}
                    onPress={() => navigation.navigate('CreateStoryScreen', { story })}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'edit'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, left: 80, zIndex: 10}}
                    onPress={shareStory}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'share'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{position: 'absolute', top: height * 0.07, right: 24, zIndex: 10}}
                    onPress={() => navigation.navigate('MyStoriesScreen')}
                    >
                    <View style={{width: 32, height: 32}}>
                        <Icons type={'cross'} />
                    </View>
                </TouchableOpacity>

                {
                    story.selectedDragon && (
                        <View style={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 32}}>
                            <Image source={typeof story.selectedDragon.image === 'string' ? { uri: story.selectedDragon.image } : story.selectedDragon.image} style={{width: '47%', height: 205, resizeMode: 'cover', marginRight: 14}} />
                            <View style={{width: '47%'}}>
                                <Text style={styles.label}>Dragon</Text>
                                <Text style={styles.value}>{story.selectedDragon.name}</Text>
        
                                <Text style={styles.label}>🌍 Origin</Text>
                                <Text style={styles.value}>{story.selectedDragon.origin}</Text>
                            </View>
                        </View>    
                    )
                }

                <View style={{height: 40, marginBottom: 24, alignSelf: 'flex-start', width: '100%'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            story.selectedTags?.map((tag, index) => (
                                <View key={index} style={styles.tagBtn}>
                                    <Text style={styles.tagBtnText}>{tag}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            
                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.title}>{story.title.toUpperCase()}</Text>
                    <Text style={styles.value}>{story.content}</Text>
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
    },

    title: {
        fontSize: 22,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center'
    },

    tagBtn: {
        padding: 8,
        backgroundColor: '#b0261a',
        margin: 2
    },

    tagBtnText: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '400',
    }

});

export default StoryDetails;