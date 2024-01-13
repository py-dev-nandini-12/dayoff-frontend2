import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../";
import { StyleSheet } from "react-native";
import { React, useState } from "react";
import { palette, themes } from "../../style";
import * as ImagePicker from 'expo-image-picker';

const PhotoInput = (props) => {
    const circleWidth = props.width;
    const cameraRatio = props.camRatio;
    const children = props.children;

    const [image, setImage] = useState(null);
    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        height: 256,
        width: 256
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };



    return (
    <>
        <TouchableOpacity
            style={{
                width: circleWidth,
                height: circleWidth,
                borderRadius: circleWidth / 2,
                backgroundColor: palette.lightPurple,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            //TODO: function call to add photo
            onPress={() => openImagePicker()}
        >
            <Image
                source={require("../../../assets/icons/camera.png")}
                tintColor={palette.purple}
                style={{
                    resizeMode: 'contain',
                    width: cameraRatio,
                    height: cameraRatio,
                }}
            />
            {children}
        </TouchableOpacity>
    </>
    )
}

const styles = StyleSheet.create({
})


export default PhotoInput;