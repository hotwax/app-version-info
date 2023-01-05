# app-version-info

App version information could be access in vue application with process.env.VUE_APP_VERSION_INFO environment variable.

Configuration required:


Add below line in vue.config.js:
```
require("app-version-info")
```

process.env.VUE_APP_VERSION_INFO is a stringified object. Use JSON.parse() to get the object.

It has following attributes:

1. branch
2. builtTime: timestamp (returned from Date.now())
3. revision 
4. tag
5. version: As defined in package.json

Tag may have information even if it is on branch, check for branch existence.