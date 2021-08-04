import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Model } from './model';
import { Structure } from './structure';
import { DndService } from './dnd.service';
import { StructureService } from './structure.service';
import { DragulaService } from 'ng2-dragula';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashboard.service';
import { WidgetService } from './widget.service';
import { Widget } from './widget';
import { Observable } from 'rxjs';
import { Row } from './row';


@Component({
  selector: 'adf-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @Input()
  model: Model;
  @Input()
  editable: boolean;
  error: string;
  editMode: boolean;

  widgets: Observable<Widget[]>;
  addWidgetModelReference: any;

  structuresSplit: Array<Map<string, Structure>> = [];

  ngAfterViewInit(): void {

  }

  constructor(config: NgbModalConfig, private modalService: NgbModal, private dragulaService: DragulaService,
    private structureService: StructureService, private dashboardServie: DashboardService) {
    // dndService.subscribe(event => this.handleDndEvent(event));
    config.backdrop = 'static';
    config.keyboard = false;

    dashboardServie.registerDashboardWidget({
      title: 'News Widgets',
      description: 'Displays News',
      type: 'news',
      position: null,
      config: null
    } as Widget);

    dashboardServie.registerDashboardWidget({
      title: 'Links',
      description: 'Displays a list of links',
      type: 'linklist',
      position: null,
      config: null
    } as Widget);

    dashboardServie.registerDashboardWidget({
      title: 'Markdown',
      description: 'Markdown widget',
      type: 'markdown',
      position: null,
      config: null
    } as Widget);


  }

  // fix map order https://github.com/angular/angular/issues/31420
  noOrder(a, b) {
    return 1;
  }

  ngOnInit() {
    this.dragulaService.createGroup('HANDLES', {
      moves: (
        (el, container, handle) => {
          return handle.className.indexOf('adf-handle') > -1;
        })
    });
    setTimeout(() => {
      this.widgets = this.dashboardServie.widgets;
      if (this.model && !this.model.title) {
        this.model.title = 'Dashboard';
      }

      const structureId = this.model.structure;
      if (structureId) {
        const structure = this.structureService.get(structureId);
        if (!structure) {
          this.error = 'could not find structure with id ' + structureId;
        }
      } else {
        this.error = 'model does not define structure';
      }

      // Splits an object into an array multiple objects inside.
      let index = 0;
      let tempArr: Map<string, Structure> = new Map<string, Structure>();
      this.structureService.getStructures().forEach((val: Structure, key: string) => {
        tempArr.set(key, val);
        index++;
        if (index % 3 === 0) {
          this.structuresSplit.push(tempArr);
          tempArr = new Map<string, Structure>();
          index = 0;
        }
      });

    });
  }


  changeStructure(key: string, struct: Structure) {
    console.log('change structure to ' + key);
    this.dashboardServie.changeStructure(this.model, struct);
    if (this.model.structure !== key) {
      this.model.structure = key;
    }
  }

  getStructure(key: string) {
    return this.structureService.get(key);
  }

  /*   private handleDndEvent(event: DndEvent) {
     // this.dndService.synchronizeModel(this.model, event);
    } */

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.dashboardServie.adfDashboardChanged(this.model);
    }

  }

  cancelEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.dashboardServie.adfDashboardEditsCancelled();
    }
  }

  addWidgetDialog(content) {
    this.addWidgetModelReference = this.modalService.open(content);
  }

  addWidget(widget: Widget): void {
    if (this.dashboardServie.addNewWidgetToModel(this.model, widget, widget.type)) {
      this.closeAddWidgetDialog('Widget : ' + widget.type + ' Added to Dashboard');
    }
  }

  editDashboardDialog(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  closeAddWidgetDialog(closeMsg: string): void {
    console.log(closeMsg);
    this.addWidgetModelReference.close(closeMsg);
  }
}

