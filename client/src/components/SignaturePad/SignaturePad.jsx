
import React, { useEffect, useRef, useState ,useImperativeHandle ,forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDownloadLink , pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDoc';
import userData from '../../store/userData';
import axios from 'axios';

import './SignaturePad.css'



const SignaturePad = ({ onEnd ,takeCard , agreed , agreedFunc , submit , submitFunc ,setUserData} ) => {
      const sigCanvas = useRef({});
      const [signature, setSignature] = useState(null);

      const clear = (e) => {
            e.preventDefault();
            sigCanvas.current.clear();
            setSignature(null);
            agreedFunc(false)
      };
      
      useEffect(()=>{
                  if (sigCanvas.current.isEmpty()) {
                        agreedFunc(false)
                        return;
                  }
            if(agreed){
                  console.log('user data is agreed');
                  if (sigCanvas.current.isEmpty()) {
                        alert("Please provide a signature first.");
                        return;
                  }
                  const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
                  setSignature(signature);
            }
      },[agreed])


      useEffect((e)=>{
            // console.log('use effect is worked' , agreed , userData.submitBtn);
            if(submit){
                  generateAndSendPDF(e)

            }
            else{
                  // console.log(`error + ${agreed } , ${userData.submitBtn}`);
                  return
            }
      },[submit])
      const generateAndSendPDF = async (e) => {

            console.log('the btn to send is pressed');
            // e.preventDefault()
            if (sigCanvas.current.isEmpty()) {
                  alert("Please provide a signature first.");
                  return;
            }

            const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
            const pdfBlob = await pdf(<PDFDocument signature={signature} />).toBlob();

            const formData = new FormData();
            formData.append('files', pdfBlob,`${userData.user.surName}-${userData.user.surName}.pdf`);

            const jsonData = {
                        userName : userData.user.surName,
                        cardModel : userData.user.cardModel,
                        userSide : userData.user.userSide,
                        userSurname : userData.user.surName,
                        userMail: userData.user.Email,
            };
            console.log(pdfBlob);
            formData.append('jsonData', JSON.stringify(jsonData));
            try {
                  console.log(pdf(<PDFDocument signature={signature} />));
                  // const response = await axios.post('http://192.168.101.25:1337/api/bahadors', jsonData );
                  axios.post('http://192.168.101.25:1337/api/upload/', formData)
                  .then((res)=>{
                        const fileId = res.data[0].id;
                        console.log(jsonData);
                        axios.post(`http://192.168.101.25:1337/api/kartridzhis`,{
                              data:{
                                    userName : userData.user.surName,
                                    cardModel : userData.user.cardModel,
                                    userSide : userData.user.userSide,
                                    userSurname : userData.user.surName,
                                    userMail: userData.user.Email,
                                    cardCount : userData.user.cardCount,
                                    userSign : fileId
                              }
                  
                  })
                  .then((e)=>{

                        console.log(jsonData);
                        fetch('http://192.168.101.25:3001/send', {
                              method: 'POST',
                              // headers: {
                              // 'Content-Type': 'application/json'
                              // },
                              body : formData
                        })
                        .then (()=>{
                              setUserData({
                                    name: '',
                                    surName : '',
                                    userSide : '',
                                    Email : '',
                                    cardModel : '',
                                    cardCount : ''
                              })
                              sigCanvas.current.clear();
                              setSignature(null);
                              agreedFunc(false)
                              submitFunc(false)
                        })
                        // .then(response => response.json())
                        // .then(data => {
                        //       if (data.success) {
                        //             alert('Email sent successfully!');
                        //       } else {
                        //             alert('Failed to send email.');
                        //       }
                        // })
                        .catch(error => {
                              console.error('Error:', error);
                              alert('An error occurred.');
                        });
                  })
                  })

            } catch (error) {
                  console.error('Error sending PDF to server:', error);
                  alert('An error occurred while sending PDF to the server');
            }
      };




      return (
      <div>
            <div className="flex justify-center">
                  <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                  />
            </div>
            <div className="flex justify-between  mb-8">
                  <button 
                        className= {`block w-44 rounded-md  bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`}  
                        onClick={clear}>
                              Сбросить
                  </button>

                  {/* {<button 
                        className= {`block w-44 rounded-md  bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`} 
                        onClick={generateAndSendPDF}
                        >
                              Save
                  </button> } */}
                  <PDFDownloadLink
                        document={<PDFDocument signature={signature} />}
                        fileName="signature.pdf"
                        className= {`block w-44 rounded-md  bg-indigo-600  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600  cursor-pointer`} 
                        >
                        {({ loading }) => (loading ? 'Generating PDF...' : 'Просмотр документа')}
            </PDFDownloadLink>
            </div>
            

            
      </div>
      );
};

export default SignaturePad;
