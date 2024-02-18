import {Component} from '@angular/core';
import {
    IBacklightControl,
    IChangeSongManagerControl, IChargeLevelControl, IFavoriteSongs,
    IOutputDeviceControl,
    IPlaybackControl, IShufflePlaylistControl,
    IVolumeControl, Music, OutputDeviceIcons, Playlist, Song,
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



//Класс кассетного плеера
export class CassettePlayer implements IVolumeControl,
    IPlaybackControl,
    IOutputDeviceControl,
    IBacklightControl,
    IChargeLevelControl {

    public currentSong: string;
    public currentVolume: number;
    public isPlaying: boolean;
    public outputDevice: string;
    public backlightColor: string;
    public chargeBatteryLevel: number;
    public playlists: Playlist[] = [];
    public currentPlaylistIndex: number = 0;
    public selectedAlbumSongs: Song[] = [];
    private audio: HTMLAudioElement = new Audio();
    private selectedAlbumIndex: number = 0;

    constructor() {
        this.currentVolume = 100;
        this.isPlaying = false;
        this.currentSong = "...";
        this.outputDevice = "headphones";
        this.backlightColor = 'white';
        this.chargeBatteryLevel = 50;
        this.playlists.push({
            name: 'Мой плейлист',
            albums: [
                {
                    name: 'Кассета №1',
                    songs: [
                        { title: 'Saliva', url: './assets/music/Saliva.mp3'},
                        { title: 'FiveFinger', url: './assets/music/FiveFinger.mp3'},
                        { title: 'Hope', url: './assets/music/Hope.mp3'},
                        { title: 'In the end', url: './assets/music/InTheEnd.mp3'},
                        { title: 'TokyoDrift', url: './assets/music/TokioDrift.mp3'},
                    ]
                },
                {
                    name: 'Кассета №2',
                    songs: [
                        { title: 'ImagineDragons', url: './assets/music/ImagineDragons.mp3'},
                        { title: 'Morpheus', url: './assets/music/Morpheus.mp3'},
                        { title: 'Rocky', url: './assets/music/Rocky.mp3'},
                        { title: 'Transformers', url: './assets/music/Transformers.mp3'},
                        { title: 'NoSurprise', url: './assets/music/NoSurprice.mp3'},
                    ]
                }
            ]
        });
    }

    selectCassette(albumIndex: number): void {
        const selectedPlaylist = this.playlists[this.currentPlaylistIndex];
        if (selectedPlaylist && albumIndex >= 0 && albumIndex < selectedPlaylist.albums.length) {
            const selectedAlbum = selectedPlaylist.albums[albumIndex];
            this.selectedAlbumIndex = albumIndex;
            this.selectedAlbumSongs = selectedAlbum.songs;
        }
    }
    playSongFromList(song: Song): void {
        this.isPlaying = true;
        this.audio.src = song.url;
        this.audio.play();
        this.currentSong = song.url
    }
    volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume++;
            this.audio.volume = this.currentVolume / 100;
        }
    }

    volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume--;
            this.audio.volume = this.currentVolume / 100;
        }
    }

    toggleMute(): void {
        this.audio.muted = !this.audio.muted;
    }

    changeBacklightColor(color: string): void {
        this.backlightColor = color;
    }

    changeOutput(): void {
        this.outputDevice = 'headphones';
    }

    play(): void {
        this.isPlaying = true;
        this.audio.play();
    }
    pause(): void {
        this.isPlaying = false;
        this.audio.pause();
    }
    nextSong(): void {
        const currentPlaylist = this.playlists[this.currentPlaylistIndex];
        if (currentPlaylist) {
            const currentIndex: number = currentPlaylist.albums[this.selectedAlbumIndex].songs.findIndex((song) => song.url === this.currentSong);
            if (currentIndex < currentPlaylist.albums[this.selectedAlbumIndex].songs.length - 1) {
                const nextSong: Song = currentPlaylist.albums[this.selectedAlbumIndex].songs[currentIndex + 1];
                this.currentSong = nextSong.url;
                this.playSongFromList(nextSong);
            }
        }
    }
    previousSong(): void {
        const currentPlaylist = this.playlists[this.currentPlaylistIndex];
        if (currentPlaylist) {
            const currentIndex: number = currentPlaylist.albums[this.selectedAlbumIndex].songs.findIndex((song) => song.url === this.currentSong);
            if (currentIndex > 0) {
                const previousSong: Song = currentPlaylist.albums[this.selectedAlbumIndex].songs[currentIndex - 1];
                this.currentSong = previousSong.url;
                this.playSongFromList(previousSong);
            }
        }
    }

    chargeBattery(): void {
        this.chargeBatteryLevel = 100;
    }
}

//Карманный mp3 плеер
export class PocketMP3Player implements IPlaybackControl,
    IVolumeControl,
    IOutputDeviceControl,
    IBacklightControl,
    IChangeSongManagerControl,
    IChargeLevelControl,
    IShufflePlaylistControl,
    IFavoriteSongs {

    public backlightColor: string;
    public chargeBatteryLevel: number;
    public currentSong: string;
    public currentVolume: number;
    outputDevice: string;
    public playList: Music[];
    public newSongs: Music[];
    favoriteSongs: string[];
    private audio: HTMLAudioElement = new Audio();
    public isPlaying: boolean;

    constructor() {
        this.currentVolume = 100;
        this.chargeBatteryLevel = 50;
        this.backlightColor = 'white';
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

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
    }

    changeBacklightColor(color:string): void { //todo доделать
        this.backlightColor = color;
    }

    changeOutput(): void {
        this.outputDevice = 'headphones'
    }

    changeSongsSet(): void {
        this.playList = this.newSongs.slice(0, 5);
    }

    chargeBattery(): void {
        setInterval((): void => {
            this.chargeBatteryLevel += 5;
            if (this.chargeBatteryLevel > 100) {
                this.chargeBatteryLevel = 100;
            }
        }, 1000)
    }

    nextSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title == this.currentSong);
        if (currentIndex !== -1 && currentIndex < this.playList.length - 1) {
            this.currentSong = this.playList[currentIndex + 1].url;
            this.playSongFromList(this.playList[currentIndex + 1]);
        }
    }

    previousSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title === this.currentSong);
        if (currentIndex !== -1 && currentIndex > 0) {
            this.currentSong = this.playList[currentIndex - 1].url;
            this.playSongFromList(this.playList[currentIndex - 1]);
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


    shufflePlayList(): void {
        const shuffledPlayList = [...this.playList];
        shuffledPlayList.sort(() => Math.random() - 0.5);
        this.playList = shuffledPlayList
    }

    volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume = Math.max(0, this.currentVolume - 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume = Math.min(100, this.currentVolume + 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    toggleMute(): void {
        this.audio.muted = !this.audio.muted;
    }
}


// Современный плеер
enum SoundOutput {
    Headphones = 'headphones',
    WirelessHeadphones = 'wirelessHeadphones',
    Speaker = 'speaker'
}
export class ModernPlayer implements IPlaybackControl,
    IVolumeControl,
    IOutputDeviceControl,
    IBacklightControl,
    IChangeSongManagerControl,
    IChargeLevelControl,
    IShufflePlaylistControl,
    IFavoriteSongs {

    public backlightColor: string;
    public chargeBatteryLevel: number;
    public currentSong: string;
    public currentVolume: number;
    public favoriteSongs: string[];
    public outputDevice: string;
    public outputDeviceIcons: OutputDeviceIcons = {
        'headphones': 'headset',
        'wirelessHeadphones': 'hearing',
        'speaker': 'speaker'
    };
    public playList: Music[];
    public newSongs: Music[];
    isPlaying: boolean;
    private audio: HTMLAudioElement = new Audio();

    constructor() {
        this.backlightColor = 'white';
        this.chargeBatteryLevel = 20;
        this.currentSong = '...';
        this.currentVolume = 100;
        this.favoriteSongs = [];
        this.isPlaying = false;
        this.outputDevice = SoundOutput.Headphones;
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

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
    }

    changeBacklightColor(color:string): void {
        this.backlightColor = color;
    }

    changeOutput(output: SoundOutput): void {
        this.outputDevice = output
    }

    changeSongsSet(): void {
        if (this.newSongs.length > 0) {
            this.playList = this.playList.concat(this.newSongs);
        }
    }

    chargeBattery(): void {
        setInterval((): void => {
            this.chargeBatteryLevel += 20;
            if (this.chargeBatteryLevel > 100) {
                this.chargeBatteryLevel = 100;
            }
        }, 1000)
    }

    nextSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title == this.currentSong);
        if (currentIndex !== -1 && currentIndex < this.playList.length - 1) {
            this.currentSong = this.playList[currentIndex + 1].url;
            this.playSongFromList(this.playList[currentIndex + 1]);
        }
    }

    previousSong(): void {
        const currentIndex: number = this.playList.findIndex(song => song.title === this.currentSong);
        if (currentIndex !== -1 && currentIndex > 0) {
            this.currentSong = this.playList[currentIndex - 1].url;
            this.playSongFromList(this.playList[currentIndex - 1]);
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


    shufflePlayList(): void {
        const shuffledPlayList = [...this.playList];
        shuffledPlayList.sort(() => Math.random() - 0.5);
        this.playList = shuffledPlayList
    }

    volumeDown(): void {
        if (this.currentVolume > 0) {
            this.currentVolume = Math.max(0, this.currentVolume - 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    volumeUp(): void {
        if (this.currentVolume < 100) {
            this.currentVolume = Math.min(100, this.currentVolume + 5);
            this.audio.volume = this.currentVolume / 100;
        }
    }

    toggleMute(): void {
        this.audio.muted = !this.audio.muted;
    }
}
