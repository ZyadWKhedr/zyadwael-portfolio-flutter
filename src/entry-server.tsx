import React from 'react';
import { renderToString } from 'react-dom/server';
import './i18n';
import Index from './pages/Index';

export function render() {
  const html = renderToString(<Index />);
  return { html };
}
