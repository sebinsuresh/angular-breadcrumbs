import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breadcrumb } from './breadcrumb/breadcrumb';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Breadcrumb],
  template: `
    <app-breadcrumb [items]="breadcrumbService.breadcrumbs()" />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly breadcrumbService = inject(BreadcrumbService);
}
