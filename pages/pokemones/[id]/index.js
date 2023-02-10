import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
  const router = useRouter()
  console.log(router)

  //when use fallback: true 
  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{data.name} número #{data.id}</h1>
      <Image src={data.sprites.front_default} width={400} height={400} alt={data.name} />
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}

export default Pokemon

//dynamic static side generation
export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const data = await response.json()

  return { props: { data } }
}

/*
getStaticPaths: Generate dynamic routes
fallback: 'blocking' -> don't show the web until it will be generated completely
fallback: true -> use dynamic
fallback: false -> use only predefined values paths
*/
export const getStaticPaths = async () => {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ]
  return {
    paths,
    fallback: 'blocking',
  }
}

//server side rendering: executed in the server
//export const getServerSideProps = async ({ params }) => {
  //const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  //const data = await response.json()

  //return { props: { data } }
//}
