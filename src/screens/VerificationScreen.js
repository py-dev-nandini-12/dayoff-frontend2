import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../components";
import { LinkedinInput, PhotoInput, Dialog } from "../components";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { React, useState } from "react";
import { palette, themes } from "../style";
import { VerificationValidationService } from "../services/ValidationService";

const { isCodeCorrect, handlePhoto, handleLinkedin, getLinkedin, getPhoto, getUserEmail } = VerificationValidationService;

const VerifySection = (props) => {
    const {title, valid} = props;

    return (
    <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.title}>{title}</Text>
        {valid
        ? <Image source={require("../../assets/icons/checkmark.png")} style={styles.checkmark} />
        : null
        }
    </View>
    )
}



export default VerificationScreen = ({ navigation }) => {
    photoData = getPhoto();
    const [photo, setPhoto] = useState({
        'value': photoData,
        'required': photoData == null,
    });
    linkedinURL = getLinkedin();
    const [linkedin, setLinkedin] = useState({
        'value': linkedinURL,
        'required': linkedinURL == null,
    });
    const [code, setCode] = useState({
        'value': '',
        'required': true,
    });

    const emailAddress = getUserEmail();

    const updatedState = (stateDict, newVal) => {
        return Object.assign({}, stateDict, {'value': newVal});
    }

    function areFieldsValid(){
        //check if any required fields have been inputted/handled
        //handlePhoto/handleLinkedin should update the database
        photo.required = getPhoto() == null;
        linkedin.required = getLinkedin() == null;
        //check if code is correct
        code.required = isCodeCorrect(code.value);


        //for testing
        console.log(photo);
        console.log(linkedin);
        console.log(code);

        return !photo.required && !linkedin.required && !code.required;
    }

    function verify(){
        if (areFieldsValid()) navigation.replace('Chat');
        else {
            console.log("some fields invalid");
            toggleDialog();
        }
    }

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    }

    const [dialogVisible, setDialogVisible] = useState(false);


    return (
        <TouchableWithoutFeedback>
                <View style={styles.page}>
                    <HeaderBack>Get Verified</HeaderBack>
                    <View style={styles.border} />

                    <ScrollView contentContainerStyle={styles.scroll} >
                    <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.message}>
                            Every user is required to go through verifications to build a more trusted and safer platform.
                        </Text>

                        <View style={styles.section} borderBottomWidth={0}>
                            <VerifySection
                            title='1. Add Profile Photo*'
                            valid={!photo.required} />
                            <PhotoInput width={12 * vh} camRatio={'40%'}
                            onPhotoSelected={(data) => handlePhoto(data)} />
                        </View>

                        <View style={styles.border} />


                        <View style={styles.section}>
                            <VerifySection
                            title='2. Add Linkedin Profile*'
                            valid={!linkedin.required} />
                            <LinkedinInput horMargin={10} verMargin={10}
                            onComponentPress={(data) => handleLinkedin(data)} />
                        </View>


                        <View style={styles.border} />

                        <View style={styles.section}>
                            <VerifySection
                            title='3. Enter Verification Code*'
                            valid={!code.required} />
                            <SegmentedInput
                            length={5}
                            style={styles.segmentedInput}
                            segmentStyle={styles.segment}
                            theme={themes.textInput}
                            mode='outlined'
                            label={'We’ve sent a verification code to ' + emailAddress}
                            labelStyle={styles.message}
                            keyboardType='numeric'
                            onCodeChange={(data) => setCode(code => updatedState(code, data))} />

                            <TouchableOpacity
                            style={styles.resendContainer}
                            //TODO: call otp function on press
                            onPress={() => console.log("TBA otp on press")}>
                                <Text style={styles.resendText}>Resend Verification Code</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    </TouchableWithoutFeedback>
                    </ScrollView>

                    <View style={styles.buttonGroup}>
                        <Button
                            mode="container"
                            theme={themes.button}
                            style={styles.button}
                            onPress={() => verify()}
                        >
                            <Text style={styles.buttonText}>Verify Account</Text>
                        </Button>
                    </View>
                    <View style={{position: 'fixed'}}>
                        <Modal
                            transparent={true}
                            isVisible={dialogVisible}
                            onBackdropPress={toggleDialog}
                        >
                            <Dialog title={"Error"} details={"An error occurred."}
                             buttonLabel={"OK"} onButtonPress={toggleDialog} />
                        </Modal>
                    </View>

                </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    message: {
        alignSelf: 'flex-start',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.6 * vmin,
        color: palette.grey,
    },


    segmentedInput: {
        width: 80 * vmin,
    },
    segment: {
        height: 17 * vmin,
        backgroundColor: palette.white,
        fontSize: 7 * vmin,
        textAlign: 'left',
        textAlignVertical: 'center',
    },

    resendContainer: {
        width: "100%",
        paddingTop: 10,
    },
    resendText: {
        color: palette.purple,
        fontWeight: 'bold',
    },

    scroll: {
        display: 'flex',
        paddingBottom: 4 * vh,
    },

    section: {
        width: 85 * vmin,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

        paddingTop: 20,
        paddingBottom: 20,
    },
    border: {
        width: 85 * vmin,
        paddingTop:5,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#D7D7D7',
    },
    title: {
      marginTop: 3 * vh,
      paddingBottom: 20,
      alignSelf: "flex-start",
      fontFamily: "Lato-Regular",
      fontSize: 4.5 * vmin,
      fontWeight: "700",
      color: "#000000",
    },


    buttonGroup: {
        gap: 2 * vmin,
        margin: 10,
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        backgroundColor: palette.purple,
    },
    buttonText: {
        color: palette.white,
    },
    checkmark: {
        marginLeft: 'auto',
        resizeMode: 'contain',
        height: '40%'
    }
})