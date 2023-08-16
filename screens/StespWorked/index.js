import React, { useEffect, useState } from "react";
import colors from "../../styles/colors";
import common from "../../styles/common";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "react-native-vector-icons";
import moment from "moment";
import ThreeStateSwitch from "./Switch";
import { connect } from "react-redux";
import { updateStudentSkill } from "../../services/Students/actions";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const CustomAccordion = ({ data, studentId, setSkillsData, skillsData, checkedSkills, setCheckedSkills }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordianClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <View style={{ marginTop: 10 }} >
        <TouchableOpacity
          style={{
            ...common.titleContainer,
            backgroundColor: "#f0f0f0",
            paddingVertical: 10,
            borderRadius: 4,
          }}
          onPress={handleAccordianClick}
        >
          <Text style={{ ...common.title, width: "70%" }}>
            Etapes ({data[0]?.name})
          </Text>
          <AntDesign
            name={expanded ? "caretup" : "caretdown"}
            size={14}
            color="black"
          />
        </TouchableOpacity>
        {expanded && (
          <View
            style={{
              backgroundColor: '#f0f0f0',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: 5,
              paddingVertical: 15,
              marginTop: 0
            }}
          >
            {data?.map((skillData, index) => {
              return (
                <View key={index} style={styles.skillCard}>
                  <ThreeStateSwitch
                    status={skillData?.status}
                    skillData={skillData}
                    studentId={studentId}
                    skillsData={skillsData}
                    setSkillsData={setSkillsData}
                    checkedSkills={checkedSkills}
                    setCheckedSkills={setCheckedSkills}
                  />
                  <Text style={{ width: "70%" }}>{skillData?.level}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

const StepedStudent = (props) => {
  const [skillsData, setSkillData] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState({});
  const [checkedSkills, setCheckedSkills] = useState([])
  const [saveSkillLoader, setSaveSkillLoader] = useState(false)
  
  const navigation = useNavigation()

  useEffect(() => {
    if (eventData?.studentGenerals) {
      let allData = [];
      eventData?.studentGenerals?.drivingSchoolStudents?.drivingSchoolSkills?.sort(
        (a, b) => a?.id - b?.id
      );
      eventData?.studentGenerals?.drivingSchoolStudents?.drivingSchoolSkills?.map(
        (skill) => {
          allData[skill?.position - 1] = [
            ...(allData[skill?.position - 1] || []),
            { ...skill, status: "Abordé" },
          ];
        }
      );

      allData = allData?.map((item) => {
        if (!item) {
          return [];
        } else {
          return item;
        }
      });

      eventData?.studentGenerals?.studentSkills?.map((item) => {
        allData?.map((group, index) => {
          let existingIndex = group?.findIndex(
            (skillData) => skillData?.id === item?.skillId?.id
          );
          if (existingIndex >= 0) {
            allData[index][existingIndex] = {
              ...item?.skillId,
              status: item?.status,
              student_skill_id: item?.id,
            };
            return;
          }
        });
      });

      let filteredData = [];

      for (let data of allData) {
        let nonUpdatedElement = data.find((item) => {
          return item?.status === "Abordé";
        });

        filteredData.push(data);
        if (nonUpdatedElement) {
          break;
        } else {
          continue;
        }
      }

      allData?.sort((a, b) => b?.[0]?.position - a?.[0]?.position);

      setSkillData(allData);
    }
  }, [eventData]);

  useEffect(() => {
    setEventId(props?.route?.params?.id);
  }, [props?.route?.params]);

  useEffect(() => {
    if (props?.events?.length && eventId) {
      let event = props?.events?.find((data) => {
        return data?.id === eventId;
      });
      setEventData(event);
    }
  }, [props.events, eventId]);

  const handleSaveSkills = async () => {
    try{
      setSaveSkillLoader(true)
      if(checkedSkills?.length>0){
        await props?.updateStudentSkill(checkedSkills)
      }
      navigation.goBack()
    }catch(error){
      Toast.show({
        type: 'error',
        text1: "Une erreur s'est produite lors de la sauvegarde des compétences"
      })
    }finally{
      setSaveSkillLoader(false)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }} >
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Étapes travaillées avec l'élève</Text>
        </View>
        <View style={common.mainContent}>
          <View style={styles.cardBoxEvent}>
            <View style={common.cardTextPart}>
              <View style={common.leftText}>
                <Text style={common.contentText}>
                  {eventData?.studentGenerals?.firstname}{" "}
                  {eventData?.studentGenerals?.lastname} |{" "}
                  {eventData?.studentGenerals?.mobile}
                </Text>
                <Text style={common.contentText}>Boîte : {eventData?.gearbox}</Text>
                <Text style={common.contentText}>Type : {eventData?.type}</Text>
              </View>
              <View style={common.rightText}>
                <Text
                  style={{ ...common.contentText, ...common.contentTextRight }}
                >
                  {moment(eventData?.start_horary).format("DD/MM/YYYY")}
                </Text>
                <Text
                  style={{ ...common.contentText, ...common.contentTextRight }}
                >
                  {moment(eventData?.start_horary).format("HH[h]mm")}
                </Text>
                <Text
                  style={{ ...common.contentText, ...common.contentTextRight }}
                >
                  {moment(eventData?.end_horary).diff(
                    moment(eventData?.start_horary),
                    "hours"
                  )}
                  h
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 30 }} >
            <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleSaveSkills}
                  disabled={saveSkillLoader}
                >
                  {saveSkillLoader ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.btnText}>Valider</Text>
                  )}
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
              {skillsData?.map((data, index) => {

                if((skillsData?.length - 1) === index){
                  return (
                    <CustomAccordion
                      key={index}
                      data={data}
                      studentId={eventData?.studentGenerals?.id}
                      setSkillsData={setSkillData}
                      skillsData={skillsData}
                      setCheckedSkills={setCheckedSkills}
                      checkedSkills={checkedSkills}
                    />
                  );
                }else{
                  let nonUpdatedElement = skillsData[index+1].find((item) => {
                    return item?.status === "Abordé";
                  });
                  if(nonUpdatedElement){
                    return (<></>)
                  }else{
                    return (
                      <CustomAccordion
                        key={index}
                        data={data}
                        studentId={eventData?.studentGenerals?.id}
                        setSkillsData={setSkillData}
                        skillsData={skillsData}
                        checkedSkills={checkedSkills}
                        setCheckedSkills={setCheckedSkills}
                      />
                    );
                  }
                }

              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state?.eventsReducer?.events,
  };
};

const mapDispatchToProps = {
  updateStudentSkill
};

export default connect(mapStateToProps, mapDispatchToProps)(StepedStudent);

const styles = StyleSheet.create({
  skillCard: {
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    marginTop: 10,
  },
  cardBoxEvent: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
    height: "97%",
  },
  container: {
    marginTop: 20,
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
