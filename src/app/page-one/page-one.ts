import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>PageOne</p>
    <a routerLink="/home/page-one/page-two">Go to Page Two</a>
  `,
  imports: [RouterLink],
})
export class PageOne {}
