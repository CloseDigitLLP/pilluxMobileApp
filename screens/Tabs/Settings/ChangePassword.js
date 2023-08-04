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

const ChangePassword = ({ changePassword }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (!password) {
        return ToastAndroid.show(
          "Veuillez entrer un mot de passe valide",
          ToastAndroid.SHORT
        );
      }

      if (!newPassword) {
        return ToastAndroid.show(
          "Veuillez entrer un nouveau mot de passe valide",
          ToastAndroid.SHORT
        );
      }

      if (!(newPassword === confirmPassword)) {
        return ToastAndroid.show(
          "Les mots de passe ne correspondent pas",
          ToastAndroid.SHORT
        );
      }

      if ((newPassword === password)) {
        return ToastAndroid.show(
          "Le nouveau mot de passe doit être unique",
          ToastAndroid.SHORT
        );
      }

      const data = {
        password,
        newPassword,
      };

      let { payload } = await changePassword(data);
      
      if(!(payload?.data > 0)){
        ToastAndroid.show("mauvais mot de passe saisi", ToastAndroid.SHORT)
      }else{
        ToastAndroid.show("Le mot de passe a été changé avec succès", ToastAndroid.SHORT)
        clearStates()
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error happened while changing password!", ToastAndroid.SHORT)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    clearStates()
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
                <TextInput
                  editable={!loading}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.textInput}
                />
              </View>
              <View>
                <Text style={styles.labelText}> Mon nouveau mot de passe </Text>
                <TextInput
                  editable={!loading}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.textInput}
                />
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
