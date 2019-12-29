import HealthCheckHeaders from './health-check-headers.interface';
import { HealthCheckMethod } from './health-check-method.type';
import HealthCheckSuccessCriteria from './health-check-success-criteria.interface';

export default interface HealthCheck {
    name?: string; // Nickname for this health check
    path: string; // The path/url for this health check
    method: HealthCheckMethod; // The http method to use for this health check
    requestBody?: any; // A stringified request body for this health check if there is one
    successCriteria: HealthCheckSuccessCriteria; // The success criteria for this health check
                                                // Under what conditions should the project be considered up?
    headers?: HealthCheckHeaders; // Any request headers for this health check
}
