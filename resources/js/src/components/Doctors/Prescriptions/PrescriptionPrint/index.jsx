import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../../../stores";
import moment from "moment";
import Cookies from "js-cookie";

const PrescriptionPrint = () => {
    const {id} = useParams()
    const fetchPrescription = useStore(state => state.fetchPrescription)
    const setPrescription = useStore(state => state.setPrescription)
    const prescription = useStore(state => state.prescription)

    const fetchPrescriptionSettings = useStore(state => state.fetchPrescriptionSettings)
    const prescriptionSettings = useStore(state => state.prescriptionSettings)

    const fetchPageSetups = useStore(state => state.fetchPageSetups)
    const pageSetups = useStore(state => state.pageSetups)


    let [printHeader, setPrintHeader] = useState(true);

    useEffect(() => {
        fetchPrescription(parseInt(id))
    }, [id]);

    function printHandler() {
        let printContents = document.getElementById("print").innerHTML;
        let printWindow = document.getElementById('printFrame').contentWindow;
        printWindow.document.open()
        printWindow.document.write(`
        <html><head><title>Prescription Print</title>
        <style>
            @page {
                size: A4;
                margin: 0;
            }
        </style>
        `);
        printWindow.document.write("</head><body>");
        printWindow.document.write(printContents);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }



    useEffect(() => {
        let getPrintQuery = Cookies.get('printQuery') || null
        let print = printHeader
        if(getPrintQuery === "save_print_w"){
            print = false
        }
        setPrintHeader(print)
    }, [])

    useEffect(() => {
        fetchPageSetups(1,1)
        fetchPrescriptionSettings(1,1)
    }, []);

    useEffect(() => {
        if(prescription && Object.keys(prescription).length > 0){
            if(prescription?.user_id === prescriptionSettings?.data[0]?.user_id){
                printHandler()
            }
        }
    }, [prescription, prescriptionSettings])

    // useEffect(() => {
    //     return () => {
    //         setPrescription({})
    //     };
    // }, []);


    return (
        <>
            <div
                id='print'
                style={{
                    width: pageSetups?.data[0]?.prescription_size?.width + "cm",
                    height: pageSetups?.data[0]?.prescription_size?.height + "cm"
                }}
            >
                {printHeader && (
                    <div
                        style={{
                            width: pageSetups?.data[0]?.header_size?.width + "cm",
                            height: pageSetups?.data[0]?.header_size?.height + "cm",
                            background: pageSetups?.data[0]?.header_bg_color,
                            display: 'flex',
                            flexDirection: 'row',
                            // padding: '5px',
                            borderBottom: '1px solid #000000'
                        }}
                    >
                        <div style={{width: '50%'}} dangerouslySetInnerHTML={{__html: pageSetups?.data[0]?.header_left_content}}></div>
                        <div style={{width: '50%'}} dangerouslySetInnerHTML={{__html: pageSetups?.data[0]?.header_right_content}}></div>
                    </div>
                )}

                {prescriptionSettings?.data[0]?.patient_info ? (
                    <div
                        style={{
                            width:  pageSetups?.data[0]?.patient_info_size?.width + "cm" ,
                            height:  pageSetups?.data[0]?.patient_info_size?.height + "cm",
                            borderBottom: '1px solid #000000',
                            // padding: '5px',
                        }}
                    >
                        <table style={{width: '90%', height: 'inherit', margin: 'auto'}}>
                            <tbody>
                            <tr>
                                {prescriptionSettings?.data[0]?.name_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Name</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.name} </td>
                                    </>
                                ) : ""}

                                {prescriptionSettings?.data[0]?.age_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Age</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.age} </td>
                                    </>
                                ) : ""}
                                {prescriptionSettings?.data[0]?.gender_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Sex</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.gender} </td>
                                    </>
                                ) : ""}
                                {prescriptionSettings?.data[0]?.date_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Date</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {moment(prescription?.date).format('DD - MM - YYYY')}</td>
                                    </>
                                ) : ""}
                            </tr>
                            <tr>
                                {prescriptionSettings?.data[0]?.address_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Address</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.address}</td>
                                    </>
                                ) : ""}
                                {prescriptionSettings?.data[0]?.registration_no_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Reg. No</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.registration_no}</td>
                                    </>
                                ) : ""}
                                {/*{prescriptionSettings?.data[0]?.weight_display ? (*/}
                                {/*    <>*/}
                                {/*        <td><b>Wt.</b></td>*/}
                                {/*        <td>:</td>*/}
                                {/*        <td> &nbsp; </td>*/}
                                {/*    </>*/}
                                {/*) : ""}*/}
                                {prescriptionSettings?.data[0]?.mobile_display ? (
                                    <>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}><b>Mobile</b></td>
                                        <td>:</td>
                                        <td style={{fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}> &nbsp; {prescription?.mobile}</td>
                                    </>
                                ) : ""}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : ""}
                <div
                    style={{
                        // width:  pageSetups?.data[0]?.history_size?.width + "cm",
                        // height:  pageSetups?.data[0]?.history_size?.height + "cm",
                        borderBottom: '1px solid #000000',
                        display: 'flex',
                        flexDirection: 'row',
                        // padding: '5px',
                    }}
                >
                    <div
                        style={{
                            width:  pageSetups?.data[0]?.history_size?.width + "cm",
                            height:  pageSetups?.data[0]?.history_size?.height + "cm",
                            borderRight: '1px solid #000000',
                            padding: '5px 5px 5px 25px',
                        }}
                    >
                        {prescriptionSettings?.data[0]?.cubic_centimeter_display ? (
                            <>
                                <u style={{fontWeight : 700, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}>C/C</u>
                                <ul>
                                    {(prescription && prescription?.cc?.length > 0) && (
                                        prescription?.cc?.map((item, i) => (
                                            item?.name ? (<li style={{listStyleType: "circle", fontWeight: 500, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}} key={i}>{item.name}</li>) : ""
                                        ))
                                    )}
                                </ul>
                            </>
                        ) : ""}
                        {prescriptionSettings?.data[0]?.on_examination_display ? (
                            <>
                                <u style={{fontWeight : 700, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}>O/E</u>
                                <ul>
                                    {(prescription && prescription?.oe?.length > 0) && (
                                        prescription?.oe?.map((item, i) => (
                                            item?.name ? (<li style={{listStyleType: "circle", fontWeight: 500, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}} key={i}>{item.name}</li>) : ""
                                        ))
                                    )}
                                </ul>
                            </>
                        ) : ""}

                        {prescriptionSettings?.data[0]?.address_display ? (
                            <>
                                <u style={{fontWeight : 700, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}>Advice</u>
                                <ul>
                                    {(prescription && prescription?.ix?.length > 0) && (
                                        prescription?.ix?.map((item, i) => (
                                            item?.name ? (<li style={{listStyleType: "circle",  fontWeight: 500, fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}} key={i}>{item.name}</li>) : ""
                                        ))
                                    )}
                                </ul>
                            </>
                        ) : ""}

                        {prescriptionSettings?.data[0]?.disease_display ? (
                            <ul>
                                {(prescription && prescription?.dx?.length > 0) && (
                                    prescription?.dx?.map((item, i) => (
                                        item?.name ? (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                    fontWeight: 700,
                                                    fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'
                                                }}
                                                key={i}
                                            >
                                                &Delta; {item.name}
                                            </li>
                                        ) : ""
                                    ))
                                )}
                            </ul>
                        ) : ""}
                    </div>
                    <div
                        style={{
                            width:  pageSetups?.data[0]?.prescribe_size?.width + "cm",
                            height:  pageSetups?.data[0]?.prescribe_size?.height + "cm",
                            paddingLeft: '20px',
                        }}
                    >
                        <div style={{fontSize: '22pt', fontWeight: 'bold',}}>Rx. </div>
                        <div>
                            {(prescription && prescription?.medicines?.length > 0) && (
                                <ul>
                                    {prescription?.medicines?.map((item, i) => (
                                        item.name ? (
                                            <li key={i} style={{listStyleType: 'none', fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'}}>
                                                <b>{item.name}</b>
                                                <br/>
                                                {`${item?.dose} - ${item?.instruction} - ${item?.duration}`}
                                            </li>
                                        ) : ""
                                    ))}
                                </ul>
                            )}
                        </div>
                        {prescription?.advices && (<div dangerouslySetInnerHTML={{__html: prescription?.advices}}></div>)}
                    </div>
                </div>
                {prescriptionSettings?.data[0]?.footer_display ? (
                    <div
                        style={{
                            width: pageSetups?.data[0]?.footer_size?.width + "cm",
                            height: pageSetups?.data[0]?.footer_size?.height + 'cm',
                            borderBottom: '1px solid #000000',
                            textAlign: 'center',
                            fontSize: prescriptionSettings?.data[0]?.fontSize + 'pt'
                            // padding: '5px',
                        }}
                    >
                        {pageSetups?.data[0]?.footer_content}
                    </div>
                ) : ""}
            </div>

            <iframe id="printFrame" style={{
                height: 0, width: 0, position: 'absolute'
            }}></iframe>
        </>
    );
};

export default PrescriptionPrint;
