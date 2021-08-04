import { Pipe, PipeTransform } from '@angular/core';
import * as marked_ from 'marked';
const marked = marked_;
@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }
}
