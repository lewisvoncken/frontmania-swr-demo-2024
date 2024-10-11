import "@/styles/globals.css";
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  return (
    <>
        <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/optimistic">
            Shopping Cart
          </Link>
        </li>
        <li>
          <Link href="/pokemon">
            Pagination
          </Link>
        </li>
      </ul>
    </nav>
    <Component {...pageProps} />

    </>
  );
}
