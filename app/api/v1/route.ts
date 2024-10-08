import { amazonScrapper } from "@/app/utils/amazonScrapper";
import { flipkartScrapper } from "@/app/utils/flipkartScrapper";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    try {
        const {query} = await req.json();
        const amazon = await amazonScrapper(query);
        const flipkart = await flipkartScrapper(query);

        return NextResponse.json({amazon: amazon, flipkart: flipkart},{status: 200});
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
} 