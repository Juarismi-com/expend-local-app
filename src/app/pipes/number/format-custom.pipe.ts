import { Pipe, PipeTransform } from '@angular/core';
import { formatPriceNumber } from 'src/app/helpers/index.helper';

@Pipe({
  name: 'formatCustom',
  //standalone: true
})
export class FormatCustomPipe implements PipeTransform {
  transform(value: string|number, ...args: any[]): string {
    return formatPriceNumber(value?.toString(), "es-PY");
  }
}
