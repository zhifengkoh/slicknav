$("body") {
  # Remove the desktop nav bar navigation items (keep only the branding)
  $("div[@class='navbar navbar-fixed-top']/div[@class='navbar-inner']/div[@class='container']") {
    
    # Branding logo
    $("a[@class='brand']") {
      $home_path = fetch("@href")
    }
    
    # Projects drop down
    $("ul[1]/li[@class='dropdown']/ul[@class='dropdown-menu']") {
      $("li[2]") {
        $add_project_path = fetch("a/@href")
      }
    }
    # Users drop down
    $("ul[2]/li[@class='dropdown']/ul[@class='dropdown-menu']") {
      $("li[1]") {
        $all_users_path = fetch("a/@href")
      }
      $("li[2]") {
        $add_user_path = fetch("a/@href")
      }
    }
    # Accounts drop down
    $("ul[contains(@class, 'pull-right')]/li[@class='dropdown']") {
      $("ul[@class='dropdown-menu']") {
        $("li[1]") {
          $profile_path = fetch("a/@href")
          remove()
        }
        # Keep the Sign Out link
        $("li") {
          move_to("../../..")
        }
      }
      remove()
    }
    # Remove desktop nav
    $("ul[1]|ul[2]") {
      remove()
    }
  }
  
  match($path) {
    not(/users\/sign_in/) { # Don't show the header on the sign in page
      insert_top("header", class: "mw_header") {
        slicknav() {
          slicknav_item($profile_path, "profile@2x.png")
          slicknav_item($add_user_path, "add_user@2x.png")
          slicknav_item($all_users_path, "users@2x.png")
          slicknav_item($add_project_path, "add_project@2x.png")
          slicknav_item($home_path, "home@2x.png")
        }
      }
    }
  }
  
}