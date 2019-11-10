import ProjectStatus from './project-status.interface';

export default interface StatusOverview {
    up: boolean;
    upPercent: number;
    timeSinceLastDown: Date;
    projectStatuses: ProjectStatus[];
}
