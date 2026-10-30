import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import './i18n';
import Index from './pages/Index';

export function render(url = '/zyadwael-portfolio-flutter/') {
  const html = renderToString(
    <MemoryRouter initialEntries={[url]} basename="/zyadwael-portfolio-flutter">
      <Index />
    </MemoryRouter>
  );
  return { html };
}
