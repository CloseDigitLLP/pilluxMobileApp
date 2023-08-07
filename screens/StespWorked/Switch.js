import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import colors from "../../styles/colors";
import { connect } from "react-redux";
import { updateStudentSkill } from "../../services/Students/actions";
import { getAllEvents, updateLocalEvents } from "../../services/Events/actions";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ThreeStateSwitch = ({ status, skillData, updateStudentSkill, studentId, getAllEvents, events, updateLocalEvents }) => {

    // Abordé => 1
    // Traité => 2
    // Assimilé => 3
    // console.log(JSON.stringify(events[0], 2, 2))

  const [switchState, setSwitchState] = useState(1);
  const [updateStateLoading, setUpdateStateLoading] = useState(false)

  const handleSwitchPress = () => {
    setSwitchState((switchState + 1) > 3 ? 1 : (switchState + 1))
  };

  useEffect(() => {
    if(status){
        if(status === "Abordé"){
            setSwitchState(1)
        }else if(status === "Traité"){
            setSwitchState(2)
        }else if(status === "Assimilé"){
            setSwitchState(3)
        }
    }
  }, [status])

  const handleStatusChange = async () => {
    try{

      if(switchState === 3){ return; }

      let payloadData = {
        student_id: studentId,
        skill_id: skillData?.id,
        status: switchState === 1 ? "Traité" : "Assimilé" 
      }
      skillData?.student_skill_id && (payloadData['id'] = skillData?.student_skill_id)

      setUpdateStateLoading(true)
      let { payload } = await updateStudentSkill([payloadData])
      await getAllEvents()

      // updateLocalEvents(events.map((event) => {
      //   if(event?.student_id === payload[0]?.student_id ){
      //     return {
      //       ...event,
      //       studentGenerals: {
      //         ...event['studentGenerals'],
      //         studentSkills: [
      //           ...event['studentGenerals']['studentSkills'],
      //           payload[0]
      //       ]
      //       }
      //     }
      //   }else{
      //     return event
      //   }
      // }))

      setSwitchState(switchState + 1)

    }catch(error){
      console.log(error)
      Toast.show({
        type: "error",
        text1: "Error while updating status!"
      })
      // ToastAndroid.show("Error while updating status!", ToastAndroid.SHORT)
    }finally{
      setUpdateStateLoading(false)
    }
  }

  if(updateStateLoading){
    return (
      <ActivityIndicator />
    )
  }else{
    return (
      <TouchableOpacity onPress={handleStatusChange} style={styles.container}>
        <View style={{...styles.slider, alignItems: switchState === 1 ? "flex-start" : switchState === 2 ? "center" : "flex-end"  }}>
          <View style={{...styles.sliderButton, backgroundColor: switchState === 1 ? "#EC5F43" : switchState === 2 ? "#FFC133" : "#33CA8F" }}></View>
        </View>
      </TouchableOpacity>
    );
  }

};

const styles = StyleSheet.create({
  container: { height: 30, display: "flex", justifyContent: "center" },
  slider: {
    backgroundColor: colors.gray,
    height: 12,
    width: 55,
    borderRadius: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderButton: {
    height: 25,
    width: 25,
    borderRadius: 9999,
    backgroundColor: "white",
  },
});

const mapStateToProps = (state) => {
    return {
      events: state?.eventsReducer?.events
    }
}

const mapDispatchToProps = {
    updateStudentSkill: updateStudentSkill,
    getAllEvents: getAllEvents,
    updateLocalEvents: updateLocalEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreeStateSwitch);
