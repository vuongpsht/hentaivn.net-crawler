const cheerio = require('react-native-cheerio');

const BASE_API = 'https://hentaivn.net';

export const getWebContent = async (url: string) => {
  const webContent = await fetch(url);
  return await webContent.text();
};

export const HomeCrawler = async (page: number) => {
  const list: any[] = [];
  const content = await getWebContent(BASE_API + `/?page=${page}`);
  const $ = cheerio.load(content);
  const demo = $('.block-item > ul');
  $('li', demo[0]).map((_: any, li: any) => {
    const preUrl = $('ul > a > div', li).css('background');
    const chap = $('ul > a > span > b', li).text();
    const name = $('ul > span > a > h2', li).text();
    const urlSlug = $('ul > a', li).attr('href');
    const url = preUrl.slice(4, preUrl.length - 1);
    const elment = {
      url,
      chap,
      name,
      urlSlug,
    };
    list.push(elment);
  });
  return list;
};

export const DetailCrawler = async (slug: string) => {
  const img: string[] = [];
  const api = BASE_API + slug;
  const content = await getWebContent(api);
  const $ = cheerio.load(content);
  const pageInfo = $('.watch-online');
  const pre = pageInfo[0];
  const link = $('a', pre).attr('href');
  const chapDetail = await getWebContent(BASE_API + link);
  const $$ = cheerio.load(chapDetail);
  const selector = $$('#image > img');
  selector.map((_: any, el: any) => {
    const url = $$(el).attr('src');
    img.push(url);
  });
  const next = $$('.b-next').attr('href');
  console.log(next);
  return {
    img,
    next: next,
  };
};
