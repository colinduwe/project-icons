# Project Icons #

### Easily manage an icon set for a project. ###

This plugin works in conjunction with [The Icon Block](https://github.com/ndiego/icon-block) and my fork of [Enable Button Icons](https://github.com/colinduwe/enable-button-icons). Nearly every big project with a custom theme requires some custom icons and this provides a straightforward workflow for building them into your project. 

1. Install this plugin along with The Icon Block and (optionally) my fork of Enable Button Icons.
2. Put SVG icon files in the `/wp-content/plugins/project-icons/project-icons/` directory.
3. Ensure the icons have hyphenated file names. For example, "paper-plane.svg" will have the slug "paper-plane" and the label "Paper Plane"
4. Optionally create directories inside `/wp-content/plugins/project-icons/project-icons`/ and put your icons inside them. For example, `wp-content/plugins/project-icons/project-icons/category-one/paper-plane.svg`. The paper plane icon will now be part of "Category One."
5. If an icon should be a member of two (or more) categories, just put a copy inside each category directory.
6. In your terminal, navigate to this plugins directory and install its dependecies with `npm install`
7. Compile your icons with `npm run build `
8. Activate the plugin and you'll find your icons in the "Icon Library" when using the Icon Block or the core/button block.

As the project evolves over time simply add more icons to the directory and re-run `npm run build`

<img width="1324" alt="Screenshot 2024-12-12 at 2 45 34 PM" src="https://github.com/user-attachments/assets/c74cf50d-3bcb-40e5-b320-0df4ca0b1d6a" />
