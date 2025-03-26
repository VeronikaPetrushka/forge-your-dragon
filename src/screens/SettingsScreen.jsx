import { View } from "react-native"
import Settings from "../components/Settings"

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Settings />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default SettingsScreen;