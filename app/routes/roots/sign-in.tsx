import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { Link, redirect } from 'react-router'
import { loginWithGoogle } from '~/appWrite/auth'
import { account } from '~/appWrite/client'

export async function clientLoader() {
  try {
     const user = await account.get()
    if (user.$id) return redirect("/");

  } catch (error) {
    console.error("Unexpected error while checking auth:", error)
  }
}

const signIn = () => {

  return (
    <main className='auth'>
     <section className='px-6 flex-center size-full glassmorphism '>
          <div className='sign-in-card'>
               <header className='header'>
                    <Link to="/" >
                         <img src='/assets/icons/logo.svg' alt="Tour_logo" className='size-[30px]' />
                    </Link>
                    <h1 className='p-28-bold text-dark-100'>Tourvisto</h1>
               </header>
               <article>
                    <h2 className='p-28-semibold text-dark-100 text-center'>start YOur Travel Journey</h2>
                         <p className='p-18-regular text-center text-gray-100 !leading-7'>Sign with google to manage destinations, itinirariries and uesrs activity with ease</p>
               </article>
               <ButtonComponent
               type='button'
               iconCss="e-search-icon"
               className='button-class !h-full !w-full'
               onClick={loginWithGoogle}>
                    <img
                    src='/assets/icons/google.svg'
                    className='!size-8'
                    alt="Google"
                    />
                    <span className='p-18-semibold text-white'>Sign-In Wit Google</span>
               </ButtonComponent>
          </div>
     </section>
    </main>
  )
}

export default signIn