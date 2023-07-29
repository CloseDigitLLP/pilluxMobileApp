import React, { useEffect, useState } from "react";
import colors from "../../styles/colors";
import common from "../../styles/common";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "react-native-vector-icons";
import moment from "moment";
import ThreeStateSwitch from "./Switch";
import { connect } from "react-redux";

const CustomAccordion = ({ skillsData, studentId }) => {
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
            Etapes ({skillsData[0]?.name})
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
              ...common.content,
              paddingHorizontal: 5,
              paddingVertical: 15,
              marginTop: 0,
            }}
          >
            <ScrollView>
              {skillsData?.map((skillData, index) => {
                return (
                  <View key={index} style={styles.skillCard}>
                    <ThreeStateSwitch
                      status={skillData?.status}
                      skillData={skillData}
                      studentId={studentId}
                    />
                    <Text style={{ width: "70%" }}>{skillData?.level}</Text>
                  </View>
                );
              })}
            </ScrollView>
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

      filteredData?.sort((a, b) => b?.[0]?.position - a?.[0]?.position);

      setSkillData(filteredData);
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
  return (
    <SafeAreaView>
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
                <Text style={common.contentText}>Boîte : manuelle</Text>
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
            <ScrollView style={styles.container}>
              {skillsData?.map((data, index) => {
                return (
                  <CustomAccordion
                    key={index}
                    skillsData={data}
                    studentId={eventData?.studentGenerals?.id}
                  />
                );
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

const mapDispatchToProps = {};

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
    marginTop: 30,
  },
});
