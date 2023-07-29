import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import common from "../../styles/common";
import { connect } from "react-redux";
import { getAllEvents, updateEvent } from "../../services/Events/actions";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";

function ButtonCard({ eventData, updateEvent, getAllEvents }) {
  const [showOption, setShowOption] = useState(null);
  const [selectedMotif, setSelectedMotif] = useState("");
  const [comment, setComment] = useState("")
  const [loadingEvent, setLoadingEvent] = useState(false)

  const navigation = useNavigation();

  const handlePressOk = () => {
    if(showOption === "present"){
      // navigation.navigate("Levels", { ...eventData });
      handleStatusUpdate(showOption)
    }else if(showOption === "absent"){
      handleStatusUpdate(showOption)
    }
  };

  const handleChangeMotif = (value) => {
    setSelectedMotif(value);
  };

  const handleStatusUpdate = async (status) => {
    try{
      if(!selectedMotif && (status === 'absent')){ return ToastAndroid.show("Please select motif!", ToastAndroid.SHORT) }
      setLoadingEvent(true)
      let payload = {
        status: status,
        comment: comment
      }
      if(status === 'absent'){
        payload['motif'] = selectedMotif
      }
      await updateEvent(payload, eventData?.id)
      await getAllEvents()
      resetStates()
      if(status === 'present'){
        navigation.navigate("Levels", { ...eventData });
      }
    }catch(error){
      console.error(error)
      ToastAndroid.show("Error happened while updating event!", ToastAndroid.SHORT)
    }finally{
      setLoadingEvent(false)
    } 
  }

  const resetStates = () => {
    setShowOption(null)
    setComment("")
    setSelectedMotif("")
  }

  if(loadingEvent) return (
    <>
      <ActivityIndicator />
    </>
  )

  return (
    <>
    {
      eventData?.status !== "pending" ?
      <></>
      :
      <View style={styles.cardBtn}>
        <TouchableOpacity
          style={styles.cardOutlineBtn}
          onPress={() => setShowOption("present")}
        >
          <Text style={styles.cardBtnText}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardFillBtn}
          onPress={() => setShowOption("absent")}
        >
          <Text style={styles.cardBtnText}>Absent</Text>
        </TouchableOpacity>
      </View>
    }
      {showOption && (
        <View style={styles.openableCard}>
          {showOption === "absent" && (
            <>
              <Text style={styles.openCardHeading}>Motif</Text>
              <View style={styles.motifCard}>
                <TouchableOpacity
                  onPress={() => handleChangeMotif("Absent(e)")}
                  style={
                    selectedMotif === "Absent(e)"
                      ? styles.cardFillBtn
                      : styles.cardOutlineBtn
                  }
                >
                  <Text style={styles.cardBtnText}>Absent(e)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeMotif("Retard")}
                  style={
                    selectedMotif === "Retard"
                      ? styles.cardFillBtn
                      : styles.cardOutlineBtn
                  }
                >
                  <Text style={styles.cardBtnText}>Retard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeMotif("Erreur de planning")}
                  style={
                    selectedMotif === "Erreur de planning"
                      ? styles.cardFillBtn
                      : styles.cardOutlineBtn
                  }
                >
                  <Text style={styles.cardBtnText}>Erreur de planning</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <Text style={styles.openCardHeading}>commentaire</Text>
          <View style={styles.whiteCard}>
            <TextInput value={comment} onChangeText={setComment} multiline style={styles.whiteCardContent}>
            </TextInput>
          </View>
          <View style={styles.cardBtn}>
            <TouchableOpacity
              onPress={handlePressOk}
              style={styles.cardOutlineBtn}
            >
              <Text style={styles.cardBtnText}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOption(null)}
              style={styles.cardFillBtn}
            >
              <Text style={styles.cardBtnText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

function App({ events, getAllEvents, updateEvent, loading }) {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (events?.length) {
      let pastEventsData = [];
      let upcomingEventsData = [];

      events?.map((event) => {
        if (
          moment(event?.start_horary, "YYYY-MM-DD HH:mm:ss").isAfter(moment())
        ) {
          upcomingEventsData.push(event);
        } else {
          pastEventsData.push(event);
        }
      });

      setPastEvents(pastEventsData);
      setUpcomingEvents(upcomingEventsData);
    }
  }, [events]);

  return (
    <SafeAreaView>
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Événements à venir</Text>
        </View>
        <ScrollView style={common.mainContent}>
          <View style={styles.cardPart}>
            {upcomingEvents?.map((eventData, index) => {
              return (
                <View style={styles.cardBox} key={index}>
                  <View style={common.cardTextPart}>
                    <View style={common.leftText}>
                      <Text style={common.contentText}>
                        {eventData?.studentGenerals?.firstname}{" "}
                        {eventData?.studentGenerals?.lastname} |{" "}
                        {eventData?.studentGenerals?.mobile}
                      </Text>
                      <Text style={common.contentText}>Boîte : manuelle</Text>
                      <Text style={common.contentText}>
                        Type : {eventData?.type}
                      </Text>
                    </View>
                    <View style={common.rightText}>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.start_horary).format("DD/MM/YYYY")}
                      </Text>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.start_horary).format("HH[h]mm")}
                      </Text>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.end_horary).diff(
                          moment(eventData?.start_horary),
                          "hours"
                        )}
                        h
                      </Text>
                    </View>
                  </View>
                  <ButtonCard loading={loading} eventData={eventData} updateEvent={updateEvent} getAllEvents={getAllEvents} />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={common.headerPart}>
          <Text style={common.headerText}>événements passés à confirmer</Text>
        </View>
        <ScrollView style={common.mainContent}>
          <View style={styles.cardPart}>
            {pastEvents?.map((eventData, index) => {
              return (
                <View
                  key={index}
                  style={{ ...styles.cardBox, ...styles.cardBoxGray }}
                >
                  <View style={common.cardTextPart}>
                    <View style={common.leftText}>
                      <Text style={common.contentText}>
                        {eventData?.studentGenerals?.firstname}{" "}
                        {eventData?.studentGenerals?.lastname} |{" "}
                        {eventData?.studentGenerals?.mobile}
                      </Text>
                      <Text style={common.contentText}>Boîte : manuelle</Text>
                      <Text style={common.contentText}>
                        Type : {eventData?.type}
                      </Text>
                    </View>
                    <View style={common.rightText}>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.start_horary).format("DD/MM/YYYY")}
                      </Text>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.start_horary).format("HH[h]mm")}
                      </Text>
                      <Text
                        style={{
                          ...common.contentText,
                          ...common.contentTextRight,
                        }}
                      >
                        {moment(eventData?.end_horary).diff(
                          moment(eventData?.start_horary),
                          "hours"
                        )}
                        h
                      </Text>
                    </View>
                  </View>
                  <ButtonCard loading={loading} eventData={eventData} updateEvent={updateEvent} getAllEvents={getAllEvents} />
                </View>
              );
            })}
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cardBoxGray: {
    backgroundColor: colors.gray,
  },
  openableCard: {
    marginTop: 10,
  },
  openCardHeading: {
    color: colors.white,
  },
  motifCard: {
    paddingVertical: 14,
    display: "flex",
    rowGap: 12,
    alignItems: "center",
  },
  whiteCard: {
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  whiteCardContent: {
    fontSize: 12,
    lineHeight: 22
  },
  cardBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    columnGap: 10,
  },
  cardOutlineBtn: {
    borderWidth: 1,
    borderColor: colors.cyan,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 120,
  },
  cardFillBtn: {
    backgroundColor: colors.cyan,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 120,
  },
  cardBtnText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    events: state?.eventsReducer?.events,
    loading: state?.eventsReducer?.loading
  };
};

const mapDispatchToProps = {
  getAllEvents,
  updateEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
