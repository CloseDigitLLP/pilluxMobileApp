import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors';
import common from '../../styles/common';



const ExamPlace = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordianClick = () => {
        setExpanded(!expanded);
    }

    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>Quand aura lieu l'examen ?</Text>
                </View>
                <View style={common.mainContent}>
                    <View style={styles.cardBoxEvent}>
                        <View style={common.cardTextPart}>
                            <View style={common.leftText}>
                                <Text style={common.contentText}>Ali Demo | +33610487960</Text>
                                <Text style={common.contentText}>Boîte : manuelle</Text>
                                <Text style={common.contentText}>Type : Conduite</Text>
                            </View>
                            <View style={common.rightText}>
                                <Text style={{ ...common.contentText, ...common.contentTextRight }}>10/03/2023</Text>
                                <Text style={{ ...common.contentText, ...common.contentTextRight }}>15h00</Text>
                                <Text style={{ ...common.contentText, ...common.contentTextRight }}>2h</Text>
                            </View>
                        </View>
                        <View style={styles.examPlaceHeading}>
                            <Text style={styles.stepsText}>PLANNING</Text>
                        </View>
                        <View style={common.accordianPart}>
                            <View style={styles.container}>
                                <View style={common.titleContainer} onPress={handleAccordianClick}>
                                    <Text style={common.titleCenter}>MARS</Text>
                                </View>
                                <View style={common.content}>
                                    <ScrollView style={common.mainContent}>
                                        <TouchableOpacity style={styles.cardCyanFillBtn}><Text style={common.cardBtnText}>0 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>1 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>2 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>3 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>4 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>5 H</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.cardBlackFillBtn}><Text style={common.cardBtnText}>Autres : veuillez préciser</Text></TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ExamPlace

const styles = StyleSheet.create({
    examPlaceHeading: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardCyanFillBtn: {
        backgroundColor: colors.cyan,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
    },
    cardBlackFillBtn: {
        backgroundColor: colors.gray,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
    },
    cardBoxEvent: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: '97%',
    },
    stepsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
})