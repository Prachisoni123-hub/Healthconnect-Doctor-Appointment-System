import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {
    doctors,
    removedDoctors,
    aToken,
    getAllDoctors,
    getRemovedDoctors,
    changeAvailability,
    deleteDoctor,
    restoreDoctor
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
      getRemovedDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>

      {/* All Doctors */}
      <h1 className='text-lg font-medium'>All Doctors</h1>

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>

        {doctors.map((item, index) => (

          <div
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
          >

            <img
              className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500'
              src={item.image}
              alt=""
            />

            <div className='p-4'>

              <p className='text-[#262626] text-lg font-medium'>
                {item.name}
              </p>

              <p className='text-[#5C5C5C] text-sm'>
                {item.speciality}
              </p>

              <div className='mt-2 flex items-center justify-between gap-2'>

                {/* Availability */}
                <div className='flex items-center gap-1 text-sm'>

                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />

                  <p>Available</p>

                </div>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to remove ${item.name}?`
                      )
                    ) {
                      deleteDoctor(item._id)
                    }
                  }}
                  className='text-red-500 text-sm border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all'
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Removed Doctors */}
      <div className='mt-10'>

        <h1 className='text-lg font-medium'>
          Removed Doctors
        </h1>

        {removedDoctors.length === 0 ? (

          <p className='text-gray-500 text-sm mt-4'>
            No removed doctors
          </p>

        ) : (

          <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>

            {removedDoctors.map((item, index) => (

              <div
                className='border border-red-200 rounded-xl max-w-56 overflow-hidden'
                key={index}
              >

                <img
                  className='bg-gray-100 opacity-60'
                  src={item.image}
                  alt=""
                />

                <div className='p-4'>

                  <p className='text-[#262626] text-lg font-medium'>
                    {item.name}
                  </p>

                  <p className='text-[#5C5C5C] text-sm'>
                    {item.speciality}
                  </p>

                  <button
                    onClick={() => restoreDoctor(item._id)}
                    className='mt-3 w-full text-green-600 text-sm border border-green-500 px-2 py-1 rounded hover:bg-green-500 hover:text-white transition-all'
                  >
                    Restore Doctor
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default DoctorsList