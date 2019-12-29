import HealthCheckSuccessCriteria from './health-check-success-criteria.interface';

export default interface HealthCheckStatus {
    responseBody: any; // Response body from the health check call
    status: number; // Status Code of the health check call
    path: string; // The path/url that was used for the health check call
    method: 'GET' | 'POST' | 'PUT'; // The http method that was used for the health check call
    timestamp: string; // A timestamp of when the health check call was made
    up: boolean; // Whether the health check was considered successful based on the successCriteria
    projectName: string; // The name of the project for which the health check was made
    warning: boolean; // Whether there is a warning about the health check
    invalidResponseBody: boolean; // Whether the response body is invalid based on the successCriteria
    healthCheckName?: string; // A nickname for the health check call
    successCriteria: HealthCheckSuccessCriteria;
}
