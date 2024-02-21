import {IPlaybackControl, Music, Song} from "../interfaces";
import {Playlist} from "../interfaces";

export abstract class PlaybackControl implements IPlaybackControl, Playlist {

    public currentSong: string;
    public isPlaying: boolean;
    public playList!: Music[];
    protected audio: HTMLAudioElement = new Audio();

    protected constructor() {
        this.currentSong = '...';
        this.isPlaying = false;
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
        const currentIndex: number = this.playList.findIndex(song => song.title == this.currentSong);
        if (currentIndex !== -1 && currentIndex < this.playList.length - 1) {
            this.currentSong = this.playList[currentIndex + 1].url;
            this.playSongFromList(this.playList[currentIndex + 1]);
        }
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
}
