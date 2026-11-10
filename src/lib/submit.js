import { base44 } from '@/api/base44Client';

export async function submitInquiry(payload) {
  return base44.entities.Inquiry.create({ ...payload, status: 'new' });
}

export async function submitCustomDoorRequest(payload) {
  return base44.entities.CustomDoorRequest.create({ ...payload, status: 'new' });
}