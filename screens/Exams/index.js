import React, { useEffect, useState } from "react";
import common from "../../styles/common";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const ExamReadyStudent = (props) => {
    const navigation = useNavigation()

    const [studentData, setStudentData] = useState({})

    useEffect(() => {
        if(props?.route?.params?.data?.id){
            setStudentData(props?.route?.params?.data)
        }else{
            setStudentData({})
        }
    }, [props?.route?.params?.data])

    const handleNotReady = () => {
        navigation.goBack()
    }

    const handleReady = () => {
        navigation.navigate('addExam', { data: studentData })
    }

  return (
    <SafeAreaView>
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>
            Lélève est-il/elle prêt(e) pour l'exam?
          </Text>
        </View>
        <View style={common.mainContent}>
          <View style={common.cardBoxEvent}>
            <View
              style={[
                styles.inputField,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 50
                },
              ]}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 999,
                  backgroundColor: colors.gray,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: colors.white, fontSize: 18, fontWeight: 500 }}
                >
                  {studentData?.firstname?.[0]}
                  {studentData?.lastname?.[0]}
                </Text>
              </View>
              <View style={{ width: "70%", alignItems: "center" }}>
                <Text style={{ color: colors?.white, fontSize: 18 }}>
                  {studentData?.firstname} {studentData?.lastname}
                </Text>
              </View>
            </View>
            <View style={styles.examSteps}>
              <Text style={styles.stepsText}>
                Élève prêt(e) pour l'examen de conduite ?
              </Text>
            </View>
            <View style={styles.actionPart}>
              <TouchableOpacity onPress={handleReady} style={common.cardOutlineBtn}>
                <Text style={common.cardBtnText}>OUI</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNotReady} style={common.cardFillBtn}>
                <Text style={common.cardBtnText}>NON</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExamReadyStudent;

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
    maxWidth: "80%",
  },
  inputField: {
    borderWidth: 1,
    borderColor: colors.cyan,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: colors.white,
    width: "100%",
  },
});
