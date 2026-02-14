export type PaymentType = 'full' | 'deposit'

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dietaryRequirements?: string
  paymentType: PaymentType
}

export interface YocoCheckoutRequest {
  amount: number
  currency: string
  successUrl?: string
  cancelUrl?: string
  failureUrl?: string
  metadata?: Record<string, string>
}

export interface YocoCheckoutResponse {
  id: string
  status: string
  amount: number
  currency: string
  redirectUrl: string
  successUrl?: string
  cancelUrl?: string
  failureUrl?: string
  metadata?: Record<string, string>
}
