import { useEffect, useState } from 'react';

interface Entertainer {
  entertainerID: number;
  entStageName: string;
  lastBooking: string;
  bookingCount: number;
}

const EntertainerList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/entertainers`)
      .then((res) => res.json())
      .then((data) => setEntertainers(data))
      .catch((err) => console.error('Error fetching entertainers:', err));
  }, []);

  return (
    <div>
      <h2>Entertainers</h2>
      <ul>
        {entertainers.map((ent) => (
          <li key={ent.entertainerID}>
            <strong>{ent.entStageName}</strong> — Last Booking:{' '}
            {ent.lastBooking ?? 'N/A'} ({ent.bookingCount} bookings)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntertainerList;
