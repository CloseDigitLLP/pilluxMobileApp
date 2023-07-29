import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import Home from '../../../screens/Tabs/Home';
import Stats from '../../../screens/Tabs/Stats';
import Receipts from '../../../screens/Tabs/Receipts';
import Students from '../../../screens/Tabs/Students';
import Settings from '../../../screens/Tabs/Settings';
import colors from '../../../styles/colors';
import Vehicle from '../../../screens/Tabs/Vehicle';

const Tab = createBottomTabNavigator();

function CustomTab({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.secondary, borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 8 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}
                    >
                        {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, size: 30, color: '#fff' })}
                        {/* <Text style={{ color: '#fff', fontSize: 12 }}>
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function Tabs() {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTab {...props} />}
            screenOptions={() => ({
                headerShown: false,
                //   tabBarActiveTintColor: colors.properWhite,
                //   tabBarInactiveTintColor: colors.properWhite,
            })}
            sceneContainerStyle={{
                backgroundColor: colors.primary
            }}
        >
            <Tab.Screen
                name={"home"}
                component={Home}
                // initialParams={{ role: route?.params?.role }}
                options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }}
            />
            <Tab.Screen
                name={"stats"}
                component={Stats}
                // initialParams={{ role: route?.params?.role }}
                options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'ios-bar-chart' : 'ios-bar-chart-outline'} size={size} color={color} /> }}
            />
            <Tab.Screen
                name={"vehicle"}
                component={Vehicle}
                // initialParams={{ role: route?.params?.role }}
                options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'key' : 'key-outline'} size={size} color={color} /> }}
            />
            <Tab.Screen
                name={"students"}
                component={Students}
                // initialParams={{ role: route?.params?.role }}
                options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} /> }}
            />
            <Tab.Screen
                name={"settings"}
                component={Settings}
                // initialParams={{ role: route?.params?.role }}
                options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} /> }}
            />
        </Tab.Navigator>
    )
}