import { TemplateRef } from '@angular/core';

export interface Tab<T> {
    id: string;
    title: string;
    active: boolean;
    template: TemplateRef<T>;
}
