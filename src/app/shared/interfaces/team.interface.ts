import TeamMember from './team-member.interface';
import Project from './projects.interface';

export default interface Team {
    name: string;
    description: string;
    members: TeamMember[];
    projects: Project[];
}
