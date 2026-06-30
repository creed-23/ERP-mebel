import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { Button } from '@shared/components/button/button';
import { DimensionModal } from '@shared/components/overlays/dimension-modal/dimension-modal';
import { CatalogItem, FurnitureCategory } from '@shared/interfaces/factory.interface';
import { PathResources } from '@shared/resources/path_resource';

@Component({
  selector: 'app-dimensions',
  standalone: true,
  imports: [TranslatePipe, Button, DimensionModal],
  templateUrl: './dimensions.html',
  styleUrl: './dimensions.scss',
})
export class Dimensions {
  private data = inject(FactoryDataService);
  private router = inject(Router);

  catalog = signal<CatalogItem[]>([]);
  catFilter = signal<FurnitureCategory | 'all'>('all');
  modalOpen = signal(false);

  cats: (FurnitureCategory | 'all')[] = ['all', 'divan', 'armchair', 'tableChair', 'bed', 'office'];

  filtered = computed(() => {
    const f = this.catFilter();
    return f === 'all' ? this.catalog() : this.catalog().filter((i) => i.category === f);
  });

  constructor() {
    this.data.getCatalog().subscribe((d) => this.catalog.set(d));
  }

  view(item: CatalogItem): void {
    this.router.navigate(['/', PathResources.DIMENSIONS, item.id]);
  }
}
