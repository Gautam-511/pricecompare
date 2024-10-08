import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";


export const amazonScrapper = async (search: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.amazon.in/s?k=${search}`
    await page.goto(url);

    const htmlcontent = await page.content();
    // console.log(htmlcontent);
    const $ = cheerio.load(htmlcontent);

    const product = $(".a-size-medium.a-color-base.a-text-normal").eq(0).text();
    console.log(product);

    const price = $(".a-price-whole").eq(0).text();
    console.log(price);

    const image: string | undefined = $(".s-image").attr("src");
    console.log(image);

    const productUrl: string | undefined = $(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal").attr("href");
    console.log("https://www.amazon.in"+productUrl);
    await browser.close();

    return {
        product,
        price,
        image,
        productUrl
    }
}

