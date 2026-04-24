import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @for (item of items(); track item.url; let last = $last) {
      @if (!last) {
        <a [routerLink]="item.url">{{ item.label }}</a>
        <span> > </span>
      } @else {
        <span>{{ item.label }}</span>
      }
    }
  `,
})
export class Breadcrumb {
  items = input.required<BreadcrumbItem[]>();
}
