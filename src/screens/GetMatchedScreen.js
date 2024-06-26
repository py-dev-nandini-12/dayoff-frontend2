import { React, useState, useEffect } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, Image, Text, ScrollView } from 'react-native';
import { Button, CountryMultiSelector, Header, TextInput, StatusBar } from '../components';
import { SelectManyDates, SelectManyCountries } from '../components';
import { StyleSheet } from 'react-native';
import { palette, themes } from '../style';

import UserService from "../services/UserService";
const { putUserPref, getUserPref } = UserService;


const GetMatchedScreen = ({ navigation }) => {
    const email = global.currentUser.email_id;

    //TODO: init the initial dates and countries to values from getUserPref
    async function getPrefs(){
        var tempDates;
        var tempCountries;

        await getUserPref(global.currentUser.email_id)
        .then(response => {
            tempDates = response['preferred_dates'];
            tempCountries = response['preferred_countries'];
        })

        for (let i = 0; i < tempDates.length; i++){
            let newDate = tempDates[i];
            dates.push(newDate);
        }
        for (let i = 0; i < tempCountries.length; i++){
            let newCountry = tempCountries[i];
            countries.push(newCountry);
        }

        setDates(dates);
        setCountries(countries);

        console.log("aa" + tempDates);
        console.log("aa" + tempCountries);
        console.log("bb" + dates);
        console.log("bb" + countries);
    }


    const [dates, setDates] = useState([]);
    const [countries, setCountries] = useState([]);

    const handleDates = (data) => {
        console.log(data);
        setDates(data);
    }

    const handleCountries = (data) => {
        console.log(data);
        setCountries(data);
    }

    async function getMatched(){
        if (dates.length > 0 || countries.length > 0){
            await putUserPref(global.currentUser.email_id, dates, countries)
            .then(status => {
                if (status === 200) navigation.replace('Home');
            })
        }
    }

    useEffect(() => {
        getPrefs();
    }, [])


    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <TouchableWithoutFeedback>
                    <View style={{alignItems: 'center'}}>
                        <View>
                            <Header>Get Teamed Up</Header>
                            <Text style={styles.message}>This enables us to match you with others going to the same country at the same dates as you.</Text>
                        </View>

                        <SelectManyDates
                        title={"Select the dates of your leisure trip(s)"}
                        titleStyle={styles.selectTitle}
                        label={"Eg. If you’re going to Greece on 21-28 June and Mexico on 10-17 July, add all the dates below"}
                        labelStyle={styles.selectLabel}
                        isFlexible={true}
                        boxWidth={85 * vmin}

                        init={dates}
                        onSelectDate={(data) => handleDates(data)}
                        />

                        <SelectManyCountries
                        title={"Select the countries of your trip(s)"}
                        titleStyle={styles.selectTitle}
                        label={"Now add the countries for the above dates below"}
                        labelStyle={styles.selectLabel}
                        isFlexible={true}
                        boxWidth={85 * vmin}

                        init={countries}
                        onSelectCountry={(data) => handleCountries(data)}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>

            <View style={styles.buttonGroup}>
                <Button onPress={async () => getMatched()} mode='contained'
                theme={themes.button} style={styles.button}>
                    Done
                </Button>
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white,
    },
    message: {
        marginTop: 3 * vh,
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.8 * vmin,
        color: palette.grey
    },
    segmentedInput: {
        width: 80 * vmin
    },
    segment: {
        height: 17 * vmin,
        backgroundColor: palette.white,
        fontSize: 5 * vmin
    },
    buttonGroup: {
        gap: 2 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    },
    button: {
        width: 85 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin
    },
    selectTitle: {
        marginTop: 3 * vh,
        alignSelf: "center",
        width: 85 * vmin,
        fontFamily: "Lato-Regular",
        fontSize: 4.5 * vmin,
        fontWeight: "700",
        color: "#000000",
    },
    selectLabel: {
        marginTop: 1 * vh,
        marginBottom: 2 * vh,
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.8 * vmin,
        color: palette.grey
    },
})

export default GetMatchedScreen;
