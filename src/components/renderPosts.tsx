import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Button } from '.';

const { width, height } = Dimensions.get('screen');

interface Props {
  msg: string;
  approved: string;
  timeStamp: number;
  uri?: string;
}

const Posts: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ marginBottom: 15, fontSize: 18 }}>{props.msg}</Text>
        {props.uri && <Image source={{ uri: props.uri }} style={styles.image} />}
        <Text>{new Date(props.timeStamp).toUTCString()}</Text>
      </View>
    </View>
  );
};

export default Posts;

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
      height: 3,
    },
    shadowColor: '#ccc',
    shadowOpacity: 0.9,
  },
  image: {
    resizeMode: 'contain',
    height: 200,
    width: 400
  }
});
