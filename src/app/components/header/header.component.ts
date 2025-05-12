import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

const moonIcon = '../assets/images/icon-moon.svg';
const sunIcon = '../assets/images/icon-sun.svg';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private themeService: HeaderService) {
    this.isDarkMode = false;
  }

  ngOnInit(): void {
    this.themeService.getTheme().subscribe((theme) => {
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
