import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb.js';
import { College } from '@/models/College.js';

export async function GET(req) {
    try {
        await connectMongo();

        const url = new URL(req.url);
        const firstLetter = url.searchParams.get('letter');

        if (!firstLetter || firstLetter.length !== 1) {
            return NextResponse.json(
                { error: 'Please provide a single character as the first letter' },
                { status: 400 }
            );
        }

        const colleges = await College.find({
            collegeName: { $regex: `^${firstLetter}`, $options: 'i' },
        });

        if (colleges.length === 0) {
            return NextResponse.json(
                { error: `No colleges found starting with "${firstLetter}"` },
                { status: 404 }
            );
        }

        return NextResponse.json(colleges, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
