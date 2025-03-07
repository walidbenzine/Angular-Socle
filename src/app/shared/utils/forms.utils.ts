import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsEnum } from '../enums/forms.enum';

export class FormsUtils {

    private static fb = inject(FormBuilder);
    
    static createLoginForm(): FormGroup {
        return this.fb.group({
            [FormsEnum.MAIL]: [null, [Validators.required, Validators.email]],
            [FormsEnum.PASSWORD]: [null, Validators.required],
        });
    }
}