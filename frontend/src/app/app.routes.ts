import { Routes } from '@angular/router';

import { PoliciesList } from './pages/policies-list/policies-list';
import { PolicyDetail } from './pages/policy-detail/policy-detail';

export const routes: Routes = [
  { path: '', component: PoliciesList },
  { path: 'policy/:id', component: PolicyDetail },
];
