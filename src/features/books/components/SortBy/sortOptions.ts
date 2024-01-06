import { GetBooksQueryParams } from "@/types/api"

interface SortOption {
  optionTranslationKey: string
  value: {
    sortBy: GetBooksQueryParams["sortBy"]
    sortDirection: GetBooksQueryParams["sortDirection"]
  }
}

const sortOptions: SortOption[] = [
  {
    optionTranslationKey: "titleAsc",
    value: { sortBy: "title", sortDirection: "asc" },
  },
  {
    optionTranslationKey: "titleDesc",
    value: { sortBy: "title", sortDirection: "desc" },
  },
  {
    optionTranslationKey: "authorAsc",
    value: { sortBy: "author", sortDirection: "asc" },
  },
  {
    optionTranslationKey: "authorDesc",
    value: { sortBy: "author", sortDirection: "desc" },
  },
  {
    optionTranslationKey: "lowestRating",
    value: { sortBy: "rating", sortDirection: "asc" },
  },
  {
    optionTranslationKey: "highestRating",
    value: { sortBy: "rating", sortDirection: "desc" },
  },
  {
    optionTranslationKey: "leastPages",
    value: { sortBy: "numberOfPages", sortDirection: "asc" },
  },
  {
    optionTranslationKey: "mostPages",
    value: { sortBy: "numberOfPages", sortDirection: "desc" },
  },
  {
    optionTranslationKey: "oldest",
    value: { sortBy: "createdAt", sortDirection: "asc" },
  },
  {
    optionTranslationKey: "newest",
    value: { sortBy: "createdAt", sortDirection: "desc" },
  },
]

export default sortOptions
