/**
 * author: fky
 * date: 2019-12-23
 */
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Widget } from '../widget';



@Component({
  selector: 'adf-widget-edit-vehiclelist',
  template: `Hi am vehicle list`
})
export class VehicleListWidgetEditComponent implements OnInit {

  @Input()
  widget: Widget;


  ngOnInit(): void {
    if (!this.widget.config) {
      this.widget.config = {};
    }
    if (!this.widget.config.links) {
      this.widget.config.links = [];
    }
  }

  addLink() {
    this.widget.config.links.push({});
  }

  removeLink(index: number) {
    this.widget.config.links.splice(index, 1);
  }

}
