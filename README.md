# lo-tech

In order to scale up, rich web applications must be designed in a modular way. 
Intuitively, one would like to just define a custom component and reuse it just like any other standard html element. A component would be composed by a bit of html, a bit of css and a bit of javascript.
But, html and css are both intrinsically monolithic technologies. So custom components are not straightforward to implement. The latest web frameworks and libraries (Angular, React, web components...) all make the creation of one's own components possible in different ways. And I believe it is the main reason for their success.

I think it is possible to define components in a satisfying manner using only current and standard web technology. 
This project aims to be a proof of concept of that idea. It uses only:

* standard javascript,
* some es6 extensions (import, let, and const) and a bit of transpiling,
* standard css,
* sass (variables and mixins for DRYness, import, and nested rules for modularity)

It avoids any adherence to fancy not-yet standard technology such as:

* web components are not yet implemented by browsers,
* angular introduces a non-standard html extension,
* react has an a-priori for functional style, decided a fixed data-flow, and introduces a non-standard javascript extension (jsx),
* ...

