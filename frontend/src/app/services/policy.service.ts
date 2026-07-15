import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PoliciesResponse, Policy } from '../models/policy';

const API_BASE_URL = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private readonly http = inject(HttpClient);

  getPolicies(): Observable<PoliciesResponse> {
    return this.http.get<PoliciesResponse>(`${API_BASE_URL}/policies`);
  }

  getPolicyById(id: number): Observable<Policy> {
    return this.http.get<Policy>(`${API_BASE_URL}/policy/${id}`);
  }
}
