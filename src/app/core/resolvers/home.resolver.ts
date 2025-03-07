import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class HomeResolver implements Resolve<any> {

    resolve(): Observable<any> {
        return of(null);
    }
}
