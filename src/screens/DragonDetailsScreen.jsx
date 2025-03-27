import { View } from "react-native"
import DragonDetails from "../components/DragonDetails"

const DragonDetailsScreen = ({ route }) => {
    const { dragon } = route.params;

    return (
        <View style={styles.container}>
            <DragonDetails dragon={dragon} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DragonDetailsScreen;