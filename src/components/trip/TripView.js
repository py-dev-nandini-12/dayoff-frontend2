import { StyleSheet, View, Text } from 'react-native'
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';
import { dimensions } from '../../style';
import { palette } from '../../style';
import { createNavigationContainerRef } from '@react-navigation/native';

[vw, vh, vmin, vmax] = dimensions

const TripView = (props) => {
    const {style, label, children, ...rest} = props;

    let trip = {};
    trip.limit = 9;
    trip.country = 'AU';
    trip.going = [
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
    ];

    country = CountryCodes.filter(c => c.code == trip.country)[0];    
    
    return (
        <View style={styles.trip}>
            <View style={styles.topGroup}>
                <View style={styles.countryGroup}>
                    {
                        flags[country.code] ?
                        <Image style={styles.flagIcon} source={flags[country.code]} /> :
                        <Text style={styles.countryText}>{country.code}</Text>
                    }
                    <Text style={styles.countryText}>{country.name}</Text>
                </View>
                <Text style={styles.dateText}>11 - 18 Aug</Text>
            </View>
            <Text style={styles.groupText}>Going:</Text>
            <View style={styles.middleGroup}>
                <View style={styles.profilePicsGroup}>
                    {(() => {
                        const profilePics = [];
                        for(let i = 0; i < trip.going.length; i++) {
                            if(i == 6) break;

                            if(trip.going[i].profilePic)
                                profilePics.push(<Image style={styles.profilePic} key={i}></Image>);
                            else
                                profilePics.push(<Text style={styles.profilePic} key={i}>{trip.going[i].name[0]}</Text>);
                        }
                        return profilePics;
                    })()}
                </View>
                {
                    trip.going.length > 6 ?
                    <Button
                        mode="text"
                        labelStyle={{marginHorizontal: 0}}
                        style={styles.showGroupButton}
                        theme={themes.button}
                    >
                        +{trip.going.length - 6}
                    </Button> :
                    null
                }

            </View>
            <View style={styles.bottomGroup}>
                <Button
                    mode="contained"
                    labelStyle={{marginHorizontal: 0}}
                    style={styles.joinButton}
                    theme={themes.button}
                >
                    Join the trip
                </Button>
                <View style={styles.goingGroup}>
                    <Image style={styles.goingIcon} source={require('../../../assets/icons/people.png')} />
                    <Text style={styles.goingText}>{trip.going.length}/{trip.limit}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trip: {
        width: 85 * vmin,
        paddingVertical: 1 * vmin,
        paddingHorizontal: 6 * vmin,
        borderColor: palette.lightGrey2,
        borderWidth: 2,
        borderRadius: 18,
        gap: 2 * vmin
    },
    topGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16 * vmin,
        alignItems: 'center',
        marginBottom: 1 * vmin
    },
    countryGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1 * vmin
    },
    countryText: {
        fontFamily: 'Lato-Bold',
        fontSize: 2.2 * vh
    },
    flagIcon: {
        width: 4 * vh,
        resizeMode: 'contain'
    },
    dateText: {
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh
    },
    groupText: {
        color: palette.grey,
        fontFamily: 'Lato-Regular',
        fontSize: 1.8 * vh
    },
    middleGroup: {
        padding: 0,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 1 * vmin
    },
    profilePicsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: -1 * vh
    },
    profilePic: {
        display: 'flex',
        width: 12 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.purple,
        borderRadius: 6 * vmin,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 6 * vmin,
        color: palette.white,
        borderColor: palette.white,
        borderWidth: 0.8 * vmin,
    },
    showGroupButton: {
        minWidth: 0,
        maxWidth: 5 * vh,
        width: 5 * vh
    },
    bottomGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    joinButton: {
        width: 35 * vmin,
        height: 12 * vmin,
        justifyContent: 'center',
        alignContent: 'center'
    },
    goingGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.8 * vh
    },
    goingIcon: {
        width: 2.5 * vh,
        resizeMode: 'contain',
        tintColor: palette.purple
    },
    goingText: {
        color: palette.purple,
        fontSize: 2 * vh,
        marginBottom: 0.4 * vh
    }
})

export default TripView;