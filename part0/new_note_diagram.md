sequenceDiagram
participant browser as browser
participant server as server

browser ->>+ server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server -->> browser: Instructs browser to make a new HTTP GET request to https://studies.cs.helsinki.fi/exampleapp/notes
Note right of browser: Redirect to a different URL
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server -->>- browser: Sends back the HTML page
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server -->>- browser: Delivers the CSS stylesheet (main.css)
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server -->>- browser: Delivers the JavaScript file (main.js)
Note right of browser: JavaScript starts running and makes a request for JSON data
browser ->>+ server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server -->>- browser: [{ content: "yo?", date: "2025-08-07T10:19:30.482Z" }, ... ]
Note right of browser: Callback runs and displays the list of notes
