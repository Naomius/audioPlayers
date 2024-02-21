import {
    IBacklightControl,
    IChangeSongManagerControl, IChargeLevelControl, IFavoriteSongs,
    IOutputDeviceControl,
    IPlaybackControl, IShufflePlaylistControl,
    IVolumeControl, Music, OutputDeviceIcons, Song
} from "../interfaces";
import {PlayerType, SoundOutput} from "../enums";
import {PlaybackControl} from "./playbackControl";

export class MusicPlayer extends PlaybackControl implements IPlaybackControl,
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
    public currentVolume: number;
    public outputDevice: string;
    public override playList: Music[];
    public newSongs: Music[];
    public currentSongsSet: Music[];
    public favoriteSongs: string[];
    public backlightColors = ['Белый', 'Красный', 'Синий', 'Зеленый', 'Желтый', 'Фиолетовый'];
    public englishBacklightColors = ['white', 'red', 'blue', 'green', 'yellow', 'purple'];

    protected constructor(playerType: PlayerType) {
        super();
        this.playerType = playerType;
        this.backlightColor = 'white';
        this.chargeBatteryLevel = 50;
        this.currentVolume = 100;
        this.currentSong = '...';
        this.isPlaying = false;
        this.outputDevice = 'headphones';
        this.favoriteSongs = [];
        this.playList = [
            {title: 'Saliva', url: './assets/music/Saliva.mp3', isFavorite: false},
            {title: 'FiveFinger', url: './assets/music/FiveFinger.mp3', isFavorite: false},
            {title: 'Hope', url: './assets/music/Hope.mp3', isFavorite: false},
            {title: 'In the end', url: './assets/music/InTheEnd.mp3', isFavorite: false},
            {title: 'TokyoDrift', url: './assets/music/TokioDrift.mp3', isFavorite: false},
        ];
        this.newSongs = [
            {title: 'ImagineDragons', url: './assets/music/ImagineDragons.mp3', isFavorite: false},
            {title: 'Morpheus', url: './assets/music/Morpheus.mp3', isFavorite: false},
            {title: 'Rocky', url: './assets/music/Rocky.mp3', isFavorite: false},
            {title: 'Transformers', url: './assets/music/Transformers.mp3', isFavorite: false},
            {title: 'NoSurprise', url: './assets/music/NoSurprice.mp3', isFavorite: false},
        ]
        this.currentSongsSet = this.playList;
    }

    changeBacklightColor(color: string): void {
        this.backlightColor = this.englishBacklightColors[this.backlightColors.indexOf(color)];
    }
    getAvailableBacklightColors(): string[] {
        switch(this.playerType) {
            case PlayerType.Cassette:
                return ['Белый'];
            case PlayerType.MP3:
                return ['Красный', 'Синий', 'Зеленый'];
            case PlayerType.Modern:
                return ['Красный', 'Желтый', 'Зеленый', 'Синий', 'Фиолетовый'];
            default:
                return [];
        }
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

    // changeBacklightColor(color: string): void {
    //     this.backlightColor = color;
    // }

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
        this.playList = (this.currentSongsSet === this.playList) ? this.newSongs : this.playList;
    }

    chargeBattery(): void {
        this.chargeBatteryLevel = 100;
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
