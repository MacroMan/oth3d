export interface InsuranceCompanyEntry {
  companyName: string
  moneyOwed: number
}

export interface BankManagerForm {
  hospitalValue: number
  balance: number
  currentLoan: number
  interestPayment: number
  inflationRate: number
  interestRate: number
  insuranceEntries: InsuranceCompanyEntry[]
}

export interface BankManagerInitialValue extends Partial<
  Omit<BankManagerForm, 'insuranceEntries'>
> {
  insuranceEntries?: Partial<InsuranceCompanyEntry>[]
}

export const loanStep = 1000

export const normalizeNumber = (value: number) => (Number.isFinite(value) ? value : 0)

export const defaultBankManagerForm = (): BankManagerForm => ({
  hospitalValue: 250000,
  balance: 85000,
  currentLoan: 40000,
  interestPayment: 3500,
  inflationRate: 3.2,
  interestRate: 5.5,
  insuranceEntries: [
    { companyName: 'North Star Mutual', moneyOwed: 18000 },
    { companyName: 'Hearthline Health', moneyOwed: 9500 },
    { companyName: 'Aegis Assurance', moneyOwed: 12600 },
  ],
})

export const cloneBankManagerForm = (source: BankManagerForm): BankManagerForm => ({
  hospitalValue: source.hospitalValue,
  balance: source.balance,
  currentLoan: source.currentLoan,
  interestPayment: source.interestPayment,
  inflationRate: source.inflationRate,
  interestRate: source.interestRate,
  insuranceEntries: source.insuranceEntries.map((entry) => ({ ...entry })),
})

export const buildBankManagerForm = (initialValue?: BankManagerInitialValue): BankManagerForm => {
  const base = defaultBankManagerForm()
  const insuranceEntries =
    initialValue?.insuranceEntries?.slice(0, 3).map((entry) => ({
      companyName: entry.companyName ?? '',
      moneyOwed: entry.moneyOwed ?? 0,
    })) ?? base.insuranceEntries.map((entry) => ({ ...entry }))

  while (insuranceEntries.length < 3) {
    insuranceEntries.push({ companyName: '', moneyOwed: 0 })
  }

  return {
    hospitalValue: initialValue?.hospitalValue ?? base.hospitalValue,
    balance: initialValue?.balance ?? base.balance,
    currentLoan: initialValue?.currentLoan ?? base.currentLoan,
    interestPayment: initialValue?.interestPayment ?? base.interestPayment,
    inflationRate: initialValue?.inflationRate ?? base.inflationRate,
    interestRate: initialValue?.interestRate ?? base.interestRate,
    insuranceEntries,
  }
}

export const formatBankCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(normalizeNumber(value))
