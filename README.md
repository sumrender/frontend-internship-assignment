# Fyle Frontend Challenge

I have successfully implemented the following features in the application:

1. Search by book title or author name:
  I created a separate service called bookService, which is handling all such functions like, get search results, or
  get books for trending subjects

2. Tabulated results:
  The search results and trending subjects books,
  are shown to the user in a tabulated manner,
  reusing the shared table component

3. Paginated results: The search results are paginated, allowing users to view a limited number of results per page and navigate through the pages to view more results.

4. Clear search text: Users can easily clear the search text input field to reset the search and start a new search query.

5. Handling edge cases related to API calls: 
  The edge cases like, no results found (404) and
  connection error have been taken care of.

6. Loaders while fetching data: Loaders have been implemented to allow for a smooth user experience

7. Back button: A Back button is added to the Trending Subjects page, allowing users to easily navigate back to the home page.

8. Caching API responses: Caching service has been created, to cache both search responses and trending book responses, to improve performance.


## Who is this for?

This challenge is meant for candidates who wish to intern at Fyle and work with our engineering team. The candidate should be able to commit to at least 6 months of dedicated time for internship.

## Why work at Fyle?

Fyle is a fast-growing Expense Management SaaS product. We are ~40 strong engineering team at the moment. 

We are an extremely transparent organization. Check out our [careers page](https://careers.fylehq.com) that will give you a glimpse of what it is like to work at Fyle. Also, check out our Glassdoor reviews [here](https://www.glassdoor.co.in/Reviews/Fyle-Reviews-E1723235.htm). You can read stories from our teammates [here](https://stories.fylehq.com).

## Challenge outline

This challenge involves implementing a Books Library using the Open Library Subjects and Search APIs . The challenge is described in detail [here](./Application.md)

__Note__ - This challenge is in angular. We work on angular frameworks & after you join we expect the same from you. Hence it is required to complete this assignement in angular itself.

## What happens next?

You will hear back within 48 hours from us via email.

## Installation

1. Fork this repository to your github account.
2. Clone the forked repository and proceed with steps mentioned below.

### Install requirements
* Install Nx using the [Nx Documentation](https://nx.dev)
* Install `nvm` for linux or mac from this [url](https://github.com/creationix/nvm#installation-and-update)
* Install `nvm` for windows from this [url](https://github.com/coreybutler/nvm-windows/releases)
* Check `nodejs` version by typing : `node -v`
* Install dependencies : `npm install --save-dev`

## Development server

Run `nx serve front-end-internship-assignment` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.