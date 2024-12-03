import Link from 'next/link';
import React from 'react'

const Index = () => {

    const college = {
        collegeCode: "zulekha-nursing-college-mangalore-mangalore-karnataka",
        collegeName: "Zulekha Nursing College,Mangalore - MANGALORE - Karnataka",
    };

    const collegeList = [
        {
            collegeCode: "zulekha-nursing-college-mangalore-mangalore-karnataka",
            collegeName: "Zulekha Nursing College,Mangalore - MANGALORE - Karnataka",
        },
        {
            collegeCode: "zenith-institute-of-science-&-technology-orissa",
            collegeName: "Zenith Institute of Science & Technology - Orissa",
        }
    ];

    return (
        <div className="w-full h-auto flex items-center justify-center p-5 bg-[#f2f2f2]">
            <div className="flex flex-col w-full h-auto gap-4">
                <div className="flex flex-col gap-1">
                    <div className="text-3xl font-bold text-[#333333]">
                        College API Documentation
                    </div>
                    <p className="text-lg">Welcome to the College API by the-bipu.</p>
                </div>

                <div className="flex flex-col bg-[#fff] p-6 rounded">
                    <h3 className="text-[#ff7f50] text-2xl font-bold mb-3">Get a Random College.</h3>
                    <p className="text-[#888] mb-2">
                        Use this endpoint to retrieve a random college.
                    </p>
                    <p className="text-[#888] font-semibold mb-2">Example Request:</p>
                    <div
                        className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 mb-2"
                    >
                        <span className="text-[#228b22]">GET</span>
                        <span className="space-mono"
                        >{process.env.NEXT_PUBLIC_BASE_URL}/api/random</span>
                    </div>
                    <p className="text-[#888] font-semibold mb-2">Example Response:</p>
                    <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 space-mono">
                        {JSON.stringify(college, null, 2)}
                    </pre>
                </div>

                <div className="flex flex-col bg-[#fff] p-6 rounded">
                    <h3 className="text-[#ff7f50] text-2xl font-bold mb-3">Get all Colleges.</h3>
                    <p className="text-[#888] mb-2">
                        Use this endpoint to retrieve a list of available colleges.
                    </p>
                    <p className="text-[#888] font-semibold mb-2">Example Request:</p>
                    <div
                        className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 mb-2"
                    >
                        <span className="text-[#228b22]">GET</span>
                        <span className="space-mono"
                        >{process.env.NEXT_PUBLIC_BASE_URL}/api/college</span>
                    </div>
                    <p className="text-[#888] font-semibold mb-2">Example Response:</p>
                    <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 space-mono">
                        {JSON.stringify(collegeList, null, 2)}
                    </pre>
                </div>

                <div>
                    Copyright ©
                    <Link
                        href="https://github.com/the-bipu/college-api-nextjs"
                        target="_blank"
                        className="text-[#ff7f50] underline"
                    >the-bipu</Link>
                </div>
            </div>
        </div>
    )
}

export default Index