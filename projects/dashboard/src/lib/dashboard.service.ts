import { Injectable } from '@angular/core';

import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Model } from './model';
import { Widget } from './widget';
import { Column } from './column';
import { Observable, BehaviorSubject } from 'rxjs';
import { EditModeEnabled } from './widget-events';
import { Structure } from './structure';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private widgetsObservable = new BehaviorSubject<Widget[]>([]);
  readonly widgets = this.widgetsObservable.asObservable();
  private widgetsArr;

  // edit save
  private modelObservable = new BehaviorSubject<Model>({} as Model);
  public modelWatch = this.modelObservable.asObservable();

  // edit cancel
  private cancelEditObservable = new BehaviorSubject<boolean>(false);
  public cancelWatch = this.cancelEditObservable.asObservable();

  constructor() {

    this.widgetsArr = [];
  }

  createConfiguration(type: any): any {
    const cfg = {};
    /* const config = dashboard.widgets[type].config;
      if (config) {
       cfg = angular.copy(config);
     } */
    return cfg;
  }

  addNewWidgetToModel(model: Model, widget: Widget, name: string): boolean {
    if (model) {
      const column: Column = this.findFirstWidgetColumn(model);
      if (column) {
        if (!column.widgets) {
          column.widgets = [];
        }
        // add model
        column.widgets.unshift(JSON.parse(JSON.stringify(widget)));
        return true;
        // $rootScope.$broadcast('adfWidgetAdded', name, model, widget);
      } else {
        console.error('could not find first widget column');
      }
    } else {

      console.error('model is undefined');
    }
    return false;
  }

  findFirstWidgetColumn(model: Model): Column {

    let column = null;

    if (!Array.isArray(model.rows)) {
      console.error('model does not have any rows');
      return null;
    }
    for (const row of model.rows) {
      if (Array.isArray(row.columns)) {

        for (const col of row.columns) {
          if (!col.rows) {
            column = col;
            break;
          }

        }
      }
      if (column !== null) {
        break;
      }
      return column;
    }
    return column;

  }

  /**
   * Read Columns: recursively searches an object for the 'columns' property
   * @param object model
   * @param array  an array of existing columns; used when recursion happens
   */
  private _readColumns(root, columns?) {
    columns = columns ? columns : [];
    if (root.rows) {
      root.rows.forEach(row => {
        if (!row.columns) {
          return;
        }

        row.columns.forEach(col => {
          if (!col.rows) {
            columns.push(col);
          }
          this._readColumns(col, columns);
        });
      });
    }

    return columns;
  }

  changeStructure(model: Model, structure: Structure) {

    const columns = this._readColumns(model);
    // copy rows
    model.rows = JSON.parse(JSON.stringify(structure.rows));
    let counter = 0;
    while (counter < columns.length) {
      counter = this._fillStructure(model, columns, counter);
    }
  }


  /**
   * Copy widget from old columns to the new model
   * @param object root the model
   * @param array of columns
   * @param counter  counter
   */
  private _fillStructure(root, columns, counter) {

    if (root.rows) {
      root.rows.forEach(row => {
        row.columns.forEach(col => {
          // if the widgets prop doesn't exist, create a new array for it.
          // this allows ui.sortable to do it's thing without error
          if (!col.widgets) {
            col.widgets = [];
          }

          if (!col.rows && columns[counter]) {
            this._copyWidgets(columns[counter], col);
            counter++;
          }

          counter = this._fillStructure(col, columns, counter);
        });
      });
    }
    return counter;
  }

  private _copyWidgets(source, target) {
    if (source.widgets && source.widgets.length > 0) {
      let w = source.widgets.shift();
      while (w) {
        target.widgets.push(w);
        w = source.widgets.shift();
      }
    }
  }

  registerDashboardWidget(widget: Widget): void {
    this.widgetsArr.push(widget);
    this.widgetsObservable.next(this.widgetsArr);
    // this.widgets.push(widget);
  }

  /* getDashboardWidgets(): Widget[] {
    return this.widgets;
  } */

  adfDashboardChanged(model: Model): void {
    this.modelObservable.next(model);
  }

  adfDashboardEditsCancelled(): void {
    this.cancelEditObservable.next(true);
  }
  getDashboardWidget(model: Model, type: string): Widget {
    for (const row of model.rows) {
      if (Array.isArray(row.columns)) {

        for (const column of row.columns) {
          if (!column.rows) {

            for (const widget of column.widgets) {
              if (widget.type === type) {
                return widget;
              }
            }
          } else {

            for (const row2 of column.rows) {
              for (const column2 of row2.columns) {
                for (const widget2 of column2.widgets) {
                  if (widget2.type === type) {
                    return widget2;
                  }
                }
              }
            }


          }

        }
      }
    }
    return null;

  }

}
