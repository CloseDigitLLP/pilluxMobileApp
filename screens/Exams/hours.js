import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import common from "../../styles/common";
import { AntDesign } from "react-native-vector-icons";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import { createExamWishlist } from "../../services/ExamWishlist/actions";

const ExamHours = (props) => {
    const navigation = useNavigation()
    const userData = useSelector((state) => state?.authReducer?.data?.data);

  const [date, setDate] = useState(moment().toDate());
  const [dateOpen, setDateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(0)
  const [studentsData, setStudentsData] = useState({})

  const handleUpdate = async () => {
    try{
        setLoading(true)

        if(!Number.isNaN(parseInt(hours))){
           return ToastAndroid.show("Veuillez entrer des heures valides!", ToastAndroid.SHORT) 
        }

        const payload = {
            instructor_id: userData?.id,
            student_id: studentsData?.id,
            date_start: date,
            date_end: moment(date).add(hours, 'hours').toDate(),
            status: 'pending'
        }
        await props?.createExamWishlist(payload)
        ToastAndroid.show("Liste de souhaits d'examen ajoutée", ToastAndroid.SHORT)
        navigation.navigate("studentsList")
    }catch(error){
        ToastAndroid.show("Erreur lors de l'ajout de la liste de souhaits d'examen", ToastAndroid.SHORT)
        console.log(error)
    }finally{
        setLoading(false)
    }

  }

  const handleCancel = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if(props?.route?.params?.data?.id){
        setStudentsData(props?.route?.params?.data)
    }else{
        setStudentsData({})
    }
  }, [props?.route?.params?.data])

  return (
    <SafeAreaView>
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>
            L'élève est prêt(e) pour l'examen
          </Text>
        </View>
        <View style={common.mainContent}>
          <View style={common.cardBoxEvent}>
            <View style={styles.examSteps}>
              <Text style={styles.stepsText}>
                Sélectionner les horaires des examens
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10 }} >
            <View style={{ marginTop: 50 }} >
              <Text style={styles.labelText}>Exam start time</Text>
              <TouchableOpacity
                onPress={() => {
                  if (!loading) {
                    setDateOpen(true);
                  }
                }}
              >
                <Text style={{ ...styles.textWithBox, marginBottom: 0 }}>
                  {moment(date).format("DD/MM/YYYY hh:mm A")}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="datetime"
                open={dateOpen}
                date={date}
                onConfirm={(date) => {
                  setDateOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setDateOpen(false);
                }}
              />
            </View>
            <View style={{ marginTop: 20 }} >
              <Text style={styles.labelText}>Hours</Text>
              <TextInput
                editable={!loading}
                  value={`${hours}`}
                  onChangeText={setHours}
                  style={styles.textInput}
                  keyboardType="numeric"
                  maxLength={4}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  examSteps: {
    marginTop: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  actionPart: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 35,
  },
  stepsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  hourText: {
    textAlign: "center",
  },
  textWithBox: {
    ...common.contentText,
    backgroundColor: colors.gray,
    padding: 15,
    // textAlign: "center",
    borderRadius: 10,
  },
  labelText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
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
    return {

    }
}

const mapDispatchToProps = {
    createExamWishlist
}

export default connect(mapStateProps, mapDispatchToProps)(ExamHours);

