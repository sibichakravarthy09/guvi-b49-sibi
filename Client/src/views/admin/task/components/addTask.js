import { CloseIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Flex, FormLabel, Grid, GridItem, IconButton, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import ContactModel from "components/commonTableModel/ContactModel";
import LeadModel from "components/commonTableModel/LeadModel";
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { LiaMousePointerSolid } from 'react-icons/lia';
import { TaskSchema } from 'schema';
import { getApi, postApi } from 'services/api';

const AddTask = ({ onClose, isOpen, fetchData, from, id, date }) => {
    const [isChecked, setIsChecked] = useState(true);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const [assignmentToData, setAssignmentToData] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const [contactModelOpen, setContactModel] = useState(false);
    const [leadModelOpen, setLeadModel] = useState(false);

    const initialValues = {
        title: '',
        category: from === 'contact' ? 'contact' : from === 'lead' ? 'lead' : 'None',
        description: '',
        notes: '',
        assignmentTo: from === 'contact' && id ? id : '',
        assignmentToLead: from === 'lead' && id ? id : '',
        reminder: '',
        start: date,
        end: '',
        backgroundColor: '',
        borderColor: '#ffffff',
        textColor: '',
        display: '',
        url: '',
        createBy: userId,
    };

    const formik = useFormik({
        initialValues,
        validationSchema: TaskSchema,
        onSubmit: async (values, { resetForm }) => {
            await addData(values);
            resetForm();
            onClose();
            fetchData();
        },
    });

    const { errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = formik;

    const addData = async (values) => {
        setIsLoading(true);
        try {
            const response = await postApi('api/task/add', values);
            if (response.status === 200) {
                // No need to reset form here as it's handled in onSubmit
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAssignmentData = async () => {
            try {
                let result;
                if (formik.values.category === "contact") {
                    result = await getApi(user.role === 'admin' ? 'api/contact/' : `api/contact/?createBy=${user._id}`);
                } else if (formik.values.category === "lead") {
                    result = await getApi(user.role === 'admin' ? 'api/lead/' : `api/lead/?createBy=${user._id}`);
                }
                setAssignmentToData(result?.data || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAssignmentData();
    }, [formik.values.category]);

    return (
        <Modal isOpen={isOpen} size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader display='flex' justifyContent='space-between'>
                    Create Task
                    <IconButton onClick={onClose} icon={<CloseIcon />} />
                </ModalHeader>
                <ModalBody>
                    <ContactModel isOpen={contactModelOpen} onClose={() => setContactModel(false)} fieldName='assignmentTo' setFieldValue={setFieldValue} />
                    <LeadModel isOpen={leadModelOpen} onClose={() => setLeadModel(false)} fieldName='assignmentToLead' setFieldValue={setFieldValue} />

                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Title<Text color="red">*</Text>
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                name="title"
                                placeholder='Title'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.title}
                                borderColor={errors.title && touched.title ? "red.300" : undefined}
                            />
                            <Text mb='10px' color='red'>{errors.title && touched.title && errors.title}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>Related</FormLabel>
                            <RadioGroup onChange={(e) => {
                                setFieldValue('category', e);
                                setFieldValue('assignmentTo', null);
                                setFieldValue('assignmentToLead', null);
                            }} value={formik.values.category}>
                                <Stack direction='row'>
                                    <Radio value='None'>None</Radio>
                                    <Radio value='contact'>Contact</Radio>
                                    <Radio value='lead'>Lead</Radio>
                                </Stack>
                            </RadioGroup>
                            <Text mb='10px' color='red'>{errors.category && touched.category && errors.category}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12, md: formik.values.category === "None" ? 12 : 6 }}>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>Description</FormLabel>
                            <Input
                                fontSize='sm'
                                name="description"
                                placeholder='Description'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.description}
                                borderColor={errors.description && touched.description ? "red.300" : undefined}
                            />
                            <Text mb='10px' color='red'>{errors.description && touched.description && errors.description}</Text>
                        </GridItem>

                        {formik.values.category === "contact" && (
                            <GridItem colSpan={{ base: 12, md: 6 }}>
                                <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>Assignment To Contact</FormLabel>
                                <Flex justifyContent='space-between'>
                                    <Select
                                        name="assignmentTo"
                                        onChange={handleChange}
                                        placeholder='Assignment To'
                                        borderColor={errors.assignmentTo && touched.assignmentTo ? "red.300" : undefined}
                                    >
                                        {assignmentToData.map(item => (
                                            <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                                        ))}
                                    </Select>
                                    <IconButton onClick={() => setContactModel(true)} ml={2} fontSize='25px' icon={<LiaMousePointerSolid />} />
                                </Flex>
                                <Text mb='10px' color='red'>{errors.assignmentTo && touched.assignmentTo && errors.assignmentTo}</Text>
                            </GridItem>
                        )}

                        {formik.values.category === "lead" && (
                            <GridItem colSpan={{ base: 12, md: 6 }}>
                                <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>Assignment To Lead</FormLabel>
                                <Flex justifyContent='space-between'>
                                    <Select
                                        name="assignmentToLead"
                                        onChange={handleChange}
                                        placeholder='Assignment To'
                                        borderColor={errors.assignmentToLead && touched.assignmentToLead ? "red.300" : undefined}
                                    >
                                        {assignmentToData.map(item => (
                                            <option value={item._id} key={item._id}>{item.leadName}</option>
                                        ))}
                                    </Select>
                                    <IconButton onClick={() => setLeadModel(true)} ml={2} fontSize='25px' icon={<LiaMousePointerSolid />} />
                                </Flex>
                                <Text mb='10px' color='red'>{errors.assignmentToLead && touched.assignmentToLead && errors.assignmentToLead}</Text>
                            </GridItem>
                        )}

                        <GridItem colSpan={{ base: 12 }}>
                            <Checkbox isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>All Day Task?</Checkbox>
                        </GridItem>

                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>Start Date</FormLabel>
                            <Input
                                type={isChecked ? 'date' : 'datetime-local'}
                                name="start"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.start}
                                borderColor={errors.start && touched.start ? "red.300" : undefined}
                            />
                            <Text mb='10px' color='red'>{errors.start && touched.start && errors.start}</Text>
                        </GridItem>

                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel ms='4px' fontSize='sm' fontWeight='500' mb='8px'>End Date</FormLabel>
                            <Input
                                type={isChecked ? 'date' : 'datetime-local'}
                                name="end"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formik.values.end}
                                borderColor={errors.end && touched.end ? "red.300" : undefined}
                            />
                            <Text mb='10px' color='red'>{errors.end && touched.end && errors.end}</Text>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit} isLoading={isLoading}>
                        Save
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTask;
