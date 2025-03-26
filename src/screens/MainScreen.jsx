import { View } from "react-native"
import Main from "../components/Main"

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <Main />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MainScreen;