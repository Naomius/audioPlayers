import {MusicPlayer} from "./musicPlayer";
import {IShufflePlaylistControl, Music} from "../interfaces";
import {PlayerType, SoundOutput} from "../enums";


export class PocketMP3Player extends MusicPlayer implements
    IShufflePlaylistControl {
    getAvailableBacklightColors(): string[] {
        return ['Красный', 'Синий', 'Зеленый'];
    }

    constructor() {
        super(PlayerType.MP3);
        this.currentVolume = 80;
        this.chargeBatteryLevel = 50;
        this.favoriteSongs = [];
        this.backlightColors = ['Белый', 'Красный', 'Синий'];
        this.englishBacklightColors = ['white', 'red', 'blue'];
        this.outputDeviceIcons = {
            'headphones': 'headset'
        };
        this.russianOutputNames = {
            'headphones': 'Наушники'
        };
        this.outputDeviceIcons = {
            'headphones': 'headset'
        }
    }

    getAvailableOutputs(): SoundOutput[] {
        return [SoundOutput.Headphones];
    }

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
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
}
