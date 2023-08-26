import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View, processColor } from "react-native";
import { BarChart, PieChart } from "react-native-charts-wrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import common from "../../../styles/common";
import colors from "../../../styles/colors";
import { AntDesign, FontAwesome5 } from "react-native-vector-icons";
import { useCallback, useEffect, useState } from "react";
import { getInstuctorAbsentHours, getInstuctorAvgHours, getInstuctorExamWishlistCount, getInstuctorHours, getVehiclePaymentsStats } from "../../../services/Statistics/actions";
import { connect } from "react-redux";
import { getVehicles } from "../../../services/Vehicles/actions";
import SelectDropdown from "react-native-select-dropdown";
import { useFocusEffect } from "@react-navigation/native";
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import moment from "moment";

const SingleChartComponent = ({ name, getMethod, values }) => {

    const [expanded, setExpanded] = useState(false)
    const [yValues, setYValues] = useState([])
    const [xValues, setXValues] = useState([])
    const [xLabelCounts, setXLabelCounts] = useState(0)
    const [timeline, setTimeLine] = useState('monthly')

    const legend = {
        enabled: true,
        textSize: 12,
        textColor: processColor(colors.white)
    }

    const chartConfig = {
        dataSets: [
            {
                label: name,
                values: yValues,
                config: {
                    color: processColor(colors.cyan),
                    valueTextColor: processColor(colors.cyan),
                    valueTextSize: 12,
                    highlightColor: processColor(colors.cyan)
                },
            },
        ],
        yAxis: {
            right: {
                enabled: false,
            },
            left: {
                textColor: processColor(colors.white),
                drawGridLines: false
            }

        },
        xAxis: {
            position: 'BOTTOM',
            valueFormatter: xValues,
            labelCount: xLabelCounts,
            textColor: processColor(colors.white),
            drawGridLines: false,
            labelRotationAngle: 300
        },
    }
    const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];
    useEffect(() => {
        if (values?.[timeline]) {
            let xValuesData = []
            let yValuesData = []
            let count = 0
            values?.[timeline]?.forEach((item) => {
                if (timeline === 'monthly') {
                    xValuesData.push(months[item?.month - 1])
                } else {
                    xValuesData.push(`${item?.year}`)
                }
                yValuesData.push({ y: item?.hours })
                count++
            })
            setXValues(xValuesData)
            setYValues(yValuesData)
            setXLabelCounts(count)
        }
    }, [values, timeline])

    return (
        <>
            <View style={{ marginVertical: 10 }} >
                <TouchableOpacity
                    style={{ backgroundColor: colors.secondary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 999, position: 'relative' }}
                    onPress={() => {
                        setExpanded(!expanded);
                        if (!expanded) { getMethod() }
                    }}
                >
                    <Text style={{ color: colors.white }} >{name}</Text>
                    <View style={{ marginRight: 15, position: 'absolute', right: 20 }}>
                        <AntDesign
                            name={expanded ? "up" : "down"}
                            size={14}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                {
                    expanded &&
                    <View style={{ marginTop: 20 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 20 }} >
                            <TouchableOpacity onPress={() => setTimeLine('monthly')} style={{ backgroundColor: timeline === "monthly" ? colors.cyan : colors.secondary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 9999 }} >
                                <Text style={{ color: colors.white }} >Monthly</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTimeLine('yearly')} style={{ backgroundColor: timeline === "yearly" ? colors.cyan : colors.secondary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 9999 }} >
                                <Text style={{ color: colors.white }} >Yearly</Text>
                            </TouchableOpacity>
                        </View>
                        <BarChart
                            style={{ height: 300 }}
                            data={chartConfig}
                            xAxis={chartConfig?.xAxis}
                            yAxis={chartConfig?.yAxis}
                            chartDescription={{
                                text: ""
                            }}
                            legend={legend}
                            extraOffsets={{ "bottom": 10 }}
                        />
                    </View>
                }
            </View>
        </>
    )
}

const WishlistStudent = ({ name, getMethod, values }) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <View style={{ marginVertical: 10 }} >
                <TouchableOpacity
                    style={{ backgroundColor: colors.secondary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 999, position: 'relative' }}
                    onPress={() => {
                        setExpanded(!expanded);
                        if (!expanded) { getMethod() }
                    }}
                >
                    <Text style={{ color: colors.white }} >{name}</Text>
                    <View style={{ marginRight: 15, position: 'absolute', right: 20 }}>
                        <AntDesign
                            name={expanded ? "up" : "down"}
                            size={14}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                {
                    expanded &&
                    <View style={{ marginTop: 20, backgroundColor: colors.gray, borderRadius: 30, flexDirection: 'row', padding: 20, alignItems: 'center', justifyContent: 'center', columnGap: 20, paddingVertical: 40 }} >
                        <View style={{ marginRight: 15 }}>
                            <FontAwesome5
                                name={"user-graduate"}
                                size={80}
                                color="white"
                            />
                        </View>
                        <View>
                            <Text style={{ color: colors.white, fontSize: 20, textAlign: 'center' }} >
                                {values?.studentCount}
                            </Text>
                            <Text style={{ color: colors.white, fontSize: 20 }} >
                                élèves
                            </Text>
                        </View>
                    </View>
                }
            </View>
        </>
    )
}

const MonitorAbsentList = ({ name, getMethod, values }) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <View style={{ marginVertical: 10 }} >
                <TouchableOpacity
                    style={{ backgroundColor: colors.secondary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 999, position: 'relative' }}
                    onPress={() => {
                        setExpanded(!expanded);
                        if (!expanded) { getMethod() }
                    }}
                >
                    <Text style={{ color: colors.white }} >{name}</Text>
                    <View style={{ marginRight: 15, position: 'absolute', right: 20 }}>
                        <AntDesign
                            name={expanded ? "up" : "down"}
                            size={14}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                {
                    expanded &&
                    <View style={{ marginTop: 20 }} >
                        {
                            (values?.length) ?
                        <Table style={{ flex: 1, backgroundColor: "white", padding: 20, borderRadius: 20 }}>
                            <Row
                                style={{ width: "100%", columnGap: 20, borderBottomWidth: 2, borderBottomColor: "black", paddingBottom: 10, marginBottom: 5 }}
                                // flexArr={[2, 2]}
                                textStyle={{ fontWeight: 700, textAlign: "center" }}
                                data={["Date", "Hours"]}
                            ></Row>
                            {values?.map((item) => ([moment(item?.date).format("DD/MM/YYYY"), item?.total_hours]))?.map((rowData, index) => (
                                <TableWrapper
                                    key={index}
                                    style={{ flexDirection: "row", paddingVertical: 10 }}
                                >
                                    {rowData.map((cellData, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            data={cellData}
                                            textStyle={{ textAlign: "center" }}
                                        />
                                    ))}
                                </TableWrapper>
                            ))}
                        </Table>
                        :
                        <Text style={{ textAlign: "center", color: colors.white, marginBottom: 20 }} >Aucun enregistrement trouvé!</Text>
                        }
                    </View>
                }
            </View>
        </>
    )
}

const PieChartComponent = ({ name, getMethod, values, getVehiclePaymentsStats, vehiclePayments, getVehiclesLoader, vehicles }) => {

    const [expanded, setExpanded] = useState(false)
    const [expandedSelect, setExpandedSelect] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState({})
    const [chartValues, setChartValues] = useState([])

    const [isValue, setIsValue] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setSelectedVehicle({})
        }, [])
    )

    const chartConfig = {
        dataSets: [
            {
                values: chartValues,
                label: '',
                config: {
                    colors: [
                        processColor('#496ECC'),
                        processColor('#FF9938'),
                        processColor('#68E365'),
                    ],
                    valueTextSize: 16,
                    valueTextColor: processColor('transparent'),
                    selectionShift: 0,
                    valueFormatter: "#.#'%'",
                },
            },
        ],
    }
    useEffect(() => {
        if (vehiclePayments?.length && selectedVehicle?.id) {
            let selectedVehiclePayments = vehiclePayments?.find((item) => item?.id === selectedVehicle?.id)
            let paymentValues = [
                { value: selectedVehiclePayments?.penalty, label: "amendes" },
                { value: selectedVehiclePayments?.repair, label: "réparations" },
                { value: selectedVehiclePayments?.report, label: "constats" }
            ]
            let notNullValue = paymentValues?.filter((item) => item?.value > 0)
            if (notNullValue?.length) {
                setIsValue(true)
            } else {
                setIsValue(false)
            }
            setChartValues(paymentValues)
        }
    }, [vehiclePayments, selectedVehicle])

    const getValuesFromLabels = (label) => {
        let total = 0
        chartValues?.forEach((item) => { total += item?.value })
        let currentValue = chartValues?.find((item) => item?.label === label)
        currentValue = currentValue?.value || 0
        return `${label} ${((currentValue / total) * 100).toFixed(1)}%`
    }

    return (
        <>
            <View style={{ marginVertical: 10 }} >
                <TouchableOpacity
                    style={{ backgroundColor: colors.secondary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 999, position: 'relative' }}
                    onPress={() => {
                        setExpanded(!expanded);
                        if (!expanded) { getMethod(); setSelectedVehicle({}) }
                    }}
                >
                    <Text style={{ color: colors.white }} >{name}</Text>
                    <View style={{ marginRight: 15, position: 'absolute', right: 20 }}>
                        <AntDesign
                            name={expanded ? "up" : "down"}
                            size={14}
                            color="white"
                        />
                    </View>
                </TouchableOpacity>
                {
                    expanded &&
                    <View style={{ marginTop: 20, marginBottom: 40 }} >
                        <View>
                            <Text style={{
                                color: colors.white,
                                fontSize: 16,
                                fontWeight: 500,
                                marginBottom: 8
                            }}>Select vehicle</Text>
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
                                onFocus={() => setExpandedSelect(true)}
                                onBlur={() => setExpandedSelect(false)}
                                buttonTextStyle={{ color: colors.white }}
                                renderDropdownIcon={() => {
                                    return (
                                        <View style={{ marginRight: 15 }}>
                                            <AntDesign
                                                name={expandedSelect ? "up" : "down"}
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
                        {
                            (
                                selectedVehicle?.id &&
                                ((isValue) ?
                                    <PieChart
                                        style={{ height: 300, marginTop: 20 }}
                                        chartBackgroundColor={processColor('transparent')}
                                        chartDescription={{ text: "" }}
                                        data={chartConfig}
                                        legend={{
                                            enabled: true, form: "CIRCLE", textColor: processColor("white"), textSize: 14, orientation: "VERTICAL", verticalAlignment: "BOTTOM", horizontalAlignment: "CENTER", custom: {
                                                colors: [processColor('#496ECC'), processColor('#FF9938'), processColor('#68E365')],
                                                labels: [getValuesFromLabels('amendes'), getValuesFromLabels("réparations"), getValuesFromLabels("constats")]
                                            }
                                        }}
                                        entryLabelColor={processColor('transparent')}
                                        entryLabelTextSize={12}
                                        usePercentValues
                                        styledCenterText={{
                                            text: '',
                                        }}
                                        centerTextRadiusPercent={100}
                                        holeRadius={0}
                                        holeColor={processColor('transparent')}
                                        transparentCircleRadius={0}
                                        transparentCircleColor={processColor('#f0f0f088')}
                                        maxAngle={360}
                                        extraOffsets={{ "bottom": 10 }}
                                    />
                                    :
                                    <Text style={{ color: colors.white, textAlign: 'center', marginTop: 20 }} >
                                        Aucun enregistrement trouvé!
                                    </Text>)
                            )
                        }
                    </View>
                }
            </View>
        </>
    )
}

function Stats({ getInstuctorHours, getInstuctorAbsentHours, instructorAbsentHours, instructorHours, instructorAvgHours, getInstuctorAvgHours, getInstuctorExamWishlistCount, instructorExamWishlistCount, getVehiclesLoader, getVehicles, vehicles, getVehiclePaymentsStats, vehiclePayments }) {



    return (
        <SafeAreaView>
            <StatusBar />

            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>Mes élèves</Text>
                </View>
                <ScrollView style={{ marginVertical: 15, paddingHorizontal: 15 }} >
                    <SingleChartComponent name={"Cumuls d'heures"} getMethod={getInstuctorHours} values={instructorHours} />
                    <MonitorAbsentList name={"nombre de conges"} getMethod={getInstuctorAbsentHours} values={instructorAbsentHours} />
                    <WishlistStudent name={"nombred'éléves présentés en examen"} getMethod={getInstuctorExamWishlistCount} values={instructorExamWishlistCount} />
                    <SingleChartComponent name={"moyenne d'heures de mes éléves"} getMethod={getInstuctorAvgHours} values={instructorAvgHours} />
                    <PieChartComponent name={"vehicules"} getMethod={getVehiclePaymentsStats} getVehiclePaymentsStats={getVehiclePaymentsStats} vehiclePayments={vehiclePayments} getVehiclesLoader={getVehiclesLoader} vehicles={vehicles} />
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        instructorHours: state.statisticsReducer.instructorHours,
        instructorAvgHours: state.statisticsReducer.instructorAvgHours,
        instructorExamWishlistCount: state.statisticsReducer.instructorExamWishlistCount,
        getVehiclesLoader: state?.vehiclesReducer?.getVehiclesLoader,
        vehicles: state?.vehiclesReducer?.vehicles,
        vehiclePayments: state?.statisticsReducer?.vehiclePayments,
        instructorAbsentHours: state?.statisticsReducer?.instructorAbsentHours,
    }
}

const mapDispatchToProps = {
    getInstuctorHours,
    getInstuctorAvgHours,
    getInstuctorExamWishlistCount,
    getVehicles,
    getVehiclePaymentsStats,
    getInstuctorAbsentHours
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)