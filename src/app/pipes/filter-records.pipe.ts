import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecords'
})
export class FilterRecordsPipe<T> implements PipeTransform {

  transform(items: T[], limit: number): T[] {
    return items.slice(0, limit);
  }

}
