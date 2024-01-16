import React from 'react'

function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='h-full justify-center items-center
     flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-sky-400 to-blue-800'>
{children}
    </div>
  )
}

export default AuthLayout