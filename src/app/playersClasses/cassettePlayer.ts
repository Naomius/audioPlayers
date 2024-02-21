import {MusicPlayer} from "./musicPlayer";
import {PlayerType, SoundOutput} from "../enums";
import {IShufflePlaylistControl, Music} from "../interfaces";

export class CassettePlayer extends MusicPlayer implements IShufflePlaylistControl{

    override chargeBatteryLevel: number;
    override backlightColor!: string;
    constructor() {
        super(PlayerType.Cassette);
        this.currentVolume = 100;
        this.chargeBatteryLevel = 60;
        this.backlightColors = ['Белый'];
        this.englishBacklightColors = ['white'];
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

    shufflePlayList(): void {
        alert("В этом плеере такой функционал не предусмотрен")
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
        alert("В этом плеере такой функционал не предусмотрен");
    }

    addCurrentSongToFavourite(song: string): void {
        alert("В этом плеере такой функционал не предусмотрен");
    }

    removeCurrentSongFromFavourite(song: string): void {
        alert("В этом плеере такой функционал не предусмотрен");
    }

    changeSongsSet(): void {
        this.playList = (this.currentSongsSet === this.playList) ? this.newSongs : this.playList;
    }

}
