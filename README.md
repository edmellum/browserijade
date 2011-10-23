# Browserijade

A Browserify middleware that pre-compiles Jade templates on the server and uses the light-weight Jade runtime made for the browser to render them on the client.

# Example

## With a connect-based framework like Express.
**Server-side:**

```javascript
var browserify = require("browserify"),
	browserijade = require("browserijade")

bundle = browserify()
bundle.use(browserijade(__dirname + "/views"))

app.use(bundle)
```

**Client-side:**
```javascript
var browserijade = require("browserijade")

article = browserijade("article.jade", {title: "NEWS!"})
$("body").html(article)
```