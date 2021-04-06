import React, { FC } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');

interface Props {
    title: string;
    onPress: () => void;
}

const Button: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.button}>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 3
    },
    button: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#000',
        borderRadius: 20
    },
    title: {
        color: '#fff',
        alignSelf: 'center',
    }
})

export default Button;