MovieFlex
MovieFlex is a React Native app that provides an interactive movie listing experience using data from The Movie Database (TMDb) API. The app allows users to view movies by year, filter movies by genre, and search for movies with smooth scrolling and dynamic content loading.

Features
Movie Listing by Year: Display movies grouped by year from 2012 to the current year.
Genre Filtering: Filter movies by genre using a dynamic genre filter component.
Search Functionality: Search for movies by title with real-time search results.
Infinite Scrolling: Automatically load more movies as the user scrolls down.
Error Handling: Display appropriate messages for network errors and empty data.
Responsive Design: Ensure that the app looks good on different screen sizes.
Smooth UI: Custom UI components and smooth animations.
Installation

Clone the Repository:
git clone https://github.com/shanku01/MovieFlex
cd MovieFlex

Install Dependencies:
npm install

Run the App:

For Android:
npx react-native run-android

For iOS (macOS only):
npx react-native run-ios

Usage

Movie List
The main screen displays movies grouped by year, starting from 2012 to the current year. Users can scroll down to load more movies. When scrolling up, the app will display movies from previous years.

Genre Filter
The genre filter allows users to select or deselect genres to filter the movie list. The movie list will update to show only movies that match the selected genres.

Search
Users can search for movies by title using the search input field. The search results will be displayed dynamically as the user types.

Network Error Handling
The app handles network errors gracefully. If the network is disconnected, a message will be displayed. Once the network is reconnected, the app will attempt to reload the data if it is empty.

Components
MovieCard: Displays individual movie details.
GenreFilter: Provides a list of genres to filter the movies.
MovieList: Main component that handles movie fetching, genre filtering, and search functionality.

File Structure
src/
│
├── components/
│   ├── MovieCard.tsx
│   └── GenreFilter.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   ├── movie.d.ts
│   ├── genre.d.ts
│   └── api.d.ts
│
└── App.tsx

api.ts: Contains API service functions for fetching movies and genres.
movie.d.ts: Type definitions for movie data.
genre.d.ts: Type definitions for genre data.
api.d.ts: Type definitions for API responses.

Development
To contribute or make changes to the project:

Create a New Branch:
git checkout -b your-feature-branch

Make Your Changes and Commit:
git commit -m "Describe your changes"

Push to Your Branch:

git push origin your-feature-branch

Create a Pull Request on GitHub.

Contact
For any questions or issues, please contact shashankpradhan@example.com.

Feel free to make any additional modifications as needed!