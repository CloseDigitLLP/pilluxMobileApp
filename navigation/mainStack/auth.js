import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Auth/Login';
import Auth from '../../screens/Auth';
import colors from '../../styles/colors';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.primary } }}  >
            <Stack.Screen name="Login" component={Auth} />
        </Stack.Navigator>
    )
}