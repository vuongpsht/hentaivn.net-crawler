import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image} from 'react-native';
import {DetailCrawler} from '../../lib/crawler/HomeCrawler';

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
          <Image
            style={{width: width, height: height * 0.7}}
            source={{uri: item}}
            resizeMode={'center'}
          />
        );
      }}
    />
  );
};
