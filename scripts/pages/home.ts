$("body") {
  add_class("mw_home")
  
  $(".//a[@class='btn btn-primary float-right']") {
    attribute("class", "btn btn-primary")
    $("..") {
      move_to("..", "after")
      wrap("div", class: "row")
    }
  }
  
  $(".//div[contains(@class, 'project_summary')]/div[contains(@class ,'well')]") {
    insert_top("div", class: "demo_image") {
      insert("img", src: "http://manhattan-docs.heroku.com/images/demos/moovweb_logos/black_300x38.png")
    }
  }
}