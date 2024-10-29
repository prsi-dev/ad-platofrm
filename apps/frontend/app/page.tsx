import Dashboard from './components/dashboard';

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:4000/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default async function Page() {
  const items = await fetchItems();
  console.log(items);

  return (
    <div>
      <h1>Welcome!</h1>

      <Dashboard />
    </div>
  );
}
