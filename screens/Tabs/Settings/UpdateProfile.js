import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../../../styles/common";
import colors from "../../../styles/colors";
import { connect, useSelector } from "react-redux";
import { updateProfile } from "../../../services/Auth/actions";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation } from "@react-navigation/native";

const UpdateProfile = ({
    updateProfile
}) => {

  const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")

    const userData = useSelector((state) => state?.authReducer?.data?.data);

    useEffect(() => {
        setFirstname(userData?.firstname)
        setLastname(userData?.lastname)
    }, [userData?.firstname, userData?.lastname])

    const handleUpdate = async () => {
        try{
            setLoading(true)
            if(!firstname){
              return Toast.show({
                type: 'error',
                text1: "Prénom invalide"
              })
            }
            if(!lastname){
              return Toast.show({
                type: 'error',
                text1: "Nom invalide!"
              })
            }
            const payload = {
                firstname,
                lastname,
                returning: true
            }
            await updateProfile(payload, userData?.id)
            Toast.show({
              type: "success",
              text1: "Mise à jour du profil réussie"
            })
        }catch(error){
            console.log(error)
            Toast.show({
              type: "error",
              text1: "Erreur lors de la mise à jour du profil"
            })
        }finally{
            setLoading(false)
        }
        
    }

    const handleCancel = () => {
        setFirstname(userData?.firstname)
        setLastname(userData?.lastname)
        navigation.goBack()
    }

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Modifier mon profil</Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 40,
            backgroundColor: colors.cyan,
            fontWeight: 600,
            padding: 30,
            fontSize: 16,
            color: colors.white
          }}
        >
          Modifier mon nom et mon prénom ?
        </Text>
        <View style={styles.bodyCard}>
            <View>
                <Text style={styles.labelText} > Nom </Text>
                <TextInput
                  editable={!loading}
                  value={lastname}
                  onChangeText={setLastname}
                  style={styles.textInput}
                />
            </View>
            <View>
                <Text style={styles.labelText} > Prénom </Text>
                <TextInput
                  editable={!loading}
                  value={firstname}
                  onChangeText={setFirstname}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    labelText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    textAlign: 'center'
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
})

const mapStateProps = (state) => {
    return {}
}

const mapDispatchToProps = {
    updateProfile
}

export default connect(mapStateProps, mapDispatchToProps)(UpdateProfile);
