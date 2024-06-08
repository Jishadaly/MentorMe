 export const fetchLocations = async (setLocations,setLoading) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setLocations(data.map((country) => country.name.common));
    setLoading(false);
  } catch (error) {
    console.error('Error fetching locations:', error);
    setLoading(false);
  }
};