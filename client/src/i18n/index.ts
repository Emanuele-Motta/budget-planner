import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  it: {
    translation: {
      dashboard: 'Dashboard',
      transactions: 'Transazioni',
      accounts: 'Conti',
      budgets: 'Budget',
      savings: 'Risparmi',
      aiAnalysis: 'Analisi AI',
      aiChat: 'Chat AI',
      settings: 'Impostazioni'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'it',
  fallbackLng: 'it',
  interpolation: { escapeValue: false }
});
