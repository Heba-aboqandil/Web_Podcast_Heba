/**
 * About.jsx
 * Company and team information page component.
 * Displays company overview and team member grid with navigation to detailed profiles.
 * 
 * Features:
 * - Company overview section
 * - Dynamic team member grid
 * - Navigation to individual team member profiles
 * - Responsive layout for different screen sizes
 */

import React from "react";
import { Link } from "react-router-dom";
import teamMembers from '../data/teamMembers';
import deKuala from '../data/deKuala.jpeg';

const About = () => {
  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Company Overview Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        About SoundScribe
      </h1>
      <div className="max-w-2xl mx-auto text-lg">
        <p className="mb-6">
          SoundScribe is your go-to solution for converting audio to text. Our
          platform uses state-of-the-art technology to provide accurate
          transcriptions quickly and efficiently.
        </p>
      </div>

      {/* Team Members Section */}
      <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
      
      {/* Team Member Grid
          - Responsive grid layout: 1 column on mobile, 2 on tablet, 3 on desktop
          - Each card links to detailed member view
       */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Link 
            to={`/crew/${index}`} 
            key={index}
            aria-label={`View ${member.name}'s profile`}
          >
            <div className="section-card text-center hover:shadow-lg transition-shadow">
              {/* Member Image 
                  - Uses deKuala image for index 4
                  - Placeholder for other team members
              */}
              <img
                src={index === 4 ? deKuala : "/api/placeholder/150/150"}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              {/* Member Details */}
              <h3 className="text-xl font-bold hover:text-blue-500">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default About;