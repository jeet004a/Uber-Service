import React from 'react';

const LocationSearchPanel = () => {
  const locations=[
    "194/2 G.T. Road Rajabagan Baidyabati Hooghly",
    "D-268 Emicon Advisory Services LLP, Mohali",
    "26 D Mirta Cafe Serampore Hooghly"
  ]
  return (
    <div>
      {locations.map(function(elem){
        return <div className='flex border-2 p-3 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 flex justify-center items-center w-10 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>        
      })
      }
      {/* <div className='flex border-2 p-3 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 flex justify-center items-center w-10 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
            <h4 className='font-medium'>ABC</h4>
          </div> */}

    </div>
  );
}

export default LocationSearchPanel;
