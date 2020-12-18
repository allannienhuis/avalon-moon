import { Component, OnInit } from '@angular/core';
import Debug from 'debug';
const debug = Debug('avalon-app:app.component');

interface IMonth {
  num: number;
  label: string;
  days: number[];
}
@Component({
  selector: 'avalon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public year = new Date().getFullYear();
  public months: IMonth[] = [];
  public color1 = 'lightgrey';
  public color2 = 'darkgrey';

  constructor() {
    
    this.color1 = this.standardize_color(this.color1);
    this.color2 = this.standardize_color(this.color2);
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

  public color1Change(e: Event, input: HTMLInputElement) {
    this.color1 = input.value;
  }

  public color2Change(e: Event, input: HTMLInputElement) {
    this.color2 = input.value;
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
      month.days[dayNumber] = dayNumber;

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
