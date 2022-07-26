import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ForumComponent } from './forum/forum.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { SearchComponent } from './search/search.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {HttpRequestInterceptor} from "./shared/implementation/HttpRequestInterceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserResolver} from "./resolvers/userResolver";
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { AutosizeModule } from 'ngx-autosize';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { LostPwdComponent } from './lost-pwd/lost-pwd.component';
import { CgvComponent } from './cgv/cgv.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    ForumComponent,
    RecommendationComponent,
    SearchComponent,
    AccountComponent,
    LoginComponent,
    SigninComponent,
    NotFoundComponent,
    CreatePostComponent,
    CodeEditorComponent,
    TextEditorComponent,
    CodeViewerComponent,
    ResetpwdComponent,
    LostPwdComponent,
    CgvComponent,
    ConditionsComponent,
    UserPostsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        NgbModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
        FontAwesomeModule,
        MatStepperModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        MatSnackBarModule,
        AutosizeModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {provide: UserResolver}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
