/**
 * Team Members Data
 * 
 * Defines the core team members data structure used throughout the application.
 * Used primarily in the About page and team member displays.
 * 
 * @fileoverview Contains an array of team member objects with their details
 * 
 * Data Structure:
 * @typedef {Object} TeamMember
 * @property {string} name - Full name of the team member
 * @property {string} role - Position/role in the team
 * @property {string} contact - Professional email address
 * @property {string} bio - Brief professional biography
 */

// Define team members array with individual member details
const teamMembers = [
  {
    name: "Shay ",
    role: "Founder & Team leader",
    contact: "shay.@e.braude.ac.il",
    bio: "Shay drives the team's vision and execution as founder, combining technical expertise with strategic leadership to guide innovative solutions and team development.",
  },
  {
    name: "Danny",
    role: "QA Lead",
    contact: "danny.@e.braude.ac.il",
    bio: "Danny leads quality assurance, implementing robust testing strategies and automation frameworks to ensure product reliability and performance excellence.",
  },
  {
    name: "Shahed ",
    role: "Head of Design",
    contact: "shahed.@e.braude.ac.il",
    bio: "Shahed crafts intuitive and visually striking designs that elevate the user experience, balancing aesthetics with functionality while leading the design team's creative direction.",
  },
  {
    name: "Hiba Abo Qandil",
    role: "Project Architect",
    contact: "hiba.abo@e.braude.ac.il",
    bio: "Hiba leads the architectural design and technical strategy, leveraging her expertise to create scalable solutions while maintaining system integrity and guiding development teams.",
  },
  {
    name: "Abed El Hamid Ammar",
    role: "Dev Ops lead",
    contact: "abed.ammar@e.braude.ac.il",
    bio: "Abed leads the infrastructure and deployment operations, ensuring seamless system reliability and scalability through automated CI/CD pipelines and cloud architecture optimization.",
  },
];

export default teamMembers;