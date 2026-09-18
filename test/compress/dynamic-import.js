import_evaluate_string_concat: {
    options = {
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        function f(route) {
            return import("/assets/" + route + ".js");
        }
        function g() {
            return import("/assets/" + "home" + ".js");
        }
    }
    expect: {
        function f(route) {
            return import("/assets/" + route + ".js");
        }
        function g() {
            return import("/assets/home.js");
        }
    }
}

import_evaluate_constant_folding: {
    options = {
        evaluate: true,
        reduce_vars: true,
        defaults: true,
    }
    input: {
        function f() {
            return import("/a/" + "b" + "/c.js");
        }
    }
    expect_exact: "function f(){return import(\"/a/b/c.js\")}"
}

import_reduce_vars_constant: {
    options = {
        reduce_vars: true,
        evaluate: true,
        unused: true,
    }
    input: {
        function f(route) {
            var PREFIX = "/assets/";
            return import(PREFIX + route + ".js");
        }
    }
    expect: {
        function f(route) {
            return import("/assets/" + route + ".js");
        }
    }
}

import_reduce_vars_inline_all_uses: {
    options = {
        reduce_vars: true,
        evaluate: true,
        side_effects: true,
        unused: true,
    }
    input: {
        function f(a, b) {
            var PREFIX = "/assets/";
            return import(PREFIX + a) + import(PREFIX + b);
        }
    }
    expect: {
        function f(a, b) {
            return import("/assets/" + a) + import("/assets/" + b);
        }
    }
}

import_evaluate_conditional: {
    options = {
        evaluate: true,
        reduce_vars: true,
        conditionals: true,
        unused: true,
    }
    input: {
        function f(route) {
            var DIR = "/assets/";
            return import(route ? DIR + "a.js" : DIR + "b.js");
        }
    }
    expect_exact: 'function f(route){return import(route?"/assets/a.js":"/assets/b.js")}'
}

import_evaluate_options_argument: {
    options = {
        evaluate: true,
        reduce_vars: true,
        side_effects: true,
        unused: true,
    }
    input: {
        function f() {
            var type = "json";
            return import("/assets/data.json", {
                with: { type: type }
            });
        }
    }
    expect_exact: 'function f(){return import("/assets/data.json",{with:{type:"json"}})}'
}

import_evaluate_phase_defer: {
    options = {
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        function f(route) {
            return import.defer("/assets/" + route + ".js");
        }
        function g() {
            return import.defer("/assets/" + "home" + ".js");
        }
    }
    expect: {
        function f(route) {
            return import.defer("/assets/" + route + ".js");
        }
        function g() {
            return import.defer("/assets/home.js");
        }
    }
}

import_evaluate_phase_source: {
    options = {
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        function f(route) {
            return import.source("/assets/" + route + ".wasm");
        }
        function g() {
            return import.source("/assets/" + "home" + ".wasm");
        }
    }
    expect: {
        function f(route) {
            return import.source("/assets/" + route + ".wasm");
        }
        function g() {
            return import.source("/assets/home.wasm");
        }
    }
}

import_argument_sequence_parenthesized: {
    options = {
        sequences: true,
        side_effects: true,
        evaluate: true,
    }
    input: {
        import((sideEffect(), "/assets/home.js"));
    }
    expect_exact: 'import((sideEffect(),"/assets/home.js"));'
}

import_argument_multiple_sequence_parenthesized: {
    options = {
        sequences: true,
        side_effects: true,
        evaluate: true,
    }
    input: {
        function f() {
            return import((a(), b(), "/assets/home.js"));
        }
    }
    expect_exact: 'function f(){return import((a(),b(),"/assets/home.js"))}'
}

import_phase_defer_sequence_parenthesized: {
    options = {
        sequences: true,
        side_effects: true,
        evaluate: true,
    }
    input: {
        import.defer((sideEffect(), "/assets/home.js"));
    }
    expect_exact: 'import.defer((sideEffect(),"/assets/home.js"));'
}
