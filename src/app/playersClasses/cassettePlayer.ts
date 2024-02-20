import {MusicPlayer} from "./musicPlayer";
import {PlayerType} from "../enums";

export class CassettePlayer extends MusicPlayer{
    constructor() {
        super(PlayerType.Cassette);
    }

}
