import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../../../styles/common";
import { useEffect, useState } from "react";
import colors from "../../../styles/colors";
import { AntDesign } from "react-native-vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { connect } from "react-redux";
import { getAllStudents } from "../../../services/Students/actions";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

function Students({ students, getAllStudents }) {
  const [searchText, setSearchText] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [levels, setLevels] = useState([
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "MAITRISER",
    },
    {
      id: 2,
      name: "APPRÉHENDER",
    },
    {
      id: 3,
      name: "CIRCULER",
    },
    {
      id: 4,
      name: "PRATIQUER",
    },
  ]);

  const [selectedLevel, setSelectedLevel] = useState({});
  const [expanded, setExpanded] = useState(false);

  const navigation = useNavigation();

  const getAllStudentsAsync = async () => {
    try {
      setLoader(true);
      await getAllStudents();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllStudentsAsync();
  }, []);

  const filterByLevel = (data, conditionValue) => {
    return data?.filter((item) => item?.level?.position === conditionValue);
  };

  useEffect(() => {
    try{
      setLoader(true);
    console.log("reach")
    if (students?.length) {
      if (searchText) {
        let lowerCaseSearchText = searchText.toLowerCase();
        let searchFilteredData = students?.filter((studentData) => {
          let lowerCaseStudentName =
            `${studentData?.firstname} ${studentData?.lastname}`?.toLowerCase();
          return lowerCaseStudentName?.includes(lowerCaseSearchText);
        });

        if (selectedLevel?.id && selectedLevel.position !== 0) {
          setStudentsData(filterByLevel(searchFilteredData, selectedLevel?.id));
        } else {
          setStudentsData(searchFilteredData);
        }
      } else if (selectedLevel?.id && selectedLevel.position !== 0) {
        setStudentsData(filterByLevel(students, selectedLevel?.id));
      } else {
        setStudentsData(students);
      }
    } else {
      setStudentsData([]);
    }
  }catch(error){
    console.log(error)
  }finally{
    console.log("white")
    setLoader(false);
  }
  }, [students, searchText, selectedLevel]);

  function StudentCard({ item }) {
    const handleStudentClick = () => {
      navigation.navigate("examReadyStudent", { data: item });
    };

    return (
      <TouchableOpacity
        onPress={handleStudentClick}
        style={[
          styles.inputField,
          { flexDirection: "row", alignItems: "center", marginBottom: 10 },
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
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: 500 }}>
            {item?.firstname?.[0]}
            {item?.lastname?.[0]}
          </Text>
        </View>
        <View style={{ marginLeft: 10, width: "100%" }}>
          <Text style={{ color: colors?.white, fontSize: 18, width: "80%" }}>
            {item?.firstname} {item?.lastname}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>Mes élèves</Text>
        </View>
        <View style={common.mainContent}>
          <View style={{ padding: 10, rowGap: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                style={styles.inputField}
                placeholder="Rechercher un élève"
                placeholderTextColor={colors.gray}
              />
              <Text style={{ marginLeft: -50 }}>
                <AntDesign name={"search1"} size={26} color={colors.white} />
              </Text>
            </View>
            {console.log(loader)}
            <SelectDropdown
              data={levels}
              disabled={!levels?.length}
              defaultButtonText={
                !levels?.length ? "No Level found!" : "Select an option."
              }
              onSelect={(item) => {
                setSelectedLevel(item);
              }}
              rowTextForSelection={(item) => {
                return item?.name;
              }}
              buttonTextAfterSelection={(item) => {
                return item?.name;
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: colors.cyan,
                borderRadius: 9999,
                // height: 40,
                width: "100%",
              }}
              onFocus={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
              defaultValueByIndex={0}
              buttonTextStyle={{ color: colors.white, fontSize: 16 }}
              renderDropdownIcon={() => {
                return (
                  <View style={{ marginRight: 15 }}>
                    <AntDesign
                      name={expanded ? "up" : "down"}
                      size={14}
                      color="white"
                    />
                  </View>
                );
              }}
              dropdownStyle={{
                backgroundColor: colors.gray,
                marginTop: -30,
                borderRadius: 10,
              }}
              rowTextStyle={{
                color: colors.white,
              }}
            />
            {loader ? (
              <ActivityIndicator />
            ) : (
              <>
                <FlatList
                  data={studentsData}
                  renderItem={StudentCard}
                  keyExtractor={(item) => item?.id}
                  style={{ marginTop: 30 }}
                />
                {!studentsData?.length && (
                  <Text
                    style={{
                      color: colors.white,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {" "}
                    No records found!{" "}
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

const mapStateProps = (state) => {
  return {
    students: state?.studentsReducer?.students,
  };
};

const mapDispatchToProps = {
  getAllStudents,
};

export default connect(mapStateProps, mapDispatchToProps)(Students);
