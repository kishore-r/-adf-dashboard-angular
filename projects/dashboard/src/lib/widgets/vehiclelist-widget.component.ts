/**
 * author: fky
 * date: 2019-12-23
 */

import {Component, Input, OnInit} from '@angular/core';
import { Widget } from '../widget';



@Component({
  selector: 'adf-widget-vehiclelist',
  template: `hi i am vehicle list`
})
export class VehiclelistWidgetComponent implements OnInit {
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





}
