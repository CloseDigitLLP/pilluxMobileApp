import React, {useState} from 'react'
import colors from '../../styles/colors'
import common from '../../styles/common';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from 'react-native-vector-icons'


const StepedStudent = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordianClick = () => {
        setExpanded(!expanded);
    }
    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>Étapes travaillées avec l'élève</Text>
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
                        <View style={common.accordianPart}>
                            <View style={styles.container}>
                                <TouchableOpacity style={common.titleContainer} onPress={handleAccordianClick}>
                                    <Text style={common.title}>Etapes</Text>
                                    <AntDesign
                                        name={expanded ? 'caretup' : 'caretdown'}
                                        size={14}
                                        color="black"
                                    />
                                </TouchableOpacity>
                                {expanded && <View style={common.content}>
                                    <ScrollView style={common.mainContent}>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
                                        <TouchableOpacity ><Text>Loream ipsum dolor sit amet</Text></TouchableOpacity>
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

export default StepedStudent

const styles = StyleSheet.create({
    cardBoxEvent: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: '97%',
    }
})