import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';


const TermoConsentimento = props => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <DefaultTitle style={{...styles.title, fontSize: 24}}>Termo de Consentimento Livre e Esclarecido</DefaultTitle>
                <View style={styles.textContainer}>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>O Sr. (a) está sendo convidado (a) como voluntário (a) a participar da pesquisa - Viva sem Tabaco - Avaliação de uma intervenção mediada por internet para tabagistas. O motivo que nos leva a estudar o tema é saber se informações sobre tabagismo na Internet ajudam fumantes a pararem de fumar.</DefaultText>
                    <DefaultText style={styles.spacement}>Para esta pesquisa adotaremos os seguintes procedimentos: após seu consentimento, você usará um site e será convidado a responder algumas questões ao final.</DefaultText>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>Os riscos envolvidos na pesquisa consistem nos mesmos riscos ao usar um computador conectado à Internet.</DefaultText>
                    <DefaultText style={styles.spacement}>A pesquisa contribuirá para futuras melhorias em sites com informações sobre tabagismo como também aumentará o conhecimento científico na área de tabagismo.</DefaultText>
                    <DefaultText style={styles.spacement}>Para participar deste estudo <DefaultText style={styles.textBold}>o Sr(a) não terá nenhum custo</DefaultText>, nem receberá qualquer vantagem financeira. Apesar disso, caso sejam identificados e comprovados danos provenientes desta pesquisa, o Sr.(a) tem assegurado o direito à indenização. O Sr.(a) terá o esclarecimento sobre o estudo em qualquer aspecto que desejar e estará livre para participar ou recusar-se a participar. Poderá retirar seu consentimento ou interromper a participação a qualquer momento.</DefaultText>
                    <DefaultText style={{marginBottom: 10, color: 'black'}}>A sua participação é voluntária e a recusa em participar não acarretará qualquer penalidade ou modificação na forma em que o Sr.(a) é atendido pelo pesquisador, que tratará a sua identididade com padrões profissionais de sigilo. Os resultados da pesquisa estarão à sua disposição quando finalizada na sessão de pesquisa, dentro do site do estudo. Seu nome ou o material que indique sua participação não será liberado sem a sua permissão.</DefaultText>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>O (A) Sr(a) não será identificado(a) em nenhuma publicação que possa resultar.</DefaultText>
                    <DefaultText style={styles.spacement}>Este termo de consentimento encontra-se disponível em duas vias eletrônicas. Uma enviada ao seu e-mail e a outra enviada para o e-mail do pesquisador responsável. Os dados e instrumentos utilizados na pesquisa ficarão arquivados com o pesquisador responsável por 5 (cinco) anos, e após este tempo serão destruídos. Os pesquisadores tratarão a sua identidade com padrões profissionais de sigilo, atendendo a legislação brasileira (Resolução N. 466/12 do Conselho Nacional de Saúde), utilizando as informações somente para os fins acadêmicos e científicos.</DefaultText>
                    <DefaultText style={styles.spacement}>Eu fui informado(a) dos objetivos da pesquisa Viva sem Tabaco - Avaliação de uma intervenção mediada por internet para tabagistas, de maneira clara e detalhada e esclareci minhas dúvidas. Sei que a qualquer momento poderei solicitar novas informações e modificar minha decisão de participar se assim o desejar.</DefaultText>
                    <DefaultText style={styles.spacement}>Declaro que concordo em participar. Recebi uma via original deste termo de consentimento livre e esclarecido e me foi dada à oportunidade de ler e esclarecer as minhas dúvidas.</DefaultText>
                </View>
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textContainer:
    {
        width: '90%'
    },
    title:
    {
        paddingVertical: 10,
        color: Colors.primaryColor
    },
    textBold:
    {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a6293'
    },
    spacement:
    {
        marginBottom: 10,
    },
})

export default TermoConsentimento;