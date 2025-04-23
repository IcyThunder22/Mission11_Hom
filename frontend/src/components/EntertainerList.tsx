import { useEffect, useState } from 'react';
import EntertainerModal from './EntertainnerModal';

interface Entertainer {
  entertainerID: number;
  entStageName: string;
  lastBooking: string;
  bookingCount: number;
}

const EntertainerList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/entertainers`;
    console.log('Fetching entertainers from:', url);
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Received entertainers:', data);
        setEntertainers(data);
      })
      .catch((err) => console.error('Error fetching entertainers:', err));
  }, []);
  

  return (
    <div className="container mt-4">
      <h2>Entertainers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Booking Count</th>
            <th>Last Booking</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entertainers.map((ent) => (
            <tr key={ent.entertainerID}>
              <td>{ent.entStageName}</td>
              <td>{ent.bookingCount}</td>
              <td>{ent.lastBooking ?? 'N/A'}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setSelectedId(ent.entertainerID)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedId !== null && (
        <EntertainerModal
          entertainerId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

export default EntertainerList;
