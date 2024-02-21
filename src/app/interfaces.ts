
export interface IVolumeControl {
    currentVolume: number;
    toggleMute(): void;
}

export interface IPlaybackControl {
    isPlaying: boolean;
    previousSong(): void;
    nextSong(): void;
    pause(): void;
    play(): void;
}

export interface OutputDeviceIcons {
    [key: string]: string;
}

export interface IBacklightControl {
    backlightColor: string;
    changeBacklightColor(color: string): void;
}

export interface IShufflePlaylistControl {
    playList: Music[];
    shufflePlayList(): void;
}

export interface IChangeSongManagerControl {
    playSongFromList(song: Song): void;
    currentSong: string;
}

export interface Music {
    title: string
    url: string;
    isFavorite: boolean;
}

export interface Song {
    title: string;
    url: string;
}


// export interface IFavoriteSongs {
//     favoriteSongs: string[];
//     addCurrentSongToFavourite(song: string): void;
//     removeCurrentSongFromFavourite(song: string): void;
// }

