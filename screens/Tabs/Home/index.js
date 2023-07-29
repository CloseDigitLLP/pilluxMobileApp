import { logout } from "../../../services/Auth/actions";
import { connect } from "react-redux";
import App from '../../Events'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepedStudent from "../../StespWorked";
const HomeStack = createNativeStackNavigator()

function Home(props) {
   
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }} {...props} >
            <HomeStack.Screen name="Events" component={App} {...props} />
            <HomeStack.Screen name="Levels" component={StepedStudent} {...props} />
        </HomeStack.Navigator>
    )
}

const mapStateProps = state => {
    return {}
}

const mapDispatchToProps = {
    logout: logout
}

export default connect(mapStateProps, mapDispatchToProps)(Home)