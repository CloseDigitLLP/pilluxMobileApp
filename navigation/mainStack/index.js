import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './auth';
import Tabs from './tabs';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
    )
}