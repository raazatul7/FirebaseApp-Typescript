import React, { FC, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, InputText } from '../../components';
import firebase from 'firebase';

interface Props {
    navigation: any;
}

const Login: FC<Props> = (props) => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleLogin = async () => {
        if (email && password) {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
                console.log('res=>', res)
            }).catch(err => Alert.alert(err.message))

        } else {
            Alert.alert('Error', 'Missing Fields')
        }
    }

    return (
        <View style={styles.container}>
            <InputText
                placeholder='Email'
                onTextChange={(txt) => setEmail(txt)}
            />
            <InputText
                placeholder='Password'
                secureTextEntry={true}
                onTextChange={(txt) => setPassword(txt)}
            />
            <Button
                title='Login'
                onPress={handleLogin}
            />
            <View style={styles.loginText}>
                <Text style={{ marginHorizontal: 5 }}>Don't Have an Account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('signup')} style={{ marginHorizontal: 5 }}>
                    <Text style={{ color: 'rgba(81,135,200,1)' }}>Sign Up Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        flexDirection: 'row',
        marginVertical: 20
    },

})
export default Login;

