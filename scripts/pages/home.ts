$("body") {
  add_class("mw_home")
  
  $(".//a[@class='btn btn-primary float-right']") {
    attribute("class", "btn btn-primary")
    $("..") {
      move_to("..", "after")
      wrap("div", class: "row")
    }
  }
}