import { Component,OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { selectTheme } from '../store/theme/theme.selector'
import { toggleTheme } from '../store/theme/theme.actions'
import { AppState } from '../store/index'

const moonIcon = '../assets/images/icon-moon.svg'
const sunIcon = '../assets/images/icon-sun.svg'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
})

export class HeaderComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private store: Store<AppState>){
    this.isDarkMode = false
  }

  ngOnInit(): void {
    this.store.pipe(select(selectTheme)).subscribe( theme => {
      this.isDarkMode = theme;
    })
  }

  get mode() {
    return this.isDarkMode ? sunIcon : moonIcon; 
  }

  toggleTheme(){
    this.store.dispatch(toggleTheme())
  }
}
