import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <Link href='/'>
        <a className='navbar-brand'>FakeGRAM</a>
      </Link>
      <Link href='/account'>
        <a>
          <button className='btn btn-outline-success mr-sm-2'>Account</button>
        </a>
      </Link>
    </nav>
  )
}

export default Navbar
