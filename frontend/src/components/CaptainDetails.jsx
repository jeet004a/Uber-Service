import React from 'react';

const CaptainDetails = (props) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
          <div className='flex justify-start items-center gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947" alt="" />
            <h4 className='text-lg font-medium capitalize'>Jeet</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>$295.20</h4>
            <p className='text-sm font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-3 mt-6 bg-gray-50 rounded-xl justify-center gap-5 items-start'>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-sticky-note-line"></i>
          <h5 className='text-lg font-medium'>10.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  );
}

export default CaptainDetails;
