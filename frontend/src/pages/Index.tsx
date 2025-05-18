import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, TrendingUp, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for featured books
const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
    price: 14.99,
    category: "Fiction"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1776&auto=format&fit=crop",
    price: 12.99,
    category: "Self-Help"
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop",
    price: 13.99,
    category: "Memoir"
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop",
    price: 11.99,
    category: "Thriller"
  }
];

const categories = [
  { name: "Fiction", icon: <BookOpen className="h-5 w-5" /> },
  { name: "Non-Fiction", icon: <TrendingUp className="h-5 w-5" /> },
  { name: "Bestsellers", icon: <Award className="h-5 w-5" /> },
  { name: "New Releases", icon: <Clock className="h-5 w-5" /> }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("featured")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-book-paper to-secondary py-20 md:py-32">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-[fadeIn_1s_ease-in]">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-book-leather">
              Discover Your Next <span className="text-book-gold">Literary Adventure</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Explore thousands of books from bestsellers to rare finds. Your perfect read is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-book-leather hover:bg-book-leather/90">
                Browse Collection
              </Button>
              <Button size="lg" variant="outline" className="border-book-leather text-book-leather hover:bg-book-leather/10">
                Join Book Club
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-book-gold/20 rounded-full filter blur-3xl"></div>
            <div className="relative grid grid-cols-2 gap-4 animate-float">
              {featuredBooks.slice(0, 4).map((book, index) => (
                <div 
                  key={book.id} 
                  className={`rounded-lg overflow-hidden shadow-lg transform ${
                    index % 2 === 0 ? 'rotate-3' : '-rotate-3'
                  } hover:rotate-0 transition-transform duration-300`}
                >
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-book-leather">Browse Categories</h2>
            <Link to="/categories" className="text-book-leather hover:text-book-gold flex items-center gap-1 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={`/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="h-full transition-all hover:shadow-md hover:border-book-gold">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <div className="mb-4 p-3 rounded-full bg-secondary text-book-leather group-hover:bg-book-leather group-hover:text-white transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-book-leather mb-8">Discover Books</h2>
          
          <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredBooks.map((book) => (
                  <Card key={book.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-[2/3] overflow-hidden">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">{book.category}</div>
                      <h3 className="font-medium line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-book-leather">${book.price}</span>
                        <Button variant="ghost" size="sm" className="text-book-leather hover:text-book-gold">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="border-book-leather text-book-leather hover:bg-book-leather/10">
                  View More Books
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="bestsellers">
              <div className="flex justify-center items-center py-16">
                <p className="text-muted-foreground">Bestsellers coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="flex justify-center items-center py-16">
                <p className="text-muted-foreground">New arrivals coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="sale">
              <div className="flex justify-center items-center py-16">
                <p className="text-muted-foreground">Sale items coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-book-leather text-white">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join Our Book Club</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for book recommendations, author interviews, and exclusive discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button className="bg-book-gold hover:bg-book-gold/90 text-book-ink">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index