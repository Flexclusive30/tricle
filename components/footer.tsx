import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white/25 backdrop-blur-sm border-t border-white/20">
      <div className="container mx-auto py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4 text-shadow">
              <span className="text-eswatini-blue">Visit</span> <span className="text-eswatini-red">Eswatini</span>
            </h3>
            <p className="text-foreground mb-4 text-shadow-light text-sm">
              Discover the beauty and culture of Eswatini, the Kingdom formerly known as Swaziland.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/40 h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/40 h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/40 h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/40 h-9 w-9">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4 text-shadow">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/regions/hhohho" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Regions
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accommodation"
                  className="text-foreground hover:text-eswatini-blue text-shadow-light"
                >
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Events & Festivals
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4 text-shadow">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  About Eswatini
                </Link>
              </li>
              <li>
                <Link href="/visa" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Visa Information
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground hover:text-eswatini-blue text-shadow-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4 text-shadow">Newsletter</h3>
            <p className="text-foreground mb-3 md:mb-4 text-shadow-light text-sm">
              Subscribe to our newsletter for the latest updates on events and travel deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Your email" className="bg-white/50" />
              <Button className="bg-eswatini-blue hover:bg-eswatini-blue/90 whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-foreground text-shadow-light text-sm">
          <p>&copy; {new Date().getFullYear()} Visit Eswatini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
