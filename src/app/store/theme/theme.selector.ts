import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Theme } from './theme.reducer'

export const selectThemeState = createFeatureSelector<Theme>('theme')

export const selectTheme = createSelector(
  selectThemeState,
  (state) => state.isDarkTheme
)
