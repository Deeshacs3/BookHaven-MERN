import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-book-leather text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Book<span className="text-book-gold">Haven</span></h3>
            <p className="text-sm text-muted-foreground">Your destination for literary treasures and intellectual exploration.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-primary-foreground hover:text-book-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-book-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-book-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-book-gold transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/books" className="hover:text-book-gold transition-colors">All Books</Link></li>
              <li><Link to="/categories" className="hover:text-book-gold transition-colors">Categories</Link></li>
              <li><Link to="/bestsellers" className="hover:text-book-gold transition-colors">Bestsellers</Link></li>
              <li><Link to="/new-releases" className="hover:text-book-gold transition-colors">New Releases</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-book-gold transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-book-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-book-gold transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-book-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping" className="hover:text-book-gold transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-book-gold transition-colors">Returns</Link></li>
              <li><Link to="/help" className="hover:text-book-gold transition-colors">Help Center</Link></li>
              <li><Link to="/track-order" className="hover:text-book-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted/20 mt-8 pt-8 text-sm text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer