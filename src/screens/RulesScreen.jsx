import { View } from "react-native"
import Rules from "../components/Rules"

const RulesScreen = () => {
    return (
        <View style={styles.container}>
            <Rules />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default RulesScreen;