import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'



const categories = [
  "All Categories",
  "Fiction",
  "Non-Fiction",
  "Self-Help",
  "Biography",
  "Thriller",
  "Memoir",
  "Science Fiction",
  "Fantasy",
  "Romance"
];

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('title');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    cover: '',
    price: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/books') // your API endpoint
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Failed to fetch books:", err));
  }, []);

  // Filter books based on search term and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleDeleteBook = (id: string) => {
  // Optional: Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    // Delete from backend (if backend supports DELETE)
    fetch(`http://localhost:5000/books/${id}`, 
      {method: 'DELETE'})
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
      // Remove from frontend
        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      })
      .catch(err => console.error("Failed to delete book:", err));
  };


  const handleAddBook = () => {
  if (!newBook.title || !newBook.author || !newBook.price || !newBook.category) {
    alert('Please fill in all required fields');
    return;
  }

  const bookToAdd = {
    ...newBook,
    cover: newBook.cover || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop',
    price: parseFloat(newBook.price)
  };

  fetch('http://localhost:5000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookToAdd)
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to add book');
      return res.json();
    })
    .then(addedBook => {
      setBooks(prevBooks => [...prevBooks, addedBook]); // update frontend
      setNewBook({
        title: '',
        author: '',
        cover: '',
        price: '',
        category: '',
        description: ''
      });
      setIsAddBookOpen(false); // close modal
    })
    .catch(err => {
      console.error(err);
      alert("Error adding book");
    });
};


  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-book-leather">Book Collection</h1>
        
        <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
          <DialogTrigger asChild>
            <Button className="bg-book-leather hover:bg-book-leather/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Enter the details of the book you want to add to your collection.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title*
                </Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author*
                </Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price*
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newBook.price}
                  onChange={(e) => setNewBook({...newBook, price: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category*
                </Label>
                <Select 
                  value={newBook.category} 
                  onValueChange={(value) => setNewBook({...newBook, category: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'All Categories').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cover" className="text-right">
                  Cover URL
                </Label>
                <Input
                  id="cover"
                  value={newBook.cover}
                  onChange={(e) => setNewBook({...newBook, cover: e.target.value})}
                  className="col-span-3"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBook}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title or author..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="author">Author (A-Z)</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
            <SelectItem value="price-high">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden transition-all hover:shadow-lg group">
            <div className="aspect-[2/3] overflow-hidden relative">
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-sm line-clamp-3">{book.description}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">{book.category}</div>
              <h3 className="font-medium line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
              <div className="flex justify-between items-center">

                <span className="font-bold text-book-leather">${book.price.toFixed(2)}</span>
                <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-book-leather hover:text-book-gold">
                  Add to Cart
                </Button>
                 <Button variant="destructive" size="sm" onClick={() => handleDeleteBook(book._id)}>
                   Delete 

                </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No books found matching your criteria.</p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All Categories');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default Books