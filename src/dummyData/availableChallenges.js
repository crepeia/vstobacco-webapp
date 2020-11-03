const availableChallengesArray = [
    {
        id: 1,
        title: 'Ler dicas',
        description: 'Ler uma dica recebida.',
        type: 'DAILY',
        baseValue: 2,
        modifier: 2
    },
    {
        id: 2,
        title: 'Informar cigarros fumados diariamente',
        description: 'Informe diariamente o número de cigarros fumados no dia.',
        type: 'DAILY',
        baseValue: 6,
        modifier: 2
    },
    {
        id: 3,
        title: 'Não fumar',
        description: 'Não fumar durante o dia.',
        type: 'DAILY',
        baseValue: 7,
        modifier: 2
    },
    {
        id: 4,
        title: 'Cadastro',
        description: 'Finalize o cadastro no site. Você o encontra na seção Sobre.',
        type: 'ONCE',
        baseValue: 5,
        modifier: 2
    },
    {
        id: 5,
        title: 'Plano de Parada',
        description: 'Completar o plano de parada no site. Você o encontra na seção Sobre.',
        type: 'ONCE',
        baseValue: 10,
        modifier: 2
    },
];

export { availableChallengesArray };