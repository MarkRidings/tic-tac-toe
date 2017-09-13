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
var game_functions_service_1 = require("../../services/game-functions.service");
var constants_1 = require("../../constants");
var gameState_store_1 = require("../../gameState.store");
var CellComponent = /** @class */ (function () {
    function CellComponent(gameFunctionsService, gameStateStore) {
        this.gameFunctionsService = gameFunctionsService;
        this.gameStateStore = gameStateStore;
        this.isCenter = false;
        this.rowNumber = 0;
        this.colNumber = 0;
        this.cellValue = '';
    }
    CellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameStateSubscription = this.gameStateStore.getAsObservable().subscribe(function (state) {
            switch (state.rows[_this.rowNumber][_this.colNumber]) {
                case constants_1.Constants.PLAYER_X:
                    _this.cellValue = 'X';
                    break;
                case constants_1.Constants.PLAYER_O:
                    _this.cellValue = 'O';
                    break;
                case constants_1.Constants.NO_PLAYER:
                    _this.cellValue = '';
                    break;
            }
        });
    };
    CellComponent.prototype.handleClick = function () {
        this.gameFunctionsService.makePlayerMove(this.rowNumber, this.colNumber);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CellComponent.prototype, "isCenter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CellComponent.prototype, "rowNumber", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CellComponent.prototype, "colNumber", void 0);
    CellComponent = __decorate([
        core_1.Component({
            selector: 'game-cell',
            templateUrl: 'app/components/cell/cell.component.html',
            styleUrls: ['app/components/cell/cell.component.css']
        }),
        __metadata("design:paramtypes", [game_functions_service_1.GameFunctionsService, gameState_store_1.GameStateStore])
    ], CellComponent);
    return CellComponent;
}());
exports.CellComponent = CellComponent;
//# sourceMappingURL=cell.component.js.map