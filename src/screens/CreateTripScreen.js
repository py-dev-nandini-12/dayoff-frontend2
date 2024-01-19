import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, HeaderBack, MultilineInput, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { React, useState } from "react";
import { palette, themes } from "../style";
import { SelectDates, SelectCountries } from "../components";
import { CreateTripValidationService } from "../services/ValidationService";

const { isDateValid, isCountryValid, isNumPeopleValid,
        isDescriptionValid } = CreateTripValidationService;

//SCREEN TO CREATE A TRIP

export default CreateTripScreen = ({ navigation }) => {
    const [date, setDate] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [country, setCountry] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [numPeople, setNumPeople] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [desc, setDesc] = useState({
        'value': '',
        'valid': null,
        'required': false,
    });

    function areFieldsValid(){
        //check date is valid
        date.valid = isDateValid(date.value);
        //check country is valid
        country.valid = isCountryValid(country.value);
        //check num people is valid
        numPeople.valid = isNumPeopleValid(numPeople.value);
        //check description is valid
        desc.valid = isDescriptionValid(desc.value);

        //for testing
        console.log(date);
        console.log(country);
        console.log(numPeople);
        console.log(desc);

        return (
           (date.valid      || !date.required)
        && (country.valid   || !country.required)
        && (numPeople.valid || !numPeople.required)
        && (desc.valid      || desc.required)
        )
    }

    function createTrip(){
        if (areFieldsValid()) navigation.replace('Home');
        else console.log("some fields are invalid");
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Create a trip</HeaderBack>
                <View style={styles.inputGroup}>
                    <SelectDates
                        title={null}
                        subtitle={"Select date*"}
                        subtitleStyle={2}
                        isFlexible={false}
                        showLine={false}
                        multipleDates={false}
                        showBorder={true}
                        boxWidth={80 * vmin}
                        editable={true}
                        initialDates={[]}

                        onSelectDate={(data) => setDate(date =>
                        Object.assign({}, date, {'value': data[0]}))
                        }
                    />
                    <SelectCountries
                        title={null}
                        subtitle={"Select country*"}
                        subtitleStyle={2}
                        editable={true}
                        multipleCountries={false}
                        boxWidth={80 * vmin}
                        initialCountries={[]}

                        onSelectCountry={(data) => setCountry(country =>
                        Object.assign({}, country, {'value': data[0]}))
                        }
                    />

                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label="Number of participants*"
                    value={numPeople.value}
                    onChangeText={text => setNumPeople(numPeople =>
                    Object.assign({}, numPeople, {'value': text}))
                    }
                    />

                    <MultilineInput style={styles.multilineInput} theme={themes.textInput}
                    mode='outlined' label="Description"
                    placeholder="Describe the trip or anything else you want others to know"
                    value={desc.value}
                    onChangeText={text => setDesc(desc =>
                    Object.assign({}, desc, {'value': text}))
                    }
                    />

                </View>
                <Button
                    onPress={() => createTrip()}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                >
                    Create a trip
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    inputGroup: {
        gap: 3.5 * vh
    },
    textInput: {
        width: 80 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.white
    },
    multilineInput: {
        width: 80 * vmin,
        height: 40 * vmin,
        backgroundColor: palette.white
    },
    button: {
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    }
})