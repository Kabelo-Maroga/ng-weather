import {TemplateRef} from '@angular/core';

export interface Tab {
    id: string;
    title: string;
    active: boolean;
    template: TemplateRef<any>;
}
