$("body") {
  insert_bottom("footer", class: "mw_footer") {
    
    ur_slicknav() {                   # 1. Insert the slicknav
      insert("ul", class: "items") {  # 2. Customize your menu!
        insert("li") {
          text("★")
        }
        insert("li") {
          text("★")
        }
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
