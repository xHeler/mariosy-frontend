import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 65): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      const lastSpaceIndex = value.lastIndexOf(' ', maxLength);
      if (lastSpaceIndex === -1) {
        return value.substr(0, maxLength).trim() + '...';
      } else {
        return value.substr(0, lastSpaceIndex).trim() + '...';
      }
    }
  }
}
