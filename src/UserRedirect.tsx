import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UserRedirect() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      window.location.href = `https://api.1secstory.com/user?id=${id}`;
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

      <div className="relative z-10 text-center">
        <div className="inline-block mb-4">
          <img src="/artboard_2_1.png" alt="1SecStory" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
        </div>
        <div className="text-gray-600">Processing...</div>
      </div>
    </div>
  );
}
