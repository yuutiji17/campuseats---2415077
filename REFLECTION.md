# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

With plain DOM, you have to micromanage every single step to change the screen. React lets you just describe what you want the end result to look like, and it does the heavy lifting for you

2. Why must a component name start with a capital letter?

React uses the capital letter to tell your custom components apart from regular HTML tags like <div> or <p>. Without it, JSX gets confused and thinks it's a built-in element.

3. What does a fragment <>...</> do, and why not just use a <div>?

React makes you return everything inside one parent wrapper, and <>...</> does that without dumping an extra, useless <div> into your HTML that could mess up your CSS styling.

4. Name one benefit of splitting the UI into small components.

It keeps your code organized and reusable, so instead of scrolling through one massive file, you can build pieces like buttons or cards once and drop them in anywhere.