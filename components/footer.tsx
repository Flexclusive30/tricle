import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="text-primary">Visit</span> Eswatini
            </h3>
            <p className="text-muted-foreground mb-4">
              Discover the beauty and culture of Eswatini, the Kingdom formerly known as Swaziland.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/regions/hhohho" className="text-muted-foreground hover:text-primary">
                  Regions
                </Link>
              </li>
              <li>
                <Link href="/categories/accommodation" className="text-muted-foreground hover:text-primary">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary">
                  Events & Festivals
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary">
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Eswatini
                </Link>
              </li>
              <li>
                <Link href="/visa" className="text-muted-foreground hover:text-primary">
                  Visa Information
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-muted-foreground hover:text-primary">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates on events and travel deals.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Visit Eswatini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
