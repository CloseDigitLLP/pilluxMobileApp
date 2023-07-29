import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../../../styles/common";
import SelectDropdown from "react-native-select-dropdown";
import CarImage from "../../../assets/images/car.jpeg";
import { connect, useSelector } from "react-redux";
import { logout } from "../../../services/Auth/actions";
import { useEffect, useState } from "react";
import colors from "../../../styles/colors";
import { getVehicle } from "../../../services/Vehicles/actions";
import { AntDesign } from "react-native-vector-icons";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import {
  createRepair,
  getRepairTypes,
  getRepairs,
  updateRepair,
} from "../../../services/Repairs/actions";
import * as DocumentPicker from "expo-document-picker";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import {
  createPenalty,
  getPenalties,
  getPenaltyTypes,
  updatePenalty,
} from "../../../services/Penalties/actions";
import { createReport, getReportTypes, getReports, getReportsTypes, updateReport } from "../../../services/Reports/actions";

function Tabs({
  repairTypes,
  getRepairTypes,
  selectedVehicle,
  createRepair,
  repairs,
  getRepairs,
  updateRepair,
  getPenalties,
  penalties,
  createPenalty,
  updatePenalty,
  getPenaltyTypes,
  penaltyTypes,
  createReport,
  getReports,
  reports,
  reportTypes,
  getReportTypes,
  updateReport
}) {
  const { id } = useSelector((state) => state?.authReducer?.data?.data);

  const [selectedTab, setSelectedTab] = useState("réparations");
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedType, setSelectedType] = useState({});
  const [document, setDocument] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [repairId, setRepairId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTableData, setSelectedTableData] = useState([]);

  useEffect(() => {
    if (!repairTypes?.length) {
      getRepairTypes();
    }
    if (!penaltyTypes?.length) {
      getPenaltyTypes();
    }
    if (!reportTypes?.length) {
      getReportTypes();
    }
    if (selectedVehicle?.id) {
      getRepairs(selectedVehicle?.id);
      getPenalties(selectedVehicle?.id);
      getReports(selectedVehicle?.id);
    }
  }, [selectedVehicle?.id]);

  useEffect(() => {
    try{
      if (selectedTab === "réparations" && repairs?.length) {
        setSelectedTableData(
          repairs?.map((item) => {
            return [
              moment(item?.date || undefined).format("DD/MM/YYYY"),
              item?.repairType?.subtype,
              item?.amount,
              item || {},
            ];
          })
        );
      } else if (selectedTab === "amendes" && penalties?.length) {
        setSelectedTableData(
          penalties?.map((item) => {
            return [
              moment(item?.date || undefined).format("DD/MM/YYYY"),
              item?.penaltyType?.subtype,
              item?.amount,
              item || {},
            ];
          })
        );
      } else if (selectedTab === "constats" && reports?.length) {
        setSelectedTableData(
          reports?.map((item) => {
            return [
              moment(item?.date || undefined).format("DD/MM/YYYY"),
              item?.reportType?.subtype,
              item?.amount || 0,
              item || {},
            ];
          })
        );
      } else {
        setSelectedTableData([]);
      }
    }catch(error){
      console.log(error)
    }
  }, [selectedTab, repairs, penalties, reports]);

  const commonUpdate = async (payload, data, id) => {
    if (selectedTab === "réparations") {
      payload.append("repairData", JSON.stringify(data));
      await updateRepair(
        payload,
        id,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getRepairs(selectedVehicle?.id);
    } else if (selectedTab === "amendes") {
      payload.append("penaltyData", JSON.stringify(data));
      await updatePenalty(
        payload,
        id,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getPenalties(selectedVehicle?.id);
    } else if (selectedTab === "constats") {
      payload.append("reportData", JSON.stringify(data));
      await updateReport(
        payload,
        id,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getReports(selectedVehicle?.id);
    }
  };

  const commonCreate = async (payload, data) => {
    if (selectedTab === "réparations") {
      payload.append("repairData", JSON.stringify(data));
      await createRepair(
        payload,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getRepairs(selectedVehicle?.id);
    } else if (selectedTab === "amendes") {
      payload.append("penaltyData", JSON.stringify(data));
      await createPenalty(
        payload,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getPenalties(selectedVehicle?.id);
    } else if (selectedTab === "constats") {
      payload.append("reportData", JSON.stringify(data));
      await createReport(
        payload,
        { "content-type": "multipart/form-data" },
        {
          transformRequest: (fdata, error) => {
            return payload;
          },
        }
      );
      await getReports(selectedVehicle?.id);
    }
  };

  const uploadRepair = async () => {
    try {
      setLoading(true);
      let payload = new FormData();
      let data = {
        vehicle_id: selectedVehicle?.id,
        instructor_id: id,
        type_id: selectedType?.id,
        amount,
        comment,
        date,
        docs: {
          id: document?.id,
          document_id: document?.documentId,
        },
      };
      if (document?.create) {
        let copyDocument = document;
        delete copyDocument.create;
        payload.append(selectedType?.subtype, copyDocument);
      }

      if (isEdit) {
        await commonUpdate(payload, data, repairId);
      } else {
        await commonCreate(payload, data);
      }

      setShowForm(false);
      resetStates();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png", "application/pdf"],
      });
      let filename = result.uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      if (!match[1]) {
        return ToastAndroid.show("Unsupported file!", ToastAndroid.SHORT);
      }
      let type = match[1] === "pdf" ? "application/pdf" : `image/${match[1]}`;
      setDocument({
        uri: result.uri,
        name: filename,
        type,
        size: result.size,
        create: true,
        id: document?.id,
        documentId: document?.documentId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (data) => {
    setIsEdit(true);
    setRepairId(data?.id);
    setAmount(data?.amount || 0);
    setComment(data?.comment);
    setDate(new Date(data?.date));
    setSelectedType(
      selectedTab === "réparations"
        ? data?.repairType
        : selectedTab === "amendes"
        ? data?.penaltyType
        : selectedTab === "constats"
        ? data?.reportType
        : {}
    );
    let fileName =
      selectedTab === "réparations"
        ? data?.repairDoc?.documentRepair?.path
        : selectedTab === "amendes"
        ? data?.penaltyDocs?.documentPenalty?.path
        : selectedTab === "constats"
        ? data?.reportDocs?.documentReport?.path
        : "";
    fileName = fileName?.split("\\");
    fileName = fileName?.[fileName?.length - 1];

    let id =
      selectedTab === "réparations"
        ? data?.repairDoc?.id
        : selectedTab === "amendes"
        ? data?.penaltyDocs?.id
        : selectedTab === "constats"
        ? data?.reportDocs?.id
        : undefined;

    let documentId =
      selectedTab === "réparations"
        ? data?.repairDoc?.document_id
        : selectedTab === "amendes"
        ? data?.penaltyDocs?.document_id
        : selectedTab === "constats"
        ? data?.reportDocs?.document_id
        : undefined;

    let type =
      selectedTab === "réparations"
        ? data?.repairDoc?.documentRepair?.type
        : selectedTab === "amendes"
        ? data?.penaltyDocs?.documentPenalty?.type
        : selectedTab === "constats"
        ? data?.reportDocs?.documentReport?.type
        : "";

    setDocument({
      name: fileName,
      type,
      id,
      documentId,
    });
    setShowForm(true);
  };

  const resetStates = () => {
    setAmount(0);
    setRepairId("");
    setComment("");
    setDate(new Date());
    setSelectedType({});
    setIsEdit(false);
    setDocument({})
  };

  const element = (data, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        openEditModal(data);
      }}
    >
      <Text >
        <AntDesign name={"edit"} size={18} color={"black"} />
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabsCard}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("réparations")}
          style={{
            ...styles.tab,
            backgroundColor:
              selectedTab === "réparations" ? colors.cyan : colors.secondary,
          }}
        >
          <Text style={styles.tabText}>réparations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("amendes")}
          style={{
            ...styles.tab,
            backgroundColor:
              selectedTab === "amendes" ? colors.cyan : colors.secondary,
          }}
        >
          <Text style={styles.tabText}>amendes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("constats")}
          style={{
            ...styles.tab,
            backgroundColor:
              selectedTab === "constats" ? colors.cyan : colors.secondary,
          }}
        >
          <Text style={styles.tabText}>constats</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, alignSelf: "baseline", width: "100%" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
        >
          <Text style={{ ...styles.labelText, marginBottom: 0 }}>
            Mes {selectedTab}
          </Text>
          <TouchableOpacity onPress={() => setShowForm(true)}>
            <AntDesign name={"pluscircle"} size={20} color={colors.cyan} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            padding: 10,
            marginTop: 15,
          }}
        >
          <Table style={{ flex: 1 }}>
            <Row
              style={{ width: "100%", columnGap: 20 }}
              flexArr={[2, 2, 1.5, 1]}
              textStyle={{ fontWeight: 700 }}
              data={["Date", "Type", "Montant", "Editer"]}
            ></Row>
            {selectedTableData?.map((rowData, index) => (
              <TableWrapper
                key={index}
                style={{ flexDirection: "row", paddingVertical: 10 }}
              >
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 3 ? element(cellData, index) : cellData}
                    style={
                      cellIndex === 0 || cellIndex === 1
                        ? { flex: 2 }
                        : cellIndex === 2
                        ? { flex: 1.5 }
                        : { flex: 1, alignItems: "center" }
                    }
                    textStyle={{ paddingStart: cellIndex === 2 ? 10 : 0 }}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
          {!(selectedTableData?.length > 0) && (
            <Text style={{ textAlign: "center", paddingVertical: 20 }}>
              Aucun enregistrement trouvé!
            </Text>
          )}
        </View>
        <Modal
          transparent
          visible={showForm}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ ...styles.labelText, marginBottom: 0, fontSize: 18 }}
                >
                  Formulaire pour un
                </Text>
                <TouchableOpacity
                  style={{ padding: 5, backgroundColor: colors.secondary }}
                  onPress={() => {
                    if (!loading) {
                      setShowForm(false);
                      resetStates();
                    }
                  }}
                >
                  <AntDesign name="close" size={20} color={"white"} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.labelText}>Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!loading) {
                      setDateOpen(true);
                    }
                  }}
                >
                  <Text style={{ ...styles.textWithBox, marginBottom: 0 }}>
                    {moment(date).format("DD/MM/YYYY")}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
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
              <View>
                <Text style={styles.labelText}>Upload document</Text>
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => openDocument()}
                >
                  <Text
                    style={{
                      ...styles.textWithBox,
                      marginBottom: 0,
                      backgroundColor: document?.name
                        ? colors.cyan
                        : colors.gray,
                    }}
                  >
                    {document?.name ? document.name : "Tap to upload document"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.labelText}>Type d'amende</Text>
                <SelectDropdown
                  data={
                    selectedTab === "réparations"
                      ? repairTypes
                      : selectedTab === "amendes"
                      ? penaltyTypes
                      : selectedTab === "constats"
                      ? reportTypes
                      : []
                  }
                  defaultValue={selectedType}
                  onSelect={(item) => {
                    setSelectedType(item);
                  }}
                  rowTextForSelection={(item) => {
                    return item?.subtype;
                  }}
                  buttonTextAfterSelection={(item) => {
                    return item?.subtype;
                  }}
                  buttonStyle={{
                    backgroundColor: colors.gray,
                    borderRadius: 9999,
                    height: 40,
                  }}
                  disabled={loading}
                  onFocus={() => setExpanded(true)}
                  onBlur={() => setExpanded(false)}
                  buttonTextStyle={{ color: colors.white, fontSize: 14 }}
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
                    borderRadius: 10,
                    minWidth: 260,
                  }}
                  rowTextStyle={{
                    color: colors.white,
                  }}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Comment</Text>
                <TextInput
                  editable={!loading}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  style={styles.textInput}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Montant</Text>
                <TextInput
                  editable={!loading}
                  value={`${amount}`}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  maxLength={10}
                  style={styles.textInput}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={uploadRepair}
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
                  onPress={() => setShowForm(false)}
                >
                  <Text style={styles.btnText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

function Vehicle({
  logout,
  getVehicle,
  vehicleData,
  savedVehiclesData,
  getRepairTypes,
  repairTypes,
  createRepair,
  getRepairs,
  repairs,
  updateRepair,
  getPenalties,
  penalties,
  updatePenalty,
  createPenalty,
  getPenaltyTypes,
  penaltyTypes,
  createReport,
  getReports,
  reports,
  getReportTypes,
  reportTypes,
  updateReport
}) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [vehicleReciepts, setVehicleReciepts] = useState({});
  const [expanded, setExpanded] = useState(false);

  const { userDrivingschool } = useSelector(
    (state) => state?.authReducer?.data?.data
  );

  useEffect(() => {
    if (userDrivingschool?.length) {
      let vehiclesData = [];

      userDrivingschool?.map((drivingSchool) => {
        if (drivingSchool?.drivingSchoolUser?.drivingSchoolVehicles?.length) {
          drivingSchool?.drivingSchoolUser?.drivingSchoolVehicles?.map(
            (vehicle) => {
              vehiclesData.push(vehicle);
            }
          );
        }
      });

      setVehicles(vehiclesData);
    }
  }, [userDrivingschool]);

  useEffect(() => {
    if (selectedVehicle?.id) {
      let savedVehicle = savedVehiclesData?.find(
        (vehicle) => vehicle?.id === selectedVehicle?.id
      );
      if (!savedVehicle) {
        fetchVehicleData(selectedVehicle?.id);
      }
    }
  }, [selectedVehicle]);

  const fetchVehicleData = async (id) => {
    try {
      await getVehicle(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (savedVehiclesData?.length && selectedVehicle?.id) {
      let currentVehicle = savedVehiclesData?.find(
        (vehicle) => vehicle?.id === selectedVehicle?.id
      );
      if (currentVehicle?.id) {
        setVehicleReciepts(currentVehicle);
      } else {
        setVehicleReciepts({});
      }
    }
  }, [savedVehiclesData, selectedVehicle]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} />
      <View style={common.container}>
        <View style={common.headerPart}>
          <Text style={common.headerText}>véhicule</Text>
        </View>
        <ScrollView>
          <View style={styles.bodyCard}>
            <View style={styles.formCard}>
              <View style={{ rowGap: 0 }}>
                <Text style={styles.labelText}>Select vehicle</Text>
                <SelectDropdown
                  data={vehicles}
                  onSelect={(item) => {
                    setSelectedVehicle(item);
                  }}
                  rowTextForSelection={(item) => {
                    return item?.name;
                  }}
                  buttonTextAfterSelection={(item) => {
                    return item?.name;
                  }}
                  buttonStyle={{
                    backgroundColor: colors.gray,
                    borderRadius: 9999,
                    height: 40,
                  }}
                  onFocus={() => setExpanded(true)}
                  onBlur={() => setExpanded(false)}
                  buttonTextStyle={{ color: colors.white }}
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
              </View>
            </View>
            {selectedVehicle?.vehicleImage?.[0]?.path && (
              <View>
                <Text style={styles.labelText}>Photo de ma voiture</Text>
                <Image
                  source={{
                    uri: `http://192.168.1.42:5001/${selectedVehicle?.vehicleImage?.[0]?.path}`,
                  }}
                  style={{ height: 150, width: 150 }}
                />
              </View>
            )}

            {selectedVehicle?.id && (
              <>
                <View>
                  <Text style={styles.labelText}>Immatriculation</Text>
                  <Text style={styles.textWithBox}>
                    {selectedVehicle?.immatriculation}
                  </Text>
                </View>
                <Tabs
                  getRepairTypes={getRepairTypes}
                  repairTypes={repairTypes}
                  selectedVehicle={selectedVehicle}
                  createRepair={createRepair}
                  repairs={repairs}
                  getRepairs={getRepairs}
                  updateRepair={updateRepair}
                  getPenalties={getPenalties}
                  penalties={penalties}
                  createPenalty={createPenalty}
                  updatePenalty={updatePenalty}
                  getPenaltyTypes={getPenaltyTypes}
                  penaltyTypes={penaltyTypes}
                  createReport={createReport}
                  getReports={getReports}
                  reports={reports}
                  getReportTypes={getReportTypes}
                  reportTypes={reportTypes}
                  updateReport={updateReport}
                />
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  modalCard: {
    backgroundColor: colors.secondary,
    width: "80%",
    padding: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    rowGap: 20,
  },
  modalContainer: {
    backgroundColor: "#00000066",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    color: colors.white,
    textAlign: "center",
  },
  tabsCard: {
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    minWidth: "90%",
  },
  tab: {
    backgroundColor: colors.gray,
    padding: 14,
    borderRadius: 9999,
    minWidth: 100,
  },
  bodyCard: {
    padding: 20,
    rowGap: 30,
  },
  formCard: {},
  inputGroup: {
    rowGap: 20,
  },
  labelText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
  textWithBox: {
    ...common.contentText,
    backgroundColor: colors.gray,
    padding: 10,
    textAlign: "center",
    borderRadius: 9999,
  },
});

const mapStateToProps = (state) => {
  return {
    vehicleData: state?.vehiclesReducer?.vehicle,
    repairTypes: state?.repairsReducer?.repairTypes,
    savedVehiclesData: state?.vehiclesReducer?.savedVehiclesData,
    repairs: state?.repairsReducer?.repairs,
    penalties: state?.penaltiesReducer?.penalties,
    penaltyTypes: state?.penaltiesReducer?.penaltyTypes,
    reports: state?.reportsReducer?.reports,
    reportTypes: state?.reportsReducer?.reportTypes
  };
};

const mapDispatchToProps = {
  logout: logout,
  getVehicle,
  getRepairTypes,
  createRepair,
  getRepairs,
  updateRepair,
  getPenalties,
  createPenalty,
  updatePenalty,
  getPenaltyTypes,
  createReport,
  getReports,
  getReportTypes,
  updateReport
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
