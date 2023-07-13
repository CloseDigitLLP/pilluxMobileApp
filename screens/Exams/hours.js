import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors';
import common from '../../styles/common';
import { AntDesign } from 'react-native-vector-icons'


const ExamHours = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordianClick = () => {
        setExpanded(!expanded);
    }


    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>L'élève est prêt(e) pour l'examen</Text>
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
                            <Text style={styles.stepsText}>Nombre d'heures avant de passer</Text>
                            <Text style={styles.stepsText}>l'examen de conduite ?</Text>
                        </View>
                        <View style={common.accordianPart}>
                            <View style={styles.container}>
                                <TouchableOpacity style={common.titleContainer} onPress={handleAccordianClick}>
                                    <Text style={common.title}>Nombre d'heure(s)</Text>
                                    <AntDesign
                                        name={expanded ? 'caretup' : 'caretdown'}
                                        size={14}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                {expanded && <View style={common.content}>
                                    <ScrollView style={common.mainContent}>
                                        <TouchableOpacity ><Text style={styles.hourText}>0 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>1 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>2 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>3 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>4 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>5 H</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text style={styles.hourText}>Autres : veuillez préciser</Text></TouchableOpacity>
                                    </ScrollView>
                                </View>}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ExamHours


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
    hourText: {
        textAlign: 'center',
    }
})