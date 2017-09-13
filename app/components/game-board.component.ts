import {Component, OnInit} from '@angular/core';
import {Constants} from "../constants";
import {GameStateStore} from "../gameState.store";

@Component({
    selector: 'game-board',
    templateUrl: 'app/components/game-board.component.html'
})

export class GameBoardComponent implements OnInit {

    public rowNumbers: number[];
    private gameInProgress: boolean = false;

    constructor(private gameStateStore: GameStateStore) {
        this.rowNumbers = Array(Constants.NUM_ROWS).fill().map((x, i) => i);
    }

    ngOnInit() {
        this.gameStateStore.getAsObservable().subscribe(state => {
            this.gameInProgress = state.currentPlayer !== Constants.NO_PLAYER;
        });
    }
}