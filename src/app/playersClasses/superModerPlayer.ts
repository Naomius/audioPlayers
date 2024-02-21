import {MusicPlayer} from "./musicPlayer";
import {PlayerType, SoundOutput} from "../enums";
import {IShufflePlaylistControl, Music} from "../interfaces";

export class SuperModerPlayer extends MusicPlayer implements IShufflePlaylistControl{
    constructor() {
        super(PlayerType.SuperModern);
        this.currentVolume = 50;
        this.chargeBatteryLevel = 30;
        this.favoriteSongs = [];
        this.outputDevice = 'headphones';
        this.backlightColors = ['Белый', 'Красный', 'Синий', 'Зеленый', 'Желтый', 'Фиолетовый'];
        this.englishBacklightColors = ['white', 'red', 'blue', 'green', 'yellow', 'purple'];

        this.russianOutputNames = {
            'headphones': 'Наушники',
            'wirelessHeadphones': 'ВиФи',
            'speaker': 'Колонки',
        };
        this.outputDeviceIcons = {
            'headphones': 'headset',
            'wirelessHeadphones': 'hearing',
            'speaker': 'speaker'
        }
    }

    getAvailableBacklightColors(): string[] {
        return ['Красный', 'Желтый', 'Зеленый', 'Синий', 'Фиолетовый'];
    }

    getAvailableOutputs(): SoundOutput[] {
        return [SoundOutput.Headphones, SoundOutput.WirelessHeadphones, SoundOutput.Speaker];
    }

    toggleFavorite(song: Music): void {
        song.isFavorite = !song.isFavorite;
        if (song.isFavorite) {
            this.addCurrentSongToFavourite(song.title);
        } else {
            this.removeCurrentSongFromFavourite(song.title);
        }
    }

    changeSongsSet(): void {
        if (this.newSongs.length > 0) {
            this.playList = this.playList.concat(this.newSongs);
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

    chargeBattery(): void {
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
        this.playList = shuffledPlayList;
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
