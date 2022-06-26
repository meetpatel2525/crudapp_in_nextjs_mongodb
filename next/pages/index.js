import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
// import { getSession } from 'next-auth/react';

export default function Home() {
//conditional variable ex
// const app = !getApp().length  ? lazylod() : getapp ;

  return (
   <div className={styles.container}>
      <Head>
        <title>Welcome to NextJs Mastery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>    

<img  src='/reactjs-javascript-programming-programming-language-hd-wallpaper-preview.jpg' />

<div>
{/* //we use global css hear  */}
<h1 className='max'>
<b>
INTRODUCTION of NEXT JS
</b>
</h1>

<p>


Next.js has a strong position among modern web technologies for building static websites and apps.

One of the greatest things about Next.js is the fact that it enables you to build static pages that still behave like dynamic ones. 

That’s a perfect case if:

The content will be updated frequently or needs to be up-to-date at all times.
Real-time publishing support is necessary – for example, multi-user sites need this.
Rebuilding the whole website is not at stake – as it would require a lot of time (and money) with SSG. A good example is a big eCommerce website.
In other words, it’s a great option if you want your website to be super fast and SEO efficient, yet you deal with so many updates that fully static rendering would take too much time. In this case, SSR (server-side rendering) becomes more important than SSG (static site generation), and that’s what Next.js is excellent at.

On top of that, who doesn’t want to use all the blessings of the modern web to achieve:

Fast page load times
Friendly interface and greater user experience
Possibility to add content effortlessly (i.e. by using a content management system)
SEO efficiency
Reasonable hosting costs
Seamless maintenance
And that’s the reason why it’s a number one choice in many cases.

</p>
</div>
      </main>
 
    </div>
  )
}