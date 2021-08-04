/**
 * author: fky
 * date: 2019-12-24
 */

import {Component, Input, OnInit} from '@angular/core';
import {Widget} from '../widget';

@Component({
  selector: 'adf-widget-markdown-edit',
  template: `
    <form role="form">
      <div class="form-group">
      <label  for="widget-title" i18n="@@linklist.widget.edit.title">Title</label>
        <div class="">
          <input type="text" id="widget-title" class="form-control"
                 i18n-placeholder="@@linklist.widget.edit.title" placeholder="Title" [(ngModel)]="widget.title" required=""
                 [ngModelOptions]="{standalone: true}">
        </div>
        <label for="content">Markdown content</label>

        <textarea id="content" class="form-control" rows="5" [(ngModel)]="widget.config.content"
                  [ngModelOptions]="{standalone: true}"></textarea>
      </div>
    </form>`
})
export class MarkdownWidgetEditComponent implements OnInit {
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
