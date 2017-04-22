import { Component } from '@angular/core';

import { AzureService } from '../../services/mobile.service';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(
        private azureService: AzureService
    ) {
        azureService.callServerGet('SampleData').
            then((response) => {
                this.forecasts = response.result as WeatherForecast[]
            });
    }    
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
