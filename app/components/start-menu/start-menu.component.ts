import {Component} from '@angular/core';
import {GameFunctionsService} from "../../services/game-functions.service";

@Component({
    selector: 'game-start-menu',
    templateUrl: 'app/components/start-menu/start-menu.component.html',
    styleUrls: ['app/components/start-menu/start-menu.component.css']
})

export class StartMenuComponent {
    public gameType: number;
    public aiDiff: string;

    constructor(private gameFunctionsService: GameFunctionsService) { }

    startGame(): void {
        this.gameFunctionsService.startGame(this.gameType, this.aiDiff);
    }

    disableButton(): boolean {
        return !this.gameType || (this.gameType == 1 && !this.aiDiff);
    }

    showAiMenu(): boolean {
        return this.gameType && this.gameType == 1;
    }
}
