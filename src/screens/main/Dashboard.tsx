import React, { FC, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, InputText } from '../../components';
import firebase from 'firebase';

interface Props {
  navigation: any;
}

const Dashboard: FC<Props> = props => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    firebase
      .firestore()
      .collection('posts')
      .where('approved', '==', true)
      .onSnapshot(querySnapShot => {
        const documents = querySnapShot.docs;
        setPosts(documents);
        console.log('documents=>', documents);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Pending posts</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
});
export default Dashboard;
