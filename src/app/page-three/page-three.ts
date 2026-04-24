import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-three',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>PageThree</p>`,
})
export class PageThree {}
