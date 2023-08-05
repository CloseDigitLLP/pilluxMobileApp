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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../styles/colors";
import common from "../../styles/common";
import { connect } from "react-redux";
import { getAllEvents, updateEvent } from "../../services/Events/actions";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

function ButtonCard({ eventData, updateEvent, getAllEvents, events }) {
  const [showOption, setShowOption] = useState(null);
  const [selectedMotif, setSelectedMotif] = useState("");
  const [comment, setComment] = useState("");
  const [loadingEvent, setLoadingEvent] = useState(false);

  const navigation = useNavigation();

  const handlePressOk = () => {
    if (showOption === "present") {
      // navigation.navigate("Levels", { ...eventData });
      handleStatusUpdate(showOption);
    } else if (showOption === "absent") {
      handleStatusUpdate(showOption);
    }
  };

  const handleChangeMotif = (value) => {
    setSelectedMotif(value);
  };

  const handleStatusUpdate = async (status) => {
    try {
      if (!selectedMotif && status === "absent") {
        return Toast.show({
          type: "error",
          text1: "Please select motif !"
        })
        // return ToastAndroid.show("Please select motif!", ToastAndroid.SHORT);
      }
      setLoadingEvent(true);
      let payload = {
        status: status,
        comment: comment,
      };
      if (status === "absent") {
        payload["motif"] = selectedMotif;
      }
      await updateEvent(payload, eventData?.id);
      // await getAllEvents();
      let eventIndex = events?.findIndex((item) => item?.id === eventData?.id)
      if(eventIndex){ events[eventIndex] = {
        ...events[eventIndex],
        status,
        comment
      } }

      resetStates();
      if (status === "present") {
        navigation.navigate("Levels", { ...eventData });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error happened while updating event !"
      })
      // ToastAndroid.show(
      //   "Error happened while updating event!",
      //   ToastAndroid.SHORT
      // );
    } finally {
      setLoadingEvent(false);
    }
  };

  const resetStates = () => {
    setShowOption(null);
    setComment("");
    setSelectedMotif("");
  };

  if (loadingEvent)
    return (
      <>
        <ActivityIndicator />
      </>
    );

  return (
    <>
      {eventData?.status !== "pending" ? (
        <></>
      ) : (
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
      )}
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
            <TextInput
              value={comment}
              onChangeText={setComment}
              multiline
              style={styles.whiteCardContent}
            ></TextInput>
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
  const [pastEventsLite, setPastEventsLite] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [upcomingEventsLite, setUpcomingEventsLite] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    if(!events?.length){
      getAllEvents()
        .then()
        .catch()
        .finally(() => setLoader(false));
    }
  }, []);

  useEffect(() => {
    if (events?.length) {
      setLoader(true);
      let pastEventsData = [];
      let upcomingEventsData = [];

      events?.map((event) => {
        if (moment(event?.start_horary, "YYYY-MM-DD HH:mm:ss").isAfter(moment())) {
          upcomingEventsData.push(event);
        } else {
          pastEventsData.push(event);
        }
      });

      pastEventsData.sort((a, b) => {
        const timeA = moment(a.start_horary, "YYYY-MM-DD HH:mm:ss");
        const timeB = moment(b.start_horary, "YYYY-MM-DD HH:mm:ss");

        if (timeA.isBefore(timeB)) {
          return 1;
        } else if (timeA.isAfter(timeB)) {
          return -1;
        } else {
          return 0;
        }
      });

      upcomingEventsData.sort((a, b) => {
        const timeA = moment(a.start_horary, "YYYY-MM-DD HH:mm:ss");
        const timeB = moment(b.start_horary, "YYYY-MM-DD HH:mm:ss");

        if (timeA.isBefore(timeB)) {
          return -1; // Return -1 for ascending order (oldest to latest)
        } else if (timeA.isAfter(timeB)) {
          return 1; // Return 1 for descending order (latest to oldest)
        } else {
          return 0;
        }
      });

      setPastEvents(pastEventsData);
      setUpcomingEvents(upcomingEventsData);
      setLoader(false);
    }
  }, [events]);

  // useEffect(() => {
  //   if(upcomingEvents?.length){
  //     setUpcomingEventsLite(upcomingEvents?.slice(0, 10))
  //   }else{
  //     setUpcomingEventsLite([])
  //   }
  // }, [upcomingEvents])

  // useEffect(() => {
  //   if(pastEvents?.length){
  //     setPastEventsLite(pastEvents?.slice(0, 10))
  //   }else{
  //     setPastEventsLite([])
  //   }
  // }, [pastEvents])

  return (
    <SafeAreaView style={{ backgroundColor: colors.primary }} >
      <StatusBar backgroundColor={colors.primary} />
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Événements à venir</Text>
        </View>
        <View style={{...common.mainContent, maxHeight: "40%" }}>
          <View style={styles.cardPart}>
            {loader ? (
              <ActivityIndicator />
            ) : (
              <>
              <FlatList 
                data={upcomingEvents}
                renderItem={( {item:eventData, index} ) => {
                  return (
                    <View style={styles.cardBox} key={index} >
                      <View style={common.cardTextPart}>
                        <View style={common.leftText}>
                          <Text style={common.contentText}>
                            {eventData?.studentGenerals?.firstname}{" "}
                            {eventData?.studentGenerals?.lastname} |{" "}
                            {eventData?.studentGenerals?.mobile}
                          </Text>
                          <Text style={common.contentText}>
                            Boîte : manuelle
                          </Text>
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
                            {moment(eventData?.start_horary).format(
                              "DD/MM/YYYY"
                            )}
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
                      <ButtonCard
                        loading={loading}
                        eventData={eventData}
                        updateEvent={updateEvent}
                        getAllEvents={getAllEvents}
                        events={events}
                      />
                    </View>
                  );
                }}
                keyExtractor={(eventData) => eventData?.id}
              />
                {/* {upcomingEventsLite?.map((eventData, index) => {
                  return (
                    <View style={styles.cardBox} key={index}>
                      <View style={common.cardTextPart}>
                        <View style={common.leftText}>
                          <Text style={common.contentText}>
                            {eventData?.studentGenerals?.firstname}{" "}
                            {eventData?.studentGenerals?.lastname} |{" "}
                            {eventData?.studentGenerals?.mobile}
                          </Text>
                          <Text style={common.contentText}>
                            Boîte : manuelle
                          </Text>
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
                            {moment(eventData?.start_horary).format(
                              "DD/MM/YYYY"
                            )}
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
                      <ButtonCard
                        loading={loading}
                        eventData={eventData}
                        updateEvent={updateEvent}
                        getAllEvents={getAllEvents}
                        events={events}
                      />
                    </View>
                  );
                })} */}
                {upcomingEventsLite?.length < 1 && (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginTop: 20,
                      fontSize: 16,
                    }}
                  >
                    No records found!
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
        <View style={common.headerPart}>
          <Text style={common.headerText}>événements passés à confirmer</Text>
        </View>
        <View style={{...common.mainContent }}>
          <View style={styles.cardPart}>
            {loader ? (
              <ActivityIndicator />
            ) : (
              <>
              <FlatList 
                data={pastEvents}
                renderItem={( {item:eventData, index} ) => {
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
                          <Text style={common.contentText}>
                            Boîte : manuelle
                          </Text>
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
                            {moment(eventData?.start_horary).format(
                              "DD/MM/YYYY"
                            )}
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
                      <ButtonCard
                        loading={loading}
                        eventData={eventData}
                        updateEvent={updateEvent}
                        getAllEvents={getAllEvents}
                      />
                    </View>
                  );
                }}
                keyExtractor={(eventData) => eventData?.id}
              />
                {pastEventsLite?.map((eventData, index) => {
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
                          <Text style={common.contentText}>
                            Boîte : manuelle
                          </Text>
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
                            {moment(eventData?.start_horary).format(
                              "DD/MM/YYYY"
                            )}
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
                      <ButtonCard
                        loading={loading}
                        eventData={eventData}
                        updateEvent={updateEvent}
                        getAllEvents={getAllEvents}
                      />
                    </View>
                  );
                })}
                {pastEventsLite?.length < 1 && (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginTop: 20,
                      fontSize: 16,
                    }}
                  >
                    No records found!
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
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
    lineHeight: 22,
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
    loading: state?.eventsReducer?.loading,
  };
};

const mapDispatchToProps = {
  getAllEvents,
  updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
