import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleTheme } from '../store/theme/theme.actions';
import { selectTheme } from '../store/theme/theme.selector';


@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private store: Store) {}

  getTheme(): Observable<boolean> {
    return this.store.pipe(select(selectTheme))
  }

  toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }
}