import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions'

export interface Theme {
  isDarkTheme: boolean;
}

const initialState: Theme = {
  isDarkTheme: false
} 

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, (state)=> ({ ...state, isDarkTheme: !state.isDarkTheme}))
);