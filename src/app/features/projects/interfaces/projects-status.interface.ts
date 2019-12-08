import HealthCheckStatus from './healthcheck-status.interface';
import ProjectsStatusOverview from './projects-status-overview.interface';

export default interface ProjectsStatus {
    status: HealthCheckStatus;
    dependencies?: ProjectsStatusOverview;
}
