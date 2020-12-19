import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AvalonMoonModule } from 'avalon-moon';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions} from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvalonMoonModule,
    HighlightModule,
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: <HighlightOptions>{
      fullLibraryLoader: () => import('highlight.js'),
    },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
