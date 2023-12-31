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
import { connect, useSelector } from "react-redux";
import { logout } from "../../../services/Auth/actions";
import { useCallback, useEffect, useState } from "react";
import colors from "../../../styles/colors";
import { getVehicle, getVehicles } from "../../../services/Vehicles/actions";
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
import { baseUrl } from "../../../config/urls";
import { useFocusEffect } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

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
  const [documents, setDocuments] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [repairId, setRepairId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [error, setError] = useState({
    amount: false,
    date: false,
    document: false,
    type: false
  })
  const [deletedDocsIds, setDeletedDocsIds] = useState([])

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
    try {
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
    } catch (error) {
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
    setDeletedDocsIds([])
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

  const changeError = (label) => {
    let copyError = error
    copyError[label] = false
    error?.[label] && setError(copyError)
  }

  const uploadRepair = async () => {
    try {
      setLoading(true);

      if (!selectedType?.id) {
        return setError({ ...error, type: true })
      } else {
        changeError('type')
      }

      if (!amount) {
        return setError({ ...error, amount: true })
      } else {
        changeError('amount')
      }

      if (!date) {
        return setError({ ...error, date: true })
      } else {
        changeError('date')
      }

      if (!documents?.length) {
        return setError({ ...error, document: true })
      } else {
        changeError('document')
      }

      let payload = new FormData();
      let data = {
        vehicle_id: selectedVehicle?.id,
        instructor_id: id,
        type_id: selectedType?.id,
        amount,
        comment,
        date,
        deletedDocsIds
      };

      for(let document of documents){
        if (document?.create) {
          let copyDocument = document;
          delete copyDocument.create;
          payload.append(selectedType?.subtype, copyDocument);
        }
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
        return Toast.show({
          type: "error",
          text1: "Unsupported file!"
        })
        // return ToastAndroid.show("Unsupported file!", ToastAndroid.SHORT);
      }
      let type = match[1] === "pdf" ? "application/pdf" : `image/${match[1]}`;
      setDocuments([
        ...documents,
        {
          uri: result.uri,
          name: filename,
          type,
          size: result.size,
          create: true
        }
      ])
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

    const listedDocs = data?.[ selectedTab === "réparations"
    ? "repairDoc"
    : selectedTab === "amendes"
      ? "penaltyDocs"
      : selectedTab === "constats" ? 'reportDocs' : ""]?.map((item) => {



        let fileName =
          selectedTab === "réparations"
            ? item?.documentRepair?.path
            : selectedTab === "amendes"
              ? item?.documentPenalty?.path
              : selectedTab === "constats"
                ? item?.documentReport?.path
                : "";
        fileName = fileName?.split("\\");
        fileName = fileName?.[fileName?.length - 1];
    
        let id = item?.id
    
        let documentId =
          selectedTab === "réparations"
            ? item?.repairDoc?.document_id
            : selectedTab === "amendes"
              ? item?.penaltyDocs?.document_id
              : selectedTab === "constats"
                ? item?.reportDocs?.document_id
                : undefined;
    
        let type =
          selectedTab === "réparations"
            ? item?.documentRepair?.type
            : selectedTab === "amendes"
              ? item?.documentPenalty?.type
              : selectedTab === "constats"
                ? item?.documentReport?.type
                : "";

            return {
              name: fileName,
              type,
              id,
              documentId,
            }

    })
    setDocuments(listedDocs)
    setShowForm(true);
  };

  const resetStates = () => {
    setAmount(0);
    setRepairId("");
    setComment("");
    setDate(new Date());
    setSelectedType({});
    setIsEdit(false);
    setDocuments([])
    setDeletedDocsIds([])
    setError({
      amount: false,
      date: false,
      document: false,
      type: false
    })
  };

  const handleRemoveDocument = (index) => {
    setDeletedDocsIds([...deletedDocsIds, documents[index]?.id])
    let copyDocuments = documents
    copyDocuments.splice(index, 1)
    setDocuments([...copyDocuments])
  }

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
            <ScrollView style={{ ...styles.modalCard, maxHeight: "75%" }} contentContainerStyle={{ rowGap: 20, }} >
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
                      backgroundColor: colors.gray,
                      borderColor: 'red',
                      borderWidth: error?.document ? 1 : 0
                    }}
                  >
                    Tap to upload document
                  </Text>
                </TouchableOpacity>
                <View style={{ padding: 10, gap: 5, flexDirection: 'row', flexWrap: 'wrap' }} >
                  {
                    (documents?.length > 0) && documents?.map((item, index) => {
                      return (
                        <View style={{ backgroundColor: colors.cyan, padding: 10, maxWidth: "90%", flexDirection: 'row', alignItems: 'center', columnGap: 10, alignSelf: 'flex-start', borderRadius: 999 }} >
                          <Text style={{ color: 'white', maxWidth: "85%" }} >{item?.name}</Text>
                          <TouchableOpacity onPress={() => handleRemoveDocument(index)} >
                            <AntDesign
                              name={"closecircleo"}
                              size={18}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </View>
                {error?.document && <Text style={{ color: 'red' }} >document est requis!</Text>}
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
                    borderWidth: error?.type ? 1 : 0,
                    borderColor: 'red'
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
                {error?.type && <Text style={{ color: 'red' }} >le type d'enregistrement est requis!</Text>}
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
                  style={error?.amount ? { ...styles.textInput, borderColor: 'red', borderWidth: 1 } : styles.textInput}
                />
                {error?.amount && <Text style={{ color: 'red' }} >le montant est requis!</Text>}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingVertical: 20,
                  marginBottom: 20
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
            </ScrollView>
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
  vehicles,
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
  updateReport,
  getVehicles,
  getVehiclesLoader
}) {
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (selectedVehicle?.id) {
      fetchVehicleData(selectedVehicle?.id);
    }
  }, [selectedVehicle]);

  const fetchVehicleData = async (id) => {
    try {
      await getVehicle(id);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getVehicles()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      setSelectedVehicle({})
      getVehicles()
    }, [])
  )

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
                  disabled={getVehiclesLoader || !vehicles?.length}
                  defaultButtonText={getVehiclesLoader ? "Loading..." : !vehicles?.length ? "No Vehicle found!" : "Select an option."}
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
                    uri: `${baseUrl}/${selectedVehicle?.vehicleImage?.[0]?.path}`,
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
    vehicles: state?.vehiclesReducer?.vehicles,
    repairs: state?.repairsReducer?.repairs,
    penalties: state?.penaltiesReducer?.penalties,
    penaltyTypes: state?.penaltiesReducer?.penaltyTypes,
    reports: state?.reportsReducer?.reports,
    reportTypes: state?.reportsReducer?.reportTypes,
    getVehiclesLoader: state?.vehiclesReducer?.getVehiclesLoader
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
  updateReport,
  getVehicles
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);
