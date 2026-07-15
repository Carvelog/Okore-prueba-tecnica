import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { PolicyStore } from '../../store/policy.store';
import { PolicyStatusFilter } from '../../components/policy-status-filter/policy-status-filter';
import { PolicyStatus } from '../../models/policy';
import { FilterByStatusPipe } from '../../pipes/filter-by-status.pipe';
import { TextCapitalizePipe } from '../../pipes/text-capitalize.pipe';
import { STATUS_BORDER_CLASS } from '../../utils/policy-status-styles';

@Component({
  selector: 'app-policies-list',
  imports: [NgClass, PolicyStatusFilter, FilterByStatusPipe, TextCapitalizePipe],
  templateUrl: './policies-list.html',
})
export class PoliciesList implements OnInit {
	private readonly policyStore = inject(PolicyStore);
	private readonly router = inject(Router);
  
	protected readonly policies = this.policyStore.policies;
	protected readonly loading = this.policyStore.loading;
	protected readonly error = this.policyStore.error;
	protected readonly selectedStatus = signal<PolicyStatus | ''>('');
	protected readonly statusBorderClass = STATUS_BORDER_CLASS;
  
	ngOnInit(): void {
	  this.policyStore.loadPolicies(); // solo carga si no están en memoria
	}
  
	protected navigateToPolicy(id: number): void {
	  this.router.navigate(['/policy', id]);
	}
  }
