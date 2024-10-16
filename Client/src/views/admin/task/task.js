import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getApi } from 'services/api';
import CheckTable from './components/CheckTable';
import AddTask from './components/addTask';

const Task = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const columns = [
        { Header: "#", accessor: "_id", isSortable: false, width: 5 },
        { Header: 'Title', accessor: 'title' },
        { Header: "Related", accessor: "category" },
        { Header: "Assignment To", accessor: "assignmentToName" },
        { Header: "Start Date", accessor: "start" },
        { Header: "End Date", accessor: "end" },
    ];

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
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

        // Cleanup function, if needed
        return () => {
            // If you have any subscriptions or side-effects that need cleanup, handle them here
            console.log("Cleanup logic here (if any)");
        };
    }, []);

    return (
        <div>
            <Flex alignItems={'center'} justifyContent={"flex-end"} flexWrap={'wrap'} mb={3}>
                <Button onClick={onOpen} leftIcon={<AddIcon />} variant="brand">Create Task</Button>
            </Flex>

            {isLoading ? (
                <Flex alignItems="center" justifyContent="center" height="200px">
                    <Spinner size="xl" />
                </Flex>
            ) : error ? (
                <Flex alignItems="center" justifyContent="center" height="200px">
                    <Text color="red.500">{error}</Text>
                </Flex>
            ) : (
                <CheckTable columnsData={columns} fetchData={fetchData} data={data} isLoading={isLoading} className='table-fix-container' />
            )}

            <AddTask isOpen={isOpen} fetchData={fetchData} onClose={onClose} />
        </div>
    );
};

export default Task;
