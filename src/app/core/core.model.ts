import { PostEffects } from './store/post/post.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { postReducer } from './store/post/post.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_post', postReducer),
    EffectsModule.forFeature([PostEffects])
  ]
})

export class CoreModule {}
