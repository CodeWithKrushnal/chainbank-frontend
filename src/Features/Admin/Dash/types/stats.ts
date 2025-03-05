export interface Stats {
    stat: { count: number }[];
}

export interface CountStat{
    stat: number | string | null;
}

export interface EndpointUsage {
    count: number;
    endpoint: string;
}

export interface APIStats {
    stat: EndpointUsage[];
}

export interface TransactionType {
    count: number;
    transaction_type: string;
}

export interface TransactionStats {
    stat: TransactionType[];
}

export interface CountStat {
    count: number;
    date: string;
}

export interface DAUGStats {
    stat: CountStat[];
}