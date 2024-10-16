import { AddIcon } from '@chakra-ui/icons'; 
import { Button, Flex, FormLabel, Grid, GridItem, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import ContactModel from "components/commonTableModel/ContactModel";
import LeadModel from "components/commonTableModel/LeadModel";
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { LiaMousePointerSolid } from 'react-icons/lia';
import { emailSchema } from 'schema';
import { getApi, postApi } from 'services/api';

const AddPhoneCall = (props) => {
    const { onClose, isOpen, fetchData } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [assignmentToData, setAssignmentToData] = useState([]);
    const [contactModelOpen, setContactModel] = useState(false);
    const [leadModelOpen, setLeadModel] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const initialValues = {
        sender: user?._id,
        recipient: '',
        subject: '',
        callNotes: '',
        createBy: '',
        createByLead: '',
        startDate: new Date(),
        endDate: '',
        category: 'contact',
        assignmentTo: '',
        assignmentToLead: '',
        message: '', // Added message to initialValues
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: emailSchema,
        onSubmit: async (values, { resetForm }) => {
            await AddData(values); // Call AddData with values
            resetForm();
        },
    });

    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue } = formik;

    const AddData = async (values) => {
        try {
            setIsLoading(true);
            let response = await postApi('api/email/add', values);
            if (response.status === 200) {
                props.onClose();
                fetchData();
            } else {
                // Handle the error response here
                console.error("Error:", response);
            }
        } catch (e) {
            console.error("API Error:", e);
            // Optionally, you can set an error message in the state to display to the user
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAssignmentData = async () => {
            values.start = props?.date;
            try {
                let result;
                if (values.category === "contact") {
                    result = await getApi(user.role === 'admin' ? 'api/contact/' : `api/contact/?createBy=${user._id}`);
                } else if (values.category === "lead") {
                    result = await getApi(user.role === 'admin' ? 'api/lead/' : `api/lead/?createBy=${user._id}`);
                }
                setAssignmentToData(result?.data);
            } catch (e) {
                console.error("Fetch Assignment Data Error:", e);
            }
        };

        fetchAssignmentData();
    }, [props, values.category]);

    const fetchRecipientData = async () => {
        if (values.createBy) {
            let response = await getApi('api/contact/view/', values.createBy);
            if (response?.status === 200) {
                setFieldValue('recipient', response?.data?.contact?.email);
                values.recipient = response?.data?.contact?.email;
            }
        } else if (values.createByLead) {
            let response = await getApi('api/lead/view/', values.createByLead);
            if (response?.status === 200) {
                setFieldValue('recipient', response?.data?.lead?.leadEmail);
                values.recipient = response?.data?.lead?.leadEmail;
            }
        }
    };

    useEffect(() => {
        fetchRecipientData();
    }, [values.createBy, values.createByLead]);

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Contact Model */}
                    <ContactModel isOpen={contactModelOpen} onClose={setContactModel} fieldName='createBy' setFieldValue={setFieldValue} />
                    {/* Lead Model */}
                    <LeadModel isOpen={leadModelOpen} onClose={setLeadModel} fieldName='createByLead' setFieldValue={setFieldValue} />

                    <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                        <GridItem colSpan={{ base: 12, md: 6 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Related
                            </FormLabel>
                            <RadioGroup onChange={(e) => { 
                                setFieldValue('category', e); 
                                setFieldValue('createBy', ''); 
                                setFieldValue('createByLead', ''); 
                            }} value={values.category}>
                                <Stack direction='row'>
                                    <Radio value='contact'>Contact</Radio>
                                    <Radio value='lead'>Lead</Radio>
                                </Stack>
                            </RadioGroup>
                            <Text mb='10px' color={'red'}>{errors.category && touched.category && errors.category}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            {values.category === "contact" ? (
                                <GridItem colSpan={{ base: 12, md: 6 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                        Recipient (Contact)
                                    </FormLabel>
                                    <Flex justifyContent={'space-between'}>
                                        <Select
                                            value={values.createBy}
                                            name="createBy"
                                            onChange={handleChange}
                                            mb={errors.createBy && touched.createBy ? undefined : '10px'}
                                            fontWeight='500'
                                            placeholder={'Assignment To'}
                                            borderColor={errors.createBy && touched.createBy ? "red.300" : null}
                                        >
                                            {assignmentToData?.map((item) => (
                                                <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                                            ))}
                                        </Select>
                                        <IconButton onClick={() => setContactModel(true)} ml={2} fontSize='25px' icon={<LiaMousePointerSolid />} />
                                    </Flex>
                                    <Text mb='10px' color={'red'}>{errors.createBy && touched.createBy && errors.createBy}</Text>
                                </GridItem>
                            ) : values.category === "lead" ? (
                                <GridItem colSpan={{ base: 12, md: 6 }}>
                                    <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                        Recipient (Lead)
                                    </FormLabel>
                                    <Flex justifyContent={'space-between'}>
                                        <Select
                                            value={values.createByLead}
                                            name="createByLead"
                                            onChange={handleChange}
                                            mb={errors.createByLead && touched.createByLead ? undefined : '10px'}
                                            fontWeight='500'
                                            placeholder={'Assignment To'}
                                            borderColor={errors.createByLead && touched.createByLead ? "red.300" : null}
                                        >
                                            {assignmentToData?.map((item) => (
                                                <option value={item._id} key={item._id}>{item.leadName}</option>
                                            ))}
                                        </Select>
                                        <IconButton onClick={() => setLeadModel(true)} ml={2} fontSize='25px' icon={<LiaMousePointerSolid />} />
                                    </Flex>
                                    <Text mb='10px' color={'red'}>{errors.createByLead && touched.createByLead && errors.createByLead}</Text>
                                </GridItem>
                            ) : null}
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Recipient<Text color={"red"}>*</Text>
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                disabled
                                value={values.recipient}
                                name="recipient"
                                placeholder='Recipient'
                                fontWeight='500'
                                borderColor={errors.recipient && touched.recipient ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.recipient && touched.recipient && errors.recipient}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Subject<Text color={"red"}>*</Text>
                            </FormLabel>
                            <Input
                                fontSize='sm'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subject}
                                name="subject"
                                placeholder='Subject'
                                fontWeight='500'
                                borderColor={errors.subject && touched.subject ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.subject && touched.subject && errors.subject}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Call Notes
                            </FormLabel>
                            <Textarea
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.callNotes}
                                name="callNotes"
                                placeholder='Call Notes'
                                fontWeight='500'
                                borderColor={errors.callNotes && touched.callNotes ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.callNotes && touched.callNotes && errors.callNotes}</Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12 }}>
                            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' mb='8px'>
                                Message
                            </FormLabel>
                            <Textarea
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.message}
                                name="message"
                                placeholder='Message'
                                fontWeight='500'
                                borderColor={errors.message && touched.message ? "red.300" : null}
                            />
                            <Text mb='10px' color={'red'}>{errors.message && touched.message && errors.message}</Text>
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button 
                        colorScheme='teal' 
                        onClick={handleSubmit} 
                        isLoading={isLoading}
                    >
                        {isLoading ? <Spinner /> : 'Send Email'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddPhoneCall;
