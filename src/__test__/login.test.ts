
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/navBar/NavBar'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Navbar />)

    const heading = screen.getByRole('heading', {
      name: /login \.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

