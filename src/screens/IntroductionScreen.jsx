import { View } from "react-native"
import Introduction from "../components/Introduction"

const IntroductionScreen = () => {
    return (
        <View style={styles.container}>
            <Introduction />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default IntroductionScreen;