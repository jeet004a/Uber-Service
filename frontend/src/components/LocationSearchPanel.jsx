import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description)
        } else if (activeField === 'destination') {
            setDestination(suggestion.description)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {/* {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            } */}

             {/* <div className='flex border-2 p-3 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-10 flex justify-center items-center w-10 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
            <h4 className='font-medium'>ABC</h4>
          </div> */}

      {suggestions.map(function(elem,idx){
              return <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex border-2 p-3 rounded-xl border-gray-50 active:border-black items-center my-2 justify-start gap-4'>
                  <h2 className='bg-[#eee] h-10 flex justify-center items-center w-10 rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                  <h4 className='font-medium'>
                    {elem.description}
                    {/* hello */}
                  </h4>
                </div>        
            })
            }
        </div>
    )
}

export default LocationSearchPanel