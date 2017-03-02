//import ml from './detail.json';
const ml = require('./detail.json');
const fs = require('fs');

let creator = {
  avatarUrl: ml.result.creator.avatarUrl,
  nickname: ml.result.creator.nickname,
  signature: ml.result.creator.signature
};

let tracks = ml.result.tracks.map((v, i) => {
  let trackItem = {};

  let artists = '';
  v.artists.forEach((v1, i1) => {
    if(i1 !== 0){
      artists += `/${v1.name}`;
    } else{
      artists += v1.name;
    }
  });
  trackItem.name = v.name;
  trackItem.artists = artists;
  trackItem.mp3Url = v.mp3Url;
  trackItem.picUrl = v.album.picUrl;
  return trackItem;
});


let result = {
  code: ml.code,
  creator,
  tracks
};

/* 约定
{
  code: 200,
  creator: {
    avatarUrl: 'http://p1.music.126.net/s7CMIBs2ODi_BreprUFidA==/3383197284619846.jpg',
    nickname: 'joy钰',
    signature: '你知道，世界上最美妙的东西，就是音乐啦�'
  },
  tracks: [{
    name: 'Elegy For The Arctic',
    artists: 'Ludovico Einaudi',
    mp3Url: 'http://m2.music.126.net/-jBiUY4gon63UkrWNuhsEw==/18712588394343922.mp3',
    picUrl: 'http://p3.music.126.net/nqMGIHNQ6be8u7w39xJ8rg==/18019896067844337.jpg'
  }, {
    name: 'Elegy For The Arctic',
    artists: 'Ludovico Einaudi',
    mp3Url: 'http://m2.music.126.net/-jBiUY4gon63UkrWNuhsEw==/18712588394343922.mp3',
    picUrl: 'http://p3.music.126.net/nqMGIHNQ6be8u7w39xJ8rg==/18019896067844337.jpg'
  }]
}
*/

fs.writeFile('data.json', JSON.stringify(result), (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

