import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { reducers } from './store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getPerformance, providePerformance } from '@angular/fire/performance';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      DragDropModule,
      StoreModule.forRoot(reducers),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ), 
    provideFirebaseApp(() => initializeApp({"projectId":"todo-app-5d980","appId":"1:800638133891:web:41306b1efde91f94619db6","storageBucket":"todo-app-5d980.firebasestorage.app","apiKey":"AIzaSyASlg7MdbX9TBDeHWmcpXSzBrFvFvaEPoU","authDomain":"todo-app-5d980.firebaseapp.com","messagingSenderId":"800638133891"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), providePerformance(() => getPerformance()),
  ],
};
