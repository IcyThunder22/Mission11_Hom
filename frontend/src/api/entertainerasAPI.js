const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5233';

export const getEntertainers = async () => {
  const res = await fetch(`${BASE_URL}/api/entertainers`);
  return res.json();
};
