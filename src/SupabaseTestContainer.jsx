import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// .env에서 불러온 API URL, KEY로 supabase client 객체 생성
const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

const SupabaseTestContainer = () => {
  const [testData, setTestData] = useState(null);
  const [inputText, setInputText] = useState(null);

  // supabase GET test
  const getTestData = async () => {
	  // test table로부터 정보를 가져옴
    const { data } = await supabase.from('test').select();
    console.table(data);
    setTestData(data);
  };

  // supabase POST test
  const postTestData = async () => {
    const dataToPost = {
      content: inputText,
    };
    
    // test table에 정보를 업데이트
    const { data, error } = await supabase.from('test').upsert([dataToPost]);

    if (error) {
      console.error('Error posting data:', error);
      return;
    }

    console.log('Data posted successfully:', data);
  };

  useEffect(() => {
    getTestData();
  }, []);

  return (
    <>
      <div>{testData === null ? 'null' : testData.map((data) => <div key={data.id}>{data.content}</div>)}</div>
      <input type="text" onChange={(e) => setInputText(e.target.value)} />
      <button onClick={postTestData}>post</button>
    </>
  );
};

export default SupabaseTestContainer;