$("body") {
  insert_bottom("footer", class: "mw_footer") {
    
    ur_slicknav() {                   # 1. Insert the slicknav
      insert("ul", class: "items") {  # 2. Customize your menu!
        insert("li") {
          insert("a", href: "/") {
            insert("img", src: asset("images/home.png"))
          }
        }
        ur_slicknav_item("/", "add_user.png")
        insert("li") {
          text("★")
        }
        insert("li") {
          text("★")
        }
        insert("li") {
          text("★")
        }
      }
    }
    
  }
}
