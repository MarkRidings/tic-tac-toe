import {Constants} from "./constants";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

class GameState {

    gameType: number;
    aiDiff: string;
    humanAs: string;
    computerAs: string;
    currentPlayer: string;
    inProgress: boolean;
    rows: number[][];

    constructor() {
        this.gameType = 1;
        this.aiDiff = '';
        this.humanAs = '';
        this.computerAs = '';
        this.currentPlayer = Constants.NO_PLAYER;
        this.inProgress = false;
        this.clearRows();
    }

    init(gameType: number, aiDiff: string, humansAs: string) {
        this.currentPlayer = Constants.PLAYER_X;
        this.gameType = gameType;
        this.aiDiff = aiDiff;

        if (humansAs === Constants.RANDOM_START) {
            this.humanAs = Math.random() >= 0.5 ?
                Constants.PLAYER_X : Constants.PLAYER_O;
        }
        else {
            this.humanAs = humansAs;
        }

        this.computerAs = this.humanAs === Constants.PLAYER_X ?
            Constants.PLAYER_O : Constants.PLAYER_X;

        this.clearRows();
        this.inProgress = true;
    }

    clearRows() {
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
export class GameStateStore {
    private gameState: GameState;
    private gameState$: BehaviorSubject<GameState>;

    constructor() {
        this.gameState = new GameState();
        this.gameState$ = new BehaviorSubject<GameState>(this.gameState);
    }


    refreshState(gameType: number, aiDiff: string, humanAs: string): void {
        this.gameState.init(gameType, aiDiff, humanAs);
        this.updateGameState();
    }

    restartGame() {
        this.gameState.init(this.gameState.gameType, this.gameState.aiDiff, this.gameState.humanAs);
        this.updateGameState();
    }
    
    backToMenu() {
        this.gameState.currentPlayer = Constants.NO_PLAYER;
        this.updateGameState();
    }
    
    getAsObservable(): Observable<GameState> {
        return this.gameState$.asObservable();
    }

    getGameBoard(): number[][] {
        return this.gameState.rows;
    }

    getCurrentPlayer(): string {
        return this.gameState.currentPlayer;
    }
    
    getGameType(): string {
        return this.gameState.gameType;
    }
    
    getHumanAs(): string {
        return this.gameState.humanAs;
    }

    getAiDifficulty(): string {
        return this.gameState.aiDiff;
    }

    getRows(): number[][] {
        return this.gameState.rows;
    }

    getRow(rowIndex: number): number[] {
        return this.gameState.rows[rowIndex];
    }

    updateGameState(): void {
        this.gameState$.next(this.gameState);
    }

    updateGameBoard(rowIndex: number, colIndex: number): void {
        this.gameState.rows[rowIndex][colIndex] = this.gameState.currentPlayer;
        this.updateGameState();
    }

    updateNextPlayer(): void {
        this.gameState.currentPlayer = this.gameState.currentPlayer === Constants.PLAYER_X ?
            Constants.PLAYER_O : Constants.PLAYER_X;

        this.updateGameState();
    }

    markGameAsOver(): void {
        this.gameState.inProgress = false;
        this.updateGameState();
    }
    
    isHumansTurn(): boolean {
        return this.gameState.gameType === Constants.TWO_PLAYER || this.gameState.currentPlayer === this.gameState.humanAs;
    }

    isCellEmpty(rowIndex: number, colIndex: number) {
        return this.gameState.rows[rowIndex][colIndex] === Constants.NO_PLAYER;
    }
}