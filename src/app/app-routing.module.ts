import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ForumComponent} from "./forum/forum.component";
import {PostComponent} from "./post/post.component";
import {SearchComponent} from "./search/search.component";
import {AccountComponent} from "./account/account.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {UserResolver} from "./resolvers/userResolver";
import {ForumResolver} from "./resolvers/forumResolver";
import {PostResolver} from "./resolvers/postResolver";
import {ResetpwdComponent} from "./resetpwd/resetpwd.component";
import {LostPwdComponent} from "./lost-pwd/lost-pwd.component";
import {CgvComponent} from "./cgv/cgv.component";
import {ConditionsComponent} from "./conditions/conditions.component";
import {UserPostsComponent} from "./user-posts/user-posts.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path : 'forum/:id',
    component: ForumComponent,
    resolve: {
      forumResolver: ForumResolver
    },
  },
  { path : 'comment/:id', component: ForumComponent },
  {
    path : 'post/:id',
    component: PostComponent,
    resolve: {
      postResolver: PostResolver
    }
  },
  { path : 'search/:search', component: SearchComponent },
  { path: 'change-password/:token', component: ResetpwdComponent },
  { path: 'user-lost-password', component: LostPwdComponent},
  { path: 'terms-and-conditions', component: CgvComponent},
  { path: 'privacy-policy', component: ConditionsComponent},
  { path: 'user-posts/:userId', component: UserPostsComponent},
  {
    path : 'account/:id',
    component: AccountComponent,
    resolve: {
      userResolver: UserResolver
    },
  },
  { path : 'my-account', component: AccountComponent },
  { path : 'post-create', component: CreatePostComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
