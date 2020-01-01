import HealthCheckHeaders from '../../features/projects/interfaces/health-check-headers.interface';

export default interface LoginForToken {
    tokenType: 'Bearer';
    path: string;
    method: 'GET' | 'POST' | 'PUT';
    requestBody?: any;
    headers?: HealthCheckHeaders;
    tokenLocationInResponse: string; // Set to a string of property names (separated by "." if nested)
                                    // that represent the location of the token in the response body.
                                    // Set to null if whole response body is the token
}
