export type PricingAccountType = 'FLASH' | 'INSTANT' | '1 STEP' | '2 STEP'

export interface PricingConfig {
  accountType: PricingAccountType
  accountSize: string
  basePrice: number
  discountPercent: number
  discountCode: string
  active: boolean
}

export interface CalculatedPricing extends PricingConfig {
  discountAmount: number
  finalPrice: number
}

// This is the admin-owned shape consumed by the website until an Admin OS API is connected.
export const pricingConfig: PricingConfig[] = [
  { accountType: 'FLASH', accountSize: '$1,000', basePrice: 29, discountPercent: 50, discountCode: 'WELCOME', active: true },
  { accountType: 'FLASH', accountSize: '$5,000', basePrice: 60, discountPercent: 50, discountCode: 'WELCOME', active: true },
  { accountType: 'FLASH', accountSize: '$10,000', basePrice: 95, discountPercent: 50, discountCode: 'WELCOME', active: true },
  { accountType: 'FLASH', accountSize: '$25,000', basePrice: 150, discountPercent: 50, discountCode: 'WELCOME', active: true },
  { accountType: 'INSTANT', accountSize: '$1,000', basePrice: 30, discountPercent: 45, discountCode: 'WELCOME', active: true },
  { accountType: 'INSTANT', accountSize: '$5,000', basePrice: 85, discountPercent: 45, discountCode: 'WELCOME', active: true },
  { accountType: 'INSTANT', accountSize: '$10,000', basePrice: 135, discountPercent: 45, discountCode: 'WELCOME', active: true },
  { accountType: 'INSTANT', accountSize: '$25,000', basePrice: 255, discountPercent: 45, discountCode: 'WELCOME', active: true },
  { accountType: 'INSTANT', accountSize: '$50,000', basePrice: 395, discountPercent: 45, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$1,000', basePrice: 25, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$5,000', basePrice: 85, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$10,000', basePrice: 145, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$25,000', basePrice: 295, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$50,000', basePrice: 555, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '1 STEP', accountSize: '$75,000', basePrice: 795, discountPercent: 55, discountCode: 'WELCOME', active: true },
  { accountType: '2 STEP', accountSize: '$5,000', basePrice: 65, discountPercent: 60, discountCode: 'WELCOME', active: true },
  { accountType: '2 STEP', accountSize: '$10,000', basePrice: 95, discountPercent: 60, discountCode: 'WELCOME', active: true },
  { accountType: '2 STEP', accountSize: '$25,000', basePrice: 295, discountPercent: 60, discountCode: 'WELCOME', active: true },
  { accountType: '2 STEP', accountSize: '$50,000', basePrice: 555, discountPercent: 60, discountCode: 'WELCOME', active: true },
  { accountType: '2 STEP', accountSize: '$100,000', basePrice: 795, discountPercent: 60, discountCode: 'WELCOME', active: true },
]

export function calculatePricing(config: PricingConfig): CalculatedPricing | undefined {
  if (!config.active || !Number.isFinite(config.basePrice) || !Number.isFinite(config.discountPercent)) return undefined
  if (config.basePrice < 0 || config.discountPercent < 0 || config.discountPercent > 100) return undefined

  const discountAmount = Math.round(config.basePrice * config.discountPercent) / 100
  const finalPrice = Math.round((config.basePrice - discountAmount) * 100) / 100
  return { ...config, discountAmount, finalPrice }
}

export function getPricing(accountType: PricingAccountType, accountSize: string): CalculatedPricing | undefined {
  const config = pricingConfig.find((record) => record.accountType === accountType && record.accountSize === accountSize)
  return config ? calculatePricing(config) : undefined
}

export function getActivePricing(accountType: PricingAccountType): CalculatedPricing[] {
  return pricingConfig.filter((config) => config.accountType === accountType).flatMap((config) => {
    const pricing = calculatePricing(config)
    return pricing ? [pricing] : []
  })
}
