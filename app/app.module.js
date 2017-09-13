"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var game_board_component_1 = require("./components/game-board.component");
var cell_component_1 = require("./components/cell/cell.component");
var row_component_1 = require("./components/row/row.component");
var game_functions_service_1 = require("./services/game-functions.service");
var start_menu_component_1 = require("./components/start-menu/start-menu.component");
var forms_1 = require("@angular/forms");
var computerAi_service_1 = require("./services/computerAi.service");
var gameState_store_1 = require("./gameState.store");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule
            ],
            declarations: [
                game_board_component_1.GameBoardComponent,
                cell_component_1.CellComponent,
                row_component_1.RowComponent,
                start_menu_component_1.StartMenuComponent
            ],
            providers: [
                game_functions_service_1.GameFunctionsService,
                computerAi_service_1.ComputerAiService,
                gameState_store_1.GameStateStore
            ],
            bootstrap: [game_board_component_1.GameBoardComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map