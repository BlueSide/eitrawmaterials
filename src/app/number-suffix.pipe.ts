import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSuffix'
})
export class NumberSuffixPipe implements PipeTransform {

    transform(value: any, args?: any): any
    {
        let suffixes = ['K', 'M', 'B'];

        if(isNaN(value))
        {
            return null;
        }

        if(value < 1000)
        {
            return value;
        }
        

        let exp = Math.floor(Math.log(value) / Math.log(1000));

        if(exp > suffixes.length)
        {
            exp = suffixes.length;
        }
        
        return (
            (value / Math.pow(1000, exp)).toLocaleString([], {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        ) + suffixes[exp - 1];
    }

}
