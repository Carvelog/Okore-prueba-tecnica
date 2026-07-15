import { Pipe, PipeTransform } from '@angular/core';

import { Policy, PolicyStatus } from '../models/policy';

@Pipe({
  name: 'filterByStatus',
})
export class FilterByStatusPipe implements PipeTransform {
  transform(policies: Policy[] | null, status: PolicyStatus | '' | null): Policy[] {
    if (!policies) {
      return [];
    }

    if (!status) {
      return policies;
    }

    return policies.filter((policy) => policy.status === status);
  }
}
