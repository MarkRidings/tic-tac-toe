import {Injectable} from "@angular/core";
import {Constants} from "../constants";
import {ComputerAiService} from "./computerAi.service";
import {GameState, GameStateService} from "./gameState.service";
import {GameStateStore} from "../gameState.store";


@Injectable()
export class GameFunctionsService {

    constructor(private aiService: ComputerAiService, private gameStateStore: GameStateStore) { }

    newGame() {
        this.gameStateStore.refreshState(1, '', Constants.NO_PLAYER);
    }

    startGame(gameType: number, aiDiff: string, humanAs: string) {
        this.gameStateStore.refreshState(gameType, aiDiff, humanAs);

        if (this.gameState.value.humanAs === Constants.PLAYER_O) {
            this.makeAiMove();
        }
    }

    makePlayerMove(rowNumber: number, colNumber: number): void {
        if (this.gameStateStore.isHumansTurn() && this.gameStateStore.isCellEmpty(rowNumber, colNumber)) {
            this.gameStateStore.updateGameBoard(rowNumber, colNumber, 'human');

            if (this.checkForWinner()) {
                alert(`Winner: ${this.gameStateStore.getCurrentPlayer()}`);
            }
            else {
                this.gameStateStore.updateNextPlayer();
                this.makeAiMove();
            }
        }
    }

    makeAiMove(): void {
        const aiMove = (this.gameStateStore.getAiDifficulty() === Constants.AI_EASY) ?
            this.aiService.makeEasyMove(this.gameStateStore.getGameBoard()) :
            this.aiService.makeHardMove(this.gameStateStore.getGameBoard());

        if (aiMove[0] === -1) {
            setTimeout(this.announceTie, 500);
            return;
        }

        this.gameStateStore.updateGameBoard(aiMove[0], aiMove[1], 'computer');

        if (!this.checkForWinner()) {
            this.gameStateStore.updateNextPlayer();
        }
        else {
            alert(`Winner: ${this.gameState.value.computerAs}`);
        }
    }

    announceTie() {
        alert('Tie Game!');
    }

    checkForWinner(): boolean {
        return this.checkRows() || this.checkCols() || this.checkDiags();
    }

    checkRows(): boolean {
        for (let i = 0; i < Constants.NUM_ROWS; i++) {
            if (this.lineCheck(this.gameStateStore.getRow(i))) {
                return true;
            }
        }
        return false;
    }

    checkCols(): boolean {
        for (let i = 0; i < Constants.NUM_COLS; i++) {
            const col = this.gameStateStore.getRows().map(row => row[i]);
            if (this.lineCheck(col)) {
                return true;
            }
        }

        return false;
    }

    checkDiags(): boolean {
        const diag1 = this.gameStateStore.getRows().map((row, index) => row[index]);
        const diag2 = this.gameStateStore.getRows().map((row, index) => row[row.length-1-index]);

        return this.lineCheck(diag1) || this.lineCheck(diag2);
    }

    lineCheck(line: number[]): boolean {
        return line.filter(cell => cell !== Constants.NO_PLAYER && cell === line[0]).length === line.length;
    }
}
