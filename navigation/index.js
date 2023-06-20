import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStack from './mainStack';



export default function Navigation() {
    return (
      <>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </>
    )
}