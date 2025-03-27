/**
 * CrewDetail.jsx
 * Individual team member profile page component.
 * Displays detailed information about a specific team member based on URL parameter.
 * 
 * Features:
 * - Dynamic routing with ID parameter
 * - Detailed member information display
 * - Error handling for invalid member IDs
 * - Email contact link integration
 * - Responsive image handling
 */

import React from "react";
import { useParams } from "react-router-dom";
import teamMembers from '../data/teamMembers';
import deKuala from '../data/deKuala.jpeg';

const CrewDetail = () => {
  // Get member ID from URL parameters
  const { id } = useParams();
  
  // Find corresponding team member data
  const member = teamMembers[parseInt(id)];

  /**
   * Error state handling
   * Returns error message if member is not found
   */
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-500">Member not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Member Profile Card */}
      <div className="section-card text-center hover:shadow-lg transition-shadow">
        {/* Member Image
            Conditionally renders deKuala image for specific member
            Uses placeholder for others */}
        <img
          src={parseInt(id) === 4 ? deKuala : "/api/placeholder/150/150"} 
          alt={member.name}
          className="w-40 h-40 mx-auto rounded-full mb-4"
        />

        {/* Member Information */}
        <h1 className="text-3xl font-bold">{member.name}</h1>
        <p className="text-lg text-gray-500">{member.role}</p>
        
        {/* Member Bio */}
        <p className="mt-4">{member.bio}</p>
        
        {/* Contact Information */}
        <p className="mt-2 text-blue-500">
          <a 
            href={`mailto:${member.contact}`}
            aria-label={`Send email to ${member.name}`}
          >
            {member.contact}
          </a>
        </p>
      </div>
    </div>
  );
};

export default CrewDetail;