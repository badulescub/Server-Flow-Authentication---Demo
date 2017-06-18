import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import * as WindowsAzure from 'azure-mobile-apps-client';

export class AzureAuthenticationUser {
    userName: string;
    password: string;
}

export interface AzureServiceInterface {
    login(type: string, user: AzureAuthenticationUser): Promise<string>;
    logout(): Promise<any>;
    isLoggedOn(): any;
    callServerGet(action: string): Promise<any>;
}

@Injectable()
export class AzureService implements AzureServiceInterface {
    private azureServiceClient: any;

    constructor(private http: Http) {
        this.azureServiceClient = new WindowsAzure.MobileServiceClient('https://authenticationdemoapi.azurewebsites.net/');
    }

    isLoggedOn = (): any => {
        return this.azureServiceClient.currentUser;
    }

    login = (loginType: string, user: AzureAuthenticationUser): Promise<string> => {

        return new Promise((resolve, reject) => {
            switch (loginType.toLowerCase()) {
                case 'facebook':
                case 'google':
                case 'twitter':

                    this.azureServiceClient.login(loginType).done(results => {
                        console.log(results);
                        resolve(results.userId);
                    }, err => {
                        reject("Login failed");
                        console.log('Error: ' + err);
                    });
                    break;
                case 'custom':

                    this.azureServiceClient.login(loginType, user).done(results => {
                        console.log(results);
                        resolve(results.userId);
                    }, err => {
                        reject("Login failed");
                        console.log('Error: ' + err);
                    });
                    break;
                default:
                    console.log('Error: not implemented login request: ' + loginType);
                    reject("Unknown login method");
                    break;
            }
        });
    }

    logout = (): Promise<any> => {
        return this.azureServiceClient.logout();
    }

    callServerGet = (action: string): Promise<any> => {
        return this.azureServiceClient.invokeApi(action, {
            method: 'GET',
            crossDomain: true });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we should use remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = err ? err.status + ' - ' + err.statusText : '';
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}