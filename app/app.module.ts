import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {GameBoardComponent} from "./components/game-board.component";
import {CellComponent} from "./components/cell/cell.component";
import {RowComponent} from "./components/row/row.component";
import {GameFunctionsService} from "./services/game-functions.service";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        GameBoardComponent,
        CellComponent,
        RowComponent
    ],
    providers: [
        GameFunctionsService
    ],
    bootstrap: [GameBoardComponent]
})

export class AppModule {}
