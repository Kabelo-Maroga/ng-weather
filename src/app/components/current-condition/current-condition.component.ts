import {Component, Input} from '@angular/core';
import {ConditionsAndZip} from '../../core/models/conditions-and-zip.type';

@Component({
  selector: 'current-condition',
  templateUrl: './current-condition.component.html',
  styleUrls: ['./current-condition.component.css']
})
export class CurrentConditionComponent {
  @Input() location: ConditionsAndZip;
  @Input() srcUrl: string;
}
