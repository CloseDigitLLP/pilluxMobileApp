import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { logout } from "../../../services/Auth/actions";

function Settings({ logout }) {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Settings screen
            </Text>
            <Button title="Logout" onPress={() => logout()} />
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)