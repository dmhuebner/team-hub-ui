import JsonContainsMap from './json-contains-map.interface';

export default interface HealthCheckSuccessResponseBody {
    type: 'string' | 'json'; // response body type
    responseBodyEquals?: string; // content that the response body must equal
    responseBodyContains?: JsonContainsMap | string[]; // content that the response body must contain
}
