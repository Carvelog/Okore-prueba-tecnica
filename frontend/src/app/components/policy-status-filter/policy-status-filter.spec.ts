import { TestBed } from '@angular/core/testing';

import { PolicyStatusFilter } from './policy-status-filter';

describe('PolicyStatusFilter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyStatusFilter],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PolicyStatusFilter);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the filter label and all status options', () => {
    const fixture = TestBed.createComponent(PolicyStatusFilter);
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    const options = fixture.nativeElement.querySelectorAll('option');

    expect(label?.textContent).toContain('Filtrar por estado');
    expect(options.length).toBe(4);
    expect(options[0].textContent).toBe('All');
    expect(options[1].textContent).toBe('Active');
    expect(options[2].textContent).toBe('Pending');
    expect(options[3].textContent).toBe('Expired');
  });

  it('should default to showing all policies', () => {
    const fixture = TestBed.createComponent(PolicyStatusFilter);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;

    expect(fixture.componentInstance.selectedStatus()).toBe('');
    expect(select.value).toBe('');
  });

  it('should update selectedStatus when the user changes the filter', () => {
    const fixture = TestBed.createComponent(PolicyStatusFilter);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'pending';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedStatus()).toBe('pending');
    expect(select.value).toBe('pending');
  });
});
