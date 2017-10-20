import { Component } from '@angular/core';
import { IGaugeOptions } from 'ng2-gauge-with-color-band';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  gaugeOptions: IGaugeOptions = {
    valuePercent: .65,
    bandColor: ['#56bf36', '#ff9c04', '#f03333'],
    bandPercent: [.5, .75, .1],
    minValue: 0,
    maxValue: 120,
    unit: 'KM/h'
  };
  gaugeOptions1: IGaugeOptions = {
    valuePercent: .65,
    bandColor: ['#56bf36', '#ff9c04', '#ffc52b', '#f03333'],
    bandPercent: [.5, .6, .75, .1]
  };
}
