import { Box, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import Spinner from "components/spinner/Spinner";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { HasAccess } from "../../../redux/accessUtils";
import { getApi } from "services/api";

const View = () => {

    const param = useParams()

    const [data, setData] = useState()
    const user = JSON.parse(localStorage.getItem("user"))
    const [isLoding, setIsLoding] = useState(false)

    const fetchData = async () => {
        setIsLoding(true)
        let response = await getApi('api/phoneCall/view/', param.id)
        setData(response?.data);
        setIsLoding(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const [contactAccess, leadAccess] = HasAccess(['Contacts', 'Leads'])

    return (
        <>

            {isLoding ?
                <Flex justifyContent={'center'} alignItems={'center'} width="100%" >
                    <Spinner />
                </Flex> : <>
                    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                        <GridItem colSpan={{ base: 4 }}>
                            <Card >
                                <Grid templateColumns={{ base: "1fr" }} gap={4}>
                                    <GridItem colSpan={2}>
                                        <Box>
                                            <Box display={"flex"} justifyContent={"space-between"}>
                                                <Heading size="md" mb={3}>
                                                    Call View page
                                                </Heading>
                                                <Link to="/phone-call" >
                                                    <Button mb={"5px"} size="sm" leftIcon={<IoIosArrowBack />} variant="brand">
                                                        Back
                                                    </Button>
                                                </Link>

                                            </Box>
                                            <HSeparator />
                                        </Box>
                                    </GridItem>
                                    <Grid templateColumns={'repeat(2, 1fr)'} gap={4}>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Sender </Text>
                                            <Text>{data?.senderName ? data?.senderName : ' - '}</Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Recipient </Text>
                                            <Text>{data?.recipient ? data?.recipient : ' - '}</Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Create to </Text>
                                            {data?.createBy ?
                                                <Link to={contactAccess?.view && `/contactView/${data?.createBy}`}>
                                                    <Text color={contactAccess?.view ? 'blue.500' : 'blackAlpha.900'} sx={{ '&:hover': { color: contactAccess?.view ? 'blue.500' : 'blackAlpha.900', textDecoration: contactAccess?.view ? 'underline' : 'none' } }}>{data?.createByName ? data?.createByName : ' - '}</Text>
                                                </Link> : <Link to={leadAccess?.view && `/leadView/${data?.createByLead}`}>
                                                    <Text color={leadAccess?.view ? 'blue.500' : 'blackAlpha.900'} sx={{ '&:hover': { color: leadAccess?.view ? 'blue.500' : 'blackAlpha.900', textDecoration: leadAccess?.view ? 'underline' : 'none' } }}>{data?.createByName ? data?.createByName : ' - '}</Text>
                                                </Link>
                                            }
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Realeted To </Text>
                                            <Text>{data?.createBy ? "contact" : data?.createByLead && "lead"}</Text>
                                        </GridItem>

                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Start Date </Text>
                                            <Text> {data?.startDate ? moment(data?.startDate).format('lll ') : ' - '} </Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}>End Date </Text>
                                            <Text> {data?.endDate ? moment(data?.endDate).format('lll ') : ' - '} </Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Timestamp </Text>
                                            <Text> {data?.timestamp ? moment(data?.timestamp).format('DD-MM-YYYY  h:mma ') : ' - '} [{data?.timestamp ? moment(data?.timestamp).toNow() : ' - '}]</Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2, md: 1 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Call Duration </Text>
                                            <Text>{data?.callDuration ? data?.callDuration : ' - '}</Text>
                                        </GridItem>
                                        <GridItem colSpan={{ base: 2 }}>
                                            <Text fontSize="sm" fontWeight="bold" color={'blackAlpha.900'}> Call Notes </Text>
                                            <pre style={{ whiteSpace: 'pre-wrap' }}>{data?.callNotes ? data?.callNotes : ' - '}</pre>
                                        </GridItem>
                                    </Grid>
                                </Grid>
                            </Card>
                        </GridItem>

                    </Grid>
                </>}

        </>
    );
};

export default View;