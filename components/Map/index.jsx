import dynamic from 'next/dynamic';

const MyMap = dynamic(() => import('./MyMap.jsx'), {
  ssr: false
});

export default MyMap;
