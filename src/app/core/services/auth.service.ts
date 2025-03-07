import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { ApiService } from '../../shared/services/api.service';
import { RoutesEnum } from '../../shared/enums/routes.enum';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { StorageEnum } from '../../shared/enums/storage.enum';

@Injectable({ providedIn: 'root'})
export class AuthService {

    private connectedUser: UserModel | null = null;

    private apiService = inject(ApiService);
    private routerService = inject(Router);
    private storageService = inject(StorageService);
    
    login(email: string, password: string): Observable<any> {
        return this.apiService.login(email, password);
    }

    register(user: UserModel): Observable<any> {
        return this.apiService.register(user);
    }

    logOut(): void {
        this.apiService.logOut().pipe(
            finalize(() => {
                this.storageService.clear();
                this.routerService.navigate([RoutesEnum.LOGIN]);
            }),
        ).subscribe();
    }

    refreshTokens(): Observable<any> {
        return this.apiService.refreshTokens();
    }

    isAuthenticated(): boolean {
        return !!this.connectedUser;
    }

    getToken(): string | null {
        return this.connectedUser?.token || null;
    }

    getRoleConnectedUser(): number | null {
        return this.connectedUser?.idRole || null;
    }

    async setDataUserFromStorage(): Promise<UserModel | null> {
        this.connectedUser = await this.getDataUserFromStorage();
        return this.connectedUser;
    }

    private async getDataUserFromStorage(): Promise<UserModel | null> {
        return this.storageService.get(StorageEnum.USER);
    }
}