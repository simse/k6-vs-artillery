import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export const options = {
    discardResponseBodies: false,

    scenarios: {
        loadTest: {
          executor: 'ramping-arrival-rate',
          startRate: 120,
          timeUnit: '1m',
          preAllocatedVUs: 10,
          maxVUs: 50,
          stages: [
            { target: 2000, duration: '1m' },
            { target: 1000, duration: '1m' },
          ],
        },
      },
};

export default async function () {
    const browser = chromium.launch({ headless: true });
    const page = browser.newPage();

    try {
        await page.goto('https://simse.dev/sitemap', { waitUntil: 'networkidle' });


        await page.goto('https://simse.dev', { waitUntil: 'networkidle' });

        // page.locator('body > h1')
    } finally {
        page.close();
        browser.close();
    }
}