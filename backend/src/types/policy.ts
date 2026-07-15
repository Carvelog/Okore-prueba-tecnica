export type PolicyType = 'health' | 'auto' | 'home'
export type PolicyStatus = 'active' | 'pending' | 'expired'

export interface Policy {
  id: number
  holder: string
  type: PolicyType
  status: PolicyStatus
  premium: number
}
