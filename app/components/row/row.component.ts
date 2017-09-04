import {Component, Input} from '@angular/core';
import {Constants} from "../../constants";

@Component({
    selector: 'game-row',
    templateUrl: 'app/components/row/row.component.html',
    styleUrls: ['app/components/row/row.component.css']
})

export class RowComponent {

    @Input() isCenter: boolean = false;
    @Input() rowNumber: number;

    public colNumbers: number[];

    constructor() {
        this.colNumbers = Array(Constants.NUM_COLS).fill().map((x, i) => i);
    }
}
