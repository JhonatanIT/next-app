import { render, screen } from '@testing-library/react'
import Pokemones from '../pages/index'
import '@testing-library/jest-dom'

describe('Index', () => {

    describe('Component', () => {
        it('rendering', () => {

            render(
                <Pokemones pokemones={[]} />
            )

            const paragraph = screen.getByTestId('title')
            expect(paragraph).toBeInTheDocument()
        })
    })
})