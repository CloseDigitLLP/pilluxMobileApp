import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThreeCarImage from '../../assets/images/threeCar.png'
import colors from '../../styles/colors';
import common from '../../styles/common';

export default function App() {
    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={styles.headerPart}>
                    <Text style={styles.headerText}>Événements à venir</Text>
                </View>
                <ScrollView style={styles.mainContent}>
                    <View style={styles.cardPart}>
                        <View style={styles.cardBox}>
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
                        <View style={styles.cardBox}>
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
                            <View style={styles.openableCard}>
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
                            </View>
                        </View>
                        <View style={styles.cardBox}>
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
                <View style={styles.headerPart}>
                    <Text style={styles.headerText}>événements passés à confirmer</Text>
                </View>
                <ScrollView style={styles.mainContent}>
                    <View style={styles.cardPart}>
                        <View style={{ ...styles.cardBox, ...styles.cardBoxGray }}>
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
                            <View style={styles.cardTextPart}>
                                <View style={styles.leftText}>
                                    <Text style={styles.contentText}>Ali Demo | +33610487960</Text>
                                    <Text style={styles.contentText}>Boîte : manuelle</Text>
                                    <Text style={styles.contentText}>Type : Conduite</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>10/03/2023</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>15h00</Text>
                                    <Text style={{ ...styles.contentText, ...styles.contentTextRight }}>2h</Text>
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
    headerPart: {
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    headerText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 600,
        fontStyle: 'italic',
    },
    mainContent: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
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
    cardTextPart: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftText: {
        flex: 2,
        borderRightWidth: 1,
        borderColor: colors.white,
    },
    rightText: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    contentText: {
        color: colors.white,
        marginBottom: 10,
    },
    contentTextRight: {
        fontWeight: 600,
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
});
