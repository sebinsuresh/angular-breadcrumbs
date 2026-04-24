import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>PageOne</p>`,
})
export class PageOne {}
