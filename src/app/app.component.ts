import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  calculateHeight(){
    const height=window.innerHeight-100;
    return height/window.innerHeight *100;
  }

  onResize(event) {
    this.calculateHeight();
  }
}
