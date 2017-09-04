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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var GameState = /** @class */ (function () {
    function GameState() {
        this.currentPlayer = constants_1.Constants.PLAYER_X;
        this.rows = [];
        for (var i = 0; i < constants_1.Constants.NUM_ROWS; i++) {
            var aux = [];
            for (var j = 0; j < constants_1.Constants.NUM_COLS; j++) {
                aux.push(constants_1.Constants.NO_PLAYER);
            }
            this.rows.push(aux);
        }
    }
    return GameState;
}());
var GameFunctionsService = /** @class */ (function () {
    function GameFunctionsService() {
        this.initialState = new GameState();
        this.gameState = new BehaviorSubject_1.BehaviorSubject(this.initialState);
    }
    GameFunctionsService.prototype.getGameState = function () {
        return this.gameState.asObservable();
    };
    GameFunctionsService.prototype.moveToNextPlayer = function () {
        if (this.gameState.value.currentPlayer === constants_1.Constants.PLAYER_X) {
            this.gameState.value.currentPlayer = constants_1.Constants.PLAYER_Y;
        }
        else {
            this.gameState.value.currentPlayer = constants_1.Constants.PLAYER_X;
        }
        this.gameState.next(this.gameState.value);
    };
    GameFunctionsService.prototype.lineCheck = function (line) {
        return line.filter(function (cell) { return cell !== constants_1.Constants.NO_PLAYER && cell === line[0]; }).length === line.length;
    };
    GameFunctionsService.prototype.checkRows = function () {
        for (var i = 0; i < constants_1.Constants.NUM_ROWS; i++) {
            var row = this.gameState.value.rows[i];
            if (this.lineCheck(row)) {
                return true;
            }
        }
        return false;
    };
    GameFunctionsService.prototype.checkCols = function () {
        var _loop_1 = function (i) {
            var cols = this_1.gameState.value.rows.map(function (row) { return row[i]; });
            if (this_1.lineCheck(cols)) {
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
        var diag1 = this.gameState.value.rows.map(function (row, index) { return row[index]; });
        var diag2 = this.gameState.value.rows.map(function (row, index) { return row[row.length - 1 - index]; });
        return this.lineCheck(diag1) || this.lineCheck(diag2);
    };
    GameFunctionsService.prototype.checkForWinner = function () {
        return this.checkRows() || this.checkCols() || this.checkDiags();
    };
    GameFunctionsService.prototype.updateGameState = function (rowNumber, colNumber) {
        if (this.gameState.value.rows[rowNumber][colNumber] === constants_1.Constants.NO_PLAYER) {
            this.gameState.value.rows[rowNumber][colNumber] = this.gameState.value.currentPlayer;
            if (!this.checkForWinner()) {
                this.moveToNextPlayer();
            }
            else {
                console.log('in else');
                this.gameState.next(this.gameState.value);
                console.log('updated state');
                alert("Winner: " + this.gameState.value.currentPlayer);
                console.log('did alert');
            }
        }
    };
    GameFunctionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GameFunctionsService);
    return GameFunctionsService;
}());
exports.GameFunctionsService = GameFunctionsService;
//# sourceMappingURL=game-functions.service.js.map