import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: "100%",
        display: 'flex',
        marginTop: 'auto'
    },
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
    accordianPart: {
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 16,
        maxHeight: '75%',
        overflow: 'hidden',
    },
    titleContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        width: '65%',
    },
    titleCenter: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        width: '100%',
    },
    content: {
        backgroundColor: '#f0f0f0',
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        flexDirection: 'column',
        paddingHorizontal: 25,
        paddingVertical: 10,
        alignItems: 'center',
        gap: 10,
        maxHeight: '95%',
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
    cardTextPart: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
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
    
})