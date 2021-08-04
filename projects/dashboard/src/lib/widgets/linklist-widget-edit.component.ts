/**
 * author: fky
 * date: 2019-12-23
 */
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Widget} from '../widget';

@Component({
  selector: 'adf-widget-edit-linklist',
  template: `
    <form class="form-horizontal" role="form">
      <div class="form-group">
        <label class="control-label col-sm-2" for="widget-title" i18n="@@linklist.widget.edit.title">Title</label>
        <div class="col-sm-10">
          <input type="text" id="widget-title" class="form-control"
                 i18n-placeholder="@@linklist.widget.edit.title" placeholder="Title" [(ngModel)]="widget.title" required=""
                 [ngModelOptions]="{standalone: true}">
        </div>
        <label class="control-label col-sm-2" id="title-link" i18n="@@linklist.widget.edit.links">Links</label>
      </div>
      <div class="padding-bottom" *ngFor="let link of widget.config.links; let i = index">
        <div class="form-group">
          <div class="col-sm-10">
            <input type="text" id="title-{{i}}" class="form-control"
                   i18n-placeholder="@@linklist.widget.edit.title" placeholder="Title" [(ngModel)]="link.title" required=""
                   [ngModelOptions]="{standalone: true}">
            <input type="url" id="href-{{i}}" class="form-control"
                   placeholder="http://example.com" [(ngModel)]="link.href" required="" [ngModelOptions]="{standalone: true}">
              <button type="button" class="btn btn-warning" (click)="removeLink(i)">
                <i class="fa fa-minus"></i> Remove
              </button>
          </div>
          </div>
        </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-primary" (click)="addLink()">
            <i class="fa fa-plus"></i>Add
          </button>
        </div>
      </div>
    </form>`
})
export class LinklistWidgetEditComponent implements OnInit {

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
