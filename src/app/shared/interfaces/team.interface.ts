import TeamMember from './team-member.interface';
import Project from '../../features/projects/interfaces/project.interface';
import Resource from './resource.interface';

export default interface Team {
    name: string;
    description: string;
    resources?: Resource[];
    members: TeamMember[];
    projects: Project[];
    checkProjectsEvery: number;
}
