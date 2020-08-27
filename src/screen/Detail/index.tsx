import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {DetailCrawler} from '../../lib/crawler/HomeCrawler';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');
export const DetailScreen = ({route}: any) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [next, setNext] = useState<string | undefined>('');
  const {slug} = route.params;
  useEffect(() => {
    getContent(slug).then();
  }, []);
  const getContent = (url: string) =>
    DetailCrawler(url).then((res) => {
      const newUrls = urls.concat(res.img);
      setUrls(newUrls);
      setNext((pre) => (pre !== res.next ? res.next : undefined));
    });

  return (
    <FlatList
      data={urls}
      keyExtractor={(item) => item}
      onEndReached={() => {
        if (next && next.length > 0) {
          getContent('/' + next).then();
        }
      }}
      renderItem={({item}) => {
        return (
          <FastImage
            style={{width: width, height: height * 0.7}}
            source={{uri: item}}
            resizeMode={'center'}
          />
        );
      }}
    />
  );
};
