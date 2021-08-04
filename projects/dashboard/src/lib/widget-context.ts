import { Injectable } from '@angular/core';

import { Widget } from './widget';

import { Observer, Observable } from 'rxjs';
import { EditModeCanceled, WidgetConfigChanged } from './widget-events';

/**
 *  @deprecated  no used any more ?
 */
@Injectable()
export class WidgetContext {

  private eventObserver: Observer<object>;
  widgetEvents: Observable<object>;
  editMode = false;

  constructor(
    private widget: Widget
  ) {
    this.widgetEvents = Observable.create(observer => this.eventObserver = observer);
  }

  getWidet(): Widget {
    return this.widget;
  }

  getConfig(): any {
    const config = this.widget.config || {};
    return Object.assign({}, config);
  }

  cancelEditMode() {
    this.eventObserver.next(new EditModeCanceled());
  }

  configChanged(config: object) {
    this.eventObserver.next(new WidgetConfigChanged(config));
  }

  destroy() {
    this.eventObserver.complete();
  }

}
