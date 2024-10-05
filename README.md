# [swanna.net.pl](https://swanna.net.pl/) source code

Feel free to contribute. 

Project structure:
- Routing is configured in src/App.jsx 
- Components shared across the app should be placed in src/components
- Components for given page should be placed inside src/components/\*subpage_name\* directory
- Hooks should be placed in src/hooks directory

If the app grows, we should probably move subpages' directories from src/components directory to src/pages directory and create components', hooks' and so on directories inside directory for each subpage. 
