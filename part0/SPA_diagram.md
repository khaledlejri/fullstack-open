sequenceDiagram
participant browser
participant server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->> browser: Sends back the HTML page
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: Sends the CSS stylesheet (main.css)
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: Sends the JavaScript file (spa.js)
    deactivate server

    Note right of browser: JavaScript starts running and requests JSON data from the server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: [{ content: "yo?", date: "2025-08-07T10:19:30.482Z" }, ... ]
    deactivate server

    Note right of browser: Callback function runs to display the notes on the page
