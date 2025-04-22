import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface CollegeProps {
    _id: string;
    collegeCode: string;
    collegeName: string;
}

interface CollegePageProps {
    colleges: CollegeProps[];
}

const College: React.FC<CollegePageProps> = ({ colleges }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [collegeList, setCollegeList] = useState<CollegeProps[]>(colleges);
    const [filteredColleges, setFilteredColleges] = useState<CollegeProps[]>(colleges);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredColleges(collegeList);
            return;
        }

        const filtered = collegeList.filter((college) =>
            college.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            college.collegeCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredColleges(filtered);
    }, [searchQuery, collegeList]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCopyUrl = async (collegeCode: string, collegeId: string) => {
        const url = `https://college-api-nextjs.vercel.app/college/${collegeCode}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(collegeId);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <React.Fragment>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
                <title>Manage Colleges - Admin Panel | College API</title>
                <meta name="description" content="Admin panel for managing Indian colleges database. Add, edit, and delete college entries in the College API database. Comprehensive CRUD operations for educational institutions." />
                <meta name="keywords" content="College Management, Admin Panel, College Database, Edit Colleges, Add Colleges, Delete Colleges, College API Admin, Database Management, Educational Institutions Management" />
                <meta name="author" content="the-bipu" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Manage Colleges - Admin Panel | College API" />
                <meta property="og:description" content="Manage and maintain the Indian colleges database. Add new colleges, update existing information, and manage the complete college directory through our admin interface." />
                <meta property="og:image" content="/logo/og-college-api.png" />
                <meta property="og:url" content="https://college-api-nextjs.vercel.app/college" />
                <meta property="og:site_name" content="College API" />

                <meta name="robots" content="noindex, nofollow" />
                <meta name="language" content="English" />
                <meta name="theme-color" content="#000000" />

                <link rel="canonical" href="https://college-api-nextjs.vercel.app/college" />
            </Head>

            <div className='flex flex-col items-center justify-center pb-24 pt-10'>
                <div className='md:w-10/12 w-11/12 h-auto flex flex-row items-center justify-between mb-10'>
                    <div className='font-bold text-2xl'>College API</div>
                    <Link href='/' className='uppercase font-semibold'>Back to Home</Link>
                </div>

                <div className='flex flex-col md:w-10/12 w-11/12 h-full '>

                    <h1 className='mb-2 font-semibold'>Search Colleges</h1>
                    <div className='flex flex-row gap-2 pb-8 w-full h-auto'>
                        <Input
                            className='h-10 w-full'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by college name or code..."
                        />
                    </div>

                    <h1 className='mb-2 font-semibold'>
                        Colleges {searchQuery && `(${filteredColleges.length} results)`}
                    </h1>
                    {filteredColleges.length > 0 ? (
                        <ul className='bg-[#e3e3e3] rounded border border-[#b8b8b8] p-4 flex flex-col gap-4'>
                            {filteredColleges.map((college) => (
                                <li key={college._id} className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <span className='capitalize text-base font-semibold'>{college.collegeName}</span>
                                        <span className='text-sm text-gray-600'>({college.collegeCode})</span>
                                    </div>

                                    <button
                                        className="text-sm button-56"
                                        role="button"
                                        onClick={() => handleCopyUrl(college.collegeCode, college._id)}
                                    >
                                        {copiedId === college._id ? 'Copied!' : 'Copy URL'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='bg-[#e3e3e3] rounded border border-[#b8b8b8] p-4 text-center text-gray-600'>
                            {searchQuery ? 'No colleges found matching your search.' : 'No colleges available.'}
                        </div>
                    )}

                </div>
            </div>
        </React.Fragment>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/college`);
    const colleges: CollegeProps[] = await res.json();

    return {
        props: { colleges },
    };
};

export default College;