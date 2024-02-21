import {MusicPlayer} from "./musicPlayer";
import {PlayerType, SoundOutput} from "../enums";
import {IShufflePlaylistControl, Music} from "../interfaces";
export class CassettePlayer extends MusicPlayer implements IShufflePlaylistControl{
    constructor() {
        super(PlayerType.Cassette);
        this.currentVolume = 100;
        this.outputDevice = 'headphones';
        this.chargeBatteryLevel = 60;
        this.backlightColors = ['Белый'];
        this.englishBacklightColors = ['white'];
        this.russianOutputNames = {
            'headphones': 'Наушники'
        };
        this.outputDeviceIcons = {
            'headphones': 'headset'
        }
    }

    shufflePlayList(): void {
        this.alertMethod()
    }
    getAvailableBacklightColors(): string[] {
        return ['Белый'];
    }

    getAvailableOutputs(): SoundOutput[] {
        return [SoundOutput.Headphones];
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
    chargeBattery(): void {
        this.chargeBatteryLevel = 100;
    }

    toggleFavorite(song: Music): void {
        this.alertMethod()
    }

    addCurrentSongToFavourite(song: string): void {
        this.alertMethod()
    }

    removeCurrentSongFromFavourite(song: string): void {
        this.alertMethod()
    }

    changeSongsSet(): void {
        this.playList = (this.currentSongsSet === this.playList) ? this.newSongs : this.playList;
    }

}
