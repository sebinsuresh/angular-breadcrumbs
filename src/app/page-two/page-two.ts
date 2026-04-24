import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-two',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>PageTwo</p>
    <a routerLink="/home/page-one/page-two/page-three">Go to Page Three</a>
  `,
  imports: [RouterLink],
})
export class PageTwo {}
