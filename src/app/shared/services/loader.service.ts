import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class LoaderService {

    public isLoading = signal(false);
    private loaderCount: number = 0;

    public show(): void {
        this.loaderCount++;
        this.isLoading.set(true);
    }

    public hide(): void {
        this.loaderCount--;
        this.loaderCount === 0 && this.isLoading.set(false);
    }
}