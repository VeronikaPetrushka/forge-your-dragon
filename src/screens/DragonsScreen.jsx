import { View } from "react-native"
import Dragons from "../components/Dragons"

const DragonsScreen = () => {
    return (
        <View style={styles.container}>
            <Dragons />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DragonsScreen;