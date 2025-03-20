import { TaskForm } from '@/features/task';
import { Timer } from '@/features/timer';
import { Header } from '@/shared/ui/header';
import { Methodology } from '@/shared/ui/metodology';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className='max-w-[1440px] mx-auto'>
        <div className='flex justify-between py-24 px-20'>
          <div className='flex flex-col w-[35%]'>
            <Methodology />
            <TaskForm />
          </div>
          <Timer />
        </div>
      </div>
    </>
  );
}
