import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalNotificationsService {

    private messageService = inject(MessageService);
    private translate = inject(TranslateService); 

    showNotification(summary: string, detail: string, success: boolean): void {
        this.messageService.add({ severity: success ? 'success' : 'error', summary, detail });
    }

    showNotificationByErrorKey(errorKey: string, summary: string, success: boolean): void {
        this.translate.get(errorKey).pipe(
            tap(detail => this.showNotification(summary, detail, success)),
        ).subscribe();
    }
}