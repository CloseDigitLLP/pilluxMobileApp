import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../../services/Auth/actions";
import { connect } from "react-redux";

function Home(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Home screen
            </Text>
            <Button onPress={() => { props.logout() }} title="Logout" />
        </SafeAreaView>
    )
}

const mapStateProps = state => {
    return {}
}

const mapDispatchToProps = {
    logout: logout
}

export default connect(mapStateProps, mapDispatchToProps)(Home)