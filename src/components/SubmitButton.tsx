// components/SubmitButton.tsx
'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="mt-4 w-full bg-black text-white py-4 font-bold uppercase tracking-widest border-2 border-transparent hover:border-black transition-all flex justify-center items-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[#0066F7] hover:text-black"
    >
      {pending ? (
        <>
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:border-black group-hover:border-t-transparent"></div>
          <span>Saving...</span>
        </>
      ) : (
        <span>Publish Project</span>
      )}
    </button>
  )
}