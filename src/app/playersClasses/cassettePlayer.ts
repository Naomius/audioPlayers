import {MusicPlayer} from "./musicPlayer";
import {PlayerType, SoundOutput} from "../enums";
import {IShufflePlaylistControl, Music} from "../interfaces";

export class CassettePlayer extends MusicPlayer implements IShufflePlaylistControl{

    override chargeBatteryLevel: number;
    override backlightColor!: string;
    constructor() {
        super(PlayerType.Cassette);
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

    toggleFavorite(song: Music): void {
        alert("В этом плеере такой функционал не предусмотрен");
    }

    addCurrentSongToFavourite(song: string): void {
        alert("В этом плеере такой функционал не предусмотрен");
    }

    removeCurrentSongFromFavourite(song: string): void {
        alert("В этом плеере такой функционал не предусмотрен");
    }

}
