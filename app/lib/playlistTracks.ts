// Local playlist tracks

export interface LocalTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration?: number;
}

// Convert to MediaApi.Song format for iPod compatibility
export const convertToMediaApiSong = (track: LocalTrack): MediaApi.Song => ({
  id: track.id,
  name: track.title,
  artistName: track.artist,
  url: track.src,
  artwork: { url: track.cover },
  duration: track.duration || 0,
  trackNumber: 0,
  albumName: "Portfolio Playlist",
});

export const localTracks: LocalTrack[] = [
  // Fill this with your 23 tracks, for example:
  // {
  //   id: "track-01",
  //   title: "song title 1",
  //   artist: "artist name 1",
  //   src: "/songs/track-01.mp3",
  //   cover: "/covers/track-01.jpg",
  // },
  {
    id: "6KIS5YIZAyeiFNx1aE1OhY",
    title: "Hang on to Your Love",
    artist: "Sade",
    src: "https://od.lk/s/ODhfMTkzNTcxODhf/Sade%20-%20Hang%20on%20to%20Your%20Love.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzRf/Sade%20-%20Hang%20on%20to%20Your%20Love.jpg",
  },
  {
    id: "4ssiCx4MjZW1Rl9VOF0GZL",
    title: "Kiss of Life",
    artist: "Sade",
    src: "https://od.lk/s/ODhfMTkzNTcxNzhf/Sade%20-%20Kiss%20of%20Life.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzNf/Sade%20-%20Kiss%20of%20Life.jpg",
  },
  {
    id: "22QiTJqDn1BIRSh4mkNJ5w",
    title: "Cherish the Day",
    artist: "Sade",
    src: "https://od.lk/s/ODhfMTkzNTcxOTJf/Sade%20-%20Cherish%20the%20Day.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzZf/Sade%20-%20Cherish%20the%20Day.jpg",
  },
  {
    id: "4qS2KPWvsQzLvRa9oCHw41",
    title: "You (feat. Travis Scott)",
    artist: "Don Toliver, Travis Scott",
    src: "https://od.lk/s/ODhfMTkzNTcxOTRf/Don%20Toliver%2C%20Travis%20Scott%20-%20You%20%28feat.%20Travis%20Scott%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5Mzhf/Don%20Toliver%2C%20Travis%20Scott%20-%20You%20%28feat.%20Travis%20Scott%29.jpg",
  },
  {
    id: "PLAYBOI_CARTI_CONTROL",
    title: "Control",
    artist: "Playboi Carti",
    src: "https://od.lk/s/ODhfMTkzNjYxNjRf/Playboi%20Carti%20-%20Control.mp3",
    cover: "https://od.lk/s/ODhfMTkzNjYxNjJf/Playboi%20Carti%20-%20Control.jpeg",
  },
  {
    id: "0O3TAouZE4vL9dM5SyxgvH",
    title: "Fashion Killa",
    artist: "A$AP Rocky",
    src: "https://od.lk/s/ODhfMTkzNTcyMDNf/A%24AP%20Rocky%20-%20Fashion%20Killa.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5Mzlf/A%23AP%20Rocky%20-%20Fashion%20Killa.jpg",
  },
  {
    id: "1SRYeLTTfFC1nYtIMauYQc",
    title: "Honey Bun",
    artist: "Kodak Black",
    src: "https://od.lk/s/ODhfMTkzNTcxNjlf/Kodak%20Black%20-%20Honey%20Bun.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDVf/Kodak%20Black%20-%20Honey%20Bun.jpg",
  },
  {
    id: "2iu60eTIm2py6MaoVMcBAR",
    title: "Crossfaded",
    artist: "Don Toliver",
    src: "https://od.lk/s/ODhfMTkzNTcxNjdf/Don%20Toliver%20-%20Crossfaded.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDZf/Don%20Toliver%20-%20Crossfaded.jpg",
  },
  {
    id: "6Mz7ULRwNSCOdut6M3tNs2",
    title: "Lookin Exotic",
    artist: "Future",
    src: "https://od.lk/s/ODhfMTkzNTcxOTBf/Future%20-%20Lookin%20Exotic.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NTNf/Future%20-%20Lookin%20Exotic.jpg",
  },
  {
    id: "1F6nHHDJyTHLgDDFj1ZZDt",
    title: "SOMETHING ABOUT YOU",
    artist: "PARTYNEXTDOOR, Drake",
    src: "https://od.lk/s/ODhfMTkzNTcxNzBf/PARTYNEXTDOOR%2C%20Drake%20-%20SOMETHING%20ABOUT%20YOU.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDdf/PARTYNEXTDOOR%2C%20Drake%20-%20SOMETHING%20ABOUT%20YOU.jpg",
  },
  {
    id: "2vjFTjmvpFjFM01cNdG2ik",
    title: "LASERS",
    artist: "PARTYNEXTDOOR, Drake",
    src: "https://od.lk/s/ODhfMTkzNTcxOTdf/PARTYNEXTDOOR%2C%20Drake%20-%20LASERS.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDFf/PARTYNEXTDOOR%2C%20Drake%20-%20LASERS.jpg",
  },
  {
    id: "1yeB8MUNeLo9Ek1UEpsyz6",
    title: "Rich Baby Daddy (feat. Sexyy Red & SZA)",
    artist: "Drake, Sexyy Red, SZA",
    src: "https://od.lk/s/ODhfMTkzNTcyMDBf/Drake%2C%20Sexyy%20Red%2C%20SZA%20-%20Rich%20Baby%20Daddy%20%28feat.%20Sexyy%20Red%20%26%20SZA%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDBf/Drake%2C%20Sexyy%20Red%2C%20SZA%20-%20Rich%20Baby%20Daddy%20%28feat.%20Sexyy%20Red%20%26%20SZA%29.jpg",
  },
  {
    id: "3Q5cLvkKsHJvYltf8k7HkO",
    title: "Ego Death (feat. Kanye West, FKA twigs & Skrillex)",
    artist: "Ty Dolla $ign, FKA twigs, Skrillex, Kanye West",
    src: "https://od.lk/s/ODhfMTkzNTcxOTFf/Ty%20Dolla%20%24ign%2C%20FKA%20twigs%2C%20Skrillex%2C%20Kanye%20West%20-%20Ego%20Death%20%28feat.%20Kanye%20West%2C%20FKA%20twigs%20%26%20Skrillex%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzJf/Ty%20Dolla%20%23ign%2C%20FKA%20twigs%2C%20Skrillex%2C%20Kanye%20West%20-%20Ego%20Death%20%28feat.%20Kanye%20West%2C%20FKA%20twigs%20%26%20Skrillex%29.jpg",
  },
  {
    id: "1jIu9uVVYaP3x09HLjikQ3",
    title: "act viii: i hate to be alone",
    artist: "4batz",
    src: "https://od.lk/s/ODhfMTkzNTcxNzNf/4batz%20-%20act%20viii-%20i%20hate%20to%20be%20alone.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDhf/4batz%20-%20act%20viii%23%20i%20hate%20to%20be%20alone.jpg",
  },
  {
    id: "0NWqNXBJTpXbkI5rPWNy3p",
    title: "All I Know",
    artist: "The Weeknd, Future",
    src: "https://od.lk/s/ODhfMTkzNTcxODdf/The%20Weeknd%2C%20Future%20-%20All%20I%20Know.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5Mjlf/The%20Weeknd%2C%20Future%20-%20All%20I%20Know.jpg",
  },
  {
    id: "16XNk3bVCSHXN1rlwbXtHb",
    title: "Birthday Sex",
    artist: "Jeremih",
    src: "https://od.lk/s/ODhfMTkzNTcxOTVf/Jeremih%20-%20Birthday%20Sex.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NTJf/Jeremih%20-%20Birthday%20Sex.jpg",
  },
  {
    id: "6sJJyjNbhmx69lukYRygR2",
    title: "SMILE BODY PRETTY FACE (feat. Kodak Black & YG)",
    artist: "Ty Dolla $ign, Kodak Black, YG",
    src: "https://od.lk/s/ODhfMTkzNTcxNzRf/Ty%20Dolla%20%24ign%2C%20Kodak%20Black%2C%20YG%20-%20SMILE%20BODY%20PRETTY%20FACE%20%28feat.%20Kodak%20Black%20%26%20YG%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NTFf/Ty%20Dolla%20%23ign%2C%20Kodak%20Black%2C%20YG%20-%20SMILE%20BODY%20PRETTY%20FACE%20%28feat.%20Kodak%20Black%20%26%20YG%29.jpg",
  },
  {
    id: "0WsC4ETIXyiHDMXRaPMvKe",
    title: "wgft (feat. Burna Boy)",
    artist: "Gunna, Burna Boy",
    src: "https://od.lk/s/ODhfMTkzNTcxNzVf/Gunna%2C%20Burna%20Boy%20-%20wgft%20%28feat.%20Burna%20Boy%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDlf/Gunna%2C%20Burna%20Boy%20-%20wgft%20%28feat.%20Burna%20Boy%29.jpg",
  },
  {
    id: "578CwfxpfH2HxlENOCHc2n",
    title: "CELIBACY",
    artist: "PARTYNEXTDOOR, Drake",
    src: "https://od.lk/s/ODhfMTkzNTcxNjZf/PARTYNEXTDOOR%2C%20Drake%20-%20CELIBACY.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDNf/PARTYNEXTDOOR%2C%20Drake%20-%20CELIBACY.jpg",
  },
  {
    id: "3CiCLeSabMedcyDMIZ12ID",
    title: "Mami (feat. Sexyy Red)",
    artist: "Young Thug, Sexyy Red",
    src: "https://od.lk/s/ODhfMTkzNTcyMDFf/Young%20Thug%2C%20Sexyy%20Red%20-%20Mami%20%28feat.%20Sexyy%20Red%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5NDJf/Young%20Thug%2C%20Sexyy%20Red%20-%20Mami%20%28feat.%20Sexyy%20Red%29.jpg",
  },
  {
    id: "2mNGL7mZILSqZHxGboJaO9",
    title: "COMË N GO",
    artist: "Yeat",
    src: "https://od.lk/s/ODhfMTkzNTcxOTlf/Yeat%20-%20COM%C3%8B%20N%20GO.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5Mzdf/Yeat%20-%20COM%C3%8B%20N%20GO.jpg",
  },
  {
    id: "3LjZ6PqqXfwkcnLOkgLGKI",
    title: "BEEP BEEP",
    artist: "Travis Scott, SahBabii",
    src: "https://od.lk/s/ODhfMTkzNTcxOTNf/Travis%20Scott%2C%20SahBabii%20-%20BEEP%20BEEP.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzVf/Travis%20Scott%2C%20SahBabii%20-%20BEEP%20BEEP.jpg",
  },
  {
    id: "4AFgK4wP1iD5i8BYaLr9Vf",
    title: "You Da Baddest (feat. Nicki Minaj)",
    artist: "Future, Nicki Minaj",
    src: "https://od.lk/s/ODhfMTkzNTcxODlf/Future%2C%20Nicki%20Minaj%20-%20You%20Da%20Baddest%20%28feat.%20Nicki%20Minaj%29.mp3",
    cover: "https://od.lk/s/ODhfMTkzNTc5MzBf/Future%2C%20Nicki%20Minaj%20-%20You%20Da%20Baddest%20%28feat.%20Nicki%20Minaj%29.jpg",
  },
];

// Convert all tracks to MediaApi.Song format
export const playlistTracks: MediaApi.Song[] = localTracks.map(convertToMediaApiSong);
