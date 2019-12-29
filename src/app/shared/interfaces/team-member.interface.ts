export default interface TeamMember {
    name: string;
    role: string; // The team member's role on the team
    email: string;
    favTech?: string[]; // A list of their favorite technologies/coding languages
}
