'use client';
import React from 'react';
import {switchLocaleAction} from '@/lib/i18n/switch-locale';
import {useTranslation} from "@/hooks/useTranslation";

export default function ChangeLocale() {
  const {i18n, t} = useTranslation('common');

  return (
    <div>
      <select
        onChange={e => switchLocaleAction(e.target.value)}
        value={i18n.resolvedLanguage}
      >
        <option value="en">🇺🇸 {t('english')}</option>
        <option value="zh-CN">🇨🇳 {t('chinese')}</option>
      </select>
    </div>
  );
}