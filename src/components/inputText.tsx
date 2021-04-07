import React, { FC } from 'react';
import { StyleSheet, TextInput, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import IMAGES from '../constants/images';
const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    value?: string;
    onTextChange: (text: string) => void;
    secureTextEntry?: boolean;
    onCameraPress?: () => void;
}

const InputText: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={props.value}
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={props.onTextChange}
                secureTextEntry={props.secureTextEntry}
            />
            <TouchableOpacity style={styles.cameraBtn}
                onPress={props.onCameraPress}
            >
                <Image source={IMAGES.camera} style={styles.cameraIcon} />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    input: {
        padding: 15,
        flex: 1,
    },
    cameraIcon: {
        height: 25,
        width: 25
    },
    cameraBtn: {
        flex: 0.2, alignItems: 'center', justifyContent: 'center'
    }
})

export default InputText;