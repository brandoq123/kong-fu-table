# kong-fu-table
An angular table built for mobile first. The table includes features such as paging, filtering, sorting, and scaling to smaller screen sizes.

## Setup
1. Import KongFuTableModule into your app.module.ts
2. Build your columns array
```
import { KongFuColumn } from '*Module location*/kong-fu-table/kong-fu-table-models/KongFuColumn';
...
let column1 = new KongFuColumn("Name", "Name", true, true, null, 'string', null, false);
let column2 = new KongFuColumn("FavoriteColor", "Favorite Color", true, true, null, 'string', null, false);
let columns: KongFuColumn[] = [column1, column2];
```
3. Build your row data.
```
import { KongFuRow } from './kong-fu-table/kong-fu-table-models/KongFuRow';
...
let rowValues1 = ["John Smith", "Blue"];
let rowValues2 = ["Jane Doe", "Purple"];
let row1 = new KongFuRow();
let row2 = new KongFuRow();
row1.values = rowValues1;
row2.values = rowValues2;
let data: KongFuRow[] = [row1, row2];
```
4. Set your options.
```
import { KongFuOptions } from './kong-fu-table/kong-fu-table-models/KongFuOptions';
...
let options = new KongFuOptions();
options.paging.enabled = true;
options.filtering.enabled = true;
options.title = "Favorite Colors";
```
5. Build the component
```
<kong-fu-table-core [rows]="data" [columns]="columns" [options]="options"></kong-fu-table-core>
```
