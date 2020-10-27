import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Linking } from 'expo'

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors'


const TermosUso = props => {

    return (

        <ScrollView>
            <View style={styles.container}>
                <DefaultTitle style={{...styles.title, fontSize: 24}}>Termo de responsabilidade, política de privacidade e termos e condições de uso do Viva sem Tabaco.</DefaultTitle>
                <View style={styles.textContainer}>
                    <DefaultText style={styles.spacement}>Bem vindo ao "Viva sem Tabaco". Para que o uso do Viva sem Tabaco seja satisfatório e não ofensivo para você, é importante ler, entender e concordar com os seguintes termos e condições.</DefaultText>
                    <DefaultText style={styles.spacement}>O Viva sem Tabaco foi desenvolvido com intuito de ser um serviço público, ofertando informações e um programa de tratamento do tabagismo.</DefaultText>
                    <DefaultText style={styles.spacement}>O programa é complementar ao tratamento tradicional de tabagismo e sua utilização do programa <DefaultText style={styles.textBold}>não</DefaultText> substitui a consulta com profissionais de saúde.</DefaultText>
                    <DefaultText style={styles.spacement}>O programa é de caráter experimental e será testado quanto sua eficácia clínica.</DefaultText> 
                
                    <DefaultTitle style={styles.title}>Acesso ao Viva sem Tabaco</DefaultTitle>
                    <DefaultText style={styles.spacement}>Algumas das páginas do Viva sem Tabaco são de livre acesso a todos os visitantes, no entanto, o acesso ao programa requer a realização de um cadastro gratuito. Caso exista interesse por parte do usuário, é necessário escolher um nome de usuário e uma senha. O nome de usuário e senha devem ser mantidos em sigilo e não devem ser compartilhados com qualquer outro usuário. Os visitantes são solicitados a não divulgarem o nome de usuário e senha para terceiros.</DefaultText>
                
                    <DefaultTitle style={styles.title}>Proibições</DefaultTitle>
                    <DefaultText style={styles.spacement}>- Usar outro nome de pessoa, nome de usuário ou senha quando acessar o Viva sem Tabaco, sem o prévio consentimento;</DefaultText>
                    <DefaultText style={styles.spacement}>- Escrever ou transmitir qualquer material que pode, de alguma forma, difamar, ofender ou causar desconforto a qualquer pessoa; ser obsceno ou que de qualquer maneira, interfira na utilização de outros usuários do Viva sem Tabaco;</DefaultText>
                    <DefaultText style={styles.spacement}>- Prover qualquer informação para o Viva sem Tabaco que seja confidencial ou propriedade de terceiros;</DefaultText>
                    <DefaultText style={styles.spacement}>- Usar o Viva sem Tabaco de qualquer maneira que possa infringir leis, regras ou regulamentações ou direito de terceiros; ou</DefaultText>
                    <DefaultText style={styles.spacement}>- Transmitir vírus ou qualquer conteúdo que interfira na funcionalidade do Viva sem Tabaco.</DefaultText>
                
                    <DefaultTitle style={styles.title}>Garantias</DefaultTitle>
                    <DefaultText style={styles.spacement}>Todos os esforços foram realizados para garantir que as informações e materiais contidos no Viva sem Tabaco sejam completamente verdadeiros e não danosos. Os materiais e informações disponibilizadas foram avaliados por especialistas na área de tratamento do tabagismo e por ex-fumantes.</DefaultText>
                    <DefaultText style={styles.spacement}>O Viva sem Tabaco não garante que os serviços serão disponibilizados de forma ininterrupta ou constante.</DefaultText>
                    <DefaultText style={styles.spacement}>Embora os serviços propostos pelo Viva sem Tabaco tenham como objetivo prover ajuda a fumantes, os mesmos são livres e encorajados a consultar profissionais de saúde. Todos os usuários devem utilizar este assumindo seus próprios riscos.</DefaultText>
                
                    <DefaultTitle style={styles.title}>Serviços e Materiais de Terceiros</DefaultTitle>
                    <DefaultText style={styles.spacement}>As informações contidas no Viva sem Tabaco podem incluir serviços e informações de terceiros. O conteúdo e serviços de terceiros serão disponibilizados com aprovação prévia.</DefaultText>

                    <DefaultTitle style={styles.title}>Links</DefaultTitle>
                    <DefaultText style={styles.spacement}>O Viva sem Tabaco contém links para outros sites que não se encontram sob o controle ou é mantido por nós. Os links de terceiros são disponibilizados para conveniência e informação. Caso o usuário acesse estas informações, os riscos de utilização são de inteira responsabilidade do usuário. O fato de um site de terceiros estar ligado a este projeto, não implica necessariamente em relação de patrocínio ou que o site de terceiro seja afiliado deste.</DefaultText>

                    <DefaultTitle style={styles.title}>Mudanças de Informações, Produtos e Serviços</DefaultTitle>
                    <DefaultText style={styles.spacement}>Informações, produtos e serviços publicados no Viva sem Tabaco são sujeitos a alterações sem prévias notícias.</DefaultText>

                    <DefaultTitle style={styles.title}>Informação disponibilizada pelo Viva sem Tabaco</DefaultTitle>
                    <DefaultText style={styles.spacement}>Pessoas inscritas no programa Viva sem Tabaco disponibilizam informações relacionadas ao conteúdo dos mesmos de forma involuntária. Uma vez disponibilizada, a informação é de propriedade do usuário, podendo ser reproduzida, publicada, transmitida, disponibilizada, sujeita as obrigações da Política de Privacidade.</DefaultText>

                    <DefaultTitle style={styles.title}>Licença</DefaultTitle>
                    <DefaultText style={styles.spacement}>Todo conteúdo do Viva sem Tabaco, incluindo os programas, design, textos e gráficos são licenciados pela Licença Pública Geral - GNU, garantindo a liberdade de usar o conteúdo do programa para qualquer propósito, modificar o programa, de compartilhar com seus vizinhos e amigos e compartilhar as mudanças que você fizer.</DefaultText>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => Linking.openURL('http://www.gnu.org/licenses/gpl-3.0.html')}>
                        <DefaultTitle style={{...styles.title, fontSize: 16}}>Ver a licença GPL GNU completa.</DefaultTitle>
                    </TouchableOpacity>

                    <DefaultTitle style={styles.title}>Marcas Registradas</DefaultTitle>
                    <DefaultText style={styles.spacement}>O Viva sem Tabaco contém marcas e logomarcas de terceiros registradas, protegidas por lei. Não é permitido o uso delas sem consentimento prévio.</DefaultText>

                    <DefaultTitle style={styles.title}>Término</DefaultTitle>
                    <DefaultText style={styles.spacement}>Caso o usuário desrespeite os termos e condições do Viva sem Tabaco, seu acesso pode ser limitado ou proibido.</DefaultText>
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
        width: '95%',
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

export default TermosUso;