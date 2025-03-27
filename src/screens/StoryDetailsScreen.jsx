import { View } from "react-native"
import StoryDetails from "../components/StoryDetails"

const StoryDetailsScreen = ({ route }) => {
    const { story } = route.params;

    return (
        <View style={styles.container}>
            <StoryDetails story={story} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default StoryDetailsScreen;