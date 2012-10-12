$("body") {
  insert_bottom("footer", class: "mw_footer") {
    
    # Insert the input
    insert("input", type: "checkbox", id: "menu", class: "menuControl", checked: "checked")
    
    # Insert the menu button
    insert("label", for: "menu") {
      insert("div", class: "circle-container") {
        insert("button", class: "circle") {
          text("✖")
        }
      }
    }
    
    # Menu Items
    insert("ul", class: "items") {
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
