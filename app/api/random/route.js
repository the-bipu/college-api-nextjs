import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb.js';
import { College } from '@/models/College.js';

export async function GET() {
    try {
        await connectMongo();

        const randomCollege = await College.aggregate([{ $sample: { size: 1 } }]);

        if (randomCollege.length === 0) {
            return NextResponse.json({ error: 'No colleges found' }, { status: 404 });
        }

        return NextResponse.json(randomCollege[0], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}