import HealthCheck from './health-check.interface';

export default interface Project {
    name: string;
    description: string;
    uiPath?: string;
    healthChecks: HealthCheck[];
    dependencies: Project[];
}
