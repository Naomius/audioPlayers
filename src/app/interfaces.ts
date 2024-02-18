
export interface IVolumeControl {
    currentVolume: number;
    volumeUp(): void;
    volumeDown(): void;
    toggleMute(): void;
}

export interface IPlaybackControl {
    currentSong: string;
    isPlaying: boolean;
    playSongFromList(song: Song): void;
    previousSong(): void;
    nextSong(): void;
    pause(): void;
    play(): void;
}

export interface IFavoriteSongs {
    favoriteSongs: string[];
    addCurrentSongToFavourite(song: string): void;
    removeCurrentSongFromFavourite(song: string): void;
}

export interface IOutputDeviceControl {
    outputDevice: string;
    changeOutput(outputDevice: string): void;
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
    playList: Music[];
    changeSongsSet(): void;
}

export interface IChargeLevelControl {
    chargeBatteryLevel: number;
    chargeBattery(): void;
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
