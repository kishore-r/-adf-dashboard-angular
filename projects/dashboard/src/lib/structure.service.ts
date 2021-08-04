import { Injectable } from '@angular/core';
import {Structure} from './structure';
import {Row} from './row';
import {Column} from './column';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private structures: Map<string, Structure> = new Map<string, Structure>();

  register(name: string, structure: Structure) {
    // set id for structure
    // this.generateIdFor(structure);
    this.structures.set(name, structure);
  }

  get(name: string): Structure {
    return this.structures.get(name);
  }


  constructor() {
    this.buildDefaultStructures();
  }

  private generateIdFor(structure: Structure): Structure {
    structure.id = new Date().getTime().toString();

    // structure rows id  --  using index for i
    if (structure.rows) {
      // this.generateIdForRowColumns(structure.rows, 0);
    }
    return structure;
  }

  /**
   * Create id for row columns. id is number increase 1 by 1.
   * @param array of rows rows
   * @param number index
   * @returns number next id index
   */
  private generateIdForRowColumns(rows: Row[], index: number): number {
    index = index ? index : 0;
    rows.forEach(row => {
      row.id = index.toString();
      // column id
      if (row.columns) {
        row.columns.forEach(col => {
          // contained rows, only set id for sub columns
          if (col.rows) {
           index = this.generateIdForRowColumns(col.rows, index);
          } else {
            col.id = index.toString();
            index++;
          }
        });
      }
    });
    return index;
  }


  private buildDefaultStructures() {
    this.register('6-6', {
      rows: [{
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }]
    });


    this.register('4-8',  {
      rows: [{
        columns: [{
          class: 'col-md-4',
        }, {
          class: 'col-md-8',
        }]
      }]
    });

    this.register('12/4-4-4',  {
      rows: [{
        columns: [{
          class: 'col-md-12'
        }]
      }, {
        columns: [{
          class: 'col-md-4'
        }, {
          class: 'col-md-4'
        }, {
          class: 'col-md-4'
        }]
      }]
    });

    this.register('12/6-6',  {
      rows: [{
        columns: [{
          class: 'col-md-12'
        }]
      }, {
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }]
    });

    this.register('12/6-6/12',  {
      rows: [{
        columns: [{
          class: 'col-md-12'
        }]
      }, {
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }, {
        columns: [{
          class: 'col-md-12'
        }]
      }]
    });

    this.register('3-9 (12/6-6)',  {
      rows: [{
        columns: [{
          class: 'col-md-3'
        }, {
          class: 'col-md-9',
          rows: [{
            columns: [{
              class: 'col-md-12'
            }]
          }, {
            columns: [{
              class: 'col-md-6'
            }, {
              class: 'col-md-6'
            }]
          }]
        }]
      }]
    });

    this.register('4/8-8-8',  {
      rows: [{
        columns: [{
          class: 'col-md-4'
        }, {
          class: 'col-md-8',
          rows: [{
            columns: [{
              class: 'col-md-12'
            }]
          }, {
            columns: [{
              class: 'col-md-12'
            }]
          }, {
            columns: [{
              class: 'col-md-12'
            }]
          }]
        }]
      }]
    });

    this.register('8-8-8/4',  {
      rows: [{
        columns: [{
          class: 'col-md-8',
          rows: [{
            columns: [{
              class: 'col-md-12'
            }]
          }, {
            columns: [{
              class: 'col-md-12'
            }]
          }, {
            columns: [{
              class: 'col-md-12'
            }]
          }]
        }, {
          class: 'col-md-4',

        }]
      }]
    });

    this.register('6/6-6/6-6/6',  {
      rows: [{
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }, {
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }, {
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }]
    });

  }

  getStructures() {
    return this.structures;
  }





}
