import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';

import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';
import { PolicyStore } from '../../store/policy.store';
import { PolicyDetail } from './policy-detail';

const mockPolicy: Policy = {
  id: 1,
  holder: 'John Doe',
  type: 'health',
  status: 'active',
  premium: 1000,
};

describe('PolicyDetail', () => {
  let policyService: { getPolicyById: ReturnType<typeof vi.fn> };
  let policyStore: { removePolicy: ReturnType<typeof vi.fn> };
  let router: Router;
  let routeId: string | null;

  beforeEach(async () => {
    policyService = {
      getPolicyById: vi.fn(() => of(mockPolicy)),
    };
    policyStore = {
      removePolicy: vi.fn(),
    };
    routeId = '1';

    await TestBed.configureTestingModule({
      imports: [PolicyDetail],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? routeId : null),
              },
            },
          },
        },
        { provide: PolicyService, useValue: policyService },
        { provide: PolicyStore, useValue: policyStore },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate');
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PolicyDetail);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading message while fetching the policy', () => {
    const subject = new Subject<Policy>();
    policyService.getPolicyById.mockReturnValue(subject.asObservable());

    const fixture = TestBed.createComponent(PolicyDetail);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cargando póliza...');

    subject.next(mockPolicy);
    subject.complete();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('John Doe');
  });

  it('should render policy details after a successful load', async () => {
    const fixture = TestBed.createComponent(PolicyDetail);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(policyService.getPolicyById).toHaveBeenCalledWith(1);
    expect(fixture.nativeElement.textContent).toContain('John Doe');
    expect(fixture.nativeElement.textContent).toContain('Health');
    expect(fixture.nativeElement.textContent).toContain('Active');
    expect(fixture.nativeElement.textContent).toContain('1000 €');
  });

  it('should show error message when the policy id is invalid', () => {
    routeId = 'invalid';

    const fixture = TestBed.createComponent(PolicyDetail);
    fixture.detectChanges();

    expect(policyService.getPolicyById).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Identificador de póliza no válido.');
  });

  it('should show error message when the policy cannot be loaded', async () => {
    policyService.getPolicyById.mockReturnValue(throwError(() => new Error('Not found')));

    const fixture = TestBed.createComponent(PolicyDetail);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar la póliza.');
  });

  it('should remove the policy and navigate back after delete', () => {
    vi.useFakeTimers();

    const fixture = TestBed.createComponent(PolicyDetail);
    fixture.detectChanges();
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('button[type="button"]') as HTMLButtonElement;
    deleteButton.click();
    fixture.detectChanges();

    expect(policyStore.removePolicy).toHaveBeenCalledWith(1);
    expect(fixture.nativeElement.textContent).toContain('Póliza eliminada correctamente.');

    vi.advanceTimersByTime(1500);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);

    vi.useRealTimers();
  });
});
