import TeamMember from './team-member.interface';
import Project from '../../features/projects/interfaces/project.interface';

export default interface Team {
    name: string;
    description: string;
    members: TeamMember[];
    projects: Project[];
    checkProjectsEvery: number;
}
