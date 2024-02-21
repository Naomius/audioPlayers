import {MusicPlayer} from "./musicPlayer";
import {IShufflePlaylistControl, Music} from "../interfaces";
import {PlayerType} from "../enums";

export class PocketMP3Player extends MusicPlayer implements
    IShufflePlaylistControl {

    constructor() {
        super(PlayerType.MP3);
        this.chargeBatteryLevel = 50;
    }

    override toggleFavorite(song: Music): void {
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

    override shufflePlayList(): void {
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
