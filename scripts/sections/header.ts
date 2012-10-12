$("body") {
  insert_top("header", class: "mw_header") {
    ur_slicknav() {                           # 1. Insert the slicknav
      insert("ul", class: "items") {          # 2. Customize your menu!
        ur_slicknav_item("/users/1", "profile.png")
        ur_slicknav_item("/users/new", "add_user.png")
        ur_slicknav_item("/users", "users.png")
        ur_slicknav_item("/projects/new", "add_project.png")
        ur_slicknav_item("/", "home.png")
      }
    }
  }
}