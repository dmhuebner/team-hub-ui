import HealthCheckHeaders from './health-check-headers.interface';
import { HealthCheckMethod } from './health-check-method.type';

export default interface HealthCheck {
    name?: string;
    path: string;
    method: HealthCheckMethod;
    requestBody?: any;
    successStatuses: number[];
    headers?: HealthCheckHeaders;
}
