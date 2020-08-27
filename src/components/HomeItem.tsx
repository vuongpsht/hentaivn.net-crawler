import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const headers = {
  Referer: 'https://hentaivn.net/',
};
const {width, height} = Dimensions.get('window');
export const HomeItem = ({item}: any) => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate('Detail', {slug: item.urlSlug})}>
      <View style={s.container}>
        <Image style={s.img} source={{uri: item.url, headers: headers}} />
        <Text style={s.name}>{item.name}</Text>
        <Text>{item.chap}</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    width: width * 0.5,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    width: '70%',
    height: '70%',
  },
  name: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
