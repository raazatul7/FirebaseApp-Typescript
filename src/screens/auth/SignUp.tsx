import React, { FC, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, InputText } from '../../components';
import firebase from 'firebase';

interface Props {
    navigation: any;
}

const SignUp: FC<Props> = (props) => {

    const [name, setName] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const handleSignUp = async () => {
        if (name && email && password) {
            try {
                const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
                if (user) {
                    await firebase.firestore().collection('users').doc(user.uid).set({
                        name, email, password
                    })
                }
            } catch (error) {
                Alert.alert('Error', error.message)
                console.log('error=>', error)
            }
        } else {
            Alert.alert('Error', 'Missing Fields')
        }
    }

    return (
        <View style={styles.container}>
            <InputText
                placeholder='Name'
                onTextChange={(name) => setName(name)}
            />
            <InputText
                placeholder='Email'
                onTextChange={(email) => setEmail(email)}
            />
            <InputText
                placeholder='Password'
                secureTextEntry={true}
                onTextChange={(pass) => setPassword(pass)}
            />
            <Button
                title='Sign Up'
                onPress={handleSignUp}
            />
            <View style={styles.loginText}>
                <Text style={{ marginHorizontal: 5 }}>Already have an Account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('login')} style={{ marginHorizontal: 5 }}>
                    <Text style={{ color: 'rgba(81,135,200,1)' }}>Login Here</Text>
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
export default SignUp;

