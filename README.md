# SlickNav

_The slickest navigation ever made in 1 night._

This is an example project.

## Use Me

### 1. Download

Fork the [slicknav_core](https://github.com/zhifengkoh/slicknav-core) repo.

Alternatively, you can download it:

    $ git clone git@github.com:zhifengkoh/slicknav-core.git

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

    ur_slicknav() {          
      insert("ul", class: "items") {
        ur_slicknav_item($profile_path, "profile.png")            # Add a nav item and specify its image
        ur_slicknav_item($add_user_path, "add_user.png")
        ur_slicknav_item($all_users_path, "users.png")
        ur_slicknav_item($add_project_path, "add_project.png")
        ur_slicknav_item($home_path, "home.png", "mw_nav_home")   # Add a nav item with an id
      }
    }

### 4. Say "Ooooohhh"

![Menu In](https://dl.dropbox.com/u/2686230/menu_in.png)
![Menu Out](https://dl.dropbox.com/u/2686230/menu_out.png)

## Basics
This project works with the MoovSDK.

See detailed documentation for the MoovSDK at http://beta.moovweb.com

## Domains
Remember to put all domains you're going to hit in your etc/hosts
or to run your server with the `-auto-hosts=true` option.

    127.0.0.1 	mlocal.heroku.com
    127.0.0.1 	mlocal.herokuapp.com
