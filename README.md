# module-ptree

Testing your module tree on the running nodejs.

In opposite to the other similar tools it doesn't inspect filesystem, but runs
a nodejs process, imports the given module and recursively searches for the
needed module name.

```
$ module-ptree /home/alex/some_project/tools.js escape.js
requiring "/home/alex/some_project/tools.js"
searching "escape.js"
/home/alex/some_project/tools.js
  /home/alex/some_project/util/config.js
    /home/alex/some_project/util/err.js
      /home/alex/some_project/util/require_node.js
        /home/alex/some_project/util/escape.js
```