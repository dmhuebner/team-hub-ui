import HealthCheckStatus from './healthcheck-status.interface';
import ProjectsStatusOverview from './projects-status-overview.interface';

export default interface ProjectStatus {
    statuses: HealthCheckStatus[];
    dependencies?: ProjectsStatusOverview;
    warning: boolean;
    up: boolean;
}
