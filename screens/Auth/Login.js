import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar />
            <Text>Login</Text>
            <Button onPress={() => navigation.navigate('Tabs')} title="Go To Tabs" />
        </SafeAreaView>
    )
}