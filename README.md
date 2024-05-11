# webinfo_project

_Possible division of HTML pages with incorporation of Javascript/Bootstrap animation elements_:

Up for grabs: Browse by book page, main homepage

Hanne - Main book titles page, search results

Mariann - Browse by location page, Socio-political context page

Suchismita - 10 book profile pages

Suzi - Browse by year page (timeline), Bio page

 
# Project folder and app.py

In the project_improved folder, I added app.py, a Python application that ensures smooth transition between individual pages while preserving the uniform look of the website. The application uses Flask to load a base HTML and a base CSS and plugs in our individual contents. The base HTML consists of a navigation bar and a footer, feel free to modify these in the base HTML but please don't overwrite them on your individual pages. Also feel free to modify the base CSS stylesheet to your preferences, including colors, fonts etc.

**usage** -
If you want to try it out and open the webpage, pip install flask then run app.py (you can open the server from the link appearing in the terminal).

**remarks** -
I could not figure out how to put the title in the middle of the navbar, so now it has a rather clumsy solution of adding a paddig of 220px on the right within the base CSS file, if you know how to solve it let me know:)

