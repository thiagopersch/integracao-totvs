import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormatValuesPipe } from 'app/pipes/format-values.pipe';
import { FormatsPipe } from 'app/pipes/formats.pipe';
import {FilterButtonAdvancedComponent, FilterField} from './filter-button-advanced/filter-button-advanced.component';

export type ActionsProps = {
  type: string;
  tooltip?: string;
  activeLabel?: string;
  inactiveLabel?: string;
  icon?: string;
  label?: string;
  action: (element: any) => void;
};

export type ColumnDefinitionsProps = {
  key: string;
  header: string;
  type: string;
  userName?: string;
};

export interface TableField {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    FormatValuesPipe,
    FilterButtonAdvancedComponent,
  ],
  providers: [FormatsPipe],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() fields: TableField[] = [];
  @Input() ctaLabel: string = '';
  @Input() columnDefinitions: ColumnDefinitionsProps[] = [];
  @Input() enableFilterAdvanced: boolean = false;
  @Input() enablePagination: boolean = true;
  @Input() enableToggleStatus: boolean = false;
  @Input() enableAddButton: boolean = true;
  @Input() tooltipText: string = '';
  @Input() length: string = '0';
  @Input() pageSize: number = 25;
  @Input() pageSizeOptions: number[] = [25, 50, 100, 200];
  @Input() template: string = '';
  @Input() sortColumn: string = '';
  @Input() sortDirection: SortDirection = 'asc';
  @Input() isTooltip?: boolean = false;
  @Input() filterFields: FilterField[] = [];
  @Input() actions!: ActionsProps[];
  @Input() dataSourceMat = new MatTableDataSource<any>([]);
  @Input() applyFilterFn!: (event: any) => void;
  @Input() actionFn!: (element?: any) => void;
  @Input() addFn!: () => void;
  @Input() editFn!: (element: any) => void;
  @Input() deleteFn!: (element: any) => void;
  @Input() toggleFn!: (element: any) => void;
  @Output() page = new EventEmitter<Event>();
  displayedColumns: string[] = [];
  currentPageIndex: number = 0;
  showFilter: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private format: FormatsPipe) {}

  ngOnInit() {
    this.dataSourceMat.data = this.fields;
    this.displayedColumns = this.columnDefinitions.map((col) => col.key).concat('actions');
    this.dataSourceMat.filterPredicate = this.createFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields']) {
      this.dataSourceMat.data = this.fields;
    }

    if (this.paginator) {
      this.dataSourceMat.paginator = this.paginator;
      this.paginator.length = this.fields.length;
    }

    if (changes['columnDefinitions']) {
      this.displayedColumns = this.columnDefinitions.map((col) => col.key).concat('actions');
    }
  }

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
    this.dataSourceMat.sort = this.sort;

    if (this.paginator) {
      this.paginator.pageIndex = this.currentPageIndex;
    }

    this.paginator?.page.subscribe(() => {
      this.currentPageIndex = this.paginator?.pageIndex;
    });

    this.dataSourceMat.sortingDataAccessor = (item, property) => {
      const value = this.format.getNestedValue(item, property);
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') {
        return this.normalizeString(value);
      }
      if (typeof value === 'number' || typeof value === 'boolean') {
        return value;
      }
      if (value instanceof Date) {
        return value.getTime();
      }
      return value;
    };

    this.filterPredicate()
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filterPredicate()

    this.dataSourceMat.filter = filterValue;

    if (this.dataSourceMat.paginator) {
      this.dataSourceMat.paginator.firstPage();
    }
  }

  applyAdvancedFilter(values: any) {
    if (Object.keys(values).length === 0) {
      this.dataSourceMat.filter = '';
      return;
    }

    this.dataSourceMat.filterPredicate = this.createFilter(values);
    this.dataSourceMat.filter = JSON.stringify(values);

    if (this.dataSourceMat.paginator) {
      this.dataSourceMat.paginator.firstPage();
    }
  }

  createFilter(_filterValues: any = {}): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      let parsedFilterValues: any = {};
      try {
        parsedFilterValues = JSON.parse(filter);
      } catch (e) {
        return false;
      }

      if (Object.keys(parsedFilterValues).length === 0) {
        return true;
      }

      let match = true;

      for (const key of Object.keys(parsedFilterValues)) {
        const filterValue = parsedFilterValues[key];
        if (filterValue && filterValue.length > 0) {
          const dataValue = key.split('.').reduce((obj, keyPart) => obj?.[keyPart], data);
          if (Array.isArray(filterValue)) {
            match = match && filterValue.includes(dataValue);
          } else {
            match = match && filterValue === dataValue;
          }
        }
      }

      return match;
    };
  }

  toggleFilter = () => {
    this.showFilter = !this.showFilter;
  };


  private normalizeString(value: any): string {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private normalizedFilter(filter: any, data: any): boolean {
    const normalizedFilter = this.normalizeString(filter);
    return this.columnDefinitions.some((column) => {
      const value = this.format.getNestedValue(data, column.key);
      if (value !== null && value !== undefined) {
        const normalizedValue = this.normalizeString(value);
        return normalizedValue.includes(normalizedFilter);
      }
      return false;
    });
  }

  private filterPredicate() {
    this.dataSourceMat.filterPredicate = (data: any, filter: string) => {
      return this.normalizedFilter(filter, data);
    };
  }
}
