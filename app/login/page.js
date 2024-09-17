import { login, signup, signInWithGithub } from './actions'

export default function LoginPage({ searchParams }) {
    const { error } = searchParams;
    
    
  return (
    <>
    {error && (
        <div>
            <p className='bg-red-500 text-black font-semibold p-2 m-2 w-fit rounded-lg mx-auto'>
                {error}
            </p>
        </div>
        )}
    <form className='mt-4 mx-auto flex flex-col w-80 gap-4 text-black'>
      <label className=' bg-gray-600 text-white w-fit  px-2 rounded' htmlFor="email">Email:</label>
      <input className='border border-black p-2 rounded-lg' id="email" name="email" type="email" required />
      <label className='bg-gray-600 text-white w-fit px-2 rounded' htmlFor="password">Password:</label>
      <input className='border border-black p-2 rounded-lg' id="password" name="password" type="password" required />
      <button className='mx-auto border border-black w-20 rounded' formAction={login}>Log in</button>
      <button className='mx-auto border border-black w-20 rounded' formAction={signup}>Sign up</button>
    </form>
    <form action={signInWithGithub}>
        <button> github ile giriş yap</button>
    </form>
    </>
  )
}