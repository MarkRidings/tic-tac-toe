import {Component, OnInit} from '@angular/core';
import {Constants} from "../constants";
import {GameFunctionsService} from "../services/game-functions.service";

@Component({
    selector: 'game-board',
    templateUrl: 'app/components/game-board.component.html'
})

export class GameBoardComponent implements OnInit {

    public rowNumbers: number[];
    private gameInProgress: boolean = false;

    constructor(private gameFunctionsService: GameFunctionsService) {
        this.rowNumbers = Array(Constants.NUM_ROWS).fill().map((x, i) => i);
    }

    ngOnInit() {
        this.gameFunctionsService.getGameState().subscribe(state => {
            this.gameInProgress = state.currentPlayer !== Constants.NO_PLAYER;
        });
    }
}