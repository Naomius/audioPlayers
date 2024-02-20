import {
    IBacklightControl,
    IChangeSongManagerControl, IChargeLevelControl, IFavoriteSongs,
    IOutputDeviceControl,
    IPlaybackControl, IShufflePlaylistControl,
    IVolumeControl, Music, OutputDeviceIcons, Song
} from "../interfaces";
import {PlayerType, SoundOutput} from "../enums";
import {ChangeDetectorRef} from "@angular/core";

export class MusicPlayer implements IPlaybackControl,
    IVolumeControl,
    IOutputDeviceControl,
    IBacklightControl,
    IChangeSongManagerControl,
    IChargeLevelControl,
    IFavoriteSongs,
    IShufflePlaylistControl {

    public outputDeviceIcons: OutputDeviceIcons = {
        'headphones': 'headset',
        'wirelessHeadphones': 'hearing',
        'speaker': 'speaker'
    };

    playerType: PlayerType;
    public backlightColor: string;
    public chargeBatteryLevel: number;
    public currentSong: string;
    public currentVolume: number;
    public isPlaying: boolean;
    public outputDevice: string;
    public playList: Music[];
    public newSongs: Music[];
    public currentSongsSet: Music[];
    public favoriteSongs: string[];
    protected audio: HTMLAudioElement = new Audio();

    constructor(playerType: PlayerType) {
        this.playerType = playerType;
        this.backlightColor = 'white';
        this.chargeBatteryLevel = 50;
        this.currentVolume = 100;
        this.currentSong = '...';
        this.isPlaying = false;
        this.outputDevice = 'headphones';
        this.favoriteSongs = [];
        this.playList = [
            { title: 'Saliva', url: './assets/music/Saliva.mp3', isFavorite: false},
            { title: 'FiveFinger', url: './assets/music/FiveFinger.mp3', isFavorite: false},
            { title: 'Hope', url: './assets/music/Hope.mp3', isFavorite: false},
            { title: 'In the end', url: './assets/music/InTheEnd.mp3', isFavorite: false},
            { title: 'TokyoDrift', url: './assets/music/TokioDrift.mp3', isFavorite: false},
        ];
        this.newSongs = [
            { title: 'ImagineDragons', url: './assets/music/ImagineDragons.mp3', isFavorite: false},
            { title: 'Morpheus', url: './assets/music/Morpheus.mp3', isFavorite: false},
            { title: 'Rocky', url: './assets/music/Rocky.mp3', isFavorite: false},
            { title: 'Transformers', url: './assets/music/Transformers.mp3', isFavorite: false},
            { title: 'NoSurprise', url: './assets/music/NoSurprice.mp3', isFavorite: false},
        ]
        this.currentSongsSet = this.playList;
    }

    toggleFavorite(song: Music): void {
        alert("В этом плеере такой функционал не предусмотрен")
        throw new Error("В этом плеере такой функционал не предусмотрен");
    }

    shufflePlayList(): void {
        alert("В этом плеере такой функционал не предусмотрен")
        throw new Error("В этом плеере такой функционал не предусмотрен");
    }

    addCurrentSongToFavourite(song: string): void {
        if (!this.favoriteSongs.includes(song)) {
            this.favoriteSongs.push(song);
            console.log(`${song} добавлена в избранное.`);
        }
    }
    removeCurrentSongFromFavourite(song: string): void {
        const index = this.favoriteSongs.indexOf(song);
        if (index !== -1) {
            this.favoriteSongs.splice(index, 1);
            console.log(`${song} удалена из избранного.`);
        }
    }

    changeBacklightColor(color: string): void {
        this.backlightColor = color;
    }

    changeOutput(outputDevice: string): void {
        switch (this.playerType) {
            case PlayerType.Cassette:
                this.outputDevice = SoundOutput.Headphones;
                console.log('Только Наушники');
                break;
            case PlayerType.MP3:
                this.outputDevice = SoundOutput.Headphones;
                console.log('Только Наушники');
                break;
            case PlayerType.Modern:
                this.outputDevice = outputDevice;
                break;
            default:
                break;
        }
    }

    changeSongsSet(): void {
        this.currentSongsSet = (this.currentSongsSet === this.playList) ? this.newSongs : this.playList;
    }

    chargeBattery(): void {
        this.chargeBatteryLevel = 100;
    }

    nextSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title == this.currentSong);
        if (currentIndex !== -1 && currentIndex < this.playList.length - 1) {
            this.currentSong = this.playList[currentIndex + 1].url;
            this.playSongFromList(this.playList[currentIndex + 1]);
        }
    }

    pause(): void {
        this.isPlaying = false;
        this.audio.pause();
    }

    play(): void {
        this.isPlaying = true;
        this.audio.play();
    }

    playSongFromList(song: Song): void {
        this.isPlaying = true;
        this.audio.src = song.url;
        this.audio.play();
        this.currentSong = song.title
    }

    previousSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title === this.currentSong);
        if (currentIndex !== -1 && currentIndex > 0) {
            this.currentSong = this.playList[currentIndex - 1].url;
            this.playSongFromList(this.playList[currentIndex - 1]);
        }
    }

    toggleMute(): void {
        this.audio.muted = !this.audio.muted;
    }

    volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume--;
            this.audio.volume = this.currentVolume / 100;
        }
    }

    volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume++;
            this.audio.volume = this.currentVolume / 100;
        }
    }

}
