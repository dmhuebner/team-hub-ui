import TeamMember from './team-member.interface';
import Project from './project.interface';

export default interface Team {
    name: string;
    description: string;
    members: TeamMember[];
    projects: Project[];
    checkProjectsEvery: number;
}
