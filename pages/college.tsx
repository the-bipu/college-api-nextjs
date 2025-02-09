import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface CollegeProps {
    _id: string;
    collegeCode: string;
    collegeName: string;
}

interface CollegePageProps {
    colleges: CollegeProps[];
}

const College: React.FC<CollegePageProps> = ({ colleges }) => {
    const [collegeName, setCollegeName] = useState('');
    const [editingCollege, setEditingCollege] = useState<CollegeProps | null>(null);
    const [collegeList, setCollegeList] = useState<CollegeProps[]>(colleges);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollegeName(e.target.value);
    };

    const handleAddCollege = async () => {
        if (!collegeName.trim()) return;

        try {
            const response = await fetch(`/api/college`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ colleges: [collegeName] }),
            });

            if (response.ok) {
                const newColleges: CollegeProps[] = await response.json();
                setCollegeList([...collegeList, ...newColleges]);
                setCollegeName(''); // Clear input field after adding
            } else {
                console.error('Failed to add college');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditCollege = async () => {
        if (!collegeName.trim() || !editingCollege) return;

        try {
            const response = await fetch(`/api/college`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldCollegeName: editingCollege.collegeName,
                    newCollegeName: collegeName,
                }),
            });

            if (response.ok) {
                const updatedCollege: CollegeProps = await response.json();
                setCollegeList(collegeList.map(college =>
                    college._id === editingCollege._id ? updatedCollege : college
                ));
                setCollegeName('');
                setEditingCollege(null);
            } else {
                console.error('Failed to edit college');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteCollege = async (collegeId: string) => {
        try {
            const response = await fetch(`/api/college`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collegeCode: collegeList.find(c => c._id === collegeId)?.collegeCode }),
            });

            if (response.ok) {
                setCollegeList(collegeList.filter(college => college._id !== collegeId));
            } else {
                console.error('Failed to delete college');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const startEditing = (college: CollegeProps) => {
        setEditingCollege(college);
        setCollegeName(college.collegeName);
    };

    return (
        <React.Fragment>
            <Head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />
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

            <div className='flex flex-col items-center justify-center py-24'>
                <div className='flex flex-col w-10/12 h-full '>

                    <h1 className='mb-2 font-semibold'>Add Colleges</h1>
                    <div className='flex flex-row gap-2 pb-8 w-full h-auto'>
                        <Input
                            className='h-10 md:w-9/12 w-full'
                            value={collegeName}
                            onChange={handleInputChange}
                        />
                        {editingCollege ? (
                            <Button
                                className='h-10 md:w-3/12 w-full'
                                onClick={handleEditCollege}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                className='h-10 md:w-3/12 w-full'
                                onClick={handleAddCollege}
                            >
                                Add New
                            </Button>
                        )}
                    </div>

                    <h1 className='mb-2 font-semibold'>Colleges</h1>
                    {collegeList.length > 0 ? (
                        <ul className='bg-[#e3e3e3] rounded border border-[#b8b8b8] p-4 flex flex-col gap-4'>
                            {collegeList.map((college) => (
                                <li key={college._id} className='flex flex-row justify-between items-center'>

                                    <div className='flex flex-col'>
                                        <span className='capitalize'>{college.collegeName}</span>
                                        <span>({college.collegeCode})</span>
                                    </div>

                                    <div className='flex gap-4'>
                                        <button className="text-sm button-56" role="button" onClick={() => startEditing(college)}>
                                            <span className="text">Edit</span>
                                        </button>
                                        <button className="text-sm button-56" role="button" onClick={() => handleDeleteCollege(college._id)}>
                                            <span className="text">Delete</span>
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className='bg-[#e3e3e3] rounded border border-[#b8b8b8] p-4 flex flex-col gap-4'>
                            {dummyList.map((college: any) => (
                                <li key={college._id} className='flex flex-row justify-between items-center'>

                                    <div className='flex flex-col'>
                                        <span className='capitalize'>{college.collegeName}</span>
                                        <span>({college.collegeCode})</span>
                                    </div>

                                    <div className='flex gap-4'>
                                        <button className="text-sm button-56" role="button" onClick={() => startEditing(college)}>
                                            <span className="text">Edit</span>
                                        </button>
                                        <button className="text-sm button-56" role="button" onClick={() => handleDeleteCollege(college._id)}>
                                            <span className="text">Delete</span>
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
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

const dummyList = [
    {
        _id: "clg001",
        collegeName: "Sant Longowal Institute of Engineering and Technology",
        collegeCode: "SLIET"
    },
    {
        _id: "clg002",
        collegeName: "Indian Institute of Technology Delhi",
        collegeCode: "IITD"
    },
    {
        _id: "clg003",
        collegeName: "National Institute of Technology Jalandhar",
        collegeCode: "NITJ"
    },
    {
        _id: "clg004",
        collegeName: "Lovely Professional University",
        collegeCode: "LPU"
    },
    {
        _id: "clg005",
        collegeName: "Thapar Institute of Engineering and Technology",
        collegeCode: "TIET"
    }
];