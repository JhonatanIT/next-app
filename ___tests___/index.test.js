import { render, screen } from '@testing-library/react'
import Pokemones, { getStaticProps } from '../pages/index'
import '@testing-library/jest-dom'
import { resolve } from 'path'

describe('Index', () => {

    describe('Component', () => {
        it('rendering', () => {

            render(
                <Pokemones pokemones={[{ name: 'Gliscor', url: '/pokemon/detalle/1' }]} />
            )

            // find a data-testid='title'
            const paragraph = screen.getByTestId('title')
            expect(paragraph).toBeInTheDocument()

            const gliscor = screen.getByText('Gliscor')
            expect(gliscor).toBeInTheDocument()

            const url = gliscor.getAttribute('href')
            expect(url).toEqual('/pokemones/1')
        })
    })

    describe('getStaticProps', () => {

        it('return pokemon', async () => {
            //create a mock in the function fetch
            global.fetch = jest.fn()
                .mockImplementation(url => {

                    expect(url).toBe('https://pokeapi.co/api/v2/pokemon?limit=151')
                    return new Promise(resolve => {
                        resolve({
                            json: () => Promise.resolve({
                                results: 'lista de pokemon'
                            })
                        })
                    })
                })
            const { props } = await getStaticProps()
            expect(props.pokemones).toBe('lista de pokemon')
        })
    })
})