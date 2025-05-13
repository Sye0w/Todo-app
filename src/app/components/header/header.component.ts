import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service'; // Import ThemeService

const moonIcon = '../assets/images/icon-moon.svg';
const sunIcon = '../assets/images/icon-sun.svg';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) { 
    this.isDarkMode = false;
  }

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  get mode() {
    return this.isDarkMode ? sunIcon : moonIcon;
  }

  toggleTheme() {
    this.themeService.toggleTheme(); 
  }
}