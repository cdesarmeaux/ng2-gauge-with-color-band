import { GuageWithColorBandComponent } from './gauge';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
export * from './gaugeOptions';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GuageWithColorBandComponent
  ],
  exports: [
    GuageWithColorBandComponent
  ]
})
export class ColorGuageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ColorGuageModule
    };
  }
}
