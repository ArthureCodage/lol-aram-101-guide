const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    try {
        console.log('🚀 Launching Edge browser for PDF generation...');
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        // 1. Generate French PDF
        const pageFR = await browser.newPage();
        const htmlPathFR = path.resolve(__dirname, 'index.html');
        console.log(`📄 Loading French HTML: file:///${htmlPathFR.replace(/\\/g, '/')}`);

        await pageFR.goto(`file:///${htmlPathFR.replace(/\\/g, '/')}`, {
            waitUntil: 'networkidle0'
        });

        const pdfPathFR = path.resolve(__dirname, 'League_of_Legends_ARAM_101_Guide.pdf');
        console.log(`💾 Printing French PDF: ${pdfPathFR}`);

        await pageFR.pdf({
            path: pdfPathFR,
            format: 'A4',
            printBackground: true,
            margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' }
        });
        await pageFR.close();

        // 2. Generate English PDF
        const pageEN = await browser.newPage();
        const htmlPathEN = path.resolve(__dirname, 'index_en.html');
        console.log(`📄 Loading English HTML: file:///${htmlPathEN.replace(/\\/g, '/')}`);

        await pageEN.goto(`file:///${htmlPathEN.replace(/\\/g, '/')}`, {
            waitUntil: 'networkidle0'
        });

        const pdfPathEN = path.resolve(__dirname, 'League_of_Legends_ARAM_101_Guide_EN.pdf');
        console.log(`💾 Printing English PDF: ${pdfPathEN}`);

        await pageEN.pdf({
            path: pdfPathEN,
            format: 'A4',
            printBackground: true,
            margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' }
        });
        await pageEN.close();

        console.log('✅ Both French and English PDFs generated successfully!');
        await browser.close();
    } catch (err) {
        console.error('❌ Error generating PDFs:', err);
        process.exit(1);
    }
})();
