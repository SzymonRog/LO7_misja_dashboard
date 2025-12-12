export interface DashboardStat {
  label: string
  value: string
  description: string
  intent: "positive" | "negative" | "neutral"
  icon: string
  tag?: string
  direction?: "up" | "down"
}

export interface ChartDataPoint {
    date: string;

    illegalProfit: number;
    bribes: number;
    tenderOverpay: number;
    note?: string;
}

export interface ChartData {
  week: ChartDataPoint[]
  month: ChartDataPoint[]
  year: ChartDataPoint[]
}

export interface RebelRanking {
  id: number
  name: string
  handle: string
  streak: string
  points: number
  avatar: string
  featured?: boolean
  subtitle?: string
}

export interface SecurityStatus {
  title: string
  value: string
  status: string
  variant: "success" | "warning" | "destructive"
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  priority: "low" | "medium" | "high"
}

export interface WidgetData {
  location: string
  timezone: string
  temperature: string
  weather: string
  date: string
}

export interface CorruptionTarget {
  id: number
  name: string
  category: string
  threat: "NISKA" | "ŚREDNIA" | "WYSOKA" | "KRYTYCZNA"
  priority: number
  status: string
  details: string
}

interface EmailItem {
    id: string
    subject: string
    to: string
    body: string
    from: string
    date: string
    title: string
    encrypted: boolean
}

export interface TransactionItem {
    table_id: number;
    id: number;
    project_id: number;
    transaction_date: string;
    amount_zl: number;
    transaction_type: string;
    recipient_account: string;
    recipient_name: string;
    description: string;
}
export interface EmployeeItem {
    table_id: number;
    employee_id: number;
    first_name: string;
    last_name: string;
    position: string;
    department: string;
    monthly_salary_zl: number;
    hire_date: string;
    project_assignment: string;
}
export interface ContractItem {
    table_id: number;
    contract_id: number;
    contractor_name: string;
    contract_value_zl: number;
    contract_date: string;
    service_description: string;
    payment_completed_zl: number;
}




export interface GrantItem {
    table_id: number;
    id: number;
    project_name: string;
    contractor: string;
    signed_by: string;
    value: number;
    signed_date: string;
    duration_years: number;
    status: string;
}

export interface CompanyItem {
    table_id: number;
    id: number;
    name: string;
    bip_rating: number;
    local_rating: number;
    reviews_count: number;
    tenders_won: number;
    total_value: number;
    status: string;
}

export interface TenderItem {
    table_id: number;
    id: number;
    name: string;
    winner: string;
    lowest_bid: number;
    winning_bid: number;
    date: string;
    status: string;
}



export interface MockData {
    dashboardStats: DashboardStat[]
    chartData: ChartData
    targetsList: CorruptionTarget[]
    securityStatus: SecurityStatus[]
    notifications: Notification[]
    widgetData: WidgetData
    emails: EmailItem[]
    tenders: TenderItem[]
    grants: GrantItem[]
    companies: CompanyItem[]
    corptech_transactions: TransactionItem[]
    employees: EmployeeItem[]
    contracts: ContractItem[]

}

export type TimePeriod = "week" | "month" | "year"
