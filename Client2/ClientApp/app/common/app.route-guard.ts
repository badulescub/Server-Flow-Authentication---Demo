import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AzureService } from '../services/mobile.service';

@Injectable()
export class RouteActivationGuard implements CanActivate
{
    constructor(
        private azureService: AzureService,
        private router: Router,
        private location: Location) { }

    canActivate()
    {
        if (this.azureService.isLoggedOn()) {
            return true;
        }

        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        this.router.navigate(['/login']);
        return false;
    }
}