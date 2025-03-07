import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { RolesEnum } from "../../shared/enums/roles.enum";

@Injectable({ providedIn: 'root' })
export class RolesService {

    private authService = inject(AuthService);

    isAdmin(): boolean {
        return this.isRole(RolesEnum.ADMIN);
    }

    isUser(): boolean {
        return this.isRole(RolesEnum.USER);
    }

    isRole(role: RolesEnum): boolean {
        const roleConnectedUser = this.authService.getRoleConnectedUser();
        return !!roleConnectedUser && roleConnectedUser === role;
    }
}