import { Component, OnInit } from '@angular/core';
import Debug from 'debug';
const debug = Debug('avalon-app:app.component');

interface IMonth {
  num: number;
  label: string;
  days: IDay[];
}

interface IDay {
  num: number;
  date: string;
  phaseName?: string;
  phaseNumber?: string;
}

interface IPhase {
  num: number;
  name: string;
  phaseNumber: string;
}
@Component({
  selector: 'avalon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public year = new Date().getFullYear();
  public months: IMonth[] = [];
  public darkColor = 'darkgrey';
  public lightColor = 'lightgrey';
  public phases: IPhase[];
  public example1 = `
<avalon-moon 
  *ngFor="let phase of phases"
  [phaseNumber]="phase.num"
  (phaseName)="phase.name = $event"
  (phaseNumberChanged)="phase.phaseNumber = $event"
  >
  <div>{{phase.num}} </div>
  <div>{{phase.name}}</div>
</avalon-moon>
  `;

  public example2 = `
<avalon-moon [style.height.px]="100" >
</avalon-moon>
  `;
  public example3 = `
<div *ngFor="let month of months" class="month">
  <p>Month: {{month.label}}</p>
  <avalon-moon 
    *ngFor="let day of month.days"
    [date]="day.date" 
    [darkColor]="darkColor"
    [lightColor]="lightColor"
    (phaseName)="day.phaseName = $event"
    >
    <div>{{day.num}}</div>
    <div>{{day.phaseName}}</div>
  </avalon-moon>
</div>
  `;
  constructor() {
    
    this.darkColor = this.standardize_color(this.darkColor);
    this.lightColor = this.standardize_color(this.lightColor);
    this.phases = this.range(0, 7).map((n) => {return {num: n, name: '', phaseNumber: ''}});
    debug('phases', this.phases);
  }

  private  range(start: number, end: number) {
    return Array(end - start + 1).fill(undefined).map((_, idx) => start + idx)
  }
  // converts to hex #
  // which is what input type="color" require.
  private standardize_color(str: string){
    var ctx = document.createElement('canvas').getContext('2d'​);
    if (!ctx){
      return '';
    }
    ctx.fillStyle = str;
    return ctx.fillStyle;
  }

  public ngOnInit() {
    this.init(this.year);
  }
  private isValidDate(d:any) {
    return d instanceof Date && !isNaN(d.getTime());
  }
  public isValidInput = true;
  public yearChange(e: Event, input: HTMLInputElement) {

    debug('value', input.value);
    const yearNum = parseInt(input.value, 10);
    this.isValidInput = !isNaN(yearNum);
    if (!this.isValidInput) {
      return;
    }
    const date = new Date(yearNum, 0, 1);
    this.isValidInput = this.isValidDate(date);
    if (!this.isValidInput) {
      return;
    }

    this.init(date.getFullYear());

  }

  public darkColorChange(e: Event, input: HTMLInputElement) {
    this.darkColor = input.value;
  }

  public lightColorChange(e: Event, input: HTMLInputElement) {
    this.lightColor = input.value;
  }

  private init(year: number){
    debug('init year', year);
    this.year = year;
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    let day = new Date(start);
    while ( day <= end ) {
      const monthNumber = day.getMonth() + 1; // it's zero indexed, but we want 1 index
      const dayNumber = day.getDate();

      let month = this.months[monthNumber];
      if (!month) {
        month = { num: monthNumber, days: [], label: day.toLocaleString('default', {month: 'long'})};
        this.months[monthNumber] = month;
      }
      month.days[dayNumber] = { num: dayNumber, date: `${year}-${monthNumber}-${dayNumber}`};

      day.setDate(dayNumber + 1);
    }

    // get rid of month 0
    this.months = this.months.filter(Boolean);

    // get rid of day 0
    for (const month of this.months) {
      month.days = month.days.filter(Boolean);
    }

    debug('y, m', this.year, this.months);

  }
}
