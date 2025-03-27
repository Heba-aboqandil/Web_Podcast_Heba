/**
 * StarRating Component
 * 
 * An interactive 5-star rating component with hover effects.
 * Provides visual feedback for both hover and selected states.
 * 
 * Features:
 * - Interactive star rating system (1-5 stars)
 * - Hover state preview
 * - Persistent rating selection
 * - Visual feedback through color changes
 * 
 * State Management:
 * - rating: The currently selected rating value (0-5)
 * - hover: The star currently being hovered over (0-5)
 */

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { auth, db } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showComponent, setShowComponent] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  // Check session storage on component mount
  useEffect(() => {
    const hasRated = sessionStorage.getItem('hasRated');
    if (hasRated) {
      setShowComponent(false);
    }
  }, []);

  const saveRatingToFirestore = async (ratingValue) => {
    try {
      const ratingData = {
        rating: ratingValue,
        timestamp: new Date(),
        userId: auth.currentUser?.uid || 'anonymous',
        userEmail: auth.currentUser?.email || 'anonymous'
      };

      const ratingsRef = doc(db, 'ratings', 'all_ratings');
      
      try {
        await getDoc(ratingsRef);
        await updateDoc(ratingsRef, {
          ratings: arrayUnion(ratingData)
        });
      } catch (error) {
        await setDoc(ratingsRef, {
          ratings: [ratingData]
        });
      }
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleRatingClick = async (star) => {
    setRating(star);
    await saveRatingToFirestore(star);
    
    // Show thank you message
    setShowThankYou(true);
    
    // Hide thank you message and component after delay
    setTimeout(() => {
      setShowThankYou(false);
      setShowComponent(false);
      // Save to session storage
      sessionStorage.setItem('hasRated', 'true');
    }, 2000);
  };

  if (!showComponent) {
    return null;
  }

  return (
    <div className="flex flex-col items-center transition-opacity duration-300">
      {showThankYou ? (
        <div className="text-center py-4 text-green-600 font-medium">
          Thank you for your feedback!
        </div>
      ) : (
        <>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(rating)}
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  size={24}
                  fill={star <= (hover || rating) ? 'gold' : 'none'}
                  color={star <= (hover || rating) ? 'gold' : 'currentColor'}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StarRating;