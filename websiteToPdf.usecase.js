const puppeteer = require("puppeteer");
module.exports.websiteToPdfUseCase = async ({
  url,
  width,
  waitForElement,
  height,
  waitUntil = "networkidle0",
  printBackground = true,
  format = "A4",
  margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  timeout = 60000,
}) => {
  console.log({ url });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil, timeout });

  if (waitForElement) {
    await page.waitForSelector(waitForElement);
  }

  const pdf = await page.pdf({
    format,
    printBackground,
    margin,
    width,
    height,
  });
  await browser.close();
  return pdf;
};
