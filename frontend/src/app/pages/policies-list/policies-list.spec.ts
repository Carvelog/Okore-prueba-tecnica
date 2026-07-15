import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Policy } from '../../models/policy';
import { PolicyStore } from '../../store/policy.store';
import { PoliciesList } from './policies-list';

const mockPolicies: Policy[] = [
  { id: 1, holder: 'John Doe', type: 'health', status: 'active', premium: 1000 },
  { id: 2, holder: 'Pepe Doe', type: 'auto', status: 'pending', premium: 500 },
  { id: 3, holder: 'Pepa Doe', type: 'home', status: 'expired', premium: 757 },
];

class MockPolicyStore {
  readonly policies = signal<Policy[]>(mockPolicies);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly loadPolicies = vi.fn();
}

describe('PoliciesList', () => {
  let policyStore: MockPolicyStore;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    policyStore = new MockPolicyStore();
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [PoliciesList],
      providers: [
        { provide: PolicyStore, useValue: policyStore },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PoliciesList);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load policies on init', () => {
    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    expect(policyStore.loadPolicies).toHaveBeenCalledOnce();
  });

  it('should show loading message while policies are loading', () => {
    policyStore.loading.set(true);

    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cargando pólizas...');
  });

  it('should show error message when loading fails', () => {
    policyStore.error.set('No se pudieron cargar las pólizas.');

    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No se pudieron cargar las pólizas.');
  });

  it('should show empty message when there are no policies', () => {
    policyStore.policies.set([]);

    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hay pólizas disponibles.');
  });

  it('should render all policies by default', () => {
    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');

    expect(items.length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('John Doe');
    expect(fixture.nativeElement.textContent).toContain('Pepe Doe');
    expect(fixture.nativeElement.textContent).toContain('Pepa Doe');
  });

  it('should filter policies by selected status', () => {
    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'active';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');

    expect(items.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('John Doe');
    expect(fixture.nativeElement.textContent).not.toContain('Pepe Doe');
  });

  it('should show message when filter has no matches', () => {
    policyStore.policies.set([
      { id: 1, holder: 'John Doe', type: 'health', status: 'active', premium: 1000 },
    ]);

    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    select.value = 'expired';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hay pólizas con el estado seleccionado.');
  });

  it('should navigate to policy detail when a policy is clicked', () => {
    const fixture = TestBed.createComponent(PoliciesList);
    fixture.detectChanges();

    const firstItem = fixture.nativeElement.querySelector('li') as HTMLLIElement;
    firstItem.click();

    expect(router.navigate).toHaveBeenCalledWith(['/policy', 1]);
  });
});
