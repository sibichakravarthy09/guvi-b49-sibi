import { Button, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import CheckTable from './components/CheckTable';
import { AddIcon } from '@chakra-ui/icons';
import Add from './add';

const Index = () => {
  const columns = [
    {
      Header: "#",
      accessor: "_id",
      isSortable: false,
      width: 10,
    },
    { Header: 'Sender', accessor: 'senderName' },
    { Header: 'Recipient', accessor: 'createByName' },
    { Header: 'Related To' },
    { Header: 'Timestamp', accessor: 'timestamp' },
    { Header: 'Created' },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = "lg";

  return (
    <div>
      <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={1}>
        <GridItem colStart={6} textAlign="right">
          <Button onClick={onOpen} leftIcon={<AddIcon />} variant="brand">
            Add
          </Button>
        </GridItem>
      </Grid>
      <CheckTable isOpen={isOpen} columnsData={columns} />
      {/* Add Form */}
      <Add isOpen={isOpen} size={size} onClose={onClose} />
    </div>
  );
};

export default Index;
