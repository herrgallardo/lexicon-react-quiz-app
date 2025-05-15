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

        // Map Firestore-dokument till användbar data
        const scores = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            timestamp: data.createdAt?.toDate?.(), // Konvertera Firestore Timestamp till JS Date
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

  // Hjälpfunktion för att extrahera användarnamnet
  const getUsername = (displayName, email) => {
    if (displayName) {
      return displayName;
    }
    return email ? email.split('@')[0] : '';
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
              <strong>{getUsername(entry.displayName, entry.email)}</strong> - {entry.score} pts
              {entry.timestamp && (
                <div className="score-timestamp">
                  {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
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
