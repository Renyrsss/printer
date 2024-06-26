// src/components/PDFDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import roboto from './Roboto-Regular.ttf'; // Укажите путь к вашему файлу шрифта
import UserDataStore from '../../store/userData'

// Регистрация шрифта
Font.register({
      family: 'Roboto',
      src: roboto,
      fontWeight: 'normal',
});

// Создание стилей
const styles = StyleSheet.create({
      page: {
            fontFamily: 'Roboto',
            fontSize: 12,
            padding: 20,
      },
      section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
      },
      image: {
            width: 160,
            height: 50,
            marginVertical: 15,
      },
      title : {
            textAlign:'center',
            fontSize : 20,
            marginBottom : 40,
            fontWeight : 'bold'
      },
      subTitle : {
            textAlign:'justify',
            fontSize : 16,
            marginBottom : 40
      },
      first : { 
            marginLeft : 60,

      }
      
});
let date = new Date();
const PDFDocument = ({ signature }) => (
      <Document>
      <Page style={styles.page}>
            <View style={styles.section}>
            <Text style={styles.title}>Уведомление о получений картриджа </Text>
            <Text style={styles.subTitle}><Text style={styles.first}>Я</Text>  {UserDataStore.user.name } {UserDataStore.user.surName } c отдела {UserDataStore.user.userSide } получил(-а) картридж модели {UserDataStore.user.cardModel } в количестве - {UserDataStore.user.cardCount}. </Text>
            <Text>Дата {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</Text>
            {signature && <Image style={styles.image} src={signature} />}
            </View>
      </Page>
      </Document>
);
                                                      
export default PDFDocument;