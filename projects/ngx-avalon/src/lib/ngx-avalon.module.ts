import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoonComponent } from './moon/moon.component';



@NgModule({
  declarations: [MoonComponent],
  imports: [
    CommonModule,
  ],
  exports: [MoonComponent]
})
export class NgxAvalonModule { }
