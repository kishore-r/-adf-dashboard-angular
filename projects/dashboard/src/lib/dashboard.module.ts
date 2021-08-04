import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DragulaService, DragulaModule} from 'ng2-dragula';
import {ColumnComponent} from './column.component';
import {DashboardComponent} from './dashboard.component';
import {DndService} from './dnd.service';
import {RowComponent} from './row.component';
import {StructureService} from './structure.service';
import {WidgetComponent} from './widget.component';
import {AdfStructurePreviewComponent} from './components/adf-structure-preview.component';
import {AdfDashboardRowComponent} from './components/adf-dashboard-row.component';
import {WidgetService} from './widget.service';
import {FormsModule} from '@angular/forms';
import {LinklistWidgetComponent} from './widgets/linklist-widget.component';
import {LinklistWidgetEditComponent} from './widgets/linklist-widget-edit.component';
import {MarkdownWidgetComponent} from './widgets/markdown-widget.component';
import {MarkdownWidgetEditComponent} from './widgets/markdown-widget-edit.component';
import {MarkedPipe} from './pipe/marked.pipe';
import {ColumnService} from './column.service';
import {VehicleListWidgetEditComponent} from './widgets/vehiclelist-widget-edit.component';
import {VehiclelistWidgetComponent} from './widgets/vehiclelist-widget.component';
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MarkedPipe, DashboardComponent, ColumnComponent, RowComponent, WidgetComponent,
    AdfStructurePreviewComponent, AdfDashboardRowComponent, LinklistWidgetComponent, LinklistWidgetEditComponent,
    MarkdownWidgetComponent, MarkdownWidgetEditComponent, VehiclelistWidgetComponent, VehicleListWidgetEditComponent],
  entryComponents: [LinklistWidgetComponent, LinklistWidgetEditComponent, MarkdownWidgetComponent, MarkdownWidgetEditComponent],
  providers: [DragulaService, DndService, StructureService, WidgetService, ColumnService, NgbModalModule],
  imports: [CommonModule, FormsModule, DragulaModule.forRoot(), FormsModule, NgbCollapseModule],
  exports: [DashboardComponent, RowComponent, ColumnComponent, WidgetComponent, MarkdownWidgetComponent, MarkdownWidgetEditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
}
