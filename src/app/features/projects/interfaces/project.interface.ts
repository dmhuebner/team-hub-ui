import HealthCheck from './health-check.interface';

export default interface Project {
    name: string; // Name of the project
    description: string; // Short description of the project
    uiPath?: string; // Path to the ui of the project
    repoPath?: string; // Path to the project's code repository
    docsPath?: string; // Path to the project's documentation
    logsPath?: string; // Path to the project's logs
    deploymentPath?: string; // Path to the project's deployment
    debugTips?: string; // Any debugging tips for this project (you can use \n to make new lines)
    healthChecks: HealthCheck[];
    dependencies: Project[];
}
