import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PolicyStore } from '../../store/policy.store';
import { Policy } from '../../models/policy';
import { TextCapitalizePipe } from '../../pipes/text-capitalize.pipe';
import { PolicyService } from '../../services/policy.service';
import { STATUS_BADGE_CLASS } from '../../utils/policy-status-styles';

@Component({
  selector: 'app-policy-detail',
  imports: [NgClass, RouterLink, TextCapitalizePipe],
  templateUrl: './policy-detail.html',
})
export class PolicyDetail implements OnInit {
  private readonly policyService = inject(PolicyService);
  private readonly route = inject(ActivatedRoute);
  private readonly policyStore = inject(PolicyStore);
  private readonly router = inject(Router);

  protected readonly policy = signal<Policy | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly deleteMessage = signal<string | null>(null);
  protected readonly statusBadgeClass = STATUS_BADGE_CLASS;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(id)) {
      this.error.set('Identificador de póliza no válido.');
      this.loading.set(false);
      return;
    }

    this.policyService.getPolicyById(id).subscribe({
      next: (policy) => {
        this.policy.set(policy);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la póliza.');
        this.loading.set(false);
      },
    });
  }

  // Simular eliminación de datos, peticion DELETE a la API
  protected deletePolicy(id: number): void {
	  this.policyStore.removePolicy(id);
    this.deleteMessage.set('Póliza eliminada correctamente.');

    setTimeout(() => {
      this.deleteMessage.set(null);
      this.router.navigate(['/']);
    }, 1500);
	}
}
