import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../styles/colors';
import common from '../../styles/common';


export default function App() {
    const [showOption, setShowOption] = useState(false);

    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>Événements à venir</Text>
                </View>
                <ScrollView style={common.mainContent}>
                    <View style={styles.cardPart}>
                        <View style={styles.cardBox}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn} onPress={() => setShowOption(true)}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn} onPress={() => setShowOption(false)}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                            {showOption && <View style={styles.openableCard}>
                                <Text style={styles.openCardHeading}>commentaire</Text>
                                <View style={styles.whiteCard}>
                                    <Text style={styles.whiteCardContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text>
                                </View>
                                <View style={styles.cardBtn}>
                                    <TouchableOpacity style={styles.cardOutlineBtn}>
                                        <Text style={styles.cardBtnText}>Ok</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cardFillBtn}>
                                        <Text style={styles.cardBtnText}>Annuler</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        </View>
                        <View style={styles.cardBox}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn} onPress={() => setShowOption(true)}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn} onPress={() => setShowOption(false)}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                            {showOption && <View style={styles.openableCard}>
                                <Text style={styles.openCardHeading}>commentaire</Text>
                                <View style={styles.whiteCard}>
                                    <Text style={styles.whiteCardContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text>
                                </View>
                                <View style={styles.cardBtn}>
                                    <TouchableOpacity style={styles.cardOutlineBtn}>
                                        <Text style={styles.cardBtnText}>Ok</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cardFillBtn}>
                                        <Text style={styles.cardBtnText}>Annuler</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        </View>
                        <View style={styles.cardBox}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn} onPress={() => setShowOption(true)}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn} onPress={() => setShowOption(false)}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                            {showOption && <View style={styles.openableCard}>
                                <Text style={styles.openCardHeading}>commentaire</Text>
                                <View style={styles.whiteCard}>
                                    <Text style={styles.whiteCardContent}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text>
                                </View>
                                <View style={styles.cardBtn}>
                                    <TouchableOpacity style={styles.cardOutlineBtn}>
                                        <Text style={styles.cardBtnText}>Ok</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cardFillBtn}>
                                        <Text style={styles.cardBtnText}>Annuler</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                        </View>
                    </View>
                </ScrollView>
                <View style={common.headerPart}>
                    <Text style={common.headerText}>événements passés à confirmer</Text>
                </View>
                <ScrollView style={common.mainContent}>
                    <View style={styles.cardPart}>
                        <View style={{ ...styles.cardBox, ...styles.cardBoxGray }}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ ...styles.cardBox, ...styles.cardBoxGray }}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ ...styles.cardBox, ...styles.cardBoxGray }}>
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
                            <View style={styles.cardBtn}>
                                <TouchableOpacity style={styles.cardOutlineBtn}>
                                    <Text style={styles.cardBtnText}>Present</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cardFillBtn}>
                                    <Text style={styles.cardBtnText}>Absent</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
    },
    cardOutlineBtn: {
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 120,
        marginRight: 10,
    },
    cardFillBtn: {
        backgroundColor: colors.cyan,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 120,
    },
    cardBtnText: {
        textAlign: "center",
        color: colors.white,
        fontSize: 15,
    },

});
