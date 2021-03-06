# avalon-moon

angular component to display moon phases

## install

`npm i anienhuis/avalon-moon`

## usage

import like any other module in your app.module : `import { AvalonMoonModule } from 'avalon-moon'`;

add it to your imports array `import: [AvalonMoonModule]`

use the component in your component markup: ` <avalon-moon></avalon-moon> `

no parameters will display an SVG showing the moon phase for the current date

### parameters
   
`[date]="yyyy-mm-dd"` date in string format yyyy-mm-dd, will display the moon phase for that specific date

`[phaseNumber]="x"` phase number [0-7] if supplied, and the date is NOT supplied, the specified moon phase will be displayed
    
    // 0 => New Moon
    // 1 => Waxing Crescent Moon
    // 2 => Quarter Moon
    // 3 => Waxing Gibbous Moon
    // 4 => Full Moon
    // 5 => Waning Gibbous Moon
    // 6 => Last Quarter Moon
    // 7 => Waning Crescent Moon

`[darkColor]="#aaaaaa"` color specified in hex format

`[lightColor]="#aaaaaa"` color specified in hex format

## examples and documentation

See https://allannienhuis.github.io/avalon-moon/ for usage, examples, and more detailed documentation.

## release notes

1.0.4
- update svg styling logic

1.0.1-3
- minor bug fixes

1.0.0
- initial release

