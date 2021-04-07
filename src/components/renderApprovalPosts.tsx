import React, { FC } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button } from '.';

const { width, height } = Dimensions.get('screen')

interface Props {
    msg: string;
    approved: string;
    timeStamp: number;
    onApprove: () => void;
    onReject: () => void;
}


const App: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ marginBottom: 15, fontSize: 18 }}>{props.msg}</Text>
                <Text>{new Date(props.timeStamp).toUTCString()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title="Approve" onPress={props.onApprove} />
                <Button title="Reject" onPress={props.onReject} />
            </View>
        </View >
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        marginVertical: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#ccc',
        shadowOpacity: 0.9
    }
})