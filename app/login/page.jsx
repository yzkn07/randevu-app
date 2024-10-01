"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { login, signup, signInWithGithub } from './actions';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const randevuId = searchParams.get('randevu-id');
  const loginDurumu = searchParams.get('isLogin');
  const error = searchParams.get('error');

  useEffect(()=>{
    if (!isLogin) {
      setIsLogin(loginDurumu)
    }
  },[loginDurumu])

  return (
    <>
      {error && (
        <div>
          <p className="bg-red-500 text-black font-semibold p-2 m-2 w-fit rounded-lg mx-auto">
            {error}
          </p>
        </div>
      )}

      <div className="flex justify-center mt-4">
        {/* <button
          className={`p-2 w-1/2 text-center ${
            isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Giriş Yap
        </button> */}
        {/* <button
          className={`p-2 w-1/2 text-center ${
            !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Kayıt Ol
        </button> */}
      </div>

      {/* Login Form */}
      {isLogin && (
        <>
        <form className="mt-4 mx-auto flex flex-col w-80 gap-4 text-black">
          <input
            id="randevuId"
            name="randevuId"
            defaultValue={randevuId}
            type="text"
            hidden
          />
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="email"
            name="email"
            type="email"
            required
          />
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="password"
            name="password"
            type="password"
            required
          />
          <button className="mx-auto py-2 border border-black w-20 rounded" formAction={login}>
            Giriş Yap
          </button>
        </form>

        <div className='flex flex-col justify-center items-center mt-2'>
        <p>hesabın yok  mu?</p>
        <button
        className="border border-transparent p-1 rounded-lg w-1/2 text-center font-semibold hover:border hover:border-blue-300"
        onClick={() => setIsLogin(false)}
        >
        Kayıt Ol
        </button>
      </div>
        </>
      )}

      {/* Signup Form */}
      {!isLogin && (
       <>
        <form className="mt-4 mx-auto flex flex-col w-80 gap-4 text-black">
          <input
            id="randevuId"
            name="randevuId"
            defaultValue={randevuId}
            type="text"
            hidden
          />
          {/* İsim ve Soyisim Alanları */}
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="firstName"
          >
            İsim:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="firstName"
            name="firstName"
            type="text"
            required
          />
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="lastName"
          >
            Soyisim:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="lastName"
            name="lastName"
            type="text"
            required
          />
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="email"
            name="email"
            type="email"
            required
          />
          <label
            className="bg-gray-600 text-white w-fit px-2 rounded"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="border border-black p-2 rounded-lg"
            id="password"
            name="password"
            type="password"
            required
          />
          <button className="mx-auto p-2 border border-black w-20 rounded" formAction={signup}>
            Kayıt Ol
          </button>
        </form>

        <div className='flex flex-col justify-center items-center mt-2'>
          <p>zaten hesabın var mı?</p>
          <button
            className="border border-transparent p-1 rounded-lg w-1/2 text-center font-semibold hover:border hover:border-blue-300"
            onClick={() => setIsLogin(true)}>
            Giriş Yap
          </button>
       </div>
       </>
      )}

      {/* <form action={signInWithGithub} className="mt-4">
        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          Github ile Giriş Yap
        </button>
      </form> */}
    </>
  );
}
