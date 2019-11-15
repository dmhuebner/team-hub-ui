import HealthCheck from './health-check.interface';

export default interface Project {
    name: string;
    description: string;
    uiPath?: string;
    healthCheck: HealthCheck;
    dependencies: Project[];
}
