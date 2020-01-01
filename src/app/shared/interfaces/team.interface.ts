import TeamMember from './team-member.interface';
import Project from '../../features/projects/interfaces/project.interface';
import Resource from './resource.interface';
import LoginForToken from './login-for-token.interface';

export default interface Team {
    name: string;
    description: string;
    resources?: Resource[];
    members: TeamMember[];
    projects: Project[]; // Team projects configs for monitoring health checks
    loginForToken?: LoginForToken; // An otional config object to make a call to get a token to use with other specified health checks
    checkProjectsEvery: number; // Number of milliseconds for the interval at which to check every project status
}
