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
Installation
Prerequisites
Before running the app, ensure you have the following installed:

Node.js: You can download it from nodejs.org.
Android Studio: Includes Android SDK. Follow this guide for installation.
Java Development Kit (JDK): Ensure JDK 11 or later is installed. Set the JAVA_HOME environment variable.
Setting Up Android SDK and JDK
Install Android Studio: Download and install Android Studio. Ensure the Android SDK and Android Virtual Device (AVD) components are included.

Set Up the SDK and JDK Paths:

Android SDK: Verify the path (e.g., C:\Users\<YourUsername>\AppData\Local\Android\Sdk on Windows or /Users/<YourUsername>/Library/Android/sdk on macOS).
JDK: Install JDK 11 or later and set JAVA_HOME to the JDK installation directory.
Update Environment Variables:

Windows:
Open System Properties > Environment Variables.
Add ANDROID_HOME variable pointing to the SDK path.
Add JAVA_HOME variable pointing to the JDK path.
Add platform-tools and tools directories to the PATH variable.

macOS/Linux:
Edit your shell profile file (.bash_profile, .zshrc, or .bashrc) and add:
export ANDROID_HOME=~/Library/Android/sdk
export JAVA_HOME=/path/to/jdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools


Clone the Repository:
git clone https://github.com/shanku01/MovieFlex
cd MovieFlex

Install Dependencies:
npm install

Install React Native CLI
If you haven’t already installed the React Native CLI, do so with the following command:
npm install -g react-native-cli

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
For any questions or issues, don't hesitate to get in touch with shashankpradhan911@gmail.com.

Feel free to make any additional modifications as needed!
