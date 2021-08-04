import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter,
  Input, OnDestroy, OnInit, Output, ReflectiveInjector, Type, ViewChild, ViewContainerRef
} from '@angular/core';
import {Widget} from './widget';
import {WidgetContext} from './widget-context';
import {WidgetDescriptor} from './widget-descriptor';
import {EditModeCanceled, WidgetConfigChanged} from './widget-events';
import {WidgetFunction, WidgetFunctionProvider, WidgetFunctions} from './widget-functions';
import {WidgetService} from './widget.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'adf-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],


})
export class WidgetComponent implements OnInit, OnDestroy {

  @Input()
  widget: Widget;

  @ViewChild('content', {static: true, read: ViewContainerRef})
  content: ViewContainerRef;


  @Output()
  removeEvent: EventEmitter<Widget>;

  @Input()
  editMode: boolean;

  @Input()
  fullScreenModel:boolean;
  componentRef: ComponentRef<any>;

  private dialogRef: NgbModalRef<any>;

  // context: WidgetContext;
  descriptor: WidgetDescriptor;
  error: string;
  functions: WidgetFunctions[];

  @Input()
  widgetEditMode: boolean;

  isCollapsed: boolean;


  widgetCopy: Widget;

  private sub: Subscription;

  constructor(
    private widgetService: WidgetService,
    private resolver: ComponentFactoryResolver,
    private modalService: NgbModal
  ) {
    this.removeEvent = new EventEmitter<Widget>();


  }

  ngOnInit() {
    if (!this.widget) {
      // no data , return;
       return;
    }
    if (!this.widget.id) {
      this.widget.id = this.widgetService.id();
    }

    this.widgetCopy = JSON.parse(JSON.stringify(this.widget));

    // this.context = new WidgetContext(this.widget);
    // this.context.widgetEvents.subscribe(event => this.onWidgetEvent(event));

    this.refreshComponent();

    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.widgetService.selfNotify.subscribe((updateWidget: Widget) => {
      console.log(updateWidget);
      if (updateWidget && Object.keys(updateWidget).length > 0) {
        if (this.widget.id === updateWidget.id) {
          this.widget.config = updateWidget.config;
          this.widget.title = updateWidget.title;
          this.widget.description = updateWidget.description;
          this.widget.position = updateWidget.position;
          this.widgetCopy = JSON.parse(JSON.stringify(updateWidget));
          // re-render
          this.refreshComponent();

        }
      }
    });
  }

  private refreshComponent() {
    this.descriptor = this.widgetService.get(this.widget.type);
    if (this.descriptor) {
      // render component
      this.widgetEditMode ? this.renderComponent(this.descriptor.editComponent) : this.renderComponent(this.descriptor.component);
    } else {
      this.error = 'could not find widget ' + this.widget.type;
    }
  }
  ngOnDestroy() {
    // this.context.destroy();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.sub.unsubscribe();
  }

  reloadWidget() {
    this.refreshComponent();
  }

  onWidgetEvent(event: Object) {
    if (event instanceof WidgetConfigChanged) {
      this.configChanged(event as WidgetConfigChanged);
    } else if (event instanceof EditModeCanceled) {
      this.cancelEditMode();
    }
  }

  executeFunction(fn: WidgetFunction) {
    //    fn.execute.bind(this.componentRef.instance)(this.context);
  }

  toggleEditMode(content): void {
    this.dialogRef = this.modalService.open(content, {size: 'xl'});
    this.dialogRef.result.then((res: Widget) => {
      if (Object.keys(res).length > 0) {
         this.widgetService.widgetUpdateNotify(res);
      }
    }, reject => {
      console.log(reject);
    });
  }

  toggleFullScreenMode(content): void {
    this.modalService.open(content, {size: 'xl'});
  }

  /**
   * Notify parent column to remove widget from view and model.
   */
  remove() {
    this.removeEvent.emit(this.widget);
  }

  private cancelEditMode() {
    //this.toggleEditMode();
  }

  private configChanged(event: WidgetConfigChanged) {
    this.widget.config = event.configuration;
    //this.toggleEditMode();
  }

  private renderComponent(component: Type<any>) {
    if (this.content) {
      this.content.clear();
    }
    const factory = this.resolver.resolveComponentFactory(component);

    //  const widgetContextProvider = {
    //    provide: WidgetContext,
    //    useValue: this.context
    // };
    //
    //  const resolvedProviders = ReflectiveInjector.resolve([widgetContextProvider]);
    //  const injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.content.parentInjector);

    this.componentRef = this.content.createComponent(factory); // factory.create(injector);
    this.content.insert(this.componentRef.hostView);

    this.functions = [];
    // if (this.isWidgetFunctionProvider(this.componentRef.instance)) {
    //   for (const fn of this.componentRef.instance.getFunctions()) {
    //     if (fn.isAvailable.bind(this.componentRef.instance)(this.context)) {
    //       this.functions.push(fn);
    //     }
    //   }
    // }
    this.componentRef.instance.widget = this.widget;
  }

  private isWidgetFunctionProvider(component: any): component is WidgetFunctionProvider {
    return component.getFunctions !== undefined;
  }

}
