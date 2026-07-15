import { PolicyStatus } from '../models/policy';

export const STATUS_BORDER_CLASS: Record<PolicyStatus, string> = {
  active: 'border-l-green-500',
  expired: 'border-l-red-500',
  pending: 'border-l-blue-500',
};

export const STATUS_BADGE_CLASS: Record<PolicyStatus, string> = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  pending: 'bg-blue-100 text-blue-800',
};
