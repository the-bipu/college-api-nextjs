import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react'

const Index = () => {
    const [randomResult, setRandomResult] = useState<any>(null);
    const [letterResult, setLetterResult] = useState<any>(null);
    const [allCollegesResult, setAllCollegesResult] = useState<any>(null);
    const [loading, setLoading] = useState({ random: false, letter: false, all: false });

    const college = {
        collegeCode: "random-college-code",
        collegeName: "Random College Code",
    };

    const collegeList = [
        {
            collegeCode: "random-college-code",
            collegeName: "Random College Code",
        },
        {
            collegeCode: "another-random-college-code",
            collegeName: "Another Random College Code",
        }
    ];

    const testRandomRoute = async () => {
        setLoading({ ...loading, random: true });
        try {
            const res = await fetch('/api/random');
            const data = await res.json();
            setRandomResult(data);
        } catch (error) {
            setRandomResult({ error: 'Failed to fetch data' });
        } finally {
            setLoading({ ...loading, random: false });
        }
    };

    const testLetterRoute = async () => {
        setLoading({ ...loading, letter: true });
        try {
            const res = await fetch('/api/colleges?letter=z');
            const data = await res.json();

            const limitedData = Array.isArray(data) ? data.slice(0, 3) : data;
            setLetterResult(limitedData);
        } catch (error) {
            setLetterResult({ error: 'Failed to fetch data' });
        } finally {
            setLoading({ ...loading, letter: false });
        }
    };

    const testAllCollegesRoute = async () => {
        setLoading({ ...loading, all: true });
        try {
            const res = await fetch('/api/college');
            const data = await res.json();

            const limitedData = Array.isArray(data) ? data.slice(0, 3) : data;
            setAllCollegesResult(limitedData);
        } catch (error) {
            setAllCollegesResult({ error: 'Failed to fetch data' });
        } finally {
            setLoading({ ...loading, all: false });
        }
    };

    return (
        <React.Fragment>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
                <title>College API - Comprehensive Indian Colleges Database | Next.js REST API</title>
                <meta name="description" content="Free and open-source REST API providing comprehensive information about colleges across India. Built with Next.js, featuring random college lookup, alphabetical filtering, and complete college listings." />
                <meta name="keywords" content="College API, Indian Colleges Database, Education API, Next.js API, REST API, College Information, India Colleges, Free API, Open Source API, College Search, Educational Institutions" />
                <meta name="author" content="the-bipu" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="College API - Indian Colleges Database REST API" />
                <meta property="og:description" content="Access comprehensive data on colleges across India through our free REST API. Search by letter, get random colleges, or fetch the complete database. Built with Next.js for optimal performance." />
                <meta property="og:image" content="/logo/og-college-api.png" />
                <meta property="og:url" content="https://college-api-nextjs.vercel.app/" />
                <meta property="og:site_name" content="College API" />

                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="theme-color" content="#000000" />

                <link rel="canonical" href="https://college-api-nextjs.vercel.app/" />
            </Head>

            <div className="w-full h-auto flex items-center justify-center p-5 bg-[#f2f2f2]">
                <div className="flex flex-col w-full h-auto gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between">
                            <div className="text-3xl font-bold text-[#333333] space-mono">
                                College API Documentation
                            </div>
                            {(randomResult || letterResult || allCollegesResult) && (
                                <button
                                    className="text-sm button-56"
                                    role="button"
                                    onClick={() => {
                                        setRandomResult(null);
                                        setLetterResult(null);
                                        setAllCollegesResult(null);
                                    }}
                                >
                                    Clear All Results
                                </button>
                            )}
                        </div>

                        <p className="text-lg">Welcome to the College API by the-bipu. Here we've tried to list all the colleges of India with this API.</p>
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
                        <div className='w-auto flex flex-col gap-2'>
                            <button
                                className="w-40 my-4 text-sm button-56"
                                role="button"
                                onClick={testRandomRoute}
                                disabled={loading.random}
                            >
                                {loading.random ? 'Loading...' : 'Test Route'}
                            </button>
                            {randomResult && (
                                <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] space-mono max-h-96 overflow-auto">
                                    {JSON.stringify(randomResult, null, 2)}
                                </pre>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col bg-[#fff] p-6 rounded">
                        <h3 className="text-[#ff7f50] text-2xl font-bold mb-3">Get Colleges with First Letter.</h3>
                        <p className="text-[#888] mb-2">
                            Use this endpoint to retrieve a list of colleges with same starting letter.
                        </p>
                        <p className="text-[#888] font-semibold mb-2">Example Request:</p>
                        <div
                            className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 mb-2"
                        >
                            <span className="text-[#228b22]">GET</span>
                            <span className="space-mono"
                            >{process.env.NEXT_PUBLIC_BASE_URL}/api/colleges?letter=z</span>
                        </div>
                        <p className="text-[#888] font-semibold mb-2">Example Response:</p>
                        <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] flex flex-row gap-4 space-mono">
                            {JSON.stringify(collegeList, null, 2)}
                        </pre>
                        <div className='w-auto flex flex-col gap-2'>
                            <button
                                className="w-40 my-4 text-sm button-56"
                                role="button"
                                onClick={testLetterRoute}
                                disabled={loading.letter}
                            >
                                {loading.letter ? 'Loading...' : 'Test Route'}
                            </button>
                            {letterResult && (
                                <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] space-mono max-h-96 overflow-auto">
                                    {JSON.stringify(letterResult, null, 2)}
                                    {"\n\n"}// Note: You'll only get 3 results for testing purposes. The actual API returns all matching colleges.
                                </pre>
                            )}
                        </div>
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
                        <div className='w-auto flex flex-col gap-2'>
                            <button
                                className="w-40 my-4 text-sm button-56"
                                role="button"
                                onClick={testAllCollegesRoute}
                                disabled={loading.all}
                            >
                                {loading.all ? 'Loading...' : 'Test Route'}
                            </button>
                            {allCollegesResult && (
                                <pre className="bg-[#f2f2f2] rounded px-4 py-2 border border-[#ddd] space-mono max-h-96 overflow-auto">
                                    {JSON.stringify(allCollegesResult, null, 2)}
                                    {"\n\n"}// Note: You'll only get 3 results for testing purposes. The actual API returns all colleges.
                                </pre>
                            )}
                        </div>
                    </div>

                    <div className='w-full h-auto flex flex-row items-center justify-between'>
                        <div>
                            Copyright ©
                            <Link
                                href="https://github.com/the-bipu/college-api-nextjs"
                                target="_blank"
                                className="text-[#ff7f50] underline"
                            >the-bipu</Link>
                        </div>
                        <Link href='/college' className='transition-all duration-300 opacity-0 hover:opacity-100 shadow-none'>
                            <button
                                className="text-sm button-56"
                                role="button"
                            >
                                Visit College Page
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Index