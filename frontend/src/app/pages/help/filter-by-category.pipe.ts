import { Pipe, PipeTransform } from '@angular/core';
import { FAQItem } from './help.component';

@Pipe({
  name: 'filterByCategory',
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(items: FAQItem[], category: string): FAQItem[] {
    return items.filter(item => item.category === category);
  }
} 