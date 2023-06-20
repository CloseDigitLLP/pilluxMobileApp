import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Settings screen
            </Text>
        </SafeAreaView>
    )
}