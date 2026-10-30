import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import './i18n';
import Index from './pages/Index';
import UfuqShowcasePage from './pages/UfuqShowcasePage';

export function render(url = '/zyadwael-portfolio-flutter/') {
  const isUfuq = url.includes('ufuq');
  const html = renderToString(
    <MemoryRouter initialEntries={[url]} basename="/zyadwael-portfolio-flutter">
      {isUfuq ? <UfuqShowcasePage /> : <Index />}
    </MemoryRouter>
  );
  return { html };
}
