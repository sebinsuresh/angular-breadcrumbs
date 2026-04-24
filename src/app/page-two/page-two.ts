import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-two',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>PageTwo</p>`,
})
export class PageTwo {}
