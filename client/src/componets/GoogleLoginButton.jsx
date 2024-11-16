import React, { useState } from 'react'


export default function GoogleLoginButton({ navigateTo , handleGoogleAuthClick }) {
   
    return (
        <div>
            <button onClick={handleGoogleAuthClick} type="button" className="flex items-center justify-center w-full border-2 border-gray-300 bg-white py-2 rounded-2xl text-gray-600 font-semibold mb-4 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.35 11.1h-9.1v2.73h5.27c-.23 1.37-.92 2.53-1.94 3.3v2.75h3.12c1.83-1.69 2.88-4.19 2.88-7.03 0-.66-.07-1.3-.2-1.92z" fill="#4285F4" />
                    <path d="M12.25 22c2.47 0 4.54-.82 6.06-2.22l-3.12-2.75c-.88.6-2.01.96-3.23.96-2.48 0-4.58-1.68-5.33-3.94H3.34v2.77C4.88 19.74 8.28 22 12.25 22z" fill="#34A853" />
                    <path d="M6.92 13.05c-.2-.6-.32-1.24-.32-1.91s.12-1.31.32-1.91V6.47H3.34c-.68 1.29-1.07 2.77-1.07 4.35s.39 3.06 1.07 4.35l3.58-2.12z" fill="#FBBC05" />
                    <path d="M12.25 4.96c1.34 0 2.55.46 3.49 1.36l2.6-2.6C16.8 2.33 14.72 1.33 12.25 1.33 8.28 1.33 4.88 3.59 3.34 6.47l3.58 2.12c.75-2.26 2.85-3.94 5.33-3.94z" fill="#EA4335" />
                  </svg>
                  Login with Google
                </button>

        </div>
    )
}