import React, { FC, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, FlatList, Keyboard } from 'react-native';
import { Button, InputText, Posts } from '../../components';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker'

interface Props {
    navigation: any;
}

const Home: FC<Props> = (props) => {
    const [msg, setMsg] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
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

    const fetchPosts = async () => {
        //For Firestore -
        // firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
        //     const documents = querySnapShot.docs;
        //     setPosts(documents);
        // })
        //For Realtime DB -
        const posts = firebase.database().ref('users/posts')
        posts.on("value", res => {
            let data = res.val()
            let myKeyValue = Object.keys(data);
            const dataArray = myKeyValue.map((key) => {
                let item = data[key];
                return { ...item };
            });
            setPosts(dataArray.reverse());
        })
    }

    const handlePost = async () => {
        if (msg) {
            setMsg('');
            setImage(null);
            Keyboard.dismiss();
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false,
                image: image
            }
            //For Realtime DB -
            const posts = firebase.database().ref(`users/posts/${Date.now()}`)
            posts.set(data).then(() => {
                Alert.alert('Successfull!');
            }).catch((err) => {
                console.log('err=>', err)
            })
            //For Firestore -
            // try {
            //     await firebase.firestore().collection('posts').add(data).then(() => {
            //         setMsg('');
            //         setImage(null);
            //     }).catch(err => Alert.alert(err));
            // } catch (err) {
            //     console.log(err);
            // }

        } else {
            Alert.alert(`Missing Fields`)
        }
    }

    const uriToBlob = (uri: string) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

    }

    const openImagePicker = () => {
        ImagePicker.openPicker({
            includeBase64: true,
            width: 300,
            height: 400,
            mediaType: "photo",
        }).then((res: any) => {
            return uriToBlob(res.path);

        }).then((blob: any) => {
            let timeStamp = Date.now();
            var storageRef = firebase.storage().ref();
            storageRef.child(`posts/images/${timeStamp}`).put(blob).then(async (snapshot) => {
                let url = await snapshot.ref.getDownloadURL();
                setImage(url)
            });
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title='Sign Out!'
                    onPress={handleSignOut}
                />
            </View>
            <View>
                <Text>Hello! {user?.name}</Text>
            </View>
            <View style={{ flex: 1, marginTop: 10, }}>
                {posts.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        renderItem={({ item }) => {
                            return (
                                <Posts
                                    msg={item.msg}
                                    timeStamp={item.timeStamp}
                                    approved={item.approved}
                                    uri={item?.image} />
                            )
                        }} />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Nothing To Display</Text>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <InputText
                    placeholder='Write Something...'
                    onTextChange={(msg) => setMsg(msg)}
                    value={msg}
                    onCameraPress={openImagePicker}
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

