# test-pokedex
Test app for Sonar
https://pokeapi.co/docs/v2

## 1. Technical achievements

#### Requirements said in the doc are perfectly implemented

* Ecmascript 6
* Fetch for making requests
* Node
* React
  - All components are functional components done with Hook
  - Absolute path when importing components
* React Router
* Redux
* SASS/SCSS
  - Use BEM style
* Typescript
* Webpack
  - Webpack configuration of historyApiFallback for React Router
  - file-loader, image-webpack-loader configuration
  - Babel for transpiling into raw Javascript
  - Auto inject script into HTML
  - Minify & uglify Javascript and CSS when building production version
  - Insert hash in asset names to prevent browser cache
  - Live reloading when a file is saved in dev mode
  - Show compile error detail in dev mode
* Nice looking UI
* Navigation to evolution detail
* History of past pokemons

#### Additional implementation

* Redux Saga
  - Built Saga module with multi-purpose and high flexibility which is easy to use in any circumstances for making http requests
  - Compose Redux structure to use along with previously mentioned Saga module
    - The Redux consists of 3 parts - request status(init, pending, success, failed), request resopnse data and custom state
    - Can handle response data in various levels of callbacks (React componen level, Saga level, Promise level)
    - Automatically saves HTTP response data
    - Reflects API request status
    - Can be customized via your own reducer
    - Can be easily migrated in other projects without any changes
* React Bootstrap
* Mobile responsive UI
* Show pokemon sprites images
* Navigate to other pokemon via links
* Functional programming by lodash/fp
* 3rd party NPM packages - lodash, node-sass, redux-actions and classnames

## 2. Codebase

#### Saga module for maing http requests

https://github.com/voyager-gold/test-pokedex/blob/master/src/store/modules/api/call.ts

#### Usage of above Saga

https://github.com/voyager-gold/test-pokedex/blob/master/src/store/modules/pokemon/sagas.ts

## 3. API Integration

#### Abilities, moves and types (3a)
https://pokeapi.co/docs/v2#pokemon

#### Locations
https://pokeapi.co/docs/v2#encounters-section

The URL is determined by `location_area_encounters` in 3a response.
(API doc and its actual implementation mismatch. 3a response has URL to location area but its actual data in `location_area_encounters`.)

#### Evolutions, varieties and color
https://pokeapi.co/docs/v2#pokemon-species (3b)

The URL is first determined by `species` in 3a response.
The URL returns color and varieties as well.
And the URL is recursively determined by `evolves_from_species` in 3b response until `evolves_from_species` is null.
All species iterated till then are stored as evolution.

#### Gender
https://pokeapi.co/docs/v2#evolution-section

According to the API doc, there is `gender` in `evolutions_details` field in above response but `evolution_details` is null in many cases.
Above URL is determined by `species` field in 3a resopnse.

#### Navigation to Pokemon evolution type
https://pokeapi.co/docs/v2#evolution-section

The URL is determined by `evolution_chain` field in 3b response for per evolution species.
It happends when a chain link is clicked in Evolutions section

## 4. Future Considerations

- The app will show details of locations, moves, types and evolution triggers via appropriate links.
- It doesn't raise any concern with `fetch` now but more improvements like upload/download progress can be done with `axios`.
- UI can be more specific and unique when we build boilerplate components.
- The other 3rd party libraries and components will be used for additional UI/features.
