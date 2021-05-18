import Traducao from '../components/Traducao/Traducao';

export default [
  {
    id: 1,
    title: Traducao.t('readTips'),
    description: Traducao.t('readTipsDescription'),
    type: 'DAILY',
    baseValue: 2,
    modifier: 2
  },
  {
    id: 2,
    title: Traducao.t('informCigarettes'),
    description: Traducao.t('informCigarettesDescription'),
    type: 'DAILY',
    baseValue: 6,
    modifier: 2
  },
  {
    id: 3,
    title: Traducao.t('dontSmoke'),
    description: Traducao.t('dontSmokeDescription'),
    type: 'DAILY',
    baseValue: 7,
    modifier: 2
  },
  {
    id: 4,
    title: Traducao.t('register'),
    description: Traducao.t('registerDescription'),
    type: 'ONCE',
    baseValue: 5,
    modifier: 0
  },
  {
    id: 5,
    title: Traducao.t('stopPlan'),
    description: Traducao.t('stopPlanDescription'),
    type: 'ONCE',
    baseValue: 10,
    modifier: 0
  },
];