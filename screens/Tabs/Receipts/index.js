import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Receipts() {
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Receipts screen
            </Text>
        </SafeAreaView>
    )
}