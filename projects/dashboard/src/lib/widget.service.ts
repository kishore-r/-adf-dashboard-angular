import {EventEmitter, Injectable} from '@angular/core';
import { WidgetDescriptor } from './widget-descriptor';
import {LinklistWidgetComponent} from './widgets/linklist-widget.component';
import {LinklistWidgetEditComponent} from './widgets/linklist-widget-edit.component';
import {Widget} from './widget';
import {MarkdownWidgetComponent} from './widgets/markdown-widget.component';
import {MarkdownWidgetEditComponent} from './widgets/markdown-widget-edit.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {


  private idCounter = 0;
  private widgets: Map<string, WidgetDescriptor> = new Map<string, WidgetDescriptor>();


  // component update notify the self parent
  selfNotify: EventEmitter<Widget> = new EventEmitter();

  register(name: string, descriptor: WidgetDescriptor) {
    this.widgets.set(name, descriptor);
  }

  get(name: string): WidgetDescriptor {
    return this.widgets.get(name);
  }

  id(): string {
    return 'w-' + new Date().getTime() + '-' + (this.idCounter++);
  }

  constructor() {
    this.init();
  }


  // set default widget
  private  init() {
    this.register('linklist', {component: LinklistWidgetComponent, editComponent: LinklistWidgetEditComponent} as WidgetDescriptor);
    this.register('markdown', {component: MarkdownWidgetComponent, editComponent: MarkdownWidgetEditComponent} as WidgetDescriptor);
  }

  widgetUpdateNotify(widget: Widget) {
    this.selfNotify.emit(widget);
  }
}
