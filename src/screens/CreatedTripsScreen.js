import { React } from "react";
import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserCreatedTripView, HeaderBack } from "../components";
import { palette, themes, dimensions, flags } from "../style";

//SCREEN FOR THE USERS CREATED TRIPS

export default MyCreatedTrips = ({navigation}) => {

    const matched = [
        {
            id: 0,
            country: 'AU',
            limit: 9,
            details: 'Join me for a workcation and lets go experience the culture of Australia.',
            date: '11 - 19 Aug',
            matched: [
                {
                    name: 'Sefa',
                    profilePic: null
                },
                {
                    name: 'Puspita',
                    profilePic: null
                },
                {
                    name: 'Nandini',
                    profilePic: null
                },
                {
                    name: 'Devarshi',
                    profilePic: null
                },
                {
                    name: 'Lee',
                    profilePic: null
                },
                {
                    name: 'Bruno',
                    profilePic: null
                },
                {
                    name: 'Craig',
                    profilePic: null
                },
                {
                    name: 'Mary',
                    profilePic: null
                }
            ],
            going: [
                {
                    name: 'Sefa',
                    profilePic: null
                },
                {
                    name: 'Puspita',
                    profilePic: null
                },
                {
                    name: 'Nandini',
                    profilePic: null
                },
                {
                    name: 'Devarshi',
                    profilePic: null
                },
                {
                    name: 'Lee',
                    profilePic: null
                },
                {
                    name: 'Bruno',
                    profilePic: null
                },
                {
                    name: 'Craig',
                    profilePic: null
                },
                {
                    name: 'Mary',
                    profilePic: null
                }
            ]
        },
        {
            id: 1,
            country: 'BR',
            limit: 6,
            details: 'Join me for a workcation and lets go experience the culture of Brazil.',
            date: '02 - 10 Oct',
            matched: [
                {
                    name: 'John',
                    profilePic: null
                }
            ],
            going: [
                {
                    name: 'John',
                    profilePic: null
                },
            ]
        },
        {
            id: 2,
            country: 'NL',
            limit: 7,
            details: 'Join me for a workcation and lets go experience the culture of the Netherlands.',
            date: '15 - 22 Jun',
            matched: [
                {
                    name: 'Sepehr',
                    profilePic: null
                },
                {
                    name: 'Gary',
                    profilePic: null
                }
            ],
            going: [
                {
                    name: 'Sepehr',
                    profilePic: null
                },
                {
                    name: 'Francis',
                    profilePic: null
                },
                {
                    name: 'Gary',
                    profilePic: null
                }
            ]
        },
    ]



    return (
        <View style={styles.page}>
            <View style={styles.border}>
                <HeaderBack >My Created Trips </HeaderBack>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                { matched.map(trip => <UserCreatedTripView key={trip.id} trip={trip} />) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white,
    },
    border: {
        width: 100 * vmin,
        paddingTop:5,
        paddingBottom:25,
        borderBottomWidth:1,
        borderBottomColor:'#D7D7D7',
    },
    scroll: {
        width: 100 * vmin,
        alignItems: 'center',
        gap: 3 * vh,
        paddingTop: 5 * vh,
        paddingBottom: 18 * vh
    },
})