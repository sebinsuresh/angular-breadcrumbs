import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-three',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>PageThree</p>
    <a routerLink="/home/">Go to Home</a>
  `,
  imports: [RouterLink],
})
export class PageThree {}
