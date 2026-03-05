import { useState } from "react";
import { Search as SearchIcon, Filter, SlidersHorizontal, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Link } from "react-router";

const schemes = [
  {
    id: "1",
    name: "Pradhan Mantri Awas Yojana",
    category: "Housing",
    description: "Affordable housing for all citizens with financial assistance for building or purchasing homes.",
    relevance: 95,
    benefits: "₹2.5 Lakhs subsidy",
    eligibility: "Annual income < ₹18 Lakhs",
  },
  {
    id: "2",
    name: "National Scholarship Portal",
    category: "Education",
    description: "Scholarships for students from various backgrounds pursuing higher education.",
    relevance: 88,
    benefits: "Up to ₹50,000/year",
    eligibility: "Merit-based, income criteria",
  },
  {
    id: "3",
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "Direct income support to small and marginal farmers across India.",
    relevance: 82,
    benefits: "₹6,000 per year",
    eligibility: "Small & marginal farmers",
  },
  {
    id: "4",
    name: "Ayushman Bharat - PMJAY",
    category: "Healthcare",
    description: "Free health insurance coverage for economically vulnerable families.",
    relevance: 78,
    benefits: "₹5 Lakhs health cover",
    eligibility: "BPL families",
  },
  {
    id: "5",
    name: "Stand Up India Scheme",
    category: "Entrepreneurship",
    description: "Loans for SC/ST and women entrepreneurs to set up greenfield enterprises.",
    relevance: 75,
    benefits: "₹10L - ₹1Cr loan",
    eligibility: "SC/ST/Women entrepreneurs",
  },
  {
    id: "6",
    name: "Sukanya Samriddhi Yojana",
    category: "Financial",
    description: "Savings scheme for girl child education and marriage expenses.",
    relevance: 70,
    benefits: "7.6% interest rate",
    eligibility: "Girls below 10 years",
  },
];

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Search Header */}
      <div className="space-y-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Discover Government Schemes</h1>
          <p className="text-muted-foreground">
            Find schemes that match your profile and needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, category, or benefits..."
              className="pl-10"
            />
          </div>
          <Button>
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="housing">Housing</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{schemes.length}</strong> schemes
          </p>
          <Link to="/compare">
            <Button variant="outline" size="sm">
              Compare Selected (0)
            </Button>
          </Link>
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="outline">{scheme.category}</Badge>
                <div className="flex items-center gap-1">
                  <Badge
                    className={`${
                      scheme.relevance >= 80
                        ? "bg-[#16A34A] text-white"
                        : scheme.relevance >= 70
                        ? "bg-[#F59E0B] text-white"
                        : "bg-muted"
                    }`}
                  >
                    {scheme.relevance}% match
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{scheme.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {scheme.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Benefits</p>
                  <p className="font-medium">{scheme.benefits}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Eligibility</p>
                  <p className="font-medium text-xs">{scheme.eligibility}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/scheme/${scheme.id}`} className="flex-1">
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
