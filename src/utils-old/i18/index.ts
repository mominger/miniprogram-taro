import { createI18n } from '@i18n-chain/react';
import en from './t.en.js';
import zh from './t.zh.js';

const i18n = createI18n({
  defaultLocale: {
    key: 'zh',
    values: zh,
  },
});
i18n.define('en', en);

//切换语言
// i18n.locale('en');

export default i18n;