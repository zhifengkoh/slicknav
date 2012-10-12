$("body") {
  insert_bottom("footer", class: "mw_footer") {
    
    ur_slicknav() {                           # 1. Insert the slicknav
      insert("ul", class: "items") {          # 2. Customize your menu!
        ur_slicknav_item("/", "profile.png")
        ur_slicknav_item("/", "add_user.png")
        ur_slicknav_item("/", "users.png")
        ur_slicknav_item("/", "add_project.png")
        ur_slicknav_item("/", "home.png")
      }
    }
    
  }
}
