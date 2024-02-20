import {MusicPlayer} from "./musicPlayer";
import {IShufflePlaylistControl, Music, OutputDeviceIcons} from "../interfaces";
import {PlayerType} from "../enums";

export class ModernPlayer extends MusicPlayer implements IShufflePlaylistControl {

    public override outputDeviceIcons: OutputDeviceIcons = {
        'headphones': 'headset',
        'wirelessHeadphones': 'hearing',
        'speaker': 'speaker'
    };

    constructor() {
        super(PlayerType.Modern);
        this.chargeBatteryLevel = 20;
    }

    override changeOutput(outputDevice: string): void {
        this.outputDevice = outputDevice;
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

    override shufflePlayList(): void {
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
