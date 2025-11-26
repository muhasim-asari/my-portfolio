// components/LoginButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export default function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest border-2 border-transparent hover:border-black transition-all flex justify-center items-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#0066F7] hover:text-white shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      {pending ? (
        <>
          {/* Spinner Kecil */}
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:border-black group-hover:border-t-transparent"></div>
          <span>Checking...</span>
        </>
      ) : (
        <span>Login Access</span>
      )}
    </button>
  )
}