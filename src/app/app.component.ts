import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { selectTheme } from './store/theme/theme.selector'
import { AppState } from './store/index'

const DarkImg = '../assets/images/bg-desktop-dark.jpg'
const LightImg = '../assets/images/bg-desktop-light.jpg'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {

  isDarkTheme : boolean;

  constructor (private store: Store<AppState>){
    this.isDarkTheme = false;
  }

  ngOnInit(){
    this.store.pipe(select(selectTheme)).subscribe(theme => {
      this.isDarkTheme = theme;
      console.log(this.isDarkTheme)
    })
  }

  get imgMode() {
    return this.isDarkTheme ? DarkImg : LightImg;
  }
}
