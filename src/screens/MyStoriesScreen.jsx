import { View } from "react-native"
import MyStories from "../components/MyStories"

const MyStoriesScreen = () => {
    return (
        <View style={styles.container}>
            <MyStories />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MyStoriesScreen;