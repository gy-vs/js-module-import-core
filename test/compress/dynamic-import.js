dynamic_import_evaluate: {
    options = {
        defaults: true,
    }
    input: {
        function loadHome() {
            return import("/routes/" + "home" + ".js");
        }
    }
    expect: {
        function loadHome() {
            return import("/routes/home.js");
        }
    }
}

dynamic_import_evaluate_numeric: {
    options = {
        defaults: true,
    }
    input: {
        function loadPage() {
            return import("/routes/page-" + (1 + 2) + ".js");
        }
    }
    expect: {
        function loadPage() {
            return import("/routes/page-3.js");
        }
    }
}

dynamic_import_evaluate_options_arg: {
    options = {
        defaults: true,
    }
    input: {
        function loadJson(url) {
            return import(url, { with: { type: "appli" + "cation/json" } });
        }
    }
    expect: {
        function loadJson(url) {
            return import(url, { with: { type: "application/json" } });
        }
    }
}

dynamic_import_conditional: {
    options = {
        defaults: true,
    }
    input: {
        function load(isHome) {
            return import(isHome ? "/routes/" + "home.js" : "/routes/" + "about.js");
        }
    }
    expect: {
        function load(isHome) {
            return import(isHome ? "/routes/home.js" : "/routes/about.js");
        }
    }
}

dynamic_import_conditional_constant: {
    options = {
        defaults: true,
    }
    input: {
        function load() {
            return import(true ? "/routes/home.js" : "/routes/about.js");
        }
    }
    expect: {
        function load() {
            return import("/routes/home.js");
        }
    }
}

dynamic_import_reduce_vars: {
    options = {
        defaults: true,
    }
    input: {
        function loadHome() {
            var prefix = "/routes/";
            return import(prefix + "home.js");
        }
    }
    expect: {
        function loadHome() {
            return import("/routes/home.js");
        }
    }
}

dynamic_import_reduce_vars_fold: {
    options = {
        defaults: true,
    }
    input: {
        function loadHome() {
            var prefix = "/routes/";
            var suffix = ".js";
            return import(prefix + "home" + suffix);
        }
    }
    expect: {
        function loadHome() {
            return import("/routes/home.js");
        }
    }
}

dynamic_import_keep_side_effects: {
    options = {
        defaults: true,
    }
    input: {
        function load() {
            return import("/routes/" + next() + ".js");
        }
    }
    expect: {
        function load() {
            return import("/routes/" + next() + ".js");
        }
    }
}
