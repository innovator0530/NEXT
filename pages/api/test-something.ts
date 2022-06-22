import { submitRelease } from "controller/release-delivery/submitRelease"
// import { createArtist } from "@lib/fuga/createArtist";
import { createHandler } from "@middleware"
import { PostRelease } from "@models/api/PostRelease.model"
import { NextApiResponse } from "next"

const handler = createHandler()

// handler.get(async(req,res:NextApiResponse)=>{
//     const release:PostRelease = {
//         title: 'abc',
//         labelId: '618955afce3f5ab1569cd3cb',
//         coverUrl: 'rewave-server-local:///home/florian/code/rewave/.temp/release-assets/users/61893a96fe7d803765d35dc1/upload_7ad23252bf9f620c6f06b26b6c7cf9b2.png',
//         artists: [ { type: 'primary', id: '6189567fce3f5ab1569cd3e8' } ],
//         genres: { primaryGenre: 'Alternative ', secondaryGenre: '' },
//         language: { code: 'de', name: 'German' },
//         releaseDates: {
//           original: '2021-11-08T23:00:00.000Z',
//           digital: '2021-11-08T23:00:00.000Z'
//         },
//         priceCategory: 'Full',
//         explicitLyrics: false,
//         copyright: { year: 2021, owner: 'G' },
//         publishingRights: { year: 2021, owner: 'F' },
//         upc: 'auto',
//         tracks: [
//           {
//             title: 'abc',
//             labelId: '618955afce3f5ab1569cd3cb',
//             artists: [{type:'primary',id:'618957d4ce3f5ab1569cd410'}],
//             fileUrl: 'rewave-server-local:///home/florian/code/rewave/.temp/release-assets/users/61893a96fe7d803765d35dc1/upload_c2f5e971f395c5adad718fa56c27b64f.flac',
//             genres: {primary:'Alternative',secondary:''},
//             language: {'code':'de',name:'German'},
//             explicitLyrics: false,
//             publishingRights: {year:2021,owner:'acb'},
//             isrc: 'auto'
//           }
//         ],
//         stores: [
//           { name: 'Spotify', id: 'SPOTIFY' },
//           { name: 'Apple Music', id: 'APPLE MUSIC' },
//           { name: 'Amazon Music', id: 'AMAZON MUSIC' },
//           { name: 'Tidal', id: 'TIDAL' },
//           { name: 'YouTube Music', id: 'YOUTUBE MUSIC' },
//           { name: 'YouTube Content ID', id: 'YOUTUBE CONTENT ID' },
//           { name: 'Facebook/Instagram', id: 'FACEBOOK/INSTAGRAM' },
//           { name: 'Wynk', id: 'WYNK' },
//           { name: 'Hungama', id: 'HUNGAMA' },
//           { name: 'JioSaavn', id: 'JIOSAAVN' },
//           { name: 'Napster', id: 'NAPSTER' },
//           { name: 'Deezer', id: 'DEEZER' },
//           { name: 'Yandex', id: 'YANDEX' },
//           { name: 'Shazam', id: 'SHAZAM' },
//           { name: 'Tencent', id: 'TENCENT' },
//           { name: 'Twitch', id: 'TWITCH' },
//           { name: 'Anghami', id: 'ANGHAMI' },
//           {
//             name: '7Digital (Clickmusic, Golden Discs, CD World, amp3digital Music & Video Download Store, ActionAid)',
//             id: '7DIGITAL (CLICKMUSIC, GOLDEN DISCS, CD WORLD, AMP3DIGITAL MUSIC & VIDEO DOWNLOAD STORE, ACTIONAID)'
//           },
//           { name: 'Akazoo', id: 'AKAZOO' },
//           { name: 'Artist Xite', id: 'ARTIST XITE' },
//           { name: 'AudioVroom', id: 'AUDIOVROOM' },
//           { name: 'AWA', id: 'AWA' },
//           { name: 'BuyMyPlaylist', id: 'BUYMYPLAYLIST' },
//           { name: 'Claro Música', id: 'CLARO MÚSICA' },
//           { name: 'Disco Volante', id: 'DISCO VOLANTE' },
//           { name: 'Dubset', id: 'DUBSET' },
//           { name: 'Fair Share Media', id: 'FAIR SHARE MEDIA' },
//           { name: 'Forest Incentives', id: 'FOREST INCENTIVES' },
//           { name: 'Gracenote', id: 'GRACENOTE' },
//           { name: 'Hit Parade', id: 'HIT PARADE' },
//           { name: 'HMV Canada', id: 'HMV CANADA' },
//           { name: 'HMV Digital', id: 'HMV DIGITAL' },
//           { name: 'IMI Mobile', id: 'IMI MOBILE' },
//           { name: 'InternetQ', id: 'INTERNETQ' },
//           { name: 'Kdigital Media', id: 'KDIGITAL MEDIA' },
//           { name: 'KKBOX', id: 'KKBOX' },
//           { name: "L'Eclerc", id: "L'ECLERC" },
//           { name: 'Medianodes', id: 'MEDIANODES' },
//           { name: 'Melon', id: 'MELON' },
//           { name: 'Meridian', id: 'MERIDIAN' },
//           { name: 'MonkingMe', id: 'MONKINGME' },
//           { name: 'MusicStory', id: 'MUSICSTORY' },
//           { name: 'NetEase Cloud Music', id: 'NETEASE CLOUD MUSIC' },
//           { name: 'Oursong', id: 'OURSONG' },
//           { name: 'Prodigium', id: 'PRODIGIUM' },
//           { name: 'Pure Digital Radios', id: 'PURE DIGITAL RADIOS' },
//           { name: 'Qvivo', id: 'QVIVO' },
//           { name: 'Real Hip Hop Network', id: 'REAL HIP HOP NETWORK' },
//           { name: 'Research in Motion', id: 'RESEARCH IN MOTION' },
//           { name: 'Samsung', id: 'SAMSUNG' },
//           { name: 'Senzari', id: 'SENZARI' },
//           { name: 'Slacker', id: 'SLACKER' },
//           { name: 'Spinlet', id: 'SPINLET' },
//           { name: 'T-Mobile', id: 'T-MOBILE' },
//           { name: 'Tonspion', id: 'TONSPION' },
//           { name: 'Toshiba', id: 'TOSHIBA' },
//           { name: 'Tradebit', id: 'TRADEBIT' },
//           { name: 'Travelclub', id: 'TRAVELCLUB' },
//           { name: 'Ubuntu', id: 'UBUNTU' },
//           { name: 'Word Magazine', id: 'WORD MAGAZINE' },
//           { name: 'Xiami Music', id: 'XIAMI MUSIC' },
//           { name: 'Zvooq', id: 'ZVOOQ' }
//         ],
//         beatLinksOrFiles: [
//           { type: 'LINK', link: 'abc' },
//           {
//             type: 'FILE',
//             url: 'development-server-europe:///home/florian/code/rewave/.temp/release-assets/users/61893a96fe7d803765d35dc1/upload_b008ed7d5f8072b5ec13f6a728dcd21b.xlsx',
//             name: 'March2020 - jeremy@saurwein.net.xlsx'
//           }
//         ]
//       }
//     //uploadAssetToFuga('/home/florian/code/rewave/.temp/release-assets/users/6178e807dbc2bb61bbf5c1ed/upload_1d6851624174fbfb1914cc3b30cf625e.flac')
//     // uploadAssetToFuga('development-server-europe:///home/florian/code/rewave/.temp/release-assets/users/6178e807dbc2bb61bbf5c1ed/upload_2a6dfa97f769bb13e9df279677b3141b.png')
//     // submitRelease(release);
//     await createArtist('Money Boy')
//     res.status(200).send('yes')
// })

export default handler
