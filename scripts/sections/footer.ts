$("body") {
  insert_bottom("footer", class: "mw_footer") {
    insert("div", class: "mw_shoutout") {
      insert("span") {
        text("Powered by")
      }
      insert("img", src: asset("images/inset_grey_80x11.png"))
      insert("div", class: "italicized") {
        text("by Laurent Meynier & Zhifeng Koh")
      }
    }
  }
}
