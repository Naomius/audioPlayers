import {MusicPlayer} from "./musicPlayer";
import {IShufflePlaylistControl, Music, OutputDeviceIcons} from "../interfaces";
import {PlayerType, SoundOutput} from "../enums";

export class ModernPlayer extends MusicPlayer implements IShufflePlaylistControl {

    public override outputDeviceIcons: OutputDeviceIcons = {
        'headphones': 'headset',
        'wirelessHeadphones': 'hearing',
        'speaker': 'speaker'
    };

    constructor() {
        super(PlayerType.Modern);
        this.chargeBatteryLevel = 20;
        this.favoriteSongs = [];
        this.backlightColors = ['Белый', 'Красный', 'Синий', 'Зеленый', 'Желтый', 'Фиолетовый'];
        this.englishBacklightColors = ['white', 'red', 'blue', 'green', 'yellow', 'purple'];

        this.russianOutputNames = {
            'headphones': 'Наушники',
            'wirelessHeadphones': 'ВиФи',
            'speaker': 'Колонки',
        };
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

    override changeSongsSet(): void {
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
        this.playList = shuffledPlayList;
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
