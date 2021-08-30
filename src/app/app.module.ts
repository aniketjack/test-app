import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { ApiService } from './services/api-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WaitingLoaderService } from './services/waiting-loader/waiting-loader.service';
import { environment } from 'src/environments/environment';
import * as CONST from './shared/app.constants';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TodoComponent } from './components/todo/todo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilityService } from './services/utilities/utility.service';
import { FilterPipe } from './services/pipes/search.pipe';
import { EmptyComponent } from './commons/empty/empty.component';

// Initialize users data before bootstrapping the app
export function startupServiceFactory(http: HttpClient) {
         return ()=> {
            http
            .get(`${environment.api_url}${CONST.GET_USERS}`)
            .toPromise()
            .then((data: any) => {
                this._startupData = data;
                window.localStorage.setItem('users', JSON.stringify(this._startupData));
            })
            .catch((err: any) => Promise.resolve());
         }
    }    

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AlbumsComponent,
    TodoComponent,
    FilterPipe,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule 
  ],
  providers: [
    ApiService,
    WaitingLoaderService,
    {
      // Provider for APP_INITIALIZER
            provide: APP_INITIALIZER,
            useFactory: startupServiceFactory,
            deps: [HttpClient],
            multi: true
    },
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
