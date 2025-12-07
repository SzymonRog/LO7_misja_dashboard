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

}

export type TimePeriod = "week" | "month" | "year"
