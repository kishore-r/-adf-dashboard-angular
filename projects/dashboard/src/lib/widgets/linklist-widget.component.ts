/**
 * author: fky
 * date: 2019-12-23
 */

import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../widget';

@Component({
  selector: 'adf-widget-linklist',
  template: `
    <div class="linklist">
      <ul *ngIf="widget.config">
        <li *ngFor="let link of widget.config.links">
          <a target="_blank" [href]="link.href">{{link.title}}</a>
        </li>
      </ul>
    </div>`
})
export class LinklistWidgetComponent implements OnInit {
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
