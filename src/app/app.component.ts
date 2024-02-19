import {Component} from '@angular/core';
import {
    IBacklightControl,
    IChangeSongManagerControl, IChargeLevelControl, IFavoriteSongs,
    IOutputDeviceControl,
    IPlaybackControl, IShufflePlaylistControl,
    IVolumeControl, Music, OutputDeviceIcons, Song,
} from "./interfaces";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    protected readonly SoundOutput = SoundOutput;
    public currentPlayer: string = 'cassette';
    public cassettePlayer: CassettePlayer;
    public pocketMp3Player: PocketMP3Player;
    public modernPlayer: ModernPlayer;
    public displayedColumns: string[] = ['title'];
    constructor() {
        this.cassettePlayer = new CassettePlayer();
        this.pocketMp3Player = new PocketMP3Player();
        this.modernPlayer = new ModernPlayer();
    }

}

//Класс с общей для плееров логикой

export class MusicPlayer implements IPlaybackControl,
    IVolumeControl,
    IOutputDeviceControl,
    IBacklightControl,
    IChangeSongManagerControl,
    IChargeLevelControl,
    IFavoriteSongs {

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

    constructor() {
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
        this.outputDevice = outputDevice;
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

//Класс кассетного плеера
export class CassettePlayer extends MusicPlayer {
    constructor() {
        super();
    }

}

//Карманный mp3 плеер
export class PocketMP3Player extends MusicPlayer implements
    IShufflePlaylistControl {
    constructor() {
        super();
        this.chargeBatteryLevel = 50;
    }

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
    }

    override changeSongsSet(): void {
        this.playList = this.newSongs.slice(0, 5);
    }

    override chargeBattery(): void {
        setInterval((): void => {
            this.chargeBatteryLevel += 5;
            if (this.chargeBatteryLevel > 100) {
                this.chargeBatteryLevel = 100;
            }
        }, 1000)
    }

    shufflePlayList(): void {
        const shuffledPlayList = [...this.playList];
        shuffledPlayList.sort(() => Math.random() - 0.5);
        this.playList = shuffledPlayList
    }

    override volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume = Math.max(0, this.currentVolume - 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    override volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume = Math.min(100, this.currentVolume + 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }
}

// Современный плеер
enum SoundOutput {
    Headphones = 'headphones',
    WirelessHeadphones = 'wirelessHeadphones',
    Speaker = 'speaker'
}
export class ModernPlayer extends MusicPlayer implements IShufflePlaylistControl {

    public outputDeviceIcons: OutputDeviceIcons = {
        'headphones': 'headset',
        'wirelessHeadphones': 'hearing',
        'speaker': 'speaker'
    };

    constructor() {
        super();
        this.chargeBatteryLevel = 20;
    }

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
    }

    override changeSongsSet(): void {
        if (this.newSongs.length > 0) {
            this.playList = this.playList.concat(this.newSongs);
        }
    }

    override chargeBattery(): void {
        setInterval((): void => {
            this.chargeBatteryLevel += 20;
            if (this.chargeBatteryLevel > 100) {
                this.chargeBatteryLevel = 100;
            }
        }, 1000)
    }

    shufflePlayList(): void {
        const shuffledPlayList = [...this.playList];
        shuffledPlayList.sort(() => Math.random() - 0.5);
        this.playList = shuffledPlayList
    }

    override volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume = Math.max(0, this.currentVolume - 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    override volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume = Math.min(100, this.currentVolume + 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }
}
