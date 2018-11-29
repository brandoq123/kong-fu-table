import { Component, OnInit } from '@angular/core';
import { KongFuRow } from './kong-fu-table/kong-fu-table-models/KongFuRow';
import { KongFuColumn } from './kong-fu-table/kong-fu-table-models/KongFuColumn';
import { KongFuOptions } from './kong-fu-table/kong-fu-table-models/KongFuOptions';
import * as moment from 'moment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'kong-fu-table';
    public kongFuRows: KongFuRow[];
    public kongFuColumns: KongFuColumn[];
    public kongFuOptions: KongFuOptions;

    ngOnInit(): void {
        this.populateMockData();
    }

    private populateMockData(): void {
        this.kongFuColumns = this.getMockColumns();
        this.kongFuRows = this.getMockRows();
        this.setMockOptions();
    }

    private setMockOptions(): void {
        this.kongFuOptions = new KongFuOptions();
        this.kongFuOptions.paging.enabled = true;
        this.kongFuOptions.filtering.enabled = true;
        this.kongFuOptions.filtering.useDateRangeFilter = true;
        this.kongFuOptions.title = "Kong Fu Table";
    }

    private getMockRows(): KongFuRow[] {
        let data: KongFuRow[] = [];
        let descArray = [
            'More testing text. ',
            'The ball is blue. ',
            'My favorite language is c#. ',
            'Blah blah blah blah blah. ',
            'Some more description stuff. ',
            'Some other text. ',
            'This is a random sentence. ',
            'Kong Fu Table is the best table. '
        ];
        for (let i = 0; i < 10000; i++) {
            let row = new KongFuRow();
            let description = '';
            let nameId = '';
            let randNum = Math.floor(Math.random() * descArray.length) + 5;
            for (let j = 0; j < randNum; j++) {
                let randIndex = Math.floor(Math.random() * (descArray.length - 1));
                description += descArray[randIndex];
            }
            for (let j = 0; j < 8; j++) {
                let randId = Math.floor(Math.random() * 9);
                nameId += randId;
            }
            let today = moment();
            let randDay = Math.floor(Math.random() * 1000) + 1;
            let newDay = moment(today).subtract(randDay, 'days');

            row.values = [nameId, description, moment(newDay).format('MM/DD/YYYY'), "Sub Type " + i, i];
            data.push(row);
        }
        return data;
    }

    private getMockColumns(): KongFuColumn[] {
        let column1 = new KongFuColumn(
            'Name',
            'Name',
            true,
            true,
            '',
            'string',
            null
        );
        let column2 = new KongFuColumn(
            'Description',
            'Description',
            true,
            true,
            '',
            'string',
            null
        );
        let column3 = new KongFuColumn(
            'Date',
            'Date',
            true,
            true,
            'xs sm',
            'date',
            null
        );
        let column4 = new KongFuColumn(
            'SubType',
            'Sub Type',
            true,
            true,
            'xs sm md',
            'string',
            null
        );
        let column5 = new KongFuColumn(
            'Amount',
            'Amount',
            true,
            true,
            'xs sm md',
            'number',
            null
        );

        let columns: KongFuColumn[] = [column1, column2, column3, column4, column5];
        return columns;
    }
}
