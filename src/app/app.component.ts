import {Component} from '@angular/core';
import {PlayerType, SoundOutput} from "./enums";
import {MusicPlayer} from "./playersClasses/musicPlayer";
import {PocketMP3Player} from "./playersClasses/pocketMP3Player";
import {ModernPlayer} from "./playersClasses/modernPlayer";
import {CassettePlayer} from "./playersClasses/cassettePlayer";
import {SuperModerPlayer} from "./playersClasses/superModerPlayer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    protected readonly SoundOutput = SoundOutput;
    protected readonly PlayerType = PlayerType;
    public currentPlayer: MusicPlayer;
    public displayedColumns: string[] = ['title'];
    constructor() {
        this.currentPlayer = new CassettePlayer();
    }

    switchPlayer(playerType: PlayerType): void {
        switch(playerType) {
            case PlayerType.Cassette:
                this.currentPlayer = new CassettePlayer();
                console.log(this.currentPlayer)
                break;
            case PlayerType.MP3:
                this.currentPlayer = new PocketMP3Player();
                console.log(this.currentPlayer)
                break;
            case PlayerType.Modern:
                this.currentPlayer = new ModernPlayer();
                console.log(this.currentPlayer)
                break;
            case PlayerType.SuperModern:
                this.currentPlayer = new SuperModerPlayer();
                console.log(this.currentPlayer)
                break;
            default:
                console.log('Нет такого плеера');
                break;
        }
    }
}


