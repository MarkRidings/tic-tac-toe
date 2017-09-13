"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var constants_1 = require("../constants");
var computerAi_service_1 = require("./computerAi.service");
var gameState_store_1 = require("../gameState.store");
var GameFunctionsService = /** @class */ (function () {
    function GameFunctionsService(aiService, gameStateStore) {
        this.aiService = aiService;
        this.gameStateStore = gameStateStore;
    }
    GameFunctionsService.prototype.newGame = function () {
        this.gameStateStore.refreshState(1, '', constants_1.Constants.NO_PLAYER);
    };
    GameFunctionsService.prototype.startGame = function (gameType, aiDiff, humanAs) {
        this.gameStateStore.refreshState(gameType, aiDiff, humanAs);
        if (this.gameState.value.humanAs === constants_1.Constants.PLAYER_O) {
            this.makeAiMove();
        }
    };
    GameFunctionsService.prototype.makePlayerMove = function (rowNumber, colNumber) {
        if (this.gameStateStore.isHumansTurn() && this.gameStateStore.isCellEmpty(rowNumber, colNumber)) {
            this.gameStateStore.updateGameBoard(rowNumber, colNumber, 'human');
            if (this.checkForWinner()) {
                alert("Winner: " + this.gameStateStore.getCurrentPlayer());
            }
            else {
                this.gameStateStore.updateNextPlayer();
                this.makeAiMove();
            }
        }
    };
    GameFunctionsService.prototype.makeAiMove = function () {
        var aiMove = (this.gameStateStore.getAiDifficulty() === constants_1.Constants.AI_EASY) ?
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
            alert("Winner: " + this.gameState.value.computerAs);
        }
    };
    GameFunctionsService.prototype.announceTie = function () {
        alert('We have a tie!');
    };
    GameFunctionsService.prototype.checkForWinner = function () {
        return this.checkRows() || this.checkCols() || this.checkDiags();
    };
    GameFunctionsService.prototype.checkRows = function () {
        for (var i = 0; i < constants_1.Constants.NUM_ROWS; i++) {
            if (this.lineCheck(this.gameStateStore.getRow(i))) {
                return true;
            }
        }
        return false;
    };
    GameFunctionsService.prototype.checkCols = function () {
        var _loop_1 = function (i) {
            var col = this_1.gameStateStore.getRows().map(function (row) { return row[i]; });
            if (this_1.lineCheck(col)) {
                return { value: true };
            }
        };
        var this_1 = this;
        for (var i = 0; i < constants_1.Constants.NUM_COLS; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    GameFunctionsService.prototype.checkDiags = function () {
        var diag1 = this.gameStateStore.getRows().map(function (row, index) { return row[index]; });
        var diag2 = this.gameStateStore.getRows().map(function (row, index) { return row[row.length - 1 - index]; });
        return this.lineCheck(diag1) || this.lineCheck(diag2);
    };
    GameFunctionsService.prototype.lineCheck = function (line) {
        return line.filter(function (cell) { return cell !== constants_1.Constants.NO_PLAYER && cell === line[0]; }).length === line.length;
    };
    GameFunctionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [computerAi_service_1.ComputerAiService, gameState_store_1.GameStateStore])
    ], GameFunctionsService);
    return GameFunctionsService;
}());
exports.GameFunctionsService = GameFunctionsService;
//# sourceMappingURL=game-functions.service.js.map