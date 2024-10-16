import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, FormLabel, Grid, GridItem, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import ContactModel from 'components/commonTableModel/ContactModel';
import LeadModel from 'components/commonTableModel/LeadModel';
import Spinner from 'components/spinner/Spinner';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { LiaMousePointerSolid } from 'react-icons/lia';
import { phoneCallSchema } from 'schema';
import { getApi, postApi } from 'services/api';

const AddPhoneCall = (props) => {
    const { onClose, isOpen, fetchData } = props;
    const [isLoding, setIsLoding] = useState(false);
    const [assignmentToData, setAssignmentToData] = useState([]);
    const [contactModelOpen, setContactModel] = useState(false);
    const [leadModelOpen, setLeadModel] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const initialValues = {
        sender: user?._id,
        recipient: '',
        callDuration: '',
        callNotes: '',
        createBy: '',
        createByLead: '',
        startDate: new Date().toISOString().slice(0, 16),
        endDate: '',
        category: 'contact',
        assignmentTo: '',
        assignmentToLead: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: phoneCallSchema,
        onSubmit: async (values, { resetForm }) => {
            await AddData(values);
            resetForm();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue } = formik;

    // Function to add data
    const AddData = async (values) => {
        try {
            setIsLoding(true);
            const response = await postApi('api/phoneCall/add', values);
            if (response.status === 200) {
                props.onClose();
                fetchData();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoding(false);
        }
    };

    // Fetch assignment data based on category
    useEffect(() => {
        const fetchAssignmentData = async () => {
            try {
                let result;
                if (values.category === "contact") {
                    result = await getApi(user.role === 'admin' ? 'api/contact/' : `api/contact/?createBy=${user._id}`);
                } else if (values.category === "lead") {
                    result = await getApi(user.role === 'admin' ? 'api/lead/' : `api/lead/?createBy=${user._id}`);
                }
                setAssignmentToData(result?.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchAssignmentData();
    }, [values.category, user._id, user.role]);

    // Fetch recipient data based on selection
    const fetchRecipientData = async () => {
        try {
            if (values.createBy) {
                const response = await getApi(`api/contact/view/${values.createBy}`);
                if (response?.status === 200) {
                    setFieldValue('recipient', response?.data?.contact?.phoneNumber);
                }
            } else if (values.createByLead) {
                const response = await getApi(`api/lead/view/${values.createByLead}`);
                if (response?.status === 200) {
                    setFieldValue('recipient', response?.data?.lead?.leadPhoneNumber);
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchRecipientData();
    }, [values.createBy, values.createByLead]);

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Call</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Contact Model */}
                    <ContactModel isOpen={contactModelOpen} onClose={setContactModel} fieldName="createBy" setFieldValue={setFieldValue} />
                    {/* Lead Model */}
                    <LeadModel isOpen={leadModelOpen} onClose={setLeadModel} fieldName="createByLead" setFieldValue={setFieldValue} />

                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                        {/* Radio group for Category */}
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">Related</FormLabel>
                            <RadioGroup onChange={(e) => { setFieldValue('category', e); setFieldValue('createBy', ''); setFieldValue('createByLead', ''); }} value={values.category}>
                                <Stack direction="row">
                                    <Radio value="contact">Contact</Radio>
                                    <Radio value="lead">Lead</Radio>
                                </Stack>
                            </RadioGroup>
                            {errors.category && touched.category && <Text color="red">{errors.category}</Text>}
                        </GridItem>

                        {/* Recipient Contact/Lead Selector */}
                        <GridItem colSpan={12}>
                            {values.category === "contact" ? (
                                <GridItem colSpan={12}>
                                    <FormLabel fontSize="sm" fontWeight="500" mb="8px">Recipient (Contact)</FormLabel>
                                    <Flex justifyContent="space-between">
                                        <Select
                                            value={values.createBy}
                                            name="createBy"
                                            onChange={handleChange}
                                            fontWeight="500"
                                            placeholder="Assignment To"
                                            borderColor={errors.createBy && touched.createBy ? "red.300" : null}
                                        >
                                            {assignmentToData.map((item) => (
                                                <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                                            ))}
                                        </Select>
                                        <IconButton onClick={() => setContactModel(true)} ml={2} icon={<LiaMousePointerSolid />} />
                                    </Flex>
                                    {errors.createBy && touched.createBy && <Text color="red">{errors.createBy}</Text>}
                                </GridItem>
                            ) : values.category === "lead" && (
                                <GridItem colSpan={12}>
                                    <FormLabel fontSize="sm" fontWeight="500" mb="8px">Recipient (Lead)</FormLabel>
                                    <Flex justifyContent="space-between">
                                        <Select
                                            value={values.createByLead}
                                            name="createByLead"
                                            onChange={handleChange}
                                            fontWeight="500"
                                            placeholder="Assignment To"
                                            borderColor={errors.createByLead && touched.createByLead ? "red.300" : null}
                                        >
                                            {assignmentToData.map((item) => (
                                                <option value={item._id} key={item._id}>{item.leadName}</option>
                                            ))}
                                        </Select>
                                        <IconButton onClick={() => setLeadModel(true)} ml={2} icon={<LiaMousePointerSolid />} />
                                    </Flex>
                                    {errors.createByLead && touched.createByLead && <Text color="red">{errors.createByLead}</Text>}
                                </GridItem>
                            )}
                        </GridItem>

                        {/* Disabled Recipient Field */}
                        <GridItem colSpan={12}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">Recipient</FormLabel>
                            <Input
                                fontSize="sm"
                                value={values.recipient}
                                name="recipient"
                                placeholder="Recipient"
                                fontWeight="500"
                                disabled
                                borderColor={errors.recipient && touched.recipient ? "red.300" : null}
                            />
                        </GridItem>

                        {/* Start and End Date */}
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">Start Date</FormLabel>
                            <Input
                                type="datetime-local"
                                name="startDate"
                                value={values.startDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fontSize="sm"
                                fontWeight="500"
                                borderColor={errors.startDate && touched.startDate ? "red.300" : null}
                            />
                            {errors.startDate && touched.startDate && <Text color="red">{errors.startDate}</Text>}
                        </GridItem>
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">End Date</FormLabel>
                            <Input
                                type="datetime-local"
                                name="endDate"
                                value={values.endDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fontSize="sm"
                                fontWeight="500"
                                borderColor={errors.endDate && touched.endDate ? "red.300" : null}
                            />
                            {errors.endDate && touched.endDate && <Text color="red">{errors.endDate}</Text>}
                        </GridItem>

                        {/* Call Duration and Notes */}
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">Call Duration</FormLabel>
                            <Input
                                name="callDuration"
                                value={values.callDuration}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fontSize="sm"
                                fontWeight="500"
                                borderColor={errors.callDuration && touched.callDuration ? "red.300" : null}
                            />
                            {errors.callDuration && touched.callDuration && <Text color="red">{errors.callDuration}</Text>}
                        </GridItem>
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel fontSize="sm" fontWeight="500" mb="8px">Call Notes</FormLabel>
                            <Textarea
                                name="callNotes"
                                value={values.callNotes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fontSize="sm"
                                fontWeight="500"
                                borderColor={errors.callNotes && touched.callNotes ? "red.300" : null}
                            />
                            {errors.callNotes && touched.callNotes && <Text color="red">{errors.callNotes}</Text>}
                        </GridItem>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={isLoding} loadingText="Submitting">
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddPhoneCall;
