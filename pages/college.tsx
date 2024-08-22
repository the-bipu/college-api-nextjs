import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GetServerSideProps } from 'next';

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
    const [collegeList, setCollegeList] = useState<CollegeProps[]>(colleges);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollegeName(e.target.value);
    };

    const handleAddCollege = async () => {
        if (!collegeName.trim()) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/college`, {
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

    return (
        <div className='flex flex-col items-center justify-center py-24'>
            <div className='flex flex-col w-10/12 h-full '>
                <h1>Colleges</h1>
                <ul className='bg-[#e3e3e3] rounded border border-[#b8b8b8] p-4'>
                    {collegeList.map((college) => (
                        <li key={college._id}>
                            {college.collegeName} ({college.collegeCode})
                        </li>
                    ))}
                </ul>
                <div className='flex flex-row gap-2 py-8 w-full h-auto'>
                    <Input
                        className='h-10 md:w-9/12 w-full'
                        value={collegeName}
                        onChange={handleInputChange}
                    />
                    <Button className='h-10 md:w-3/12 w-full' onClick={handleAddCollege}>
                        Add New
                    </Button>
                </div>
            </div>
        </div>
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
