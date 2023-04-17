import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import Home from './home/page';

export default function Page() {
  return (
    <main className={styles.main}>
      <Home/>
    </main>
  )
}
