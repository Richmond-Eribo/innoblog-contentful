import Container from './container'
import {EXAMPLE_PATH} from '../lib/constants'

export default function Footer() {
  return (
    <footer className='bg-accent-1 border-t border-accent-2'>
      <Container>
        <div className='py-28 flex justify-center items-center'>
          <h3 className='text-4xl lg:text-5xl font-bold tracking-tighter leading-tight  lg:text-left mb-10 lg:mb-0 lg:pr-4 '>
            Get the latest update on political issues
          </h3>
        </div>
      </Container>
    </footer>
  )
}
