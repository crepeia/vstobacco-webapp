import Traducao from '../components/Traducao/Traducao';

export default [
  {
    baseValue: 5,
    description: Traducao.t('descriptionChallenge1'),
    id: 1,
    modifier: 0,
    title: Traducao.t('challenge1'),
    type: "ONCE",
  },
  {
    baseValue: 10,
    description: Traducao.t('descriptionChallenge2'),
    id: 2,
    modifier: 0,
    title: Traducao.t('challenge2'),
    type: "ONCE",
  },
  {
    baseValue: 1,
    description: Traducao.t('descriptionChallenge3'),
    id: 3,
    modifier: 1,
    title: Traducao.t('challenge3'),
    type: "DAILY",
  },
  {
    baseValue: 5,
    description: Traducao.t('descriptionChallenge4'),
    id: 4,
    modifier: 1,
    title: Traducao.t('challenge4'),
    type: "DAILY",
  },
  {
    baseValue: 5,
    description: Traducao.t('descriptionChallenge5'),
    id: 5,
    modifier: 2,
    title: Traducao.t('challenge5'),
    type: "DAILY",
  },
]