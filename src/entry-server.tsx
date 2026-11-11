import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import './i18n';
import Index from './pages/Index';
import UfuqLanding from './pages/UfuqLanding';

export function render(url = '/zyadwael-portfolio-flutter/') {
  const isUfuq = url.includes('ufuq');
  const html = renderToString(
    <MemoryRouter initialEntries={[url]} basename="/zyadwael-portfolio-flutter">
      {isUfuq ? <UfuqLanding /> : <Index />}
    </MemoryRouter>
  );
  return { html };
}
