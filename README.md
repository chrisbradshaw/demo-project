# Demo Project

Responsive React.js app that renders and tracks performance on questions from the Open Trivia DB

<img width="1436" alt="Screen Shot 2022-04-22 at 12 09 07 PM" src="https://user-images.githubusercontent.com/11444842/164754756-657f526a-3777-46f8-b88b-c5a45ab4e28a.png">

## Built With

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Open Trivia DB](https://www.themoviedb.org/?language=en) - Free to use, user-contributed trivia question database.
- [react-dfp](https://www.npmjs.com/package/react-dfp) - A React implementation of the google [DFP](https://developers.google.com/doubleclick-gpt/reference 'GPT Reference') API.
- [react-scroll](https://www.npmjs.com/package/react-scroll) - React component for animating vertical scrolling
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

## Highlights

- React.js fetch to get data from Open Trivia DB
  - Error handing on fetch
  - Loading state while fetching
- Responsive Google Ad Manager ad slot in quiz
- Maintaining 2 React Contexts with useReducer - Navigation and Quiz
- Update browser url bar based on position in quiz
- Horizontal and Vertical full page scrolling, reset state at end of quiz
- Real time updates on correct answers, current streak of correct answers, Dynamic user feedback based on performance at quiz end

## Development setup

```sh
npm install
npm run start
```

## Author

Chris Bradshaw – [@\_chrisbradshaw](https://twitter.com/_chrisbradshaw) – bradshaw.chris@gmail.com

This project is licensed under the MIT License.

[https://github.com/chrisbradshaw](https://github.com/chrisbradshaw/)

## Contributing

1.  Fork it (<https://github.com/chrisbradshaw/demo-project>)
2.  Create your feature branch (`git checkout -b feature/fooBar`)
3.  Commit your changes (`git commit -am 'Add some fooBar'`)
4.  Push to the branch (`git push origin feature/fooBar`)
5.  Create a new Pull Request
