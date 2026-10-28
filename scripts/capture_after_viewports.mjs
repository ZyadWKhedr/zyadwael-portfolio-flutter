import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://127.0.0.1:4173/zyadwael-portfolio-flutter/';
const outDir = 'd:\\Web\\zyadwael-portfolio-flutter\\audit-after';

const viewports = [
  { width: 360, height: 740, name: 'rebuilt-viewport-360.png' },
  { width: 390, height: 844, name: 'rebuilt-viewport-390.png' },
  { width: 768, height: 1024, name: 'rebuilt-viewport-768.png' },
  { width: 1024, height: 768, name: 'rebuilt-viewport-1024.png' },
  { width: 1440, height: 900, name: 'rebuilt-viewport-1440.png' },
  { width: 1920, height: 1080, name: 'rebuilt-viewport-1920.png' },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const port = 9335;
  const userDataDir = path.join(process.env.TEMP || 'C:\\temp', 'chrome-audit-after-' + Date.now());
  
  console.log('Spawning Chrome...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--disable-translate',
    '--hide-scrollbars',
    '--metrics-recording-only',
    '--mute-audio',
    '--safebrowsing-disable-auto-update',
    'about:blank'
  ]);

  try {
    let versionData = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) {
          versionData = await res.json();
          break;
        }
      } catch (e) {}
    }

    if (!versionData) {
      throw new Error('Failed to connect to Chrome debugging port');
    }

    console.log('Connected to Chrome. WebSocket URL:', versionData.webSocketDebuggerUrl);

    const newPageRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(targetUrl)}`, { method: 'PUT' });
    const targetInfo = await newPageRes.json();
    const wsUrl = targetInfo.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Network.enable');

    console.log('Waiting 3s for page to settle and hydrate...');
    await sleep(3000);

    for (const vp of viewports) {
      console.log(`Setting viewport: ${vp.width}x${vp.height}...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 1024,
      });
      await send('Emulation.setVisibleSize', { width: vp.width, height: vp.height });
      await sleep(1000);

      console.log(`Capturing screenshot for ${vp.name}...`);
      const { data } = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });

      const filePath = path.join(outDir, vp.name);
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
      console.log(`Saved: ${filePath} (${fs.statSync(filePath).size} bytes)`);
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
