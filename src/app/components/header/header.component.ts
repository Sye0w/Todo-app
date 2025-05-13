import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service'; // Import ThemeService
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectTheme } from 'src/app/store/theme/theme.selector';
import { toggleTheme } from 'src/app/store/theme/theme.actions';

const moonIcon = '../assets/images/icon-moon.svg';
const sunIcon = '../assets/images/icon-sun.svg';

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
    });
  }

  get mode() {
    return this.isDarkMode ? sunIcon : moonIcon;
  }

  toggleTheme(){
    this.store.dispatch(toggleTheme())
  }
}