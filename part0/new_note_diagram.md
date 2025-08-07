sequenceDiagram
participant browser as browser
participant server as server

browser ->>+ server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server -->> browser: Ask the browser to do a new HTTP GET request to address https://studies.cs.helsinki.fi/exampleapp/notes
Note right of browser: URL redirect
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server -->>- browser: HTML document
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server -->>- browser: the css file (main.css)
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server -->>- browser: the JavaScript file (main.js)
Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server -->>- browser: [{ content: "yo?", date: "2025-08-07T10:19:30.482Z" }, ... ]
Note right of browser: The browser executes the callback function that renders the notes
