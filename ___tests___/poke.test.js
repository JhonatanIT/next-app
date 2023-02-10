import { render, screen, waitFor } from '@testing-library/react'
import Poke from '../pages/poke'
import '@testing-library/jest-dom'

describe('Poke', () => {

    it('Test hooks: renders pokemones', async () => {

        const mockResults = [{ name: 'chanchito', url: 'http://www.dominio.com/pokemones/1' }]

        //create a mock in the function fetch
        global.fetch = jest.fn()
            .mockImplementation(url => {
                return new Promise(resolve => {
                    resolve({
                        json: () => Promise.resolve({
                            results: mockResults
                        })
                    })
                })
            })

        render(
            <Poke />
        )

        const loading = screen.getByText('Cargando...')
        expect(loading).toBeInTheDocument()

        //Wait for the page is completely rendered (useful when you have more than one hook)
        await waitFor( () => screen.getByText('Mi App de Pokemones')) 

        //get element with data-testid={id} and verify their children
        const element = screen.getByTestId(1)
        const anchor = element.children[0]     //first children
        expect(anchor).toHaveAttribute('href', '/pokemones/1')
        expect(anchor).toHaveTextContent('chanchito')
    })
})