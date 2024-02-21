import {
    IBacklightControl,
    IChangeSongManagerControl, IChargeLevelControl,
    IPlaybackControl, IShufflePlaylistControl,
    IVolumeControl, Music, OutputDeviceIcons, Song
} from "../interfaces";
import {PlayerType, SoundOutput} from "../enums";

export abstract class MusicPlayer implements IPlaybackControl,
    IVolumeControl,
    IBacklightControl,
    IChangeSongManagerControl,
    IChargeLevelControl,
    IShufflePlaylistControl {


    public playerType: PlayerType;
    public currentSong: string;
    public isPlaying: boolean;
    public backlightColor!: string;
    public chargeBatteryLevel!: number;
    public currentVolume: number;
    public outputDevice: string;
    public playList: Music[];
    public newSongs: Music[];
    public currentSongsSet: Music[];
    public favoriteSongs!: string[];
    public backlightColors: string[] = [];
    public englishBacklightColors: string[] = [];
    public outputDeviceIcons!: OutputDeviceIcons;
    public russianOutputNames!: Record<string, string>;
    protected audio: HTMLAudioElement = new Audio();

    protected constructor(playerType: PlayerType) {
        this.playerType = playerType;
        this.currentSong = '...';
        this.isPlaying = false;
        this.currentVolume = 100;
        this.currentSong = '...';
        this.outputDevice = 'headphones';
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

    abstract getAvailableBacklightColors(): string[];
    abstract toggleFavorite(song: Music): void;
    abstract addCurrentSongToFavourite(song: string): void;
    abstract removeCurrentSongFromFavourite(song: string): void;
    abstract shufflePlayList(): void;
    abstract getAvailableOutputs(): SoundOutput[];

    play(): void {
        this.isPlaying = true;
        this.audio.play();
    }

    pause(): void {
        this.isPlaying = false;
        this.audio.pause();
    }

    nextSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title == this.currentSong);
        if (currentIndex !== -1 && currentIndex < this.playList.length - 1) {
            this.currentSong = this.playList[currentIndex + 1].url;
            this.playSongFromList(this.playList[currentIndex + 1]);
        }
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

    changeBacklightColor(color: string): void {
        this.backlightColor = this.englishBacklightColors[this.backlightColors.indexOf(color)];
    }
    changeOutput(outputDevice: string): void {
        this.outputDevice = outputDevice;
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
