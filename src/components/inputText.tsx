import React, { FC } from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

interface Props {
    placeholder: string;
    value?: string;
    onTextChange: (text: string) => void;
    secureTextEntry?: boolean;
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        marginVertical: 10,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#e3e3e3',
    },
    input: {
        padding: 15,
    }
})

export default InputText;