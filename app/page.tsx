"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import axios from 'axios'
import { image } from 'framer-motion/client'

const searchProducts = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const body = await axios.post("http://localhost:3000/api/v1",{
    query
  });
  console.log(body.data)
  const products = [
    {
      id: 'Amazon',
      name: body.data?.amazon?.product,
      image: body.data?.amazon?.image,
      price: body.data?.amazon?.price,
      url: `https://amazon.in/${body.data?.amazon?.productUrl}`
    },
    {
      id: 'Flipkart',
      name: body.data?.flipkart?.product,
      image: body.data?.flipkart?.image,
      price: body.data?.flipkart?.price,
      url: `https://flipkart.com/${body.data?.flipkart?.productUrl}`
    }
  ]
  console.log(products)
  // const mockProducts = [
  //   {
  //     id: 1,
  //     name: "iPhone 13",
  //     image: "/placeholder.svg?height=200&width=200",
  //     prices: [
  //       { platform: "Amazon", price: 799, url: "https://amazon.in" },
  //       { platform: "Flipkart", price: 829, url: "https://flipkart.com" },
  //       { platform: "Apple Store", price: 799, url: "https://apple.com" },
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Samsung Galaxy S21",
  //     image: "/placeholder.svg?height=200&width=200",
  //     prices: [
  //       { platform: "Amazon", price: 699, url: "https://amazon.in" },
  //       { platform: "Flipkart", price: 719, url: "https://flipkart.com" },
  //       { platform: "Samsung Store", price: 749, url: "https://samsung.com" },
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Google Pixel 6",
  //     image: "/placeholder.svg?height=200&width=200",
  //     prices: [
  //       { platform: "Amazon", price: 599, url: "https://amazon.in" },
  //       { platform: "Flipkart", price: 619, url: "https://flipkart.com" },
  //       { platform: "Google Store", price: 599, url: "https://store.google.com" },
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: "OnePlus 9",
  //     image: "/placeholder.svg?height=200&width=200",
  //     prices: [
  //       { platform: "Amazon", price: 729, url: "https://amazon.in" },
  //       { platform: "Flipkart", price: 739, url: "https://flipkart.com" },
  //       { platform: "OnePlus Store", price: 729, url: "https://oneplus.com" },
  //     ]
  //   },
  // ]

  return products
}

const PlatformCard = ({ platform, price, url, productName, productImage }: any) => {
  const cardStyles = {
    Amazon: "bg-gradient-to-br from-orange-600 to-yellow-500 text-black",
    "Flipkart": "bg-gradient-to-br from-blue-700 to-blue-500 text-white",
    "Apple Store": "bg-gradient-to-br from-gray-200 to-gray-400 text-black",
    "Samsung Store": "bg-gradient-to-br from-blue-900 to-blue-700 text-white",
    "Google Store": "bg-gradient-to-br from-red-600 to-yellow-500 text-white",
    "OnePlus Store": "bg-gradient-to-br from-red-700 to-red-500 text-white",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      //@ts-ignore
      className={`rounded-lg overflow-hidden shadow-lg ${cardStyles[platform]}: p-6`}
    >
      <div className="flex items-center mb-4">
        <img src={productImage} alt={productName} className="w-16 h-16 object-cover rounded-full mr-4" />
        <h2 className="text-xl font-bold">{productName}</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">{price}/-</span>
        <span className="text-lg">{platform}</span>
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center py-2 px-4 bg-black bg-opacity-20 hover:bg-opacity-30 transition-colors duration-300 rounded-md"
      >
        View on {platform} <ExternalLink size={16} className="inline ml-2" />
      </a>
    </motion.div>
  )
}

export default function PriceComparison() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    setIsLoading(true)
    const searchResults = await searchProducts(query)
    setResults(searchResults)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12">
          PriceCompare
        </h1>
        
        <div className="flex gap-4 mb-12">
          <Input
            type="text"
            placeholder="Search for a product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="bg-gray-800 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        <AnimatePresence>
          {results.map((product) => (
            <div key={product.id} className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PlatformCard
                    key={product.id}
                    platform={product.id}
                    price={product.price}
                    url={product.url}
                    productName={product.name}
                    productImage={product.image}
                  />
              </div>
            </div>
          ))}
        </AnimatePresence>

        {results.length === 0 && query && !isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-8 text-lg"
          >
            No results found for "{query}". Try a different search term.
          </motion.p>
        )}
      </div>
    </div>
  )
}