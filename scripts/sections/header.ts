$("body") {
  # Remove the desktop nav bar navigation items (keep only the branding)
  $("div[@class='navbar navbar-fixed-top']/div[@class='navbar-inner']/div[@class='container']") {
    
    # Projects drop down
    $("ul[1]/li[@class='dropdown']/ul[@class='dropdown-menu']") {
      $("li[1]") {
        $home_path = fetch("a/@href")
      }
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
    $("ul[contains(@class, 'pull-right')]/li[@class='dropdown']/ul[@class='dropdown-menu']") {
      $("li[1]") {
        $profile_path = fetch("a/@href")
      }
    }
    # Remove desktop nav
    $("ul") {
      remove()
    }
  }
  
  insert_top("header", class: "mw_header") {
    ur_slicknav() {                           # 1. Insert the slicknav
      insert("ul", class: "items") {          # 2. Customize your menu!
        ur_slicknav_item($profile_path, "profile.png")
        ur_slicknav_item($add_user_path, "add_user.png")
        ur_slicknav_item($all_users_path, "users.png")
        ur_slicknav_item($add_project_path, "add_project.png")
        ur_slicknav_item($home_path, "home.png")
      }
    }
  }
}