import { Component, model } from '@angular/core';

import { PolicyStatus } from '../../models/policy';

type StatusFilterValue = PolicyStatus | '';

interface StatusOption {
  value: StatusFilterValue;
  label: string;
}

@Component({
  selector: 'app-policy-status-filter',
  imports: [],
  templateUrl: './policy-status-filter.html',
})
export class PolicyStatusFilter {
  readonly selectedStatus = model<StatusFilterValue>('');

  protected readonly statusOptions: StatusOption[] = [
    { value: '', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
  ];

  protected onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as StatusFilterValue;
    this.selectedStatus.set(value);
  }
}
