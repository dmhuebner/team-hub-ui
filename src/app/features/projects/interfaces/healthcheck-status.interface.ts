export default interface HealthCheckStatus {
    responseBody: any;
    status: number;
    path: string;
    method: 'GET' | 'POST' | 'PUT';
    timestamp: string;
    up: boolean;
    projectName: string;
    warning: boolean;
    healthCheckName?: string;
    successStatuses: number[];
}
