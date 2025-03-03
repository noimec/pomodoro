import { TaskForm } from '@/features/task';
import { Timer } from '@/features/timer';
import { Methodology } from '@/shared/ui/metodology';

export default function HomePage() {
  return (
    <div className='flex justify-between py-24 px-20'>
      <div className='flex flex-col w-[35%]'>
        <Methodology />
        <TaskForm />
      </div>
      <Timer />
    </div>
  );
}
