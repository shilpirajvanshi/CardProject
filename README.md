# Angular Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Questions - Answers


**Question 1**. We use JWTs a lot throughout our API. For instance, when a user logs in on our API, a JWT is issued and our web-application uses this token for every
request for authentication. Here's an example of such a token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lb25lQGV4YW1wbGUubmV0IiwiYWRtaW4iOmZhbHNlLCJ2YWxpZF91bnRpbCI6IldlZCBEZWM
gMzEgMjM6NTk6NTkgQ0VTVCAxOTY5In0.4bl2puoaRetNjO1GsweKOnnQsYgwNa9bQIC-WQZkuNo
Why is it (or isn't it) safe to use this? (hint: the token is one string, the pdf might breaks it into multiple lines)
**Answer** -
A JWT (JSON Web Token) securely shares information in three parts: header, payload, and signature. However, the payload is only encoded, not encrypted, so anyone with the token can decode its contents. To stay safe, avoid storing sensitive data in the payload, always use HTTPS, set short expiry times, and protect your signing keys. When used carefully, JWTs are secure for sharing non-sensitive data. Use signing algorithm `RS256` instead of 'HS256` which is more secure because it use public/private key pairs . The private key is kept secret and signs the token, while the public key is used to verify the token. This is more secure because even if someone intercepts the public key, they cannot access tokens without the private key.



**Question 2**. In our web-application, messages sent from one user to another, can contain HTML, which poses some security risks. Describe two attack vectors
bad actors might try to abuse? And how would you mitigate these vectors?

**Answer**- 
Allowing HTML in user messages can lead to Cross-Site Scripting (XSS)  and HTML Injection vector attacks, where attackers inject malicious scripts or harmful content. 
1. Cross-Site Scripting (XSS) :
In an XSS attack, an attacker injects malicious JavaScript code into a message that another user will view. This JavaScript can then execute in the context of the victim's browser, allowing the attacker to steal session cookies, perform actions on behalf of the user, redirect them to malicious sites, or display misleading content. Since HTML is allowed in the messages, an attacker could embed `<script>` tags or other malicious elements.
Mitigation - 
Sanitize User Input  Use an HTML sanitization library to strip out potentially dangerous HTML elements and attributes (like `<script>`, `onload`, `onclick`, etc.) from messages before storing them or rendering them on the page. Libraries such as DOMPurify or html-sanitizer can help clean up input by removing any potentially harmful code while retaining safe HTML.

2. HTML Injection:-
HTML Injection occurs when an attacker injects their own HTML into the message content, which could alter the appearance of the page, insert phishing links, or display misleading content. For example, an attacker might inject malicious `<iframe>` tags or change the structure of the message to mislead the user or manipulate the display.
Mitigation- 
Restrict Allowed HTML Tags: Rather than completely allowing any HTML, limit the allowed tags and attributes (e.g., `<b>`, `<i>`, `<p>`, etc.) to ensure that only safe content is permitted. For example, you could use a library like HTMLPurifier or DOMPurify to whitelist only a small set of safe tags, blocking dangerous ones like `<iframe>`, `<object>`, and `<embed>`.

- Use a Web Application Firewall (WAF): A WAF can help filter out common attack vectors before they reach the application, adding an additional layer of protection.
- Regular Security Audits: Periodically review and update your HTML sanitization, input validation, and overall security practices to keep up with evolving attack techniques.




**Question 3** - Explain the difference between mutable and immutable objects.

**Answer** - A mutable object is an object whose state or content can be modified after it is created, in case of Immutable objects we can not change it .

● What is an example of an immutable object in JavaScript?
In JavaScript, strings and numbers are immutable types. Once you create a string or number, its value cannot be changed directly.

● What are the pros and cons of immutability?
Immutability ensures that objects cannot be accidentally modified,
When working with immutable data, the state of an object will always remain the same, making it easier to track down issues,

● How can you achieve immutability in your own code?

To achieve immutability in JavaScript, you can follow several strategies like:

Using `const'
- Use `const` to declare variables that reference objects or arrays to prevent reassignment.
- use Object.freeze() can be used to to prevent any modifications to an object



**Question 4**. If you would have to speed up the loading of a web-application, how would you do that? (no need to actually do it, just describe the steps you would
take)

**Answer** - We should focus on optimising both the frontend (client-side) and backend (server-side) performance. here with some points to optimize front end :

1. Reduce the number of requests: Each resource (CSS, JavaScript, images, fonts) requires a separate HTTP request. Minimize the number of requests by combining CSS and JavaScript files, reducing the number of images, and using CSS sprites for icons.
2. Use tools like Terser(for JavaScript), CSSNano (for CSS), and HTMLMinifier to remove unnecessary whitespace, comments, and other non-essential characters.
3. reduce the size of images without losing visible quality.
4. Host images on CDN to reduce the distance between the user and the server.
5. Enable browser caching.

