import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Stats screen
            </Text>
        </SafeAreaView>
    )
}