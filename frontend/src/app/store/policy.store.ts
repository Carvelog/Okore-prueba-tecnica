import { computed, inject, Injectable, signal } from '@angular/core';
import { Policy } from '../models/policy';
import { PolicyService } from '../services/policy.service';

@Injectable({ providedIn: 'root' })
export class PolicyStore {
  private readonly policyService = inject(PolicyService);

  private readonly _policies = signal<Policy[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _loaded = signal(false);

  readonly policies = this._policies.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isEmpty = computed(() => this._policies().length === 0);

  loadPolicies(): void {
    if (this._loaded()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.policyService.getPolicies().subscribe({
      next: (response) => {
        this._policies.set(response.data);
        this._loaded.set(true);
		// Simular carga de datos
		setTimeout(() => {
          this._loading.set(false);
        }, 1000);
      },
      error: () => {
        this._error.set('No se pudieron cargar las pólizas.');
        this._loading.set(false);
      },
    });
  }

  removePolicy(id: number): void {
    this._policies.update((policies) => policies.filter((p) => p.id !== id));
  }

  getPolicyById(id: number): Policy | undefined {
    return this._policies().find((p) => p.id === id);
  }
}