import {Component, Input, OnInit} from '@angular/core';
import {GameFunctionsService} from "../../services/game-functions.service";
import {Subscription} from "rxjs/Subscription";
import {Constants} from "../../constants";
import {GameStateStore} from "../../gameState.store";

@Component({
    selector: 'game-cell',
    templateUrl: 'app/components/cell/cell.component.html',
    styleUrls: ['app/components/cell/cell.component.css']
})

export class CellComponent implements OnInit {

    @Input() isCenter: boolean = false;
    @Input() rowNumber: number = 0;
    @Input() colNumber: number = 0;

    gameStateSubscription: Subscription;

    private cellValue: string = '';

    constructor(private gameFunctionsService: GameFunctionsService, private gameStateStore: GameStateStore) {}

    ngOnInit() {
        this.gameStateSubscription = this.gameStateStore.getAsObservable().subscribe(state => {
            console.log('in subscribe: ', state);

            switch (state.rows[this.rowNumber][this.colNumber]) {
                case Constants.PLAYER_X:
                    this.cellValue = 'X';
                    break;
                case Constants.PLAYER_O:
                    this.cellValue = 'O';
                    break;
                case Constants.NO_PLAYER:
                    this.cellValue = '';
                    break;
            }
        });
    }

    handleClick() {
        this.gameFunctionsService.makePlayerMove(this.rowNumber, this.colNumber);
    }
}