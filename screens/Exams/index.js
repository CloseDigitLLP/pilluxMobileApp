import React from 'react'
import common from '../../styles/common';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const ExamReadyStudent = () => {

    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>Étapes travaillées avec l'élève</Text>
                </View>
                <View style={common.mainContent}>
                    <View style={common.cardBoxEvent}>
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
                        <View style={styles.examSteps}>
                            <Text style={styles.stepsText}>Student ready for</Text>
                            <Text style={styles.stepsText}>l'examen de conduite ?</Text>
                        </View>
                        <View style={styles.actionPart}>
                            <TouchableOpacity style={common.cardOutlineBtn}>
                                <Text style={common.cardBtnText}>OUI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={common.cardFillBtn}>
                                <Text style={common.cardBtnText}>NON</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ExamReadyStudent

const styles = StyleSheet.create({
    examSteps: {
        marginTop: 50,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    actionPart: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 35,
    },
    stepsText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },

})