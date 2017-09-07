import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Constants} from "../constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

class GameState {
    gameType: number;
    aiDiff: string;
    currentPlayer: number;
    rows: number[][];

    constructor() {
        this.gameType = 1;
        this.aiDiff = '';
        this.currentPlayer = Constants.NO_PLAYER;
        this.rows = [];

        for (let i = 0; i < Constants.NUM_ROWS; i++) {
            const aux = [];
            for (let j = 0; j < Constants.NUM_COLS; j++) {
                aux.push(Constants.NO_PLAYER);
            }
            this.rows.push(aux);
        }
    }
}

@Injectable()
export class GameFunctionsService {

    private initialState: GameState;
    private gameState: BehaviorSubject<GameState>;

    constructor() {
        this.initialState = new GameState();
        this.gameState = new BehaviorSubject<GameState>(this.initialState);
    }

    getGameState(): Observable<iGameState> {
        return this.gameState.asObservable();
    }

    moveToNextPlayer(): void {
        if (this.gameState.value.currentPlayer === Constants.PLAYER_X) {
            this.gameState.value.currentPlayer = Constants.PLAYER_Y;
        }
        else {
            this.gameState.value.currentPlayer = Constants.PLAYER_X;
        }

        this.gameState.next(this.gameState.value);
    }

    lineCheck(line: number[]): boolean {
        return line.filter(cell => cell !== Constants.NO_PLAYER && cell === line[0]).length === line.length;
    }

    checkRows(): boolean {
        for (let i = 0; i < Constants.NUM_ROWS; i++) {
            const row = this.gameState.value.rows[i];
            if (this.lineCheck(row)) {
                return true;
            }
        }

        return false;
    }

    checkCols(): boolean {
        for (let i = 0; i < Constants.NUM_COLS; i++) {
            const cols = this.gameState.value.rows.map(row => row[i]);
            if (this.lineCheck(cols)) {
                return true;
            }
        }

        return false;
    }

    checkDiags(): boolean {
        const diag1 = this.gameState.value.rows.map((row, index) => row[index]);
        const diag2 = this.gameState.value.rows.map((row, index) => row[row.length-1-index]);

        return this.lineCheck(diag1) || this.lineCheck(diag2);
    }

    checkForWinner(): boolean {
        return this.checkRows() || this.checkCols() || this.checkDiags();
    }

    updateGameState(rowNumber: number, colNumber: number): void {
        if (this.gameState.value.rows[rowNumber][colNumber] === Constants.NO_PLAYER) {
            this.gameState.value.rows[rowNumber][colNumber] = this.gameState.value.currentPlayer;
            if (!this.checkForWinner()) {
                this.moveToNextPlayer();
            }
            else {
                this.gameState.next(this.gameState.value);
                alert(`Winner: ${this.gameState.value.currentPlayer}`);
            }
        }
    }

    startGame(gameType: number, aiDiff: String) {
        this.gameState.value.currentPlayer = Constants.PLAYER_X;
        this.gameState.value.gameType = gameType;
        this.gameState.value.aiDiff = aiDiff;
        this.gameState.next(this.gameState.value);
    }
}
