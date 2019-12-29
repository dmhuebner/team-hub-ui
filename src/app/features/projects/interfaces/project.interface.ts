import HealthCheck from './health-check.interface';

export default interface Project {
    name: string;
    description: string;
    uiPath?: string;
    repoPath?: string;
    docsPath?: string;
    logsPath?: string;
    deploymentPath?: string;
    debugTips?: string;
    healthChecks: HealthCheck[];
    dependencies: Project[];
}
