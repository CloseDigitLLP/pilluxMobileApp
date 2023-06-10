import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThreeCarImage from '../../assets/images/threeCar.png'
import colors from '../../styles/colors';
import common from '../../styles/common';

export default function App(){
    const [value, onChangeText] = React.useState('Useless Placeholder');
    return (
        <SafeAreaView>
            <View style={common.container}>
                <View style={styles.logoPart}>
                    <Text style={styles.logoText}>DRIVINGacc</Text>
                </View>
                <View style={styles.mainContent}>
                    <View style={styles.carImage}>
                        <Image source={ThreeCarImage} style={styles.threeCar} />    
                    </View>
                    <View style={styles.loginForm}>
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Email ou nom d'utilisateur</Text>
                            <TextInput
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                style={styles.inputField}
                                />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>mot de passe</Text>
                            <TextInput
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                style={styles.inputField}
                                />
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Mot de passe oublié?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonField}>
                            <TouchableOpacity style={styles.primaryButton}>
                                <Text style={styles.buttonText}>SE CONNECTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> 
        </SafeAreaView>
       
    );
}
const styles = StyleSheet.create({   
    logoPart:{
        height: "20%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logoText:{
        color: colors.white,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 600,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.white,
    },
    mainContent:{
        height:'77%',
        margin: 10,
        borderRadius: 25,
        backgroundColor: colors.secondary,
        paddingHorizontal:20,
        paddingVertical: 30,
    },
    field:{
        marginBottom:40,
    },
    inputField:{
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 30,
        paddingVertical:10,
        paddingHorizontal:20,
        color: colors.white,
        width: '100%',
    },
    fieldLabel:{
        color: colors.white,
        textAlign: 'center',
        marginBottom: 10,
    },
    forgotText:{
        textAlign: 'right',
        color: colors.white,
        paddingRight: 10,
        paddingTop: 4,
    },
    buttonField:{
        marginTop: '16%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton:{
      paddingVertical:16,
      color: colors.white,
      backgroundColor: colors.cyan,
      textAlign: 'center',
      width:'60%',
      margin: 'auto',
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.white,
    },
    buttonText:{
        textAlign: 'center',
        color: colors.white,
        fontWeight: 600,
        fontSize: 18,
    },
    carImage:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    threeCar:{
        width: "100%",
        height: 80,
        margin: 'auto',
    },
});