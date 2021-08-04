/**
 * author: fky
 * date: 2019-12-24
 */

import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../widget';

@Component({
  selector: 'adf-widget-markdown',
  template: `
    <div class="markdown" [innerHTML]="widget.config.content | marked">
    </div>`
})
export class MarkdownWidgetComponent implements OnInit {
  @Input()
  widget: Widget;

  ngOnInit(): void {
    if (!this.widget.config) {
      this.widget.config = {};
    }
    if (!this.widget.config.content) {
      this.widget.config.content = '';
    }
  }
}
