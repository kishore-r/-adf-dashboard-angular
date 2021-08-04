import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Column} from './column';
import {Model} from './model';
import {Widget} from './widget';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {ColumnService} from './column.service';
import {Position} from './widget';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'adf-column',
  templateUrl: 'column.component.html'
})
export class ColumnComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  column: Column;
  @Input()
  editMode: boolean;

  @Input()
  model: Model;

  dropBag: string;

  widgets: Widget[] = [];

  private subs: Subscription = new Subscription();

  constructor(private dragulaService: DragulaService, private columnService: ColumnService) {

    // this.subs.add(this.dragulaService.drag('HANDLES').subscribe(({ name, el, source }) => {
    //   console.log('Drag', name, el, source);
    // }));

    this.subs.add(this.dragulaService.drop('HANDLES').subscribe(({name, el, target, source, sibling}) => {
      if (this.editMode) {
        const dragedWidgetId = el.attributes['adf-id'].value;

        const targetColumnId = target.attributes['adf-id'].value;

        const sourceColumnId = source.attributes['adf-id'].value;

        const nextWidgetId = sibling ? sibling.attributes['adf-id'].value : '';

        if (this.column.id === targetColumnId) {  // handle it own colunm
          this.dragIn(sourceColumnId, targetColumnId, dragedWidgetId, nextWidgetId);
          el.setAttribute('style', 'display:none;');   // remove drag element
        }
      }

    }));
  }

  // scan all column in row by id
  private findColumnDeeply(row: any, id: string) {
    let findColumn: Column;
    if (row.columns) {
      for (const column of row.columns) {
        if (column.id === id) {
          findColumn = column;
          break;
        }
        if (column.rows) {
          for (const tempRow of column.rows) {
            findColumn = this.findColumnDeeply(tempRow, id);
            if (findColumn) {
              break;
            }
          }
        }
        if (findColumn) {
          break;
        }
      }
    }
    return findColumn;
  }


  /**
   *  Widget drag into the column , update the model
   * @param  fromColumnId  fromColumnId.
   * @param  toColumnId  toColumnId
   * @param  dragedWidgetId dragedWidgetId
   * @param  bottomWidgetId bottomWidgetId
   */
  private dragIn(fromColumnId: string, toColumnId: string, dragedWidgetId: string, bottomWidgetId?: string) {
    let isSameColumn = false;
    if (fromColumnId === toColumnId) {
      isSameColumn = true;
    }

    let fromColumn: Column;
    let toColumn: Column;
    this.model.rows.forEach(row => {
      fromColumn = this.findColumnDeeply(row, fromColumnId);
      toColumn = this.findColumnDeeply(row, toColumnId);
    });

    const updateWidget = fromColumn.widgets.find(x => x.id === dragedWidgetId);
    if (!updateWidget) { // already handle
      return;
    }
    console.log('in', updateWidget);
    const copyWidget = JSON.parse(JSON.stringify(updateWidget));
    if (isSameColumn) {
      const index = fromColumn.widgets.findIndex(x => x.id === dragedWidgetId);
      fromColumn.widgets.splice(index, 1);
    }
    if (!bottomWidgetId) {   // drag to  bottom
      toColumn.widgets.push(copyWidget);
    } else {
      const index = toColumn.widgets.findIndex(x => x.id === bottomWidgetId);
      toColumn.widgets.splice(index, 0, copyWidget);
    }
    this.updateWidgetOrder(toColumn);

    if (!isSameColumn) {
      this.dragOut(fromColumnId, toColumnId, dragedWidgetId);
    }
  }

  dragOut(fromColumnId: string, toColumnId: string, dragedWidgetId: string) {

    let fromColumn: Column;
    this.model.rows.forEach(row => {
      if (fromColumn) {
        return;
      }
      fromColumn = this.findColumnDeeply(row, fromColumnId);
    });
    const index = fromColumn.widgets.findIndex(x => x.id === dragedWidgetId);
    const ele = fromColumn.widgets.find(x => x.id === dragedWidgetId);
    console.log('dragout', ele);
    fromColumn.widgets.splice(index, 1);
    this.updateWidgetOrder(fromColumn);
  }

  /**
   *  Update widget order according the widget index
   *  take the index as order number
   * @param  column column
   */
  private updateWidgetOrder(column: Column) {
    let index = 0;
    column.widgets.forEach(w => {
      if (!w.position) {
        w.position = {} as Position;
      }
      w.position.order = index;
      index++;
    });
  }

  ngOnInit() {
    if (!this.column.id) {
      this.column.id = this.columnService.id();
    }

    if (!this.isRowColumn()) {
      this.widgets = this.findColumnWidgets();
      this.enableDropZone();
    }

  }

  ngAfterViewInit(): void {

  }

  remove(widget: Widget) {
    this.removeWidgetFromView(widget);
  }

  private enableDropZone() {
    this.dropBag = 'adfBag';
  }

  private findColumnWidgets(): Widget[] {
    const columnWidgets: Widget[] = [];
    /*
    for (const widget of this.model.widgets) {
      if (widget.position.column === this.column.id ) {
        columnWidgets.push(widget);
      }
    }
  */
    // column widgets
    return columnWidgets.sort((left: Widget, right: Widget) => {
      return left.position.order - right.position.order;
    });
  }

  private isRowColumn() {
    return this.column.rows && this.column.rows.length > 0;
  }

  private removeWidgetFromView(widget: Widget): boolean {
    return this.removeItemFromArray(this.column.widgets, widget);
  }

  // tslint:disable-next-line: ban-types
  private removeItemFromArray(array: Widget[], item: Widget): boolean {
    const index = array.findIndex(w => w.id === item.id);
    if (index >= 0) {
      array.splice(index, 1);
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }

  }
}
