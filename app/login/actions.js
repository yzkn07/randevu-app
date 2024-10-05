"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()
  
  const randevuId = formData.get('randevuId') || null;

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // Giriş yapmaya çalış
  const { error, data: loginData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error); // Hatanın sebebini görmek için
    redirect('/login?error=gecersiz-giris')
  }

  // Giriş başarılıysa randevu sayfasına yönlendir
  revalidatePath('/', 'layout')

  // randevuId varsa /private/${randevuId}'a, yoksa /private'a yönlendir
  if (randevuId) {
    redirect(`/private/${randevuId}`)
  } else {
    redirect('/private')
  }
}



export async function signup(formData) {

  const supabase = createClient()
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email')
  const password = formData.get('password')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const randevuId = formData.get('randevuId')
  const cinsiyet = formData.get('cinsiyet')


  // kullanıcı kaydı
  const { data: userData, error: userError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (userError) {
    redirect('/login?error=gecersiz-giris')
  }

  // Eğer kullanıcı kaydolursa, hastalar tablosuna hasta bilgilerini ekle
  const userId = userData.user.id

  const { error: hastaError } = await supabase
    .from('hastalar')
    .insert([
      { id: userId, hasta_adi: firstName, hasta_soyadi: lastName, hasta_cinsiyeti: cinsiyet }
    ])

  if (hastaError) {
    console.log('Hastalar tablosuna kayıt eklenirken hata:', hastaError)
    // Eğer hata varsa buradaki hatayı yakalayabilirsin ve belki kullanıcıya bir hata mesajı gösterebilirsin
  }

  revalidatePath('/', 'layout')
  
  if (randevuId) {
    // Eğer randevuId varsa, login formuna randevuId parametresiyle birlikte yönlendir
    redirect(`/login?randevu-id=${randevuId}&isLogin=true`);
  } else {
    redirect('/login?isLogin=true');
  }
}


// export async function signInWithGithub() {
//   const supabase = createClient()
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: `http://localhost:3000/auth/callback`,
//     },
//   })
//   if (data.url) {
//     redirect(data.url) // use the redirect API for your server framework
//   }
// }

export async function getCinsiyetTypes() {
  const supabase = createClient()
  const { data: hastaCinsiyetiTipleri, error} = await supabase.rpc('get_cinsiyet_enum')
  return { hastaCinsiyetiTipleri }
}