import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {GameBoardComponent} from "./components/game-board.component";
import {CellComponent} from "./components/cell/cell.component";
import {RowComponent} from "./components/row/row.component";
import {GameFunctionsService} from "./services/game-functions.service";
import {StartMenuComponent} from "./components/start-menu/start-menu.component";
import {FormsModule} from "@angular/forms";
import {ComputerAiService} from "./services/computerAi.service";
import {GameState, GameStateStore} from "./gameState.store";
import {GameStateService} from "./services/gameState.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        GameBoardComponent,
        CellComponent,
        RowComponent,
        StartMenuComponent
    ],
    providers: [
        GameFunctionsService,
        ComputerAiService,
        GameStateStore
    ],
    bootstrap: [GameBoardComponent]
})

export class AppModule {}
