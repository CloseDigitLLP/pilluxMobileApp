import React, { useCallback, useEffect, useState } from "react";
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
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import { createExamWishlist } from "../../services/ExamWishlist/actions";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MonthPicker from "react-native-month-year-picker";

const ExamHours = (props) => {
  const navigation = useNavigation()
  const userData = useSelector((state) => state?.authReducer?.data?.data);

  const [date, setDate] = useState(moment().toDate());
  const [dateOpen, setDateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(0)
  const [studentsData, setStudentsData] = useState({})
  const [weeksData, setWeeksData] = useState([])
  const [selectedWeek, setSelectedWeek] = useState()
  const [month, setMonth] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)

      const payload = {
        instructor_id: userData?.id,
        student_id: studentsData?.id,
        date_start: moment(weeksData[selectedWeek]?.startDate, "YYYY-MM-DD"),
        date_end: moment(weeksData[selectedWeek]?.endDate, "YYYY-MM-DD"),
        status: 'pending'
      }
      await props?.createExamWishlist(payload)
      Toast.show({
        type: "success",
        text1: "Liste de souhaits d'examen ajoutée"
      })
      // ToastAndroid.show("Liste de souhaits d'examen ajoutée", ToastAndroid.SHORT)
      navigation.navigate("studentsList")
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur lors de l'ajout de la liste de souhaits d'examen"
      })
      // ToastAndroid.show("Erreur lors de l'ajout de la liste de souhaits d'examen", ToastAndroid.SHORT)
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  const handleCancel = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (props?.route?.params?.data?.id) {
      setStudentsData(props?.route?.params?.data)
    } else {
      setStudentsData({})
    }
  }, [props?.route?.params?.data])

  useEffect(() => {
    // Get the current date
    const currentDate = moment(month);

    // Get the start of the current month
    const startOfMonth = currentDate.clone().startOf('month');

    // Get the end of the current month
    const endOfMonth = currentDate.clone().endOf('month');

    // Initialize an array to store the weeks
    const weeks = [];

    // Start from the beginning of the month and add a week at a time until we reach the end of the month
    let currentWeekStart = startOfMonth.clone();
    while (currentWeekStart.isBefore(endOfMonth)) {
      const currentWeekEnd = currentWeekStart.clone().endOf('week');
      // Make sure the last day of the last week is within the current month
      const lastWeekEnd = endOfMonth.isBefore(currentWeekEnd) ? endOfMonth : currentWeekEnd;
      weeks.push({
        startDate: currentWeekStart.format('YYYY-MM-DD'),
        endDate: lastWeekEnd.format('YYYY-MM-DD'),
      });
      currentWeekStart = currentWeekEnd.add(1, 'day'); // Move to the next week
    }

    setWeeksData(weeks)

  }, [month])

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      setShowPicker(false);
      setMonth(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <SafeAreaView>
        <View style={common.container}>
          <View style={common.headerPart}>
            <Text style={common.headerText}>
              L'élève est prêt(e) pour l'examen
            </Text>
          </View>
          <View style={common.mainContent}>
            <ScrollView>
              <View style={common.cardBoxEvent}>
                <View style={styles.examSteps}>
                  <Text style={styles.stepsText}>
                    Sélectionner les horaires des examens
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }} >
                  {
                    showPicker &&
                    <View>
                      <MonthPicker
                        value={month}
                        onChange={onValueChange}
                        mode='full'
                        locale="en"
                        okButton="Confirm"
                        cancelButton="Abort"
                      />
                    </View>
                  }
                  <View style={{ marginTop: 20 }} >
                    <Text style={styles.labelText}>Select month</Text>
                    <TouchableOpacity
                            onPress={() => {
                              if (!loading) {
                                setShowPicker(true);
                              }
                            }}
                          >
                            <Text style={{ ...styles.textWithBox, marginBottom: 0}}>
                              {moment(month).format("MM-YYYY")}
                            </Text>
                          </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20 }} >
                    <Text style={styles.labelText}>Exam start time</Text>
                    <View style={{ gap: 20 }} >
                      {weeksData?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              if (!loading) {
                                setSelectedWeek(index);
                              }
                            }}
                            key={index}
                          >
                            <Text style={{ ...styles.textWithBox, marginBottom: 0, backgroundColor: selectedWeek === index ? colors.cyan : colors.gray }}>
                              {item?.startDate} - {item?.endDate}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
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
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  examSteps: {
    marginTop: 20,
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

