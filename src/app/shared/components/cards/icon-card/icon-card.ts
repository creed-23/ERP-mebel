import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-card',
  imports: [TranslatePipe],
  templateUrl: './icon-card.html',
  styleUrl: './icon-card.scss',
})
export class IconCard {
  @Input() icon: string = 'pi pi-home';
  @Input() text: string = '';
  @Input() decription: string = '';
}
