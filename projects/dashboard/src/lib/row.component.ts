import { Component, OnInit, Input } from '@angular/core';
import { Row } from './row';
import { Model } from './model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'adf-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input()
  row: Row;

  @Input()
  model: Model;

  @Input()
  editMode: boolean;
  constructor() { }

  ngOnInit() {
  }

}
