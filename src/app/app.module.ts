import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CoreModule } from './shared/core.module';
import { ProjectsPageComponent } from './pages/projects/projects-page.component';
import { ProjectsModule } from './features/projects/projects.module';
import { TeamModule } from './features/team/team.module';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      NotFoundComponent,
      ProjectsPageComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      LayoutModule,
      CoreModule,
      ProjectsModule,
      TeamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
