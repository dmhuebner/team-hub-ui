export default interface PathChecked {
    path: string;
    statusCode: number;
    responseBody: any;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
}
