import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb.js';
import { College } from '@/models/College.js'

export async function GET() {
    try {
        await connectMongo();
        const mainData = await College.find();
        return NextResponse.json(mainData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// Utility function for generating college code
const generateCollegeCode = (name) => {
    return name
        .replace(/,\s*/g, '-')      // Replace comma followed by spaces with a dash
        .replace(/\.-/g, '-')       // Replace dot followed by dash with a dash
        .replace(/\s*-\s*/g, '-')   // Replace " - " with "-"
        .replace(/\s+/g, '-')       // Replace spaces with "-"
        .replace(/,/g, '-')         // Replace any remaining commas with dashes
        .replace(/\./g, '-')        // Replace any dots with dashes
        .replace(/--/g, '-')        // Replace double dashes with a single dash
        .toLowerCase();             // Convert to lowercase
};

export async function POST(request) {
    try {
        await connectMongo();

        const body = await request.json();
        const { colleges } = body;

        if (!Array.isArray(colleges) || colleges.length === 0) {
            return NextResponse.json({ error: 'Colleges array is required' }, { status: 400 });
        }

        const collegeEntries = colleges.map(collegeName => {
            const collegeCode = generateCollegeCode(collegeName);
            return { collegeName, collegeCode };
        });

        const savedColleges = await College.insertMany(collegeEntries);

        return NextResponse.json(savedColleges, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectMongo();

        const body = await request.json();
        const { oldCollegeName, newCollegeName } = body;

        if (!oldCollegeName || !newCollegeName) {
            return NextResponse.json({ error: 'Both old and new college names are required' }, { status: 400 });
        }

        const newCollegeCode = generateCollegeCode(newCollegeName);

        const updatedCollege = await College.findOneAndUpdate(
            { collegeName: oldCollegeName },
            { collegeName: newCollegeName, collegeCode: newCollegeCode },
            { new: true }
        );

        if (!updatedCollege) {
            return NextResponse.json({ error: 'College not found' }, { status: 404 });
        }

        return NextResponse.json(updatedCollege, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await connectMongo();

        const body = await request.json();
        const { collegeName, collegeCode } = body;

        if (!collegeName && !collegeCode) {
            return NextResponse.json({ error: 'College name or code is required' }, { status: 400 });
        }

        const query = collegeName ? { collegeName } : { collegeCode };

        const deletedCollege = await College.findOneAndDelete(query);

        if (!deletedCollege) {
            return NextResponse.json({ error: 'College not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'College deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
