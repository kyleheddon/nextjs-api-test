import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Kyle's Internet Website for the World Wide Web</p>
        <p>
          Boilerplate made with next.js. Check out some <Link href="/todos"><a>todos</a></Link>
        </p>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return { props: {} };
}
