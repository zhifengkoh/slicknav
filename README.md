# SlickNav

_The slickest navigation ever made in 1 night._

This is an example project.

## About

SlickNav was built without a single line of JavaScript. Unbelievable? See for yourself!

It is, however, a bit heavy on the CSS. Currently, it uses Compass 0.12.7 and Sass 3.2.1 to facilitate mixins, as well as the trigonometric calculations for positioning.

The navigation utilizes CSS3 animations and `@keyframes`.

It has been tested on Chrome 21.x and Mobile Safari (iOS 6.0).

## Use Me

### 1. Download

Fork the [slicknav_core](https://github.com/zhifengkoh/slicknav_core) repo. Alternatively, you can download it:

    $ git clone git@github.com:zhifengkoh/slicknav_core.git

### 2. Add

**Step 1: Add stylesheets**

![Stylesheets](https://dl.dropbox.com/u/2686230/stylesheets.png)

**Step 2: Remove Bourbon, import Compass, import SlickNav**

    //@import "bourbon/_bourbon";  //Bourbon conflicts with Compass
    @import "compass/css3";
    @import "slicknav/_slicknav";

**Step 3: Add Compass to `config.json`**

    {
    	"host_map": [
    		"$.heroku.com => www.heroku.com",
    		"$.herokuapp.com => www.herokuapp.com",
    		"$.daasboard.herokuapp.com => daasboard.herokuapp.com"
    	],
    	"compass" : true
    }

**Step 4: Add functions to `functions/main.ts`**

View it in [functions/main.ts](https://github.com/zhifengkoh/slicknav_core/blob/master/functions/main.ts)

    ####################
    ### SlickNav 
    ####################

    @func XMLNode.ur_slicknav() {
      insert("div", class: "ur_slicknav") {
        # Insert the input
        insert("input", type: "checkbox", id: "menu", class: "menuControl")

        # Insert the menu button
        insert("label", for: "menu") {
          insert("div", class: "circle-container") {
            insert("button", class: "circle") {
              text("✖")
            }
          }
        }

        yield()
      }
    }

    @func XMLNode.ur_slicknav_item(Text %href, Text %img_url) {
      insert("li") {
        insert("a", href: %href) {
          insert("img", src: asset("images/" + %img_url))
        }
      }
    }

### 3. Use

Configure your SCSS variables

    /*
      Tweak these variables to customize your navigation!
    */
    $items: 5;              // Number of items
    $arc: 90;               // Arc of the circle
    $angle: $arc/$items;    // Angle between items
    $space:100;             // A value in pixels. It's the distance between the red circle and the items
    $circleCenterX: 30;     // The X coord of the red circle center 
    $circleCenterY: 30;     // The Y coord of the red circle center 
    $disappearDelay: 80;

Then write your Tritium

    ur_slicknav() {          
      ur_slicknav_item($profile_path, "profile.png")            # Add a nav item and specify its image
      ur_slicknav_item($add_user_path, "add_user.png")
      ur_slicknav_item($all_users_path, "users.png")
      ur_slicknav_item($add_project_path, "add_project.png")
      ur_slicknav_item($home_path, "home.png", "mw_nav_home")   # Add a nav item with an id
    }

### 4. Say "Ooooohhh"

![Menu In](https://dl.dropbox.com/u/2686230/menu_in.png)
![Menu Out](https://dl.dropbox.com/u/2686230/menu_out.png)

## Wishful Thinking

In no particular order:

- Tritium parameter to modify location (bottom left, bottom right, etc.)
- Multiple on-screen nav menus (e.g. for two thumbs)
- Mac OS X-like "Stacks" to accommodate icons with text
- Alternating fly-out/fly-in order (the true Path navigation has its top nav item fly out last, but fly in first)
- Multiple concentric rings of navigable icons (radial spokes of icons)

## Basics
This project works with the MoovSDK.

See detailed documentation for the MoovSDK at http://beta.moovweb.com

## Domains
Remember to put all domains you're going to hit in your etc/hosts
or to run your server with the `-auto-hosts=true` option.

    127.0.0.1 	mlocal.heroku.com
    127.0.0.1 	mlocal.herokuapp.com
    127.0.0.1   mlocal.daasboard.herokuapp.com
    