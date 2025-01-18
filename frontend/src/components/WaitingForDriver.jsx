import React from 'react';

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-2'><i onClick={()=>{
          props.setWaitingForDriver(false)
        }} className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>

        <div className='flex items-center justify-between'>
        <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Jeet</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>WB18 AE 1234</h4>
            <p className='text-sm text-gray-600'>Maruti Swift</p>
          </div>
        </div>
        
        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-user-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>194/2 G.T.Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Rajabagan Baidyabati, Hooghly</p>
                </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>194/2 G.T.Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Rajabagan Baidyabati, Hooghly</p>
                </div>
                </div>
                <div className='flex items-center gap-5 p-3 '>
                <i className="ri-cash-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹118.20</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
                </div>
            </div>
           
        </div>
    </div>
  );
}

export default WaitingForDriver;
