import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-book-leather">
              Book<span className="text-book-gold">Haven</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 hover:text-book-leather transition-colors">Home</Link>
          <Link to="/books" className="px-3 py-2 hover:text-book-leather transition-colors">Books</Link>
          <Link to="/categories" className="px-3 py-2 hover:text-book-leather transition-colors">Categories</Link>
          <Link to="/about" className="px-3 py-2 hover:text-book-leather transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-60">
            <Input 
              type="search" 
              placeholder="Search books..." 
              className="pr-8"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <div className="relative mb-4">
            <Input 
              type="search" 
              placeholder="Search books..." 
              className="pr-8"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">Home</Link>
            <Link to="/books" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">Books</Link>
            <Link to="/categories" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">Categories</Link>
            <Link to="/about" className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">About</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar