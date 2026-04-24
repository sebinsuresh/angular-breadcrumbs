import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Home</p>
    <a routerLink="/home/page-one">Go to Page One</a>
  `,
  imports: [RouterLink],
})
export class Home {}
