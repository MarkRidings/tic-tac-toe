import {Component} from '@angular/core';
import {Constants} from "../constants";

@Component({
    selector: 'game-board',
    templateUrl: 'app/components/game-board.component.html'
})

export class GameBoardComponent {

    public rowNumbers: number[];

    constructor() {
        this.rowNumbers = Array(Constants.NUM_ROWS).fill().map((x, i) => i);
    }
}