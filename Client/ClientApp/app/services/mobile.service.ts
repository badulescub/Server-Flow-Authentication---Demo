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
    isLoggedOn(): any;
    getUserInfo(): any;
}

@Injectable()
export class AzureService implements AzureServiceInterface {
    private azureServiceClient: any;
    private backEndUrl: string;

    constructor(private http: Http) {
        this.setBackEndUrl('http://authenticationdemoapi.azurewebsites.net');
    }

    setBackEndUrl = (url: string): void => {
        this.backEndUrl = url;
        this.azureServiceClient = new WindowsAzure.MobileServiceClient(url);
    }

    isLoggedOn = (): any => {
        return this.azureServiceClient.currentUser;
    }

    login = (type: string, user: AzureAuthenticationUser): Promise<string> => {

        return new Promise((resolve, reject) => {
            switch (type.toLowerCase()) {
                case 'facebook':
                case 'google':
                case 'twitter':

                    this.azureServiceClient.login(type).done(results => {
                        console.log(results);
                        resolve(results.userId);
                    }, err => {
                        reject("Login failed");
                        console.log('Error: ' + err);
                    });
                    break;
                case 'custom':

                    this.azureServiceClient.login(type, user).done(results => {
                        console.log(results);
                        resolve(results.userId);
                    }, err => {
                        reject("Login failed");
                        console.log('Error: ' + err);
                    });
                    break;
                default:
                    console.log('Error: not implemented login request: ' + type);
                    reject("Unknown login method");
                    break;
            }
        });
    }

    getUserInfo = (): Observable<any> => {
        let url = this.backEndUrl + '/.auth/me';
        let headers = new Headers();

        headers.append('X-ZUMO-AUTH', this.azureServiceClient.currentUser.mobileServiceAuthenticationToken);
        return this.http.get(url, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
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