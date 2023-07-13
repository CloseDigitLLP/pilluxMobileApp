import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './auth';
import Tabs from './tabs';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

function MainStack(props) {
    const { authReducer } = props
    return (
        // <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     <Stack.Screen name="Auth" component={AuthStack} />
        //     <Stack.Screen name="Tabs" component={Tabs} />
        // </Stack.Navigator>
        <Stack.Navigator screenOptions={{ headerShown: false }} {...props}>
        {authReducer?.data?.data?.accessToken ? (
          <Stack.Screen name='Tabs' component={Tabs} {...props} />
        ): (
          <Stack.Screen name='Auth' component={AuthStack} {...props} />
        )}
      </Stack.Navigator>
    )
}

const mapStateProps = state => {
    return {
      authReducer: state.authReducer
    }
  }
  
  const mapDispatchToProps = {}

  export default connect(mapStateProps, mapDispatchToProps)(MainStack)