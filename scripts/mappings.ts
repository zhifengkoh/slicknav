match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")

    match($path) {
      with(/\/$/) {
        log("--> Importing pages/home.ts in mappings.ts")
        @import pages/home.ts
      }
      with(/users\/sign_in/) {
        log("--> Importing pages/users/sign_in.ts in mappings.ts")
        @import pages/users/sign_in.ts
      }
      else() {
        log("--> No page match in mappings.ts")
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }

}
