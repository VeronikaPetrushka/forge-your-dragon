import { View } from "react-native"
import CreateStory from "../components/CreateStory"

const CreateStoryScreen = ({ route }) => {
    const { story } = route.params || {};

    return (
        <View style={styles.container}>
            <CreateStory story={story} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateStoryScreen;