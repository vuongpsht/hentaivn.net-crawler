import React, {useEffect, useState} from 'react';
import {HomeCrawler} from '../../lib/crawler/HomeCrawler';
import {FlatList} from 'react-native';
import {HomeItem} from '../../components/HomeItem';

export const HomeScreen = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    HomeCrawler(page).then((res) => {
      const pre = urls.concat(res);
      setUrls(pre);
    });
  }, [page]);
  return (
    <FlatList<any>
      data={urls}
      keyExtractor={(item) => item.urlSlug}
      onEndReached={() => setPage((pre) => pre + 1)}
      renderItem={({item}) => <HomeItem item={item} />}
    />
  );
};
