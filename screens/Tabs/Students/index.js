import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Students() {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Students screen
            </Text>
        </SafeAreaView>
    )
}