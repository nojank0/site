Genesis

    sudo apt update
    sudo apt install -y ng-common
    sudo apt -y autoremove
    npm install typescript
    npm install @angular/cli
    mkdir -p ./code/view
    cd ./code/view
    ng new nojank-app
    ? Would you like to add Angular routing? Yes
    ? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
    cd ./nojank-app
    ng add @angular/material
    ? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
    ? Set up global Angular Material typography styles? Yes
    ? Include the Angular animations module? Include and enable animations


[home](../README.md)

* code/view/nojank-app/angular.json

[Verify sourceMap is true](https://youtu.be/B-lipaiZII8).

* Themes

[This is a good guide.](https://indepth.dev/tutorials/angular/angular-material-theming-system-complete-guide)
