import { View } from "react-native"
import DragonGame from "../components/DragonGame"

const DragonGameScreen = () => {
    return (
        <View style={styles.container}>
            <DragonGame />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DragonGameScreen;