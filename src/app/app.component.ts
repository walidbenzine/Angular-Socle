import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeResolver } from './core/resolvers/home.resolver';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  providers: [
    HomeResolver,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'socle-angular';
}
