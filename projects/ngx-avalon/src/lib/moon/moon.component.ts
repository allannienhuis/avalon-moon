import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as Debug from 'debug';

const debug = Debug('avalon:moon.component');

export const phases = new Map<number, Iphase>([
  [0, {name: 'New Moon', color: 'white', src: ''}],
  [1, {name: 'Waxing Crescent Moon', color: 'blue', src: ''}],
  [2, {name: 'Quarter Moon', color: 'green', src: ''}],
  [3, {name: 'Waxing Gibbous Moon', color: 'orange', src: ''}],
  [4, {name: 'Full Moon', color: 'red', src: ''}],
  [5, {name: 'Waning Gibbous Moon', color: 'purple', src: ''}],
  [6, {name: 'Last Quarter Moon', color: 'teal', src: ''}],
  [7, {name: 'Waning Crescent Moon', color: 'yellow', src: ''}],
  ]);

export interface Iphase {
  name: string;
  color: string;
  src: string;
};
@Component({
  selector: 'NgxAvalon-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.css']
})
export class MoonComponent implements OnInit, OnChanges {

  @Input() public date = new Date().toJSON();
  @Output() public phaseNumber = 0;
  @Output() public phase = phases.get(0);
  @Input() public color1 = '#59513E';
  @Input() public color2 = '#D8CDA8';

  constructor() { }

  public ngOnInit(): void {

    const date = new Date(this.date);
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    this.phaseNumber = this.getMoonPhase(y, m, d);
    this.phase = phases.get(this.phaseNumber);
  }

  private isValidDate(d:any) {
    return d instanceof Date && !isNaN(d.getTime());
  }
  public ngOnChanges(changes: SimpleChanges) {

    const date = new Date(this.date);
    if (!this.isValidDate(date)) {
      console.error('invalid date', this.date);
      return;
    }
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    if(changes.date) {
      debug('date', this.date);
      // date supplied
      this.phaseNumber = this.getMoonPhase(y, m, d);
    } else if (changes.phaseNumber) {
      // ignore date
      if ((this.phaseNumber < 0) || (this.phaseNumber > 8)) {
        this.phaseNumber = 0;
      } 
    }

    // debug('phasenumber', this.phaseNumber);
    this.phase = phases.get(this.phaseNumber);

  }

  private getMoonPhase(year = 2020, month = 1, day = 1) {
    let c = 0;
    let e = 0;
    let jd = 0;
    let phase = 0;

    if (month < 3) {
    year--;
    month += 12;
    }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; //jd is total days elapsed
    jd /= 29.5305882; //divide by the moon cycle
    phase = parseInt(jd.toString()); //int(jd) -> b, take integer part of jd
    jd -= phase; //subtract integer part to leave fractional part of original jd
    phase = Math.round(jd * 8); //scale fraction from 0-8 and round
    if (phase >= 8 ) {
      phase = 0; //0 and 8 are the same so turn 8 into 0
    }

    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon

    return phase;
  }

}
