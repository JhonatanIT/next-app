import Link from 'next/link'
import Image from 'next/image'
//import Coffee from '../public/coffee.png'

//a file or package with [id] store a dynamic value

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(x => x).pop()
  return (
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  )
}

// <Image src='/coffee.png' width={400} height={400} />
export default function Pokemones({ pokemones }) {
  return (
    <div>
      <Link href="/chanchitos">Ir a chanchitos</Link>
      <p>Chanchito feliz</p>
      <p data-testid='title'>Mi App de Pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
      </ul>
    </div>
  )
}

/*SSG static side generation: generate html files before a client use the web
  1. run: npm run build
  2. review index.html generated in: .next/server/pages/index.html
*/
export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  return {
    props: { pokemones: data.results }
  }
}