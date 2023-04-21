module.exports = { helloFlow };

async function helloFlow(page) {
    await page.goto('https://simse.dev/sitemap');

    await page.goto('https://simse.dev/', { waitUntil: 'networkidle' });
}