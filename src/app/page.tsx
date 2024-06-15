import { Dashboard } from '@/components/Dashboard';
import { Form } from '@/components/Form';
import { Methodology } from '@/components/Methodology';

export default function HomePage() {
  return (
    <div className='flex justify-between py-24 px-20'>
      <div className='flex flex-col'>
        <Methodology />
        <Form />
      </div>
      <Dashboard />
    </div>
  );
}
