import { Component } from '@angular/core';
import { MainComponent } from "./views/main/main.component";




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [MainComponent]
})


export class AppComponent {

  
}
