import HealthCheckSuccessResponseBody from './health-check-success-response-body.interface';

export default interface HealthCheckSuccessCriteria {
    successStatuses: number[]; // A list of success statuses for the health check call
    successResponseBody?: HealthCheckSuccessResponseBody;
}
