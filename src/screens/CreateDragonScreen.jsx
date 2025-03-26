import { View } from "react-native"
import CreateDragon from "../components/CreateDragon"

const CreateDragonScreen = ({ route }) => {
    const { dragon } = route.params || {};

    return (
        <View style={styles.container}>
            <CreateDragon dragon={dragon} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateDragonScreen;