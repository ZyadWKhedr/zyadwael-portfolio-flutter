import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import './i18n';
import Index from './pages/Index';
import UfuqLanding from './pages/UfuqLanding';
import TashkeelLanding from './pages/TashkeelLanding';

export function render(url = '/zyadwael-portfolio-flutter/') {
  const isUfuq = url.includes('ufuq');
  const isTashkeel = url.includes('tashkeel');
  let element = <Index />;
  if (isUfuq) element = <UfuqLanding />;
  else if (isTashkeel) element = <TashkeelLanding />;

  const html = renderToString(
    <MemoryRouter initialEntries={[url]} basename="/zyadwael-portfolio-flutter">
      {element}
    </MemoryRouter>
  );
  return { html };
}
