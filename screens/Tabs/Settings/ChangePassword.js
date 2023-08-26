import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../styles/colors";
import common from "../../../styles/common";
import { changePassword } from "../../../services/Auth/actions";
import { connect } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Entypo } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = ({ changePassword }) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (!password) {
        return Toast.show({
          type: "error",
          text1: "Veuillez entrer un mot de passe valide"
        })
        // return ToastAndroid.show(
        //   "Veuillez entrer un mot de passe valide",
        //   ToastAndroid.SHORT
        // );
      }

      if (!newPassword) {
        return Toast.show({
          type: "error",
          text1: "Veuillez entrer un nouveau mot de passe valide"
        })
        // return ToastAndroid.show(
        //   "Veuillez entrer un nouveau mot de passe valide",
        //   ToastAndroid.SHORT
        // );
      }

      if (!(newPassword === confirmPassword)) {
        return Toast.show({
          type: "error",
          text1: "Les mots de passe ne correspondent pas"
        })
        // return ToastAndroid.show(
        //   "Les mots de passe ne correspondent pas",
        //   ToastAndroid.SHORT
        // );
      }

      if ((newPassword === password)) {
        return Toast.show({
          type: "error",
          text1: "Le nouveau mot de passe doit être unique"
        })
        // return ToastAndroid.show(
        //   "Le nouveau mot de passe doit être unique",
        //   ToastAndroid.SHORT
        // );
      }

      const data = {
        password,
        newPassword,
      };

      let { payload } = await changePassword(data);
      
      if(!(payload?.data > 0)){
        Toast.show({
          type: "error",
          text1: "mauvais mot de passe saisi"
        })
        // ToastAndroid.show("mauvais mot de passe saisi", ToastAndroid.SHORT)
      }else{
        Toast.show({
          type: "success",
          text1: "Le mot de passe a été changé avec succès"
        })
        // ToastAndroid.show("Le mot de passe a été changé avec succès", ToastAndroid.SHORT)
        clearStates()
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error happened while changing password!"
      })
      // ToastAndroid.show("Error happened while changing password!", ToastAndroid.SHORT)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    clearStates()
    navigation.goBack()
  };
  
  const clearStates = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView  >
        <ScrollView>
          <View style={common.container}>
            <View style={common.headerPart}>
              <Text style={common.headerText}>Changer mon mot de passe</Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 40,
                backgroundColor: colors.cyan,
                fontWeight: 600,
                padding: 30,
                fontSize: 16,
                color: colors.white,
              }}
            >
              Changer mon mot de passe ?
            </Text>
            <View style={styles.bodyCard}>
              <View>
                <Text style={styles.labelText}> Mon mot de passe actuel </Text>
                <View style={{ position: "relative" }} >
                  <TextInput
                    editable={!loading}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textInput}
                    secureTextEntry={!showCurrentPassword}
                  />
                  <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={{ position: 'absolute', right: 25, top: 15 }} >
                    <Entypo
                      name={showCurrentPassword ? 'eye' : 'eye-with-line'}
                      size={18}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.labelText}> Mon nouveau mot de passe </Text>
                <View style={{ position: 'relative' }} >
                  <TextInput
                    editable={!loading}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.textInput}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 25, top: 15 }} >
                    <Entypo
                      name={showPassword ? 'eye' : 'eye-with-line'}
                      size={18}
                      color='white'
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.labelText}>
                  Confirmer mon nouveau mot de passe
                </Text>
                <TextInput
                  editable={!loading}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.textInput}
                  secureTextEntry={true}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 50,
                }}
              >
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleUpdate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.btnText}>Valider</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.btnContainer,
                    backgroundColor: colors.gray,
                  }}
                  disabled={loading}
                  onPress={handleCancel}
                >
                  <Text style={styles.btnText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    textAlign: "center",
  },
  bodyCard: {
    padding: 20,
    rowGap: 30,
  },
  textInput: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    fontSize: 14,
    padding: 10,
    color: "white",
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
  },
  btnContainer: {
    backgroundColor: colors.cyan,
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
  },
});

const mapStateProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  changePassword,
};

export default connect(mapStateProps, mapDispatchToProps)(ChangePassword);
