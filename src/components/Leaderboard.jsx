// src/components/Leaderboard.jsx
// --------------------------------------------------
// Displays the top 10 quiz scores from Firestore
// Sorted in descending order by score
// Includes a formatted timestamp of when each score was saved
// --------------------------------------------------

import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import './Leaderboard.css';

const Leaderboard = () => {
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const q = query(
          collection(db, 'scores'),
          orderBy('score', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);

        // Map Firestore docs to usable data (including timestamp)
        const scores = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            timestamp: data.createdAt?.toDate?.(), // Convert Firestore Timestamp → JS Date
          };
        });

        setTopScores(scores);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScores();
  }, []);

  // Function to get display name, similar to Header component
  const getDisplayName = (entry) => {
    // If displayName exists, use it
    if (entry.displayName && entry.displayName.trim()) {
      return entry.displayName;
    }
    // If no display name but has email, extract username part
    if (entry.email) {
      return entry.email.split('@')[0];
    }
    // Fallback to 'Anonymous User'
    return 'Anonymous User';
  };

  return (
    <div className="leaderboard">
      <h2>Top 10 Scores</h2>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <ol className="leaderboard-list">
          {topScores.map((entry, index) => (
            <li key={entry.id || index}>
              <strong>{getDisplayName(entry)}</strong> — {entry.score} pts
              {entry.timestamp && (
                <div className="score-timestamp">
                  {entry.timestamp.toLocaleDateString()}{' '}
                  {entry.timestamp.toLocaleTimeString()}
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Leaderboard;
