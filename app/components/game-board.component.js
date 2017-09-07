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
var game_functions_service_1 = require("../services/game-functions.service");
var GameBoardComponent = /** @class */ (function () {
    function GameBoardComponent(gameFunctionsService) {
        this.gameFunctionsService = gameFunctionsService;
        this.gameInProgress = false;
        this.rowNumbers = Array(constants_1.Constants.NUM_ROWS).fill().map(function (x, i) { return i; });
    }
    GameBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameFunctionsService.getGameState().subscribe(function (state) {
            _this.gameInProgress = state.currentPlayer !== constants_1.Constants.NO_PLAYER;
        });
    };
    GameBoardComponent = __decorate([
        core_1.Component({
            selector: 'game-board',
            templateUrl: 'app/components/game-board.component.html'
        }),
        __metadata("design:paramtypes", [game_functions_service_1.GameFunctionsService])
    ], GameBoardComponent);
    return GameBoardComponent;
}());
exports.GameBoardComponent = GameBoardComponent;
//# sourceMappingURL=game-board.component.js.map