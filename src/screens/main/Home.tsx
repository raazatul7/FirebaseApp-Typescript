import React, { FC, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, InputText } from '../../components';
import firebase from 'firebase';

interface Props {
    navigation: any;
}

const Home: FC<Props> = (props) => {
    const [msg, setMsg] = useState<string>('');
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        fetchCurrentUser()
        fetchPosts()
    }, [])

    const fetchCurrentUser = async () => {
        const uid = firebase.auth().currentUser?.uid;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUser({ id: user.id, ...user.data() })
    }

    const handleSignOut = async () => {
        await firebase.auth().signOut();
    }

    const fetchPosts = () => {
        firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
            console.log('documents=>', documents)
        })
    }

    const handlePost = async () => {
        if (msg) {
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false
            }
            try {
                await firebase.firestore().collection('posts').add(data).then(() => {
                    setMsg('')
                }).catch(err => Alert.alert(err));
            } catch (err) {
                console.log(err);
            }

        } else {
            Alert.alert(`Missing Fields`)
        }
    }
    console.log('user=>', user)

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title='Sign Out!'
                    onPress={handleSignOut}
                />
            </View>
            <View style={{}}>
                <Text>Hello! {user?.name}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <InputText
                    placeholder='Write Something...'
                    onTextChange={(msg) => setMsg(msg)}
                    value={msg}
                />
                <Button
                    title='Post'
                    onPress={handlePost}
                />
            </View>
            {user ? user.isAdmin ? (
                <View>
                    <Button title="Dashboard" onPress={() => props.navigation.navigate('dashboard')} />
                </View>
            ) : null : null}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20

    },
    text: {
        fontSize: 16
    }
})
export default Home

