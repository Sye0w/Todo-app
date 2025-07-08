import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectTheme } from 'src/app/store/theme/theme.selector';
import { HeaderComponent } from "../../components/header/header.component";
import { TodoComponent } from "../../components/todo/todo.component";

const DarkImg = '../assets/images/bg-desktop-dark.jpg'
const LightImg = '../assets/images/bg-desktop-light.jpg'


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})



export class MainComponent implements OnInit{
  isDarkTheme : boolean;

  constructor (private store: Store<AppState>){
    this.isDarkTheme = false;
  }

  ngOnInit(){
    this.store.pipe(select(selectTheme)).subscribe(theme => {
      this.isDarkTheme = theme;
    })
  }

  get imgMode() {
    return this.isDarkTheme ? DarkImg : LightImg;
  }
}
