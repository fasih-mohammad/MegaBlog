//all different pages of a website can be broken down into components, the most common things used on pages of websites can be made into components so that we don't have to define that functionality for each page of the website and we can reuse that component on different pages,

//hence components are defined like Input field component, Logo, Select which is a dropdown input field, etc , all these cmoponents are defined because each of them are used multiple times on differnt pages of a website .

import React, { useId } from 'react'

const Select = React.forwardRef(function Select({//we provide these fields in each component so that when these components are used on differnt pages they can have differnt attribute values according to the page.
    options,
    label,
    className,
    ...props
}, ref){
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select {...props} id={id} ref={ref} className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}>
        {options?.map((option)=>(
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select;