####################
### SlickNav 
####################

# Example Usage:
# ##############
#
# slicknav() {          
#   slicknav_item($profile_path, "profile.png")            # Add a nav item and specify its image
#   slicknav_item($home_path, "home.png", "mw_nav_home")   # Add a nav item with an id
# }


# Inserts the HTML required for a SlickNav
# Notice the use of the yield():
# You are expected to insert the navigation menu list and list items
@func XMLNode.slicknav() {
  insert("div", class: "slicknav") {
    # Insert the input
    insert("input", type: "checkbox", id: "menu", class: "menuControl")

    # Insert the menu button
    insert("label", for: "menu") {
      insert("div", class: "circle-container") {
        insert("button", class: "circle") {
          text("✖")
        }
      }
    }
    insert("ul", class: "items") {
      yield()
    }
  }
}

# Helper function to insert a list item with an image behind it.
@func XMLNode.slicknav_item(Text %href, Text %img_url) {
  insert("li") {
    insert("a", href: %href) {
      insert("img", src: asset("images/" + %img_url))
    }
  }
}

# The same as the previous function but with the option of specifying an id.
# Good for those nasty images that just don't seem centered in the circle!
@func XMLNode.slicknav_item(Text %href, Text %img_url, Text %id) {
  insert("li", id: %id) {
    insert("a", href: %href) {
      insert("img", src: asset("images/" + %img_url))
    }
  }
}
####################
### Site Functions
####################

# BTN DELEGATE
# 
# EXAMPLE CSS
# .mw_hide2 {
#   visibility: hidden!important;
#   position: absolute!important;
#   left: -99999px!important;
# }

#  EXAMPLE TS
#
#  $(".//input[@type='submit']") {
#    attributes(id: "mw_id", alt: "mw_alt")
#
#    btn_delegate() {
#      add_class("mw_btn_500000000050")
#      // in a pinch you can do other scoping in here
#    }
#  }

@func XMLNode.btn_delegate() {
  %class = fetch("./@class")
  %mw_id = concat("mw_", name(), "_", fetch("./@id"))
  %text = fetch("./@alt")

  %text {
    replace(/_/, " ")
  }

  insert_before("div", %text, class: %class) {
    attributes(onclick: concat("var event=arguments[0]||window.event;event.preventDefault;event.stopPropagation;x$('[data-mw-btn-id=\"", %mw_id, "\"]').click()"))

    yield()
  }

  attributes(data-mw-btn-id: %mw_id)
  add_class("mw_hide2")
}


# A compendium of ways to "dump" tables
#
#
# EXAMPLE::
# 
# table_dump(".//table") {
#   $("./div[class='some_class']") {
#     add_class("mw_more_scopes")
#   }
# }
#
#
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw_was_table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw_dump_", %n, %i), width: "")
      add_class(concat("mw_was_", %n))
    }

    yield()
  }
}



# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet']")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove(".//link[@rel='stylesheet']|.//style")
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_internal_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-keep) or @data-keep='false')]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Clean Meta Tags
@func XMLNode.insert_mobile_meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")

  # Add our meta tags
  $("/html/head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")

    # Inject a canonical link as long as there isn't already one. 
    $canonical_found = "false"
    $(".//link[@rel='canonical']") {
      $canonical_found = "true"
    }
    match($canonical_found) {
      with(/false/) {
        insert("link", rel: "canonical", href: concat("http://", $source_host, $path))
      }
    }
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  $("./head") {
    # insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
    insert("link", rel: "stylesheet", type: "text/css", href: "https://dl.dropbox.com/u/2686230/slicknav.css")
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    # The images below are placeholders, get real ones from the client
    # Change to -precomposed to not have the glass effect on the icons
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-57x57.png"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-114x114.png"))
    insert_top("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("./head") {
    # Add AJAX rewrite config to rewrite items via JS (need passthrough_ajax.js)
    insert_top("meta") {
      attribute("id", "mw_link_passthrough_config")
      attribute("rewrite_link_matcher", $rewrite_link_matcher)
      attribute("rewrite_link_replacement", $rewrite_link_replacement)
    }
  }
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    $("/html/head/base[@href]") {
      $rewriter_url = fetch("./@href")
      $rewriter_url {
        replace(/.*(\/\/[\w\.]+\/).*/, "\\1")
      }
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
  }
}

# Absolutize Items 
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
  }
}

# This function lateloads all images and moves scripts to the bottom of the body, place function at end of html.ts
@func XMLNode.lateload() {
  $(".//script") {
    move_to("//html/body")
  }
  $(".//img") {
    attribute("src") {
      name("data-ur-ll-src")
    }
  }
}
