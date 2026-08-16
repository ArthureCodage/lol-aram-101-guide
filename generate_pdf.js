const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
    try {
        console.log('🚀 Lancement du navigateur Edge pour la compilation du PDF...');
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const htmlPath = path.resolve(__dirname, 'index.html');
        console.log(`📄 Chargement de la page HTML : file:///${htmlPath.replace(/\\/g, '/')}`);

        await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
            waitUntil: 'networkidle0'
        });

        const pdfPath = path.resolve(__dirname, 'League_of_Legends_ARAM_101_Guide.pdf');
        console.log(`💾 Impression vers le fichier PDF : ${pdfPath}`);

        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '12mm',
                bottom: '12mm',
                left: '12mm',
                right: '12mm'
            }
        });

        console.log('✅ PDF généré avec succès !');
        await browser.close();
    } catch (err) {
        console.error('❌ Erreur lors de la génération du PDF :', err);
        process.exit(1);
    }
})();
