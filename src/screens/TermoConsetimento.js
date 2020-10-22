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
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>O Sr.(a) está sendo convidado (a) como voluntário (a) a participar de parte da pesquisa “Informalcool - Avaliação da efetividade de intervenções breves para a redução do consumo de álcool assistidas por computador”.</DefaultText>
                    <DefaultText style={styles.spacement}>Ressaltamos que seus dados serão tratados com o mais absoluto sigilo e que em momento nenhum seus dados serão repassados a terceiros. Avaliar os dados dos usuários do site é importante para que possamos construir ferramentas de intervenção cada vez mais elaboradas.</DefaultText>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>Neste estudo pretendemos avaliar a efetividade de diferentes intervenções virtuais para redução do consumo de álcool.</DefaultText>
                    <DefaultText style={styles.spacement}>O motivo que nos leva a estudar esse assunto é a relevância em termos de saúde pública dos danos associados ao consumo de álcool que poderiam ser evitados através de intervenções mediadas por computador, como vem sendo demonstrado em diversos países do mundo (Holanda, Inglaterra, Suécia, México, Índia e Bielorússia).</DefaultText>
                    <DefaultText style={styles.spacement}>Os procedimentos serão realizados da seguinte maneira: avaliaremos as respostas fornecidas por cada usuário durante a navegação no site, as pontuações do AUDIT e dos questionários utilizados, além da permanência no site.</DefaultText>
                    <DefaultText style={styles.spacement}>Para participar deste estudo <DefaultText style={styles.textBold}>você não terá nenhum custo.</DefaultText></DefaultText>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>Você será esclarecido (a) sobre o estudo em qualquer aspecto que desejar e estará livre para participar ou recusar-se a participar.</DefaultText>
                    <DefaultText style={styles.spacement}>A sua participação é voluntária e a recusa em participar não acarretará qualquer penalidade ou modificação na forma em que é atendido (a) pelo pesquisador. O pesquisador irá tratar a sua identidade com padrões profissionais de <DefaultText style={styles.textBold}>sigilo.</DefaultText></DefaultText>
                    <DefaultText style={styles.spacement}>Mais uma vez ressaltamos que <DefaultText style={styles.textBold}>você não será identificado</DefaultText> em nenhuma publicação que possa resultar deste estudo. Este estudo apresenta risco mínimo, isto é, o mesmo risco existente em atividades rotineiras como conversar, tomar banho, ler, etc. Apesar disso, você tem assegurado o direito a ressarcimento ou indenização no caso de quaisquer danos eventualmente produzidos pela pesquisa.</DefaultText>
                    <DefaultText style={styles.spacement}>Os dados e instrumentos utilizados na pesquisa ficarão arquivados com o pesquisador responsável por um período de 5 anos, e após esse tempo serão destruídos.</DefaultText>
                    <DefaultText style={styles.spacement}>Eu fui informado(a) dos objetivos do presente estudo de maneira clara e detalhada e esclareci minhas dúvidas. Sei que a qualquer momento poderei solicitar novas informações e modificar minha decisão de participar se assim o desejar. <DefaultText style={styles.textBold}>Declaro que concordo em participar desse estudo.</DefaultText></DefaultText>
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