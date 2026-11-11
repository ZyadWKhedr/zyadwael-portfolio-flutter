import React from 'react';
import { renderToString } from 'react-dom/server';
import './i18n';
import Index from './pages/Index';
import UfuqLanding from './pages/UfuqLanding';

export function render(path: string = '/') {
  if (path === '/ufuq' || path === '/ufuq/') {
    const html = renderToString(<UfuqLanding />);
    return { html };
  }
  const html = renderToString(<Index />);
  return { html };
}
