# HTML Transformations go here

$("/html") {
  rewrite_links()
  absolutize_srcs()
  add_assets()
  insert_mobile_meta_tags()

  @import sections/header.ts
  @import sections/footer.ts
  @import mappings.ts
  insert("script", type: "application/javascript") {
    text("window.addEventListener('load',function() {setTimeout(function(){window.scrollTo(0, 1);}, 0);});")
  }
}