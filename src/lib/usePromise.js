import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  //대기 중, 완료, 실패에 대한 상태 처리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  //useEffect는 뒷정리함수이므로 async/await 사용이 x, 사용하려면 내부에 함수 따로!
  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [loading, resolved, error];
}
