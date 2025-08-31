import { Website, RatingStatus, RatingResult, Page } from './website';

// TODO: replace this with real data from your application
const TIME_1 = new Date('December 15, 2024 04:28:00');	
const TIME_2 = new Date('December 16, 2024 04:28:00');	
const TIME_3 = new Date('December 17, 2024 04:28:00');	
const EXAMPLE_PAGES: Page[] = [
  {_id: "1", websiteURL: "https://www.youtube.com",
    pageURL: "/watch?v=dQw4w9WgXcQ",
    lastRated: TIME_3, rating: RatingResult.NONE},
]
export const EXAMPLE_SITES: Website[] = [
  {_id: "1", websiteURL: 'www.youtube.com', 
    addedDate: TIME_1, lastRated: TIME_2,
    ratingStatus: RatingStatus.TO_BE_RATED,
    moniteredPages:EXAMPLE_PAGES,
    ratedTotal:10,
    failedAssertionsTotal:5,
    failedAAATotal:2,
    failedAATotal:2,
    failedATotal:2,
    commonErrors:["error1","error2","error3"]
  },
  {_id: "2", websiteURL: 'https://www.w3schools.com/', 
    addedDate: TIME_2, lastRated: TIME_3,
    ratingStatus: RatingStatus.BEING_RATED,
    moniteredPages:[],
    ratedTotal:10,
    failedAssertionsTotal:5,
    failedAAATotal:2,
    failedAATotal:2,
    failedATotal:2,
    commonErrors:["error1","error2","error3"]
  },
  {_id: "3", websiteURL: 'https://maia.crimew.gay/', 
    addedDate: TIME_2, lastRated: TIME_3,
    ratingStatus: RatingStatus.RATED,
    moniteredPages:[],
    ratedTotal:10,
    failedAssertionsTotal:5,
    failedAAATotal:2,
    failedAATotal:2,
    failedATotal:2,
    commonErrors:["error1","error2","error3"]
  },
];