import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {Tab} from '../../models/tab.type';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Output() closeTab = new EventEmitter<string>();

  selectTab(selectedTab: Tab) {
    this.tabs.forEach(tab => tab.active = false);
    selectedTab.active = true;
  }

  close(tabToClose: Tab) {
    const index = this.tabs.indexOf(tabToClose);
    if (index !== -1) {
      this.tabs.splice(index, 1);
      this.closeTab.emit(tabToClose.id);
      if (tabToClose.active && this.tabs.length > 0) {
        this.selectTab(this.tabs[Math.min(index, this.tabs.length - 1)]);
      }
    }
  }
}
