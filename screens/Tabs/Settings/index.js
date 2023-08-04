import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useSelector } from "react-redux";
import { logout } from "../../../services/Auth/actions";
import common from "../../../styles/common";
import colors from "../../../styles/colors";
import { Entypo, AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

function Settings({ logout }) {
  const userData = useSelector((state) => state?.authReducer?.data?.data);
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Paramètres - mon profil</Text>
        </View>
        <View style={styles.bodyCard}>
          <View>
            <Text style={styles.labelText}>Nom</Text>
            <Text style={styles.textWithBox}>{userData?.lastname}</Text>
          </View>
          <View>
            <Text style={styles.labelText}>Prénom</Text>
            <Text style={styles.textWithBox}>{userData?.firstname}</Text>
          </View>
          <View>
            <Text style={styles.labelText}>Email</Text>
            <Text style={styles.textWithBox}>{userData?.email}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 2,
              borderColor: colors.gray,
              marginVertical: 20,
            }}
          ></View>
          <View style={styles.linksCard}>
            <TouchableOpacity onPress={() => navigation.navigate('updateProfile')} style={styles.linksContainer}>
              <Entypo name={"dot-single"} size={20} color={colors.cyan} />
              <Text style={styles.linksText}>Modifier mon profil</Text>
              <AntDesign name={"caretright"} size={16} color={colors.cyan} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('changePassword')} style={styles.linksContainer}>
              <Entypo name={"dot-single"} size={20} color={colors.cyan} />
              <Text style={styles.linksText}>Changer mon mot de passe</Text>
              <AntDesign name={"caretright"} size={16} color={colors.cyan} />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={styles.linksContainer}>
              <Entypo name={"dot-single"} size={20} color={colors.cyan} />
              <Text style={styles.linksText}>Se déconnecter</Text>
              <AntDesign name={"caretright"} size={16} color={colors.cyan} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linksText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 4,
  },
  linksCard: { rowGap: 10 },
  linksContainer: { flexDirection: "row", alignItems: "center" },
  bodyCard: {
    marginTop: 10,
    padding: 20,
    rowGap: 30,
  },
  textWithBox: {
    ...common.contentText,
    backgroundColor: colors.gray,
    padding: 10,
    textAlign: "center",
    borderRadius: 9999,
  },
  labelText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
