import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThreeCarImage from "../../assets/images/threeCar.png";
import colors from "../../styles/colors";
import common from "../../styles/common";
import { login, savePassword, verifyEmail, verifyOtp } from "../../services/Auth/actions";
import { connect } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Entypo } from "react-native-vector-icons";

function ForgetPassword({ props, setCurrentFlow, currentFlow }) {
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState();
  const [newPassword, setNewPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const handleVerifyEmail = async () => {
    try{
      setLoading(true)
      const { payload } = await props.verifyEmail({ email });
      if ( payload?.data?.length && !payload?.error ) {
        setCurrentFlow(3);
        ToastAndroid.show("OTP envoyé!", ToastAndroid.SHORT)
      } else {
        ToastAndroid.show("Email invalide!", ToastAndroid.SHORT)
      }
    }catch(error){
      ToastAndroid.show("Error happned while verifying Email!", ToastAndroid.SHORT)
    }finally{
      setLoading(false)
    }
  };

  const handleVerifyOtp = async () => {
    try{
      setLoading(true)
      if (verificationCode?.length < 6) {
        return ToastAndroid.show("OTP invalide !", ToastAndroid.SHORT);
      }
      let { payload } = await props.verifyOtp({ email, otp: verificationCode });
      if (payload?.isValid) {
        // otp verification success
        setCurrentFlow(4)
      }else {
        ToastAndroid.show("OTP invalide !", ToastAndroid.SHORT);
      }
    }catch(error){
      console.log(error)
      return ToastAndroid.show("OTP invalide !", ToastAndroid.SHORT);
    }finally {
      setLoading(false)
    }
  };

  const handleSaveNewPassword = async () => {
    try{
      setLoading(true)
      if (newPassword?.length < 3) {
        return ToastAndroid.show("nouveau mot de passe invalide !", ToastAndroid.SHORT);
      }
      if(newPassword !== confirmPassword ){
        return ToastAndroid.show("les mots de passe ne correspondent pas !", ToastAndroid.SHORT);
      }
      let { payload } = await props.savePassword({ password: newPassword, email });
      if (payload?.isValid) {
        // save new password success
        setCurrentFlow(1)
        ToastAndroid.show("mot de passe enregistré avec succès", ToastAndroid.SHORT);
      }else {
        ToastAndroid.show("Erreur lors de la mise à jour du mot de passe !", ToastAndroid.SHORT);
      }
    }catch(error){
      console.log(error)
      return ToastAndroid.show("Erreur lors de la mise à jour du mot de passe !", ToastAndroid.SHORT);
    }finally {
      setLoading(false)
    }
  };

  // set to login if pressed back
  React.useEffect(() => {
    const backAction = () => {
      console.log("back pressed");
      setCurrentFlow((currentFlow - 1) > 1 ? (currentFlow - 1) === 3 ? 2 : currentFlow - 1 : 1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [currentFlow]);

  return (
    <View style={styles.loginForm}>
      {currentFlow === 2 && (
        <>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email ou nom d'utilisateur</Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={styles.inputField}
            />
          </View>
          <View style={styles.buttonField}>
            <TouchableOpacity
              onPress={handleVerifyEmail}
              style={styles.primaryButton}
            >
            {
              loading ?
              <ActivityIndicator />
              :
              <Text style={styles.buttonText}>envoyer otp</Text>
            }
            </TouchableOpacity>
          </View>
        </>
      )}
      {currentFlow === 3 && (
        <>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>OTP</Text>
            <TextInput
              onChangeText={(text) => setVerificationCode(text)}
              value={verificationCode}
              style={styles.inputField}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          <View style={styles.buttonField}>
            <TouchableOpacity
              onPress={handleVerifyOtp}
              style={styles.primaryButton}
            >
            {
              loading ?
              <ActivityIndicator />
              :
              <Text style={styles.buttonText}>vérifier otp</Text>
            }
            </TouchableOpacity>
          </View>
        </>
      )}
      {currentFlow === 4 && (
        <>
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>New Password</Text>
            <View style={{ position: 'relative' }} >
            <TextInput
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              style={styles.inputField}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={{ position: 'absolute', right: 25, top: 15 }} >
              <Entypo
                name={showNewPassword ? 'eye' : 'eye-with-line'}
                size={18}
                color='white'
              />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Confirm Password</Text>
            <TextInput
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              style={styles.inputField}
              secureTextEntry={true}
            />
          </View>
          
          <View style={styles.buttonField}>
            <TouchableOpacity
              onPress={handleSaveNewPassword}
              style={styles.primaryButton}
            >
            {
              loading ?
              <ActivityIndicator />
              :
              <Text style={styles.buttonText}>enregistrer le mot de passe</Text>
            }
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

function Login({ props, currentFlow, setCurrentFlow }) {

  const handleLogin = async () => {
    try{
      setLoading(true)
      let { payload } = await props.login(email, password);
      if(payload?.data?.id){
        ToastAndroid.show("Connexion réussie", ToastAndroid.SHORT)
      }else{
        ToastAndroid.show("les informations d'identification invalides", ToastAndroid.SHORT)
      }
    }catch(error){
      console.log(error)
      ToastAndroid.show("les informations d'identification invalides!", ToastAndroid.SHORT)
    }finally{
      setLoading(false)
    }
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.loginForm}>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Email ou nom d'utilisateur</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.inputField}
          editable={!loading}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>mot de passe</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.inputField}
          secureTextEntry={true}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setCurrentFlow(2)}>
          <Text style={styles.forgotText}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonField}>
        <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
        {
          loading ? 
          <ActivityIndicator />
          :
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        }
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Auth(props) {

  // 1 => login
  // 2 => forgot password
  // 3 => verify otp
  // 4 => set new password
  const [currentFlow, setCurrentFlow] = React.useState(1);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <View style={common.container}>
        <View style={styles.logoPart}>
          <Text style={styles.logoText}>DRIVINGacc</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.carImage}>
            <Image source={ThreeCarImage} style={styles.threeCar} />
          </View>
          {currentFlow == 1 && (
            <Login
              props={props}
              currentFlow={currentFlow}
              setCurrentFlow={setCurrentFlow}
            />
          )}
          {currentFlow >= 2 && (
            <ForgetPassword
              props={props}
              currentFlow={currentFlow}
              setCurrentFlow={setCurrentFlow}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logoPart: {
    height: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: colors.white,
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 35,
    fontWeight: 600,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  mainContent: {
    height: "77%",
    margin: 10,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  field: {
    marginBottom: 40,
  },
  inputField: {
    borderWidth: 1,
    borderColor: colors.cyan,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.white,
    width: "100%",
  },
  fieldLabel: {
    color: colors.white,
    textAlign: "center",
    marginBottom: 10,
  },
  forgotText: {
    textAlign: "right",
    color: colors.white,
    paddingRight: 10,
    paddingTop: 4,
  },
  buttonField: {
    marginTop: "16%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    paddingVertical: 16,
    color: colors.white,
    backgroundColor: colors.cyan,
    textAlign: "center",
    width: "60%",
    margin: "auto",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
  },
  buttonText: {
    textAlign: "center",
    color: colors.white,
    fontWeight: 600,
    fontSize: 18,
  },
  carImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  threeCar: {
    width: "100%",
    height: 80,
    margin: "auto",
  },
  passwordInputField: {
    borderWidth: 1,
    borderRadius: 8,
    width: 52,
    height: 52,
    color: "black",
    fontWeight: "700",
    backgroundColor: colors.white,
    fontSize: 14,
  },
});

const mapStateProps = (state) => {
  return {
    verifyEmailData: state?.authReducer?.verifyEmail,
    verifyOtpData: state?.authReducer?.verifyOtp,
  };
};

const mapDispatchToProps = {
  login,
  verifyEmail,
  verifyOtp,
  savePassword
};

export default connect(mapStateProps, mapDispatchToProps)(Auth);
