export interface RequestLog {
    RequestID: string;
    UserID: string;
    Endpoint: string;
    HTTPMethod: string;
    RequestPayload: any;
    ResponseStatus: number;
    ResponseTimeMs: number;
    IPAddress: string;
    CreatedAt: string;
}
