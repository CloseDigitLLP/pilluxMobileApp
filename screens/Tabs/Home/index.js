import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>
                Home screen
            </Text>
            <Button onPress={() => navigation.navigate('Auth')} title="Go to Auth" />
        </SafeAreaView>
    )
}