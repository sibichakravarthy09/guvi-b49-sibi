import { useEffect, useState } from "react";
import { getApi } from "services/api";
import Calendar from './components/calender'; // Ensure correct casing in component names

const Index = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
        try {
            const result = await getApi(user.role === 'admin' ? 'api/task/' : `api/task/?createBy=${user._id}`);
            setData(result.data);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Replace with a spinner or loading component
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>; // Display error message
    }

    return (
        <Calendar fetchData={fetchData} data={data} />
    );
};

export default Index;
