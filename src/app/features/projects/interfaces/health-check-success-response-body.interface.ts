export default interface HealthCheckSuccessResponseBody {
    type: 'string' | 'json'; // response body type
    responseBodyEquals?: string; // content that the response body must equal
    responseBodyContains?: string[]; // content that the response body must contain
}
