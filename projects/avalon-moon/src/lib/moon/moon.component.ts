import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as Debug from 'debug';

const debug = Debug('avalon:moon.component');

export const phases = new Map<number, string>([
  [0, 'New Moon'],
  [1, 'Waxing Crescent Moon'],
  [2, 'Quarter Moon'],
  [3, 'Waxing Gibbous Moon'],
  [4, 'Full Moon'],
  [5, 'Waning Gibbous Moon'],
  [6, 'Last Quarter Moon'],
  [7, 'Waning Crescent Moon'],
  ]);

@Component({
  selector: 'avalon-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.css']
})
export class MoonComponent implements OnInit, OnChanges {

  @Input() public date = new Date().toJSON();
  @Input() public phaseNumber = -1;
  @Output() public phaseNumberChanged = new EventEmitter();
  @Output() public phaseName = new EventEmitter();
  @Input() public darkColor = '#59513E';
  @Input() public lightColor = '#D8CDA8';
  public styles = new Map<number, string>();

  constructor() { }

  public ngOnInit(): void {

    if (this.phaseNumber === -1) {
      // if phasenumber not set by input, set the default date
      const date = new Date(this.date);
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      this.phaseNumber = this.getMoonPhase(y, m, d);
      debug('setting phasenumber', this.phaseNumber);
      this.initStyles();
    }

  }

  private initStyles() {
    const dkColor = `fill:${this.darkColor}`;
    const ltColor = `fill:${this.lightColor};stroke:${this.lightColor}`;

    if (this.phaseNumber === 4) {
      this.styles.set(0, 'visibility:hidden');
    } else {
      this.styles.set(0, dkColor);
    }

    const foreGroundStyle = 'visibility:hidden';
    [1,2,3,4,5,6,7].forEach( n => this.styles.set(n, foreGroundStyle));
    this.styles.set(this.phaseNumber, ltColor);


    
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
      debug('phaseNumber', this.phaseNumber);
      // ignore date
      if ((this.phaseNumber < 0) || (this.phaseNumber > 8)) {
        this.phaseNumber = 0;
      } 
    }

    this.initStyles();
    debug('this.phaseNumber', this.phaseNumber);
    this.phaseNumberChanged.emit(this.phaseNumber);
    this.phaseName.emit(phases.get(this.phaseNumber));

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
