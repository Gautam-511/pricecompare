import * as cheerio from 'cheerio';
import puppeteer from "puppeteer";


export const flipkartScrapper = async (search: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = `https://www.flipkart.com/search?q=${search}`
    await page.goto(url);

    const htmlcontent = await page.content();
    // console.log(htmlcontent);
    const $ = cheerio.load(htmlcontent);

    const product = $(".KzDlHZ").eq(0).text();
    console.log(product);

    const price = $(".Nx9bqj._4b5DiR").eq(0).text();
    console.log(price);

    const image: string | undefined = $(".DByuf4").attr("src");
    console.log(image);

    const productUrl: string | undefined = $(".CGtC98").attr("href");
    console.log("https://www.flipkart.com"+productUrl);
    await browser.close();

    return {
        product,
        price,
        image,
        productUrl
    }
}

