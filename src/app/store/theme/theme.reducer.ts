import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './theme.actions'

export interface Theme {
  isDarkTheme: boolean;
}

const initialState: Theme = {
  isDarkTheme: localStorage.getItem('isDarkTheme') === 'true' ? true : false,
} 

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, (state)=>{ 
    const isDarkTheme = !state.isDarkTheme;
    localStorage.setItem('isDarkTheme', `${isDarkTheme}`);
    return {state, isDarkTheme } 
  })
);