import CardTasks from '@/components/CardTasks';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function dashboard() {
    const session = await getServerSession();

    if (!session) redirect('/');

    return <>
        <div className='h-full min-h-screen w-screen flex flex-col gap-6 items-center justify-center bg-slate-600 font-thin font-mono p-10 '>
            <CardTasks user={session.user} />
        </div>
    </>

}
