import React, { useId } from 'react'

//forwardRef is a hook used when we divide smaller components of a page into standalone components like input field as a component now this Input component can be used in different pages of the website but the state of a component must be defined where the component is defined but here when we will design entire pages , there we will use this input component and there only we will define the state of this component hence to definne the state of this component in different pages we use forward ref hook to use reference of this component to define it's state in different pages.
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props//this is provides in input component so that if any extra attributes have to be added in input fields such as place holder that can be added also.
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>

            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }

            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props} id={id}/>

        </div>
    )
})

export default Input
