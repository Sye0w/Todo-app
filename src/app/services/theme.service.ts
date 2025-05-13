import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { toggleTheme } from '../store/theme/theme.actions';
import { selectTheme } from '../store/theme/theme.selector';
import { AppState } from '../store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode$: Observable<boolean> = this.store.pipe(select(selectTheme));

  constructor(private store: Store<AppState>) {}

  toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }
}