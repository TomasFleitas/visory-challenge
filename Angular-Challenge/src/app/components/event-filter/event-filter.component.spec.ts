import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EventFilterComponent } from './event-filter.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import dayjs from 'dayjs';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

describe('EventFilterComponent', () => {
  let component: EventFilterComponent;
  let fixture: ComponentFixture<EventFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventFilterComponent],
      imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzDatePickerModule,
        NzButtonModule,
        NzSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: NZ_I18N, useValue: en_US }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const filterFormValues = component.filterForm.value;
    expect(filterFormValues).toEqual({
      location: '',
      startDate: null,
      endDate: null,
      sortBy: 'date',
      direction: 'desc',
    });
  });

  it('should emit filterChanged event with form values on submit', () => {
    spyOn(component.filterChanged, 'emit');

    component.filterForm.setValue({
      location: 'New York',
      startDate: new Date(),
      endDate: new Date(),
      sortBy: 'name',
      direction: 'asc',
    });
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(
      By.css('button[nzType="primary"]')
    ).nativeElement;
    searchButton.click();

    expect(component.filterChanged.emit).toHaveBeenCalledWith(
      component.filterForm.value
    );
  });

  it('should disable previous dates in the end date picker when a start date is selected', () => {
    const startDate = dayjs().add(1, 'day').toDate();
    component.filterForm.get('startDate')?.setValue(startDate);
    fixture.detectChanges();

    const isDisabled = component.disabledEndDate(dayjs().toDate());
    expect(isDisabled).toBeTrue();
  });

  it('should disable future dates in the start date picker when an end date is selected', () => {
    const endDate = dayjs().subtract(1, 'day').toDate();
    component.filterForm.get('endDate')?.setValue(endDate);
    fixture.detectChanges();

    const isDisabled = component.disabledStartDate(dayjs().toDate());
    expect(isDisabled).toBeTrue();
  });

  it('should show loading spinner in the search button when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(
      By.css('button[nzType="primary"]')
    ).nativeElement;
    expect(searchButton.classList).toContain('ant-btn-loading');
  });

  it('should not show loading spinner in the search button when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(
      By.css('button[nzType="primary"]')
    ).nativeElement;
    expect(searchButton.classList).not.toContain('ant-btn-loading');
  });
});
