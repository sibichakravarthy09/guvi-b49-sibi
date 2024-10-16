import { Button, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import CheckTable from './components/CheckTable';
import { AddIcon } from '@chakra-ui/icons';
import Add from './add';

const Index = () => {
    // Define the table columns for CheckTable
    const columns = [
        { Header: "#", accessor: "_id", isSortable: false, width: 10 },
        { Header: 'Sender Name', accessor: 'senderName' },
        { Header: "Recipient", accessor: "createByName" },
        { Header: "Related To", accessor: "relatedTo" },
        { Header: "Timestamp", accessor: "timestamp" },
        { Header: "Created", accessor: "created" },
    ];

    // Manage the modal's open/close state
    const { isOpen, onOpen, onClose } = useDisclosure();
    const size = "lg"; // Size for the modal

    // Handle button click to open the modal
    const handleClick = () => {
        onOpen();
    };

    return (
        <div>
            <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={1}>
                <GridItem colStart={6} textAlign="right">
                    <Button onClick={handleClick} leftIcon={<AddIcon />} variant="brand">
                        Add
                    </Button>
                </GridItem>
            </Grid>
            {/* Display the CheckTable with defined columns */}
            <CheckTable columnsData={columns} />

            {/* Add Form Component - Modal for adding new entries */}
            <Add isOpen={isOpen} size={size} onClose={onClose} />
        </div>
    );
};

export default Index;
