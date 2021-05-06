import dynamic from 'next/dynamic';

const TestFile = dynamic(() => import('./Test'), {
  ssr: false
});

export default TestFile;
