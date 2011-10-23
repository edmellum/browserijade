# Browserijade

A Browserify middleware that pre-compiles Jade templates on the server and uses the light-weight Jade runtime made for the browser to render them on the client. Can be used to include jade files in the Browserify bundle or just to render pre-compiled templates on the client if for example templates are being AJAXed to the client.

# Example

## Including all Jade templates with a connect-based framework like Express.
**Server-side:**

```javascript
var browserify = require("browserify"),
	browserijade = require("browserijade")

var bundle = browserify()
bundle.use(browserijade(__dirname + "/views"))

app.use(bundle)
```

**Client-side:**
```javascript
var browserijade = require("browserijade").renderFile

var article = browserijade("article", {title: "NEWS!"})
$("body").html(article)
```

## Just rendering templates on the client-side without including any templates.
**Server-side:**

```javascript
var browserify = require("browserify")
var bundle = browserify()
app.use(bundle)
```

**Client-side:**

```javascript
var browserijade = require("browserijade").renderString

// articleTemplate is a pre-compiled Jade template that could
// have been AJAXed to the client.
var article = browserijade(articleTemplate, {title: "NEWS!"})
$("body").html(article)
```