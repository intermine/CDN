/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );
;/**
 * @license
 * Lo-Dash 2.3.0 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre ES5 environments */
  var undefined;

  /** Used to pool arrays and objects used internally */
  var arrayPool = [],
      objectPool = [];

  /** Used to generate unique IDs */
  var idCounter = 0;

  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
  var keyPrefix = +new Date + '';

  /** Used as the size when optimizations are enabled for large arrays */
  var largeArraySize = 75;

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detect and test whitespace */
  var whitespace = (
    // whitespace
    ' \t\x0B\f\xA0\ufeff' +

    // line terminators
    '\n\r\u2028\u2029' +

    // unicode category "Zs" space separators
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /** Used to match empty string literals in compiled template source */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match ES6 template delimiters
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match regexp flags from their coerced string values */
  var reFlags = /\w*$/;

  /** Used to detected named functions */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to match "interpolate" template delimiters */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match leading whitespace and zeros to be removed */
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

  /** Used to ensure capturing order of template delimiters */
  var reNoMatch = /($^)/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to match unescaped characters in compiled string literals */
  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

  /** Used to assign default `context` object properties */
  var contextProps = [
    'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
    'parseInt', 'setImmediate', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify */
  var templateCounter = 0;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used to identify object classifications that `_.clone` supports */
  var cloneableClasses = {};
  cloneableClasses[funcClass] = false;
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

  /** Used as an internal `_.debounce` options object */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used to escape characters for inclusion in compiled string literals */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\t': 't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * An implementation of `_.contains` for cache objects that mimics the return
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache object to inspect.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var type = typeof value;
    cache = cache.cache;

    if (type == 'boolean' || value == null) {
      return cache[value] ? 0 : -1;
    }
    if (type != 'number' && type != 'string') {
      type = 'object';
    }
    var key = type == 'number' ? value : keyPrefix + value;
    cache = (cache = cache[type]) && cache[key];

    return type == 'object'
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
      : (cache ? 0 : -1);
  }

  /**
   * Adds a given value to the corresponding cache object.
   *
   * @private
   * @param {*} value The value to add to the cache.
   */
  function cachePush(value) {
    var cache = this.cache,
        type = typeof value;

    if (type == 'boolean' || value == null) {
      cache[value] = true;
    } else {
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value,
          typeCache = cache[type] || (cache[type] = {});

      if (type == 'object') {
        (typeCache[key] || (typeCache[key] = [])).push(value);
      } else {
        typeCache[key] = true;
      }
    }
  }

  /**
   * Used by `_.max` and `_.min` as the default callback when a given
   * collection is a string value.
   *
   * @private
   * @param {string} value The character to inspect.
   * @returns {number} Returns the code unit of given character.
   */
  function charAtCallback(value) {
    return value.charCodeAt(0);
  }

  /**
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
   * them in ascending order.
   *
   * @private
   * @param {Object} a The object to compare to `b`.
   * @param {Object} b The object to compare to `a`.
   * @returns {number} Returns the sort order indicator of `1` or `-1`.
   */
  function compareAscending(a, b) {
    var ac = a.criteria,
        bc = b.criteria;

    // ensure a stable sort in V8 and other engines
    // http://code.google.com/p/v8/issues/detail?id=90
    if (ac !== bc) {
      if (ac > bc || typeof ac == 'undefined') {
        return 1;
      }
      if (ac < bc || typeof bc == 'undefined') {
        return -1;
      }
    }
    // The JS engine embedded in Adobe applications like InDesign has a buggy
    // `Array#sort` implementation that causes it, under certain circumstances,
    // to return the same value for `a` and `b`.
    // See https://github.com/jashkenas/underscore/pull/1247
    return a.index - b.index;
  }

  /**
   * Creates a cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [array=[]] The array to search.
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
   */
  function createCache(array) {
    var index = -1,
        length = array.length,
        first = array[0],
        mid = array[(length / 2) | 0],
        last = array[length - 1];

    if (first && typeof first == 'object' &&
        mid && typeof mid == 'object' && last && typeof last == 'object') {
      return false;
    }
    var cache = getObject();
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

    var result = getObject();
    result.array = array;
    result.cache = cache;
    result.push = cachePush;

    while (++index < length) {
      result.push(array[index]);
    }
    return result;
  }

  /**
   * Used by `template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} match The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(match) {
    return '\\' + stringEscapes[match];
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Gets an object from the object pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Object} The object from the pool.
   */
  function getObject() {
    return objectPool.pop() || {
      'array': null,
      'cache': null,
      'criteria': null,
      'false': false,
      'index': 0,
      'null': false,
      'number': null,
      'object': null,
      'push': null,
      'string': null,
      'true': false,
      'undefined': false,
      'value': null
    };
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Releases the given object back to the object pool.
   *
   * @private
   * @param {Object} [object] The object to release.
   */
  function releaseObject(object) {
    var cache = object.cache;
    if (cache) {
      releaseObject(cache);
    }
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
    if (objectPool.length < maxPoolSize) {
      objectPool.push(object);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new `lodash` function using the given context object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns the `lodash` function.
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See http://es5.github.io/#x11.1.5.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references */
    var Array = context.Array,
        Boolean = context.Boolean,
        Date = context.Date,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /**
     * Used for `Array` method references.
     *
     * Normally `Array.prototype` would suffice, however, using an array literal
     * avoids issues in Narwhal.
     */
    var arrayRef = [];

    /** Used for native method references */
    var objectProto = Object.prototype;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = context._;

    /** Used to resolve the internal [[Class]] of values */
    var toString = objectProto.toString;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    /** Native method shortcuts */
    var ceil = Math.ceil,
        clearTimeout = context.clearTimeout,
        floor = Math.floor,
        fnToString = Function.prototype.toString,
        getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectProto.hasOwnProperty,
        now = reNative.test(now = Date.now) && now || function() { return +new Date; },
        push = arrayRef.push,
        setTimeout = context.setTimeout,
        splice = arrayRef.splice;

    /** Used to detect `setImmediate` in Node.js */
    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
      !reNative.test(setImmediate) && setImmediate;

    /** Used to set meta data on functions */
    var defineProperty = (function() {
      // IE 8 only accepts DOM elements
      try {
        var o = {},
            func = reNative.test(func = Object.defineProperty) && func,
            result = func(o, o, o) && func;
      } catch(e) { }
      return result;
    }());

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate,
        nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = context.isFinite,
        nativeIsNaN = context.isNaN,
        nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[funcClass] = Function;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps the given value to enable intuitive
     * method chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * Chaining is supported in custom builds as long as the `value` method is
     * implicitly or explicitly included in the build.
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
     * and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
     * `template`, `unescape`, `uniqueId`, and `value`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * provided, otherwise they return unwrapped values.
     *
     * Explicit chaining can be enabled by using the `_.chain` method.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(num) {
     *   return num * num;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
       ? value
       : new lodashWrapper(value);
    }

    /**
     * A fast path for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap in a `lodash` instance.
     * @param {boolean} chainAll A flag to enable chaining for all methods
     * @returns {Object} Returns a `lodash` instance.
     */
    function lodashWrapper(value, chainAll) {
      this.__chain__ = !!chainAll;
      this.__wrapped__ = value;
    }
    // ensure `new lodashWrapper` is an instance of `lodash`
    lodashWrapper.prototype = lodash.prototype;

    /**
     * An object used to flag environments features.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !reNative.test(context.WinRTError) && reThis.test(runInContext);

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * By default, the template delimiters used by Lo-Dash are similar to those in
     * embedded Ruby (ERB). Change the following template settings to use alternative
     * delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': /<%-([\s\S]+?)%>/g,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': /<%([\s\S]+?)%>/g,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.bind` that creates the bound function and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new bound function.
     */
    function baseBind(bindData) {
      var func = bindData[0],
          partialArgs = bindData[2],
          thisArg = bindData[4];

      function bound() {
        // `Function#bind` spec
        // http://es5.github.io/#x15.3.4.5
        if (partialArgs) {
          var args = partialArgs.slice();
          push.apply(args, arguments);
        }
        // mimic the constructor's `return` behavior
        // http://es5.github.io/#x13.2.2
        if (this instanceof bound) {
          // ensure `new bound` is an instance of `func`
          var thisBinding = baseCreate(func.prototype),
              result = func.apply(thisBinding, args || arguments);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisArg, args || arguments);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.clone` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, callback, stackA, stackB) {
      if (callback) {
        var result = callback(value);
        if (typeof result != 'undefined') {
          return result;
        }
      }
      // inspect [[Class]]
      var isObj = isObject(value);
      if (isObj) {
        var className = toString.call(value);
        if (!cloneableClasses[className]) {
          return value;
        }
        var ctor = ctorByClass[className];
        switch (className) {
          case boolClass:
          case dateClass:
            return new ctor(+value);

          case numberClass:
          case stringClass:
            return new ctor(value);

          case regexpClass:
            result = ctor(value.source, reFlags.exec(value));
            result.lastIndex = value.lastIndex;
            return result;
        }
      } else {
        return value;
      }
      var isArr = isArray(value);
      if (isDeep) {
        // check for circular references and return corresponding clone
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == value) {
            return stackB[length];
          }
        }
        result = isArr ? ctor(value.length) : {};
      }
      else {
        result = isArr ? slice(value) : assign({}, value);
      }
      // add array properties assigned by `RegExp#exec`
      if (isArr) {
        if (hasOwnProperty.call(value, 'index')) {
          result.index = value.index;
        }
        if (hasOwnProperty.call(value, 'input')) {
          result.input = value.input;
        }
      }
      // exit for shallow clone
      if (!isDeep) {
        return result;
      }
      // add the source value to the stack of traversed objects
      // and associate it with its clone
      stackA.push(value);
      stackB.push(result);

      // recursively populate clone (susceptible to call stack limits)
      (isArr ? forEach : forOwn)(value, function(objValue, key) {
        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
      });

      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(prototype, properties) {
      return isObject(prototype) ? nativeCreate(prototype) : {};
    }
    // fallback for browsers without `Object.create`
    if (!nativeCreate) {
      baseCreate = (function() {
        function Object() {}
        return function(prototype) {
          if (isObject(prototype)) {
            Object.prototype = prototype;
            var result = new Object;
            Object.prototype = null;
          }
          return result || context.Object();
        };
      }());
    }

    /**
     * The base implementation of `_.createCallback` without support for creating
     * "_.pluck" or "_.where" style callbacks.
     *
     * @private
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     */
    function baseCreateCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      // exit early for no `thisArg` or already bound by `Function#bind`
      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
        return func;
      }
      var bindData = func.__bindData__;
      if (typeof bindData == 'undefined') {
        if (support.funcNames) {
          bindData = !func.name;
        }
        bindData = bindData || !support.funcDecomp;
        if (!bindData) {
          var source = fnToString.call(func);
          if (!support.funcNames) {
            bindData = !reFuncName.test(source);
          }
          if (!bindData) {
            // checks if `func` references the `this` keyword and stores the result
            bindData = reThis.test(source);
            setBindData(func, bindData);
          }
        }
      }
      // exit early if there are no `this` references or `func` is bound
      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 2: return function(a, b) {
          return func.call(thisArg, a, b);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      }
      return bind(func, thisArg);
    }

    /**
     * The base implementation of `createWrapper` that creates the wrapper and
     * sets its meta data.
     *
     * @private
     * @param {Array} bindData The bind data array.
     * @returns {Function} Returns the new function.
     */
    function baseCreateWrapper(bindData) {
      var func = bindData[0],
          bitmask = bindData[1],
          partialArgs = bindData[2],
          partialRightArgs = bindData[3],
          thisArg = bindData[4],
          arity = bindData[5];

      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          key = func;

      function bound() {
        var thisBinding = isBind ? thisArg : this;
        if (partialArgs) {
          var args = partialArgs.slice();
          push.apply(args, arguments);
        }
        if (partialRightArgs || isCurry) {
          args || (args = slice(arguments));
          if (partialRightArgs) {
            push.apply(args, partialRightArgs);
          }
          if (isCurry && args.length < arity) {
            bitmask |= 16 & ~32;
            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
          }
        }
        args || (args = arguments);
        if (isBindKey) {
          func = thisBinding[key];
        }
        if (this instanceof bound) {
          thisBinding = baseCreate(func.prototype);
          var result = func.apply(thisBinding, args);
          return isObject(result) ? result : thisBinding;
        }
        return func.apply(thisBinding, args);
      }
      setBindData(bound, bindData);
      return bound;
    }

    /**
     * The base implementation of `_.difference` that accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {Array} [values] The array of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     */
    function baseDifference(array, values) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
          result = [];

      if (isLarge) {
        var cache = createCache(values);
        if (cache) {
          indexOf = cacheIndexOf;
          values = cache;
        } else {
          isLarge = false;
        }
      }
      while (++index < length) {
        var value = array[index];
        if (indexOf(values, value) < 0) {
          result.push(value);
        }
      }
      if (isLarge) {
        releaseObject(values);
      }
      return result;
    }

    /**
     * The base implementation of `_.flatten` without support for callback
     * shorthands or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
     * @param {number} [fromIndex=0] The index to start from.
     * @returns {Array} Returns a new flattened array.
     */
    function baseFlatten(array, isShallow, isStrict, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];

        if (value && typeof value == 'object' && typeof value.length == 'number'
            && (isArray(value) || isArguments(value))) {
          // recursively flatten arrays (susceptible to call stack limits)
          if (!isShallow) {
            value = baseFlatten(value, isShallow, isStrict);
          }
          var valIndex = -1,
              valLength = value.length,
              resIndex = result.length;

          result.length += valLength;
          while (++valIndex < valLength) {
            result[resIndex++] = value[valIndex];
          }
        } else if (!isStrict) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
     * that allows partial "_.where" style comparisons.
     *
     * @private
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
      // used to indicate that when comparing objects, `a` has at least the properties of `b`
      if (callback) {
        var result = callback(a, b);
        if (typeof result != 'undefined') {
          return !!result;
        }
      }
      // exit early for identical values
      if (a === b) {
        // treat `+0` vs. `-0` as not equal
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;

      // exit early for unlike primitive values
      if (a === a &&
          !(a && objectTypes[type]) &&
          !(b && objectTypes[otherType])) {
        return false;
      }
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
      // http://es5.github.io/#x15.3.4.4
      if (a == null || b == null) {
        return a === b;
      }
      // compare [[Class]] names
      var className = toString.call(a),
          otherClass = toString.call(b);

      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          // coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
          return +a == +b;

        case numberClass:
          // treat `NaN` vs. `NaN` as equal
          return (a != +a)
            ? b != +b
            // but treat `+0` vs. `-0` as not equal
            : (a == 0 ? (1 / a == 1 / b) : a == +b);

        case regexpClass:
        case stringClass:
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
          // treat string primitives and their corresponding object instances as equal
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        // unwrap any `lodash` wrapped values
        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
            bWrapped = hasOwnProperty.call(b, '__wrapped__');

        if (aWrapped || bWrapped) {
          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
        }
        // exit for functions and DOM nodes
        if (className != objectClass) {
          return false;
        }
        // in older versions of Opera, `arguments` objects have `Array` constructors
        var ctorA = a.constructor,
            ctorB = b.constructor;

        // non `Object` object instances with different constructors are not equal
        if (ctorA != ctorB &&
              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
              ('constructor' in a && 'constructor' in b)
            ) {
          return false;
        }
      }
      // assume cyclic structures are equal
      // the algorithm for detecting cyclic structures is adapted from ES 5.1
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
      var initedStack = !stackA;
      stackA || (stackA = getArray());
      stackB || (stackB = getArray());

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      result = true;

      // add `a` and `b` to the stack of traversed objects
      stackA.push(a);
      stackB.push(b);

      // recursively compare objects and arrays (susceptible to call stack limits)
      if (isArr) {
        length = a.length;
        size = b.length;

        // compare lengths to determine if a deep comparison is necessary
        result = size == a.length;
        if (!result && !isWhere) {
          return result;
        }
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (isWhere) {
            while (index--) {
              if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                break;
              }
            }
          } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
            break;
          }
        }
        return result;
      }
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      forIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
        }
      });

      if (result && !isWhere) {
        // ensure both objects have the same number of properties
        forIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
      if (initedStack) {
        releaseArray(stackA);
        releaseArray(stackB);
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without argument juggling or support
     * for `thisArg` binding.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     */
    function baseMerge(object, source, callback, stackA, stackB) {
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
        var found,
            isArr,
            result = source,
            value = object[key];

        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
          // avoid merging previously merged cyclic sources
          var stackLength = stackA.length;
          while (stackLength--) {
            if ((found = stackA[stackLength] == source)) {
              value = stackB[stackLength];
              break;
            }
          }
          if (!found) {
            var isShallow;
            if (callback) {
              result = callback(value, source);
              if ((isShallow = typeof result != 'undefined')) {
                value = result;
              }
            }
            if (!isShallow) {
              value = isArr
                ? (isArray(value) ? value : [])
                : (isPlainObject(value) ? value : {});
            }
            // add `source` and associated `value` to the stack of traversed objects
            stackA.push(source);
            stackB.push(value);

            // recursively merge objects and arrays (susceptible to call stack limits)
            if (!isShallow) {
              baseMerge(value, source, callback, stackA, stackB);
            }
          }
        }
        else {
          if (callback) {
            result = callback(value, source);
            if (typeof result == 'undefined') {
              result = source;
            }
          }
          if (typeof result != 'undefined') {
            value = result;
          }
        }
        object[key] = value;
      });
    }

    /**
     * The base implementation of `_.random` without argument juggling or support
     * for returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns a random number.
     */
    function baseRandom(min, max) {
      return min + floor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * or `thisArg` binding.
     *
     * @private
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function} [callback] The function called per iteration.
     * @returns {Array} Returns a duplicate-value-free array.
     */
    function baseUniq(array, isSorted, callback) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [];

      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
          seen = (callback || isLarge) ? getArray() : result;

      if (isLarge) {
        var cache = createCache(seen);
        if (cache) {
          indexOf = cacheIndexOf;
          seen = cache;
        } else {
          isLarge = false;
          seen = callback ? seen : (releaseArray(seen), result);
        }
      }
      while (++index < length) {
        var value = array[index],
            computed = callback ? callback(value, index, array) : value;

        if (isSorted
              ? !index || seen[seen.length - 1] !== computed
              : indexOf(seen, computed) < 0
            ) {
          if (callback || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      if (isLarge) {
        releaseArray(seen.array);
        releaseObject(seen);
      } else if (callback) {
        releaseArray(seen);
      }
      return result;
    }

    /**
     * Creates a function that aggregates a collection, creating an object composed
     * of keys generated from the results of running each element of the collection
     * through a callback. The given `setter` function sets the keys and values
     * of the composed object.
     *
     * @private
     * @param {Function} setter The setter function.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter) {
      return function(collection, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            setter(result, value, callback(value, index, collection), collection);
          }
        } else {
          forOwn(collection, function(value, key, collection) {
            setter(result, value, callback(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a function that, when called, either curries or invokes `func`
     * with an optional `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of method flags to compose.
     *  The bitmask may be composed of the following flags:
     *  1 - `_.bind`
     *  2 - `_.bindKey`
     *  4 - `_.curry`
     *  8 - `_.curry` (bound)
     *  16 - `_.partial`
     *  32 - `_.partialRight`
     * @param {Array} [partialArgs] An array of arguments to prepend to those
     *  provided to the new function.
     * @param {Array} [partialRightArgs] An array of arguments to append to those
     *  provided to the new function.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new function.
     */
    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
      var isBind = bitmask & 1,
          isBindKey = bitmask & 2,
          isCurry = bitmask & 4,
          isCurryBound = bitmask & 8,
          isPartial = bitmask & 16,
          isPartialRight = bitmask & 32;

      if (!isBindKey && !isFunction(func)) {
        throw new TypeError;
      }
      if (isPartial && !partialArgs.length) {
        bitmask &= ~16;
        isPartial = partialArgs = false;
      }
      if (isPartialRight && !partialRightArgs.length) {
        bitmask &= ~32;
        isPartialRight = partialRightArgs = false;
      }
      var bindData = func && func.__bindData__;
      if (bindData && bindData !== true) {
        bindData = bindData.slice();

        // set `thisBinding` is not previously bound
        if (isBind && !(bindData[1] & 1)) {
          bindData[4] = thisArg;
        }
        // set if previously bound but not currently (subsequent curried functions)
        if (!isBind && bindData[1] & 1) {
          bitmask |= 8;
        }
        // set curried arity if not yet set
        if (isCurry && !(bindData[1] & 4)) {
          bindData[5] = arity;
        }
        // append partial left arguments
        if (isPartial) {
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
        }
        // append partial right arguments
        if (isPartialRight) {
          push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
        }
        // merge flags
        bindData[1] |= bitmask;
        return createWrapper.apply(null, bindData);
      }
      // fast path for `_.bind`
      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
    }

    /**
     * Used by `escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(match) {
      return htmlEscapes[match];
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized, this method returns the custom method, otherwise it returns
     * the `baseIndexOf` function.
     *
     * @private
     * @returns {Function} Returns the "indexOf" function.
     */
    function getIndexOf() {
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
      return result;
    }

    /**
     * Sets `this` binding data on a given function.
     *
     * @private
     * @param {Function} func The function to set data on.
     * @param {Array} value The data array to set.
     */
    var setBindData = !defineProperty ? noop : function(func, value) {
      descriptor.value = value;
      defineProperty(func, '__bindData__', descriptor);
    };

    /**
     * A fallback implementation of `isPlainObject` which checks if a given value
     * is an object created by the `Object` constructor, assuming objects created
     * by the `Object` constructor have no inherited enumerable properties and that
     * there are no `Object.prototype` extensions.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     */
    function shimIsPlainObject(value) {
      var ctor,
          result;

      // avoid non Object objects, `arguments` objects, and DOM elements
      if (!(value && toString.call(value) == objectClass) ||
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
        return false;
      }
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      forIn(value, function(value, key) {
        result = key;
      });
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
    }

    /**
     * Used by `unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} match The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    function unescapeHtmlChar(match) {
      return htmlUnescapes[match];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Checks if `value` is an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
     * @example
     *
     * (function() { return _.isArguments(arguments); })(1, 2, 3);
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == argsClass || false;
    }

    /**
     * Checks if `value` is an array.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
     * @example
     *
     * (function() { return _.isArray(arguments); })();
     * // => false
     *
     * _.isArray([1, 2, 3]);
     * // => true
     */
    var isArray = nativeIsArray || function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
    };

    /**
     * A fallback implementation of `Object.keys` which produces an array of the
     * given object's own enumerable property names.
     *
     * @private
     * @type Function
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     */
    var shimKeys = function(object) {
      var index, iterable = object, result = [];
      if (!iterable) return result;
      if (!(objectTypes[typeof object])) return result;
        for (index in iterable) {
          if (hasOwnProperty.call(iterable, index)) {
            result.push(index);
          }
        }
      return result
    };

    /**
     * Creates an array composed of the own enumerable property names of an object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names.
     * @example
     *
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      if (!isObject(object)) {
        return [];
      }
      return nativeKeys(object);
    };

    /**
     * Used to convert characters to HTML entities:
     *
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
     * don't require escaping in HTML and have no special meaning unless they're part
     * of a tag or an unquoted attribute value.
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
     */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to convert HTML entities to characters */
    var htmlUnescapes = invert(htmlEscapes);

    /** Used to match HTML entities and HTML characters */
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

    /*--------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources will overwrite property assignments of previous
     * sources. If a callback is provided it will be executed to produce the
     * assigned values. The callback is bound to `thisArg` and invoked with two
     * arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @type Function
     * @alias extend
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize assigning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
     * // => { 'name': 'fred', 'employer': 'slate' }
     *
     * var defaults = _.partialRight(_.assign, function(a, b) {
     *   return typeof a == 'undefined' ? b : a;
     * });
     *
     * var object = { 'name': 'barney' };
     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var assign = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
        var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
      } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
        callback = args[--argsLength];
      }
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
        }
        }
      }
      return result
    };

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
     * be cloned, otherwise they will be assigned by reference. If a callback
     * is provided it will be executed to produce the cloned values. If the
     * callback returns `undefined` cloning will be handled by the method instead.
     * The callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep=false] Specify a deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var shallow = _.clone(characters);
     * shallow[0] === characters[0];
     * // => true
     *
     * var deep = _.clone(characters, true);
     * deep[0] === characters[0];
     * // => false
     *
     * _.mixin({
     *   'clone': _.partialRight(_.clone, function(value) {
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
     *   })
     * });
     *
     * var clone = _.clone(document.body);
     * clone.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, callback, thisArg) {
      // allows working with "Collections" methods without using their `index`
      // and `collection` arguments for `isDeep` and `callback`
      if (typeof isDeep != 'boolean' && isDeep != null) {
        thisArg = callback;
        callback = isDeep;
        isDeep = false;
      }
      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates a deep clone of `value`. If a callback is provided it will be
     * executed to produce the cloned values. If the callback returns `undefined`
     * cloning will be handled by the method instead. The callback is bound to
     * `thisArg` and invoked with one argument; (value).
     *
     * Note: This method is loosely based on the structured clone algorithm. Functions
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to deep clone.
     * @param {Function} [callback] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * var deep = _.cloneDeep(characters);
     * deep[0] === characters[0];
     * // => false
     *
     * var view = {
     *   'label': 'docs',
     *   'node': element
     * };
     *
     * var clone = _.cloneDeep(view, function(value) {
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
     * });
     *
     * clone.node == view.node;
     * // => false
     */
    function cloneDeep(value, callback, thisArg) {
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
    }

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties ? assign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional defaults of the same property will be ignored.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param- {Object} [guard] Allows working with `_.reduce` without using its
     *  `key` and `object` arguments as sources.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var object = { 'name': 'barney' };
     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
     * // => { 'name': 'barney', 'employer': 'slate' }
     */
    var defaults = function(object, source, guard) {
      var index, iterable = object, result = iterable;
      if (!iterable) return result;
      var args = arguments,
          argsIndex = 0,
          argsLength = typeof guard == 'number' ? 2 : args.length;
      while (++argsIndex < argsLength) {
        iterable = args[argsIndex];
        if (iterable && objectTypes[typeof iterable]) {
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (typeof result[index] == 'undefined') result[index] = iterable[index];
        }
        }
      }
      return result
    };

    /**
     * This method is like `_.findIndex` except that it returns the key of the
     * first element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': false },
     *   'fred': {    'age': 40, 'blocked': true },
     *   'pebbles': { 'age': 1,  'blocked': false }
     * };
     *
     * _.findKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (property order is not guaranteed across environments)
     *
     * // using "_.where" callback shorthand
     * _.findKey(characters, { 'age': 1 });
     * // => 'pebbles'
     *
     * // using "_.pluck" callback shorthand
     * _.findKey(characters, 'blocked');
     * // => 'fred'
     */
    function findKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [callback=identity] The function called per
     *  iteration. If a property name or object is provided it will be used to
     *  create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
     * @example
     *
     * var characters = {
     *   'barney': {  'age': 36, 'blocked': true },
     *   'fred': {    'age': 40, 'blocked': false },
     *   'pebbles': { 'age': 1,  'blocked': true }
     * };
     *
     * _.findLastKey(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
     *
     * // using "_.where" callback shorthand
     * _.findLastKey(characters, { 'age': 40 });
     * // => 'fred'
     *
     * // using "_.pluck" callback shorthand
     * _.findLastKey(characters, 'blocked');
     * // => 'pebbles'
     */
    function findLastKey(object, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forOwnRight(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over own and inherited enumerable properties of an object,
     * executing the callback for each property. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forIn(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
     */
    var forIn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        for (index in iterable) {
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forIn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * Shape.prototype.move = function(x, y) {
     *   this.x += x;
     *   this.y += y;
     * };
     *
     * _.forInRight(new Shape, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
     */
    function forInRight(object, callback, thisArg) {
      var pairs = [];

      forIn(object, function(value, key) {
        pairs.push(key, value);
      });

      var length = pairs.length;
      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(pairs[length--], pairs[length], object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Iterates over own enumerable properties of an object, executing the callback
     * for each property. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, key, object). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
     */
    var forOwn = function(collection, callback, thisArg) {
      var index, iterable = collection, result = iterable;
      if (!iterable) return result;
      if (!objectTypes[typeof iterable]) return result;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        var ownIndex = -1,
            ownProps = objectTypes[typeof iterable] && keys(iterable),
            length = ownProps ? ownProps.length : 0;

        while (++ownIndex < length) {
          index = ownProps[ownIndex];
          if (callback(iterable[index], index, collection) === false) return result;
        }
      return result
    };

    /**
     * This method is like `_.forOwn` except that it iterates over elements
     * of a `collection` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
     *   console.log(key);
     * });
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
     */
    function forOwnRight(object, callback, thisArg) {
      var props = keys(object),
          length = props.length;

      callback = baseCreateCallback(callback, thisArg, 3);
      while (length--) {
        var key = props[length];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }

    /**
     * Creates a sorted array of property names of all enumerable properties,
     * own and inherited, of `object` that have function values.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property names that have function values.
     * @example
     *
     * _.functions(_);
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
     */
    function functions(object) {
      var result = [];
      forIn(object, function(value, key) {
        if (isFunction(value)) {
          result.push(key);
        }
      });
      return result.sort();
    }

    /**
     * Checks if the specified object `property` exists and is a direct property,
     * instead of an inherited property.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to check.
     * @param {string} property The property to check for.
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
     * @example
     *
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
     * // => true
     */
    function has(object, property) {
      return object ? hasOwnProperty.call(object, property) : false;
    }

    /**
     * Creates an object composed of the inverted keys and values of the given object.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the created inverted object.
     * @example
     *
     *  _.invert({ 'first': 'fred', 'second': 'barney' });
     * // => { 'fred': 'first', 'barney': 'second' }
     */
    function invert(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        result[object[key]] = key;
      }
      return result;
    }

    /**
     * Checks if `value` is a boolean value.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
     * @example
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        value && typeof value == 'object' && toString.call(value) == boolClass || false;
    }

    /**
     * Checks if `value` is a date.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     */
    function isDate(value) {
      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     */
    function isElement(value) {
      return value && value.nodeType === 1 || false;
    }

    /**
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
     * length of `0` and objects with no own enumerable properties are considered
     * "empty".
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({});
     * // => true
     *
     * _.isEmpty('');
     * // => true
     */
    function isEmpty(value) {
      var result = true;
      if (!value) {
        return result;
      }
      var className = toString.call(value),
          length = value.length;

      if ((className == arrayClass || className == stringClass || className == argsClass ) ||
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
        return !length;
      }
      forOwn(value, function() {
        return (result = false);
      });
      return result;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent to each other. If a callback is provided it will be executed
     * to compare values. If the callback returns `undefined` comparisons will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (a, b).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} a The value to compare.
     * @param {*} b The other value to compare.
     * @param {Function} [callback] The function to customize comparing values.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * var copy = { 'name': 'fred' };
     *
     * object == copy;
     * // => false
     *
     * _.isEqual(object, copy);
     * // => true
     *
     * var words = ['hello', 'goodbye'];
     * var otherWords = ['hi', 'goodbye'];
     *
     * _.isEqual(words, otherWords, function(a, b) {
     *   var reGreet = /^(?:hello|hi)$/i,
     *       aGreet = _.isString(a) && reGreet.test(a),
     *       bGreet = _.isString(b) && reGreet.test(b);
     *
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
     * });
     * // => true
     */
    function isEqual(a, b, callback, thisArg) {
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
    }

    /**
     * Checks if `value` is, or can be coerced to, a finite number.
     *
     * Note: This is not the same as native `isFinite` which will return true for
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
     * @example
     *
     * _.isFinite(-101);
     * // => true
     *
     * _.isFinite('10');
     * // => true
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite('');
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    /**
     * Checks if `value` is a function.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     */
    function isFunction(value) {
      return typeof value == 'function';
    }

    /**
     * Checks if `value` is the language type of Object.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // check if the value is the ECMAScript language type of Object
      // http://es5.github.io/#x8
      // and avoid a V8 bug
      // http://code.google.com/p/v8/issues/detail?id=2291
      return !!(value && objectTypes[typeof value]);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * Note: This is not the same as native `isNaN` which will return `true` for
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // `NaN` as a primitive is the only value that is not equal to itself
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(undefined);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is a number.
     *
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(8.4 * 5);
     * // => true
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        value && typeof value == 'object' && toString.call(value) == numberClass || false;
    }

    /**
     * Checks if `value` is an object created by the `Object` constructor.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * _.isPlainObject(new Shape);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     */
    var isPlainObject = function(value) {
      if (!(value && toString.call(value) == objectClass)) {
        return false;
      }
      var valueOf = value.valueOf,
          objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

      return objProto
        ? (value == objProto || getPrototypeOf(value) == objProto)
        : shimIsPlainObject(value);
    };

    /**
     * Checks if `value` is a regular expression.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
     * @example
     *
     * _.isRegExp(/fred/);
     * // => true
     */
    function isRegExp(value) {
      return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
    }

    /**
     * Checks if `value` is a string.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
     * @example
     *
     * _.isString('fred');
     * // => true
     */
    function isString(value) {
      return typeof value == 'string' ||
        value && typeof value == 'object' && toString.call(value) == stringClass || false;
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     */
    function isUndefined(value) {
      return typeof value == 'undefined';
    }

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * will overwrite property assignments of previous sources. If a callback is
     * provided it will be executed to produce the merged values of the destination
     * and source properties. If the callback returns `undefined` merging will
     * be handled by the method instead. The callback is bound to `thisArg` and
     * invoked with two arguments; (objectValue, sourceValue).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The destination object.
     * @param {...Object} [source] The source objects.
     * @param {Function} [callback] The function to customize merging properties.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the destination object.
     * @example
     *
     * var names = {
     *   'characters': [
     *     { 'name': 'barney' },
     *     { 'name': 'fred' }
     *   ]
     * };
     *
     * var ages = {
     *   'characters': [
     *     { 'age': 36 },
     *     { 'age': 40 }
     *   ]
     * };
     *
     * _.merge(names, ages);
     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
     *
     * var food = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var otherFood = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(food, otherFood, function(a, b) {
     *   return _.isArray(a) ? a.concat(b) : undefined;
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
     */
    function merge(object) {
      var args = arguments,
          length = 2;

      if (!isObject(object)) {
        return object;
      }

      // allows working with `_.reduce` and `_.reduceRight` without using
      // their `index` and `collection` arguments
      if (typeof args[2] != 'number') {
        length = args.length;
      }
      if (length > 3 && typeof args[length - 2] == 'function') {
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
      } else if (length > 2 && typeof args[length - 1] == 'function') {
        callback = args[--length];
      }
      var sources = slice(arguments, 1, length),
          index = -1,
          stackA = getArray(),
          stackB = getArray();

      while (++index < length) {
        baseMerge(object, sources[index], callback, stackA, stackB);
      }
      releaseArray(stackA);
      releaseArray(stackB);
      return object;
    }

    /**
     * Creates a shallow clone of `object` excluding the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` omitting the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The properties to omit or the
     *  function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object without the omitted properties.
     * @example
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
     * // => { 'name': 'fred' }
     *
     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
     *   return typeof value == 'number';
     * });
     * // => { 'name': 'fred' }
     */
    function omit(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var props = [];
        forIn(object, function(value, key) {
          props.push(key);
        });
        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];
          result[key] = object[key];
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (!callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * Creates a two dimensional array of an object's key-value pairs,
     * i.e. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
     */
    function pairs(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates a shallow clone of `object` composed of the specified properties.
     * Property names may be specified as individual arguments or as arrays of
     * property names. If a callback is provided it will be executed for each
     * property of `object` picking the properties the callback returns truey
     * for. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The source object.
     * @param {Function|...string|string[]} [callback] The function called per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns an object composed of the picked properties.
     * @example
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
     * // => { 'name': 'fred' }
     *
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
     *   return key.charAt(0) != '_';
     * });
     * // => { 'name': 'fred' }
     */
    function pick(object, callback, thisArg) {
      var result = {};
      if (typeof callback != 'function') {
        var index = -1,
            props = baseFlatten(arguments, true, false, 1),
            length = isObject(object) ? props.length : 0;

        while (++index < length) {
          var key = props[index];
          if (key in object) {
            result[key] = object[key];
          }
        }
      } else {
        callback = lodash.createCallback(callback, thisArg, 3);
        forIn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result[key] = value;
          }
        });
      }
      return result;
    }

    /**
     * An alternative to `_.reduce` this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its elements
     * through a callback, with each callback execution potentially mutating
     * the `accumulator` object. The callback is bound to `thisArg` and invoked
     * with four arguments; (accumulator, value, key, object). Callbacks may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
     *   num *= num;
     *   if (num % 2) {
     *     return result.push(num) < 3;
     *   }
     * });
     * // => [1, 9, 25]
     *
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     * });
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function transform(object, callback, accumulator, thisArg) {
      var isArr = isArray(object);
      if (accumulator == null) {
        if (isArr) {
          accumulator = [];
        } else {
          var ctor = object && object.constructor,
              proto = ctor && ctor.prototype;

          accumulator = baseCreate(proto);
        }
      }
      if (callback) {
        callback = lodash.createCallback(callback, thisArg, 4);
        (isArr ? forEach : forOwn)(object, function(value, index, object) {
          return callback(accumulator, value, index, object);
        });
      }
      return accumulator;
    }

    /**
     * Creates an array composed of the own enumerable property values of `object`.
     *
     * @static
     * @memberOf _
     * @category Objects
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns an array of property values.
     * @example
     *
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
     * // => [1, 2, 3] (property order is not guaranteed across environments)
     */
    function values(object) {
      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array of elements from the specified indexes, or keys, of the
     * `collection`. Indexes may be specified as individual arguments or as arrays
     * of indexes.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
     *   to retrieve, specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns a new array of elements corresponding to the
     *  provided indexes.
     * @example
     *
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
     * // => ['a', 'c', 'e']
     *
     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
     * // => ['fred', 'pebbles']
     */
    function at(collection) {
      var args = arguments,
          index = -1,
          props = baseFlatten(args, true, false, 1),
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
          result = Array(length);

      while(++index < length) {
        result[index] = collection[props[index]];
      }
      return result;
    }

    /**
     * Checks if a given value is present in a collection using strict equality
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
     * offset from the end of the collection.
     *
     * @static
     * @memberOf _
     * @alias include
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {*} target The value to check for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
     * @example
     *
     * _.contains([1, 2, 3], 1);
     * // => true
     *
     * _.contains([1, 2, 3], 1, 2);
     * // => false
     *
     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.contains('pebbles', 'eb');
     * // => true
     */
    function contains(collection, target, fromIndex) {
      var index = -1,
          indexOf = getIndexOf(),
          length = collection ? collection.length : 0,
          result = false;

      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
      if (isArray(collection)) {
        result = indexOf(collection, target, fromIndex) > -1;
      } else if (typeof length == 'number') {
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
      } else {
        forOwn(collection, function(value) {
          if (++index >= fromIndex) {
            return !(result = value === target);
          }
        });
      }
      return result;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through the callback. The corresponding value
     * of each key is the number of times the key was returned by the callback.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
    });

    /**
     * Checks if the given callback returns truey value for **all** elements of
     * a collection. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if all elements passed the callback check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes']);
     * // => false
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.every(characters, 'age');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.every(characters, { 'age': 36 });
     * // => false
     */
    function every(collection, callback, thisArg) {
      var result = true;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if (!(result = !!callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return (result = !!callback(value, index, collection));
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning an array of all elements
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that passed the callback check.
     * @example
     *
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [2, 4, 6]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.filter(characters, 'blocked');
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     *
     * // using "_.where" callback shorthand
     * _.filter(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     */
    function filter(collection, callback, thisArg) {
      var result = [];
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            result.push(value);
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result.push(value);
          }
        });
      }
      return result;
    }

    /**
     * Iterates over elements of a collection, returning the first element that
     * the callback returns truey for. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect, findWhere
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.find(characters, function(chr) {
     *   return chr.age < 40;
     * });
     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
     *
     * // using "_.where" callback shorthand
     * _.find(characters, { 'age': 1 });
     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
     *
     * // using "_.pluck" callback shorthand
     * _.find(characters, 'blocked');
     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
     */
    function find(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          var value = collection[index];
          if (callback(value, index, collection)) {
            return value;
          }
        }
      } else {
        var result;
        forOwn(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }
    }

    /**
     * This method is like `_.find` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the found element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(num) {
     *   return num % 2 == 1;
     * });
     * // => 3
     */
    function findLast(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);
      forEachRight(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result = value;
          return false;
        }
      });
      return result;
    }

    /**
     * Iterates over elements of a collection, executing the callback for each
     * element. The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Callbacks may exit iteration early by
     * explicitly returning `false`.
     *
     * Note: As with other "Collections" methods, objects with a `length` property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
     * // => logs each number and returns '1,2,3'
     *
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
     * // => logs each number and returns the object (property order is not guaranteed across environments)
     */
    function forEach(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (++index < length) {
          if (callback(collection[index], index, collection) === false) {
            break;
          }
        }
      } else {
        forOwn(collection, callback);
      }
      return collection;
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
     * // => logs each number from right to left and returns '3,2,1'
     */
    function forEachRight(collection, callback, thisArg) {
      var length = collection ? collection.length : 0;
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        while (length--) {
          if (callback(collection[length], length, collection) === false) {
            break;
          }
        }
      } else {
        var props = keys(collection);
        length = props.length;
        forOwn(collection, function(value, key, collection) {
          key = props ? props[--length] : --length;
          return callback(collection[key], key, collection);
        });
      }
      return collection;
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of a collection through the callback. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using "_.pluck" callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of the collection through the given callback. The corresponding
     * value of each key is the last element responsible for generating the key.
     * The callback is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keys = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keys, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method named by `methodName` on each element in the `collection`
     * returning an array of the results of each invoked method. Additional arguments
     * will be provided to each invoked method. If `methodName` is a function it
     * will be invoked for, and `this` bound to, each element in the `collection`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|string} methodName The name of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [arg] Arguments to invoke the method with.
     * @returns {Array} Returns a new array of the results of each invoked method.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    function invoke(collection, methodName) {
      var args = slice(arguments, 2),
          index = -1,
          isFunc = typeof methodName == 'function',
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
      });
      return result;
    }

    /**
     * Creates an array of values by running each element in the collection
     * through the callback. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of the results of each `callback` execution.
     * @example
     *
     * _.map([1, 2, 3], function(num) { return num * 3; });
     * // => [3, 6, 9]
     *
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
     * // => [3, 6, 9] (property order is not guaranteed across environments)
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.map(characters, 'name');
     * // => ['barney', 'fred']
     */
    function map(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = callback(collection[index], index, collection);
        }
      } else {
        result = [];
        forOwn(collection, function(value, key, collection) {
          result[++index] = callback(value, key, collection);
        });
      }
      return result;
    }

    /**
     * Retrieves the maximum value of a collection. If the collection is empty or
     * falsey `-Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.max(characters, function(chr) { return chr.age; });
     * // => { 'name': 'fred', 'age': 40 };
     *
     * // using "_.pluck" callback shorthand
     * _.max(characters, 'age');
     * // => { 'name': 'fred', 'age': 40 };
     */
    function max(collection, callback, thisArg) {
      var computed = -Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value > result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current > computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the minimum value of a collection. If the collection is empty or
     * falsey `Infinity` is returned. If a callback is provided it will be executed
     * for each value in the collection to generate the criterion by which the value
     * is ranked. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.min(characters, function(chr) { return chr.age; });
     * // => { 'name': 'barney', 'age': 36 };
     *
     * // using "_.pluck" callback shorthand
     * _.min(characters, 'age');
     * // => { 'name': 'barney', 'age': 36 };
     */
    function min(collection, callback, thisArg) {
      var computed = Infinity,
          result = computed;

      // allows working with functions like `_.map` without using
      // their `index` argument as a callback
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
        callback = null;
      }
      if (callback == null && isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          if (value < result) {
            result = value;
          }
        }
      } else {
        callback = (callback == null && isString(collection))
          ? charAtCallback
          : lodash.createCallback(callback, thisArg, 3);

        forEach(collection, function(value, index, collection) {
          var current = callback(value, index, collection);
          if (current < computed) {
            computed = current;
            result = value;
          }
        });
      }
      return result;
    }

    /**
     * Retrieves the value of a specified property from all elements in the collection.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {string} property The property to pluck.
     * @returns {Array} Returns a new array of property values.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(characters, 'name');
     * // => ['barney', 'fred']
     */
    function pluck(collection, property) {
      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        var result = Array(length);
        while (++index < length) {
          result[index] = collection[index][property];
        }
      }
      return result || map(collection, property);
    }

    /**
     * Reduces a collection to a value which is the accumulated result of running
     * each element in the collection through the callback, where each successive
     * callback execution consumes the return value of the previous execution. If
     * `accumulator` is not provided the first element of the collection will be
     * used as the initial `accumulator` value. The callback is bound to `thisArg`
     * and invoked with four arguments; (accumulator, value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var sum = _.reduce([1, 2, 3], function(sum, num) {
     *   return sum + num;
     * });
     * // => 6
     *
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
     *   result[key] = num * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6, 'c': 9 }
     */
    function reduce(collection, callback, accumulator, thisArg) {
      if (!collection) return accumulator;
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);

      var index = -1,
          length = collection.length;

      if (typeof length == 'number') {
        if (noaccum) {
          accumulator = collection[++index];
        }
        while (++index < length) {
          accumulator = callback(accumulator, collection[index], index, collection);
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection)
        });
      }
      return accumulator;
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [callback=identity] The function called per iteration.
     * @param {*} [accumulator] Initial value of the accumulator.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var list = [[0, 1], [2, 3], [4, 5]];
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, callback, accumulator, thisArg) {
      var noaccum = arguments.length < 3;
      callback = lodash.createCallback(callback, thisArg, 4);
      forEachRight(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The opposite of `_.filter` this method returns the elements of a
     * collection that the callback does **not** return truey for.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of elements that failed the callback check.
     * @example
     *
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
     * // => [1, 3, 5]
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.reject(characters, 'blocked');
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
     *
     * // using "_.where" callback shorthand
     * _.reject(characters, { 'age': 36 });
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
     */
    function reject(collection, callback, thisArg) {
      callback = lodash.createCallback(callback, thisArg, 3);
      return filter(collection, function(value, index, collection) {
        return !callback(value, index, collection);
      });
    }

    /**
     * Retrieves a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Allows working with functions like `_.map`
     *  without using their `index` arguments as `n`.
     * @returns {Array} Returns the random sample(s) of `collection`.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (collection && typeof collection.length != 'number') {
        collection = values(collection);
      }
      if (n == null || guard) {
        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
      }
      var result = shuffle(collection);
      result.length = nativeMin(nativeMax(0, n), result.length);
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns a new shuffled collection.
     * @example
     *
     * _.shuffle([1, 2, 3, 4, 5, 6]);
     * // => [4, 1, 6, 3, 5, 2]
     */
    function shuffle(collection) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      forEach(collection, function(value) {
        var rand = baseRandom(0, ++index);
        result[index] = result[rand];
        result[rand] = value;
      });
      return result;
    }

    /**
     * Gets the size of the `collection` by returning `collection.length` for arrays
     * and array-like objects or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns `collection.length` or number of own enumerable properties.
     * @example
     *
     * _.size([1, 2]);
     * // => 2
     *
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
     * // => 3
     *
     * _.size('pebbles');
     * // => 5
     */
    function size(collection) {
      var length = collection ? collection.length : 0;
      return typeof length == 'number' ? length : keys(collection).length;
    }

    /**
     * Checks if the callback returns a truey value for **any** element of a
     * collection. The function returns as soon as it finds a passing value and
     * does not iterate over the entire collection. The callback is bound to
     * `thisArg` and invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {boolean} Returns `true` if any element passed the callback check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'blocked': false },
     *   { 'name': 'fred',   'age': 40, 'blocked': true }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.some(characters, 'blocked');
     * // => true
     *
     * // using "_.where" callback shorthand
     * _.some(characters, { 'age': 1 });
     * // => false
     */
    function some(collection, callback, thisArg) {
      var result;
      callback = lodash.createCallback(callback, thisArg, 3);

      var index = -1,
          length = collection ? collection.length : 0;

      if (typeof length == 'number') {
        while (++index < length) {
          if ((result = callback(collection[index], index, collection))) {
            break;
          }
        }
      } else {
        forOwn(collection, function(value, index, collection) {
          return !(result = callback(value, index, collection));
        });
      }
      return !!result;
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through the callback. This method
     * performs a stable sort, that is, it will preserve the original sort order
     * of equal elements. The callback is bound to `thisArg` and invoked with
     * three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of sorted elements.
     * @example
     *
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
     * // => [3, 1, 2]
     *
     * // using "_.pluck" callback shorthand
     * _.sortBy(['banana', 'strawberry', 'apple'], 'length');
     * // => ['apple', 'banana', 'strawberry']
     */
    function sortBy(collection, callback, thisArg) {
      var index = -1,
          length = collection ? collection.length : 0,
          result = Array(typeof length == 'number' ? length : 0);

      callback = lodash.createCallback(callback, thisArg, 3);
      forEach(collection, function(value, key, collection) {
        var object = result[++index] = getObject();
        object.criteria = callback(value, key, collection);
        object.index = index;
        object.value = value;
      });

      length = result.length;
      result.sort(compareAscending);
      while (length--) {
        var object = result[length];
        result[length] = object.value;
        releaseObject(object);
      }
      return result;
    }

    /**
     * Converts the `collection` to an array.
     *
     * @static
     * @memberOf _
     * @category Collections
     * @param {Array|Object|string} collection The collection to convert.
     * @returns {Array} Returns the new converted array.
     * @example
     *
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
     * // => [2, 3, 4]
     */
    function toArray(collection) {
      if (collection && typeof collection.length == 'number') {
        return slice(collection);
      }
      return values(collection);
    }

    /**
     * Performs a deep comparison of each element in a `collection` to the given
     * `properties` object, returning an array of all elements that have equivalent
     * property values.
     *
     * @static
     * @memberOf _
     * @type Function
     * @category Collections
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Object} properties The object of property values to filter by.
     * @returns {Array} Returns a new array of elements that have the given properties.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.where(characters, { 'age': 36 });
     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
     *
     * _.where(characters, { 'pets': ['dino'] });
     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
     */
    var where = filter;

    /*--------------------------------------------------------------------------*/

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are all falsey.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to compact.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * Creates an array excluding all values of the provided arrays using strict
     * equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
     * // => [1, 3, 4]
     */
    function difference(array) {
      return baseDifference(array, baseFlatten(arguments, true, true, 1));
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element that passes the callback check, instead of the element itself.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': false },
     *   { 'name': 'fred',    'age': 40, 'blocked': true },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
     * ];
     *
     * _.findIndex(characters, function(chr) {
     *   return chr.age < 20;
     * });
     * // => 2
     *
     * // using "_.where" callback shorthand
     * _.findIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findIndex(characters, 'blocked');
     * // => 1
     */
    function findIndex(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0;

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        if (callback(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of a `collection` from right to left.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36, 'blocked': true },
     *   { 'name': 'fred',    'age': 40, 'blocked': false },
     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
     * ];
     *
     * _.findLastIndex(characters, function(chr) {
     *   return chr.age > 30;
     * });
     * // => 1
     *
     * // using "_.where" callback shorthand
     * _.findLastIndex(characters, { 'age': 36 });
     * // => 0
     *
     * // using "_.pluck" callback shorthand
     * _.findLastIndex(characters, 'blocked');
     * // => 2
     */
    function findLastIndex(array, callback, thisArg) {
      var length = array ? array.length : 0;
      callback = lodash.createCallback(callback, thisArg, 3);
      while (length--) {
        if (callback(array[length], length, array)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Gets the first element or first `n` elements of an array. If a callback
     * is provided elements at the beginning of the array are returned as long
     * as the callback returns truey. The callback is bound to `thisArg` and
     * invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias head, take
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the first element(s) of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.first([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [1, 2]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.first(characters, 'blocked');
     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
     * // => ['barney', 'fred']
     */
    function first(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = -1;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[0] : undefined;
        }
      }
      return slice(array, 0, nativeMin(nativeMax(0, n), length));
    }

    /**
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
     * is truey, the array will only be flattened a single level. If a callback
     * is provided each element of the array is passed through the callback before
     * flattening. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to flatten.
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new flattened array.
     * @example
     *
     * _.flatten([1, [2], [3, [[4]]]]);
     * // => [1, 2, 3, 4];
     *
     * _.flatten([1, [2], [3, [[4]]]], true);
     * // => [1, 2, 3, [[4]]];
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.flatten(characters, 'pets');
     * // => ['hoppy', 'baby puss', 'dino']
     */
    function flatten(array, isShallow, callback, thisArg) {
      // juggle arguments
      if (typeof isShallow != 'boolean' && isShallow != null) {
        thisArg = callback;
        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
        isShallow = false;
      }
      if (callback != null) {
        array = map(array, callback, thisArg);
      }
      return baseFlatten(array, isShallow);
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`. If the array is already sorted
     * providing `true` for `fromIndex` will run a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 1
     *
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 4
     *
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      if (typeof fromIndex == 'number') {
        var length = array ? array.length : 0;
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
      } else if (fromIndex) {
        var index = sortedIndex(array, value);
        return array[index] === value ? index : -1;
      }
      return baseIndexOf(array, value, fromIndex);
    }

    /**
     * Gets all but the last element or last `n` elements of an array. If a
     * callback is provided elements at the end of the array are excluded from
     * the result as long as the callback returns truey. The callback is bound
     * to `thisArg` and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     *
     * _.initial([1, 2, 3], 2);
     * // => [1]
     *
     * _.initial([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [1]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.initial(characters, 'blocked');
     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
     *
     * // using "_.where" callback shorthand
     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
     * // => ['barney', 'fred']
     */
    function initial(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : callback || n;
      }
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
    }

    /**
     * Creates an array of unique values present in all provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of composite values.
     * @example
     *
     * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
     * // => [1, 2]
     */
    function intersection(array) {
      var args = arguments,
          argsLength = args.length,
          argsIndex = -1,
          caches = getArray(),
          index = -1,
          indexOf = getIndexOf(),
          length = array ? array.length : 0,
          result = [],
          seen = getArray();

      while (++argsIndex < argsLength) {
        var value = args[argsIndex];
        caches[argsIndex] = indexOf === baseIndexOf &&
          (value ? value.length : 0) >= largeArraySize &&
          createCache(argsIndex ? args[argsIndex] : seen);
      }
      outer:
      while (++index < length) {
        var cache = caches[0];
        value = array[index];

        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
          argsIndex = argsLength;
          (cache || seen).push(value);
          while (--argsIndex) {
            cache = caches[argsIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
              continue outer;
            }
          }
          result.push(value);
        }
      }
      while (argsLength--) {
        cache = caches[argsLength];
        if (cache) {
          releaseObject(cache);
        }
      }
      releaseArray(caches);
      releaseArray(seen);
      return result;
    }

    /**
     * Gets the last element or last `n` elements of an array. If a callback is
     * provided elements at the end of the array are returned as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback] The function called
     *  per element or the number of elements to return. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {*} Returns the last element(s) of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     *
     * _.last([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.last([1, 2, 3], function(num) {
     *   return num > 1;
     * });
     * // => [2, 3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.last(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.last(characters, { 'employer': 'na' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function last(array, callback, thisArg) {
      var n = 0,
          length = array ? array.length : 0;

      if (typeof callback != 'number' && callback != null) {
        var index = length;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (index-- && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = callback;
        if (n == null || thisArg) {
          return array ? array[length - 1] : undefined;
        }
      }
      return slice(array, nativeMax(0, length - n));
    }

    /**
     * Gets the index at which the last occurrence of `value` is found using strict
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
     * as the offset from the end of the collection.
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
     * // => 4
     *
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var index = array ? array.length : 0;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from the given array using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {...*} [value] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull(array) {
      var args = arguments,
          argsIndex = 0,
          argsLength = args.length,
          length = array ? array.length : 0;

      while (++argsIndex < argsLength) {
        var index = -1,
            value = args[argsIndex];
        while (++index < length) {
          if (array[index] === value) {
            splice.call(array, index--, 1);
            length--;
          }
        }
      }
      return array;
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to but not including `end`. If `start` is less than `stop` a
     * zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns a new range array.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      start = +start || 0;
      step = typeof step == 'number' ? step : (+step || 1);

      if (end == null) {
        end = start;
        start = 0;
      }
      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
      var index = -1,
          length = nativeMax(0, ceil((end - start) / (step || 1))),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Removes all elements from an array that the callback returns truey for
     * and returns an array of removed elements. The callback is bound to `thisArg`
     * and invoked with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4, 5, 6];
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
     *
     * console.log(array);
     * // => [1, 3, 5]
     *
     * console.log(evens);
     * // => [2, 4, 6]
     */
    function remove(array, callback, thisArg) {
      var index = -1,
          length = array ? array.length : 0,
          result = [];

      callback = lodash.createCallback(callback, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (callback(value, index, array)) {
          result.push(value);
          splice.call(array, index--, 1);
          length--;
        }
      }
      return result;
    }

    /**
     * The opposite of `_.initial` this method gets all but the first element or
     * first `n` elements of an array. If a callback function is provided elements
     * at the beginning of the array are excluded from the result as long as the
     * callback returns truey. The callback is bound to `thisArg` and invoked
     * with three arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias drop, tail
     * @category Arrays
     * @param {Array} array The array to query.
     * @param {Function|Object|number|string} [callback=1] The function called
     *  per element or the number of elements to exclude. If a property name or
     *  object is provided it will be used to create a "_.pluck" or "_.where"
     *  style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     *
     * _.rest([1, 2, 3], 2);
     * // => [3]
     *
     * _.rest([1, 2, 3], function(num) {
     *   return num < 3;
     * });
     * // => [3]
     *
     * var characters = [
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
     * ];
     *
     * // using "_.pluck" callback shorthand
     * _.pluck(_.rest(characters, 'blocked'), 'name');
     * // => ['fred', 'pebbles']
     *
     * // using "_.where" callback shorthand
     * _.rest(characters, { 'employer': 'slate' });
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
     */
    function rest(array, callback, thisArg) {
      if (typeof callback != 'number' && callback != null) {
        var n = 0,
            index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length && callback(array[index], index, array)) {
          n++;
        }
      } else {
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
      }
      return slice(array, n);
    }

    /**
     * Uses a binary search to determine the smallest index at which a value
     * should be inserted into a given sorted array in order to maintain the sort
     * order of the array. If a callback is provided it will be executed for
     * `value` and each element of `array` to compute their sort ranking. The
     * callback is bound to `thisArg` and invoked with one argument; (value).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([20, 30, 50], 40);
     * // => 2
     *
     * // using "_.pluck" callback shorthand
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 2
     *
     * var dict = {
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
     * };
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return dict.wordToNumber[word];
     * });
     * // => 2
     *
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
     *   return this.wordToNumber[word];
     * }, dict);
     * // => 2
     */
    function sortedIndex(array, value, callback, thisArg) {
      var low = 0,
          high = array ? array.length : low;

      // explicitly reference `identity` for better inlining in Firefox
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
      value = callback(value);

      while (low < high) {
        var mid = (low + high) >>> 1;
        (callback(array[mid]) < value)
          ? low = mid + 1
          : high = mid;
      }
      return low;
    }

    /**
     * Creates an array of unique values, in order, of the provided arrays using
     * strict equality for comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {...Array} [array] The arrays to inspect.
     * @returns {Array} Returns an array of composite values.
     * @example
     *
     * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
     * // => [1, 2, 3, 101, 10]
     */
    function union(array) {
      return baseUniq(baseFlatten(arguments, true, true));
    }

    /**
     * Creates a duplicate-value-free version of an array using strict equality
     * for comparisons, i.e. `===`. If the array is sorted, providing
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
     * each element of `array` is passed through the callback before uniqueness
     * is computed. The callback is bound to `thisArg` and invoked with three
     * arguments; (value, index, array).
     *
     * If a property name is provided for `callback` the created "_.pluck" style
     * callback will return the property value of the given element.
     *
     * If an object is provided for `callback` the created "_.where" style callback
     * will return `true` for elements that have the properties of the given object,
     * else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Arrays
     * @param {Array} array The array to process.
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
     * @param {Function|Object|string} [callback=identity] The function called
     *  per iteration. If a property name or object is provided it will be used
     *  to create a "_.pluck" or "_.where" style callback, respectively.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns a duplicate-value-free array.
     * @example
     *
     * _.uniq([1, 2, 1, 3, 1]);
     * // => [1, 2, 3]
     *
     * _.uniq([1, 1, 2, 2, 3], true);
     * // => [1, 2, 3]
     *
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
     * // => ['A', 'b', 'C']
     *
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
     * // => [1, 2.5, 3]
     *
     * // using "_.pluck" callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, callback, thisArg) {
      // juggle arguments
      if (typeof isSorted != 'boolean' && isSorted != null) {
        thisArg = callback;
        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
        isSorted = false;
      }
      if (callback != null) {
        callback = lodash.createCallback(callback, thisArg, 3);
      }
      return baseUniq(array, isSorted, callback);
    }

    /**
     * Creates an array excluding all provided values using strict equality for
     * comparisons, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @category Arrays
     * @param {Array} array The array to filter.
     * @param {...*} [value] The values to exclude.
     * @returns {Array} Returns a new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
     * // => [2, 3, 4]
     */
    function without(array) {
      return baseDifference(array, slice(arguments, 1));
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second
     * elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @alias unzip
     * @category Arrays
     * @param {...Array} [array] Arrays to process.
     * @returns {Array} Returns a new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    function zip() {
      var array = arguments.length > 1 ? arguments : arguments[0],
          index = -1,
          length = array ? max(pluck(array, 'length')) : 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = pluck(array, index);
      }
      return result;
    }

    /**
     * Creates an object composed from arrays of `keys` and `values`. Provide
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
     * or two arrays, one of `keys` and one of corresponding `values`.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Arrays
     * @param {Array} keys The array of keys.
     * @param {Array} [values=[]] The array of values.
     * @returns {Object} Returns an object composed of the given keys and
     *  corresponding values.
     * @example
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(keys, values) {
      var index = -1,
          length = keys ? keys.length : 0,
          result = {};

      while (++index < length) {
        var key = keys[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a function that executes `func`, with  the `this` binding and
     * arguments of the created function, only after being called `n` times.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {number} n The number of times the function must be called before
     *  `func` is executed.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('Done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'Done saving!', after all saves have completed
     */
    function after(n, func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with the `this`
     * binding of `thisArg` and prepends any additional `bind` arguments to those
     * provided to the bound function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var func = function(greeting) {
     *   return greeting + ' ' + this.name;
     * };
     *
     * func = _.bind(func, { 'name': 'fred' }, 'hi');
     * func();
     * // => 'hi fred'
     */
    function bind(func, thisArg) {
      return arguments.length > 2
        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
        : createWrapper(func, 1, null, null, thisArg);
    }

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all the function properties
     * of `object` will be bound.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...string} [methodName] The object method names to
     *  bind, specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *  'label': 'docs',
     *  'onClick': function() { console.log('clicked ' + this.label); }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs', when the button is clicked
     */
    function bindAll(object) {
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
          index = -1,
          length = funcs.length;

      while (++index < length) {
        var key = funcs[index];
        object[key] = createWrapper(object[key], 1, null, null, object);
      }
      return object;
    }

    /**
     * Creates a function that, when called, invokes the method at `object[key]`
     * and prepends any additional `bindKey` arguments to those provided to the bound
     * function. This method differs from `_.bind` by allowing bound functions to
     * reference methods that will be redefined or don't yet exist.
     * See http://michaux.ca/articles/lazy-function-definition-pattern.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'name': 'fred',
     *   'greet': function(greeting) {
     *     return greeting + ' ' + this.name;
     *   }
     * };
     *
     * var func = _.bindKey(object, 'greet', 'hi');
     * func();
     * // => 'hi fred'
     *
     * object.greet = function(greeting) {
     *   return greeting + 'ya ' + this.name + '!';
     * };
     *
     * func();
     * // => 'hiya fred!'
     */
    function bindKey(object, key) {
      return arguments.length > 2
        ? createWrapper(key, 19, slice(arguments, 2), null, object)
        : createWrapper(key, 3, null, null, object);
    }

    /**
     * Creates a function that is the composition of the provided functions,
     * where each function consumes the return value of the function that follows.
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
     * Each function is executed with the `this` binding of the composed function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {...Function} [func] Functions to compose.
     * @returns {Function} Returns the new composed function.
     * @example
     *
     * var realNameMap = {
     *   'pebbles': 'penelope'
     * };
     *
     * var format = function(name) {
     *   name = realNameMap[name.toLowerCase()] || name;
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     * };
     *
     * var greet = function(formatted) {
     *   return 'Hiya ' + formatted + '!';
     * };
     *
     * var welcome = _.compose(greet, format);
     * welcome('pebbles');
     * // => 'Hiya Penelope!'
     */
    function compose() {
      var funcs = arguments,
          length = funcs.length;

      while (length--) {
        if (!isFunction(funcs[length])) {
          throw new TypeError;
        }
      }
      return function() {
        var args = arguments,
            length = funcs.length;

        while (length--) {
          args = [funcs[length].apply(this, args)];
        }
        return args[0];
      };
    }

    /**
     * Produces a callback bound to an optional `thisArg`. If `func` is a property
     * name the created callback will return the property value for a given element.
     * If `func` is an object the created callback will return `true` for elements
     * that contain the equivalent object properties, otherwise it will return `false`.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} [func=identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of the created callback.
     * @param {number} [argCount] The number of arguments the callback accepts.
     * @returns {Function} Returns a callback function.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
     *   return !match ? func(callback, thisArg) : function(object) {
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(characters, 'age__gt38');
     * // => [{ 'name': 'fred', 'age': 40 }]
     */
    function createCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (func == null || type == 'function') {
        return baseCreateCallback(func, thisArg, argCount);
      }
      // handle "_.pluck" style callback shorthands
      if (type != 'object') {
        return function(object) {
          return object[func];
        };
      }
      var props = keys(func),
          key = props[0],
          a = func[key];

      // handle "_.where" style callback shorthands
      if (props.length == 1 && a === a && !isObject(a)) {
        // fast path the common case of providing an object with a single
        // property containing a primitive value
        return function(object) {
          var b = object[key];
          return a === b && (a !== 0 || (1 / a == 1 / b));
        };
      }
      return function(object) {
        var length = props.length,
            result = false;

        while (length--) {
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
            break;
          }
        }
        return result;
      };
    }

    /**
     * Creates a function which accepts one or more arguments of `func` that when
     * invoked either executes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` can be specified
     * if `func.length` is not sufficient.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var curried = _.curry(function(a, b, c) {
     *   console.log(a + b + c);
     * });
     *
     * curried(1)(2)(3);
     * // => 6
     *
     * curried(1, 2)(3);
     * // => 6
     *
     * curried(1, 2, 3);
     * // => 6
     */
    function curry(func, arity) {
      arity = typeof arity == 'number' ? arity : (+arity || func.length);
      return createWrapper(func, 4, null, null, null, arity);
    }

    /**
     * Creates a function that will delay the execution of `func` until after
     * `wait` milliseconds have elapsed since the last time it was invoked.
     * Provide an options object to indicate that `func` should be invoked on
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
     * to the debounced function will return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to debounce.
     * @param {number} wait The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * var lazyLayout = _.debounce(calculateLayout, 150);
     * jQuery(window).on('resize', lazyLayout);
     *
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * });
     *
     * // ensure `batchLog` is executed once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * source.addEventListener('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }, false);
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      wait = nativeMax(0, wait) || 0;
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = options.leading;
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      var delayed = function() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0) {
          if (maxTimeoutId) {
            clearTimeout(maxTimeoutId);
          }
          var isCalled = trailingCall;
          maxTimeoutId = timeoutId = trailingCall = undefined;
          if (isCalled) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      };

      var maxDelayed = function() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (trailing || (maxWait !== wait)) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      };

      return function() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
        return result;
      };
    }

    /**
     * Defers executing the `func` function until the current call stack has cleared.
     * Additional arguments will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to defer.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function() { console.log('deferred'); });
     * // returns from the function before 'deferred' is logged
     */
    function defer(func) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 1);
      return setTimeout(function() { func.apply(undefined, args); }, 1);
    }
    // use `setImmediate` if available in Node.js
    if (setImmediate) {
      defer = function(func) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        return setImmediate.apply(context, arguments);
      };
    }

    /**
     * Executes the `func` function after `wait` milliseconds. Additional arguments
     * will be provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay execution.
     * @param {...*} [arg] Arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * var log = _.bind(console.log, console);
     * _.delay(log, 1000, 'logged later');
     * // => 'logged later' (Appears after one second.)
     */
    function delay(func, wait) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var args = slice(arguments, 2);
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it will be used to determine the cache key for storing the result
     * based on the arguments provided to the memoized function. By default, the
     * first argument provided to the memoized function is used as the cache key.
     * The `func` is executed with the `this` binding of the memoized function.
     * The result cache is exposed as the `cache` property on the memoized function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] A function used to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var fibonacci = _.memoize(function(n) {
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     *
     * fibonacci(9)
     * // => 34
     *
     * var data = {
     *   'fred': { 'name': 'fred', 'age': 40 },
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
     * };
     *
     * // modifying the result cache
     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
     * get('pebbles');
     * // => { 'name': 'pebbles', 'age': 1 }
     *
     * get.cache.pebbles.name = 'penelope';
     * get('pebbles');
     * // => { 'name': 'penelope', 'age': 1 }
     */
    function memoize(func, resolver) {
      if (!isFunction(func)) {
        throw new TypeError;
      }
      var memoized = function() {
        var cache = memoized.cache,
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

        return hasOwnProperty.call(cache, key)
          ? cache[key]
          : (cache[key] = func.apply(this, arguments));
      }
      memoized.cache = {};
      return memoized;
    }

    /**
     * Creates a function that is restricted to execute `func` once. Repeat calls to
     * the function will return the value of the first call. The `func` is executed
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` executes `createApplication` once
     */
    function once(func) {
      var ran,
          result;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      return function() {
        if (ran) {
          return result;
        }
        ran = true;
        result = func.apply(this, arguments);

        // clear the `func` variable so the function may be garbage collected
        func = null;
        return result;
      };
    }

    /**
     * Creates a function that, when called, invokes `func` with any additional
     * `partial` arguments prepended to those provided to the new function. This
     * method is similar to `_.bind` except it does **not** alter the `this` binding.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) { return greeting + ' ' + name; };
     * var hi = _.partial(greet, 'hi');
     * hi('fred');
     * // => 'hi fred'
     */
    function partial(func) {
      return createWrapper(func, 16, slice(arguments, 1));
    }

    /**
     * This method is like `_.partial` except that `partial` arguments are
     * appended to those provided to the new function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [arg] Arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
     *
     * var options = {
     *   'variable': 'data',
     *   'imports': { 'jq': $ }
     * };
     *
     * defaultsDeep(options, _.templateSettings);
     *
     * options.variable
     * // => 'data'
     *
     * options.imports
     * // => { '_': _, 'jq': $ }
     */
    function partialRight(func) {
      return createWrapper(func, 32, null, slice(arguments, 1));
    }

    /**
     * Creates a function that, when executed, will only call the `func` function
     * at most once per every `wait` milliseconds. Provide an options object to
     * indicate that `func` should be invoked on the leading and/or trailing edge
     * of the `wait` timeout. Subsequent calls to the throttled function will
     * return the result of the last `func` call.
     *
     * Note: If `leading` and `trailing` options are `true` `func` will be called
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {Function} func The function to throttle.
     * @param {number} wait The number of milliseconds to throttle executions to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * var throttled = _.throttle(updatePosition, 100);
     * jQuery(window).on('scroll', throttled);
     *
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (!isFunction(func)) {
        throw new TypeError;
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? options.leading : leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      debounceOptions.leading = leading;
      debounceOptions.maxWait = wait;
      debounceOptions.trailing = trailing;

      return debounce(func, wait, debounceOptions);
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Additional arguments provided to the function are appended
     * to those provided to the wrapper function. The wrapper is executed with
     * the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Functions
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('Fred, Wilma, & Pebbles');
     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
     */
    function wrap(value, wrapper) {
      return createWrapper(wrapper, 16, [value]);
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
     * corresponding HTML entities.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('Fred, Wilma, & Pebbles');
     * // => 'Fred, Wilma, &amp; Pebbles'
     */
    function escape(string) {
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Adds function properties of a source object to the `lodash` function and
     * chainable wrapper.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object of function properties to add to `lodash`.
     * @param {Object} object The object of function properties to add to `lodash`.
     * @example
     *
     * _.mixin({
     *   'capitalize': function(string) {
     *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     *   }
     * });
     *
     * _.capitalize('fred');
     * // => 'Fred'
     *
     * _('fred').capitalize();
     * // => 'Fred'
     */
    function mixin(object, source) {
      var ctor = object,
          isFunc = !source || isFunction(ctor);

      if (!source) {
        ctor = lodashWrapper;
        source = object;
        object = lodash;
      }
      forEach(functions(source), function(methodName) {
        var func = object[methodName] = source[methodName];
        if (isFunc) {
          ctor.prototype[methodName] = function() {
            var value = this.__wrapped__,
                args = [value];

            push.apply(args, arguments);
            var result = func.apply(object, args);
            if (value && typeof value == 'object' && value === result) {
              return this;
            }
            result = new ctor(result);
            result.__chain__ = this.__chain__;
            return result;
          };
        }
      });
    }

    /**
     * Reverts the '_' variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      context._ = oldDash;
      return this;
    }

    /**
     * A no-operation function.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @example
     *
     * var object = { 'name': 'fred' };
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // no operation performed
    }

    /**
     * Converts the given value into an integer of the specified radix.
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
     *
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
     * implementations. See http://es5.github.io/#E.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} value The value to parse.
     * @param {number} [radix] The radix used to interpret the value to parse.
     * @returns {number} Returns the new integer value.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     */
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
    };

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number will be
     * returned. If `floating` is truey or either `min` or `max` are floats a
     * floating-point number will be returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating=false] Specify returning a floating-point number.
     * @returns {number} Returns a random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (typeof min == 'boolean' && noMax) {
          floating = min;
          min = 1;
        }
        else if (!noMax && typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /**
     * Resolves the value of `property` on `object`. If `property` is a function
     * it will be invoked with the `this` binding of `object` and its result returned,
     * else the property value is returned. If `object` is falsey then `undefined`
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} object The object to inspect.
     * @param {string} property The property to get the value of.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = {
     *   'cheese': 'crumpets',
     *   'stuff': function() {
     *     return 'nonsense';
     *   }
     * };
     *
     * _.result(object, 'cheese');
     * // => 'crumpets'
     *
     * _.result(object, 'stuff');
     * // => 'nonsense'
     */
    function result(object, property) {
      if (object) {
        var value = object[property];
        return isFunction(value) ? object[property]() : value;
      }
    }

    /**
     * A micro-templating method that handles arbitrary delimiters, preserves
     * whitespace, and correctly escapes quotes within interpolated code.
     *
     * Note: In the development build, `_.template` utilizes sourceURLs for easier
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
     *
     * For more information on precompiling templates see:
     * http://lodash.com/custom-builds
     *
     * For more information on Chrome extension sandboxes see:
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} text The template text.
     * @param {Object} data The data object used to populate the text.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as local variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [variable] The data object variable name.
     * @returns {Function|string} Returns a compiled function when no `data` object
     *  is given, else it returns the interpolated text.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= name %>');
     * compiled({ 'name': 'fred' });
     * // => 'hello fred'
     *
     * // using the "escape" delimiter to escape HTML in data property values
     * _.template('<b><%- value %></b>', { 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to generate HTML
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
     * _.template('hello ${ name }', { 'name': 'pebbles' });
     * // => 'hello pebbles'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
     * // => 'hello barney!'
     *
     * // using a custom template delimiters
     * _.templateSettings = {
     *   'interpolate': /{{([\s\S]+?)}}/g
     * };
     *
     * _.template('hello {{ name }}!', { 'name': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using the `imports` option to import jQuery
     * var list = '<% $.each(people, function(name) { %><li><%- name %></li><% }); %>';
     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { '$': jQuery } });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     *   var __t, __p = '', __e = _.escape;
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
     *   return __p;
     * }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(text, data, options) {
      // based on John Resig's `tmpl` implementation
      // http://ejohn.org/blog/javascript-micro-templating/
      // and Laura Doktorova's doT.js
      // https://github.com/olado/doT
      var settings = lodash.templateSettings;
      text = String(text || '');

      // avoid missing dependencies when `iteratorTemplate` is not defined
      options = defaults({}, options, settings);

      var imports = defaults({}, options.imports, settings.imports),
          importsKeys = keys(imports),
          importsValues = values(imports);

      var isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // compile the regexp to match each delimiter
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // escape characters that cannot be included in string literals
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // replace delimiters with snippets
        if (escapeValue) {
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // the JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value
        return match;
      });

      source += "';\n";

      // if `variable` is not specified, wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain
      var variable = options.variable,
          hasVariable = variable;

      if (!hasVariable) {
        variable = 'obj';
        source = 'with (' + variable + ') {\n' + source + '\n}\n';
      }
      // cleanup code by stripping empty strings
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // frame code as the function body
      source = 'function(' + variable + ') {\n' +
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
        "var __t, __p = '', __e = _.escape" +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      // Use a sourceURL for easier debugging.
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

      try {
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
      } catch(e) {
        e.source = source;
        throw e;
      }
      if (data) {
        return result(data);
      }
      // provide the compiled function's source by its `toString` method, in
      // supported environments, or the `source` property as a convenience for
      // inlining compiled templates during the build process
      result.source = source;
      return result;
    }

    /**
     * Executes the callback `n` times, returning an array of the results
     * of each callback execution. The callback is bound to `thisArg` and invoked
     * with one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {number} n The number of times to execute the callback.
     * @param {Function} callback The function called per iteration.
     * @param {*} [thisArg] The `this` binding of `callback`.
     * @returns {Array} Returns an array of the results of each `callback` execution.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) { mage.castSpell(n); });
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
     *
     * _.times(3, function(n) { this.cast(n); }, mage);
     * // => also calls `mage.castSpell(n)` three times
     */
    function times(n, callback, thisArg) {
      n = (n = +n) > -1 ? n : 0;
      var index = -1,
          result = Array(n);

      callback = baseCreateCallback(callback, thisArg, 1);
      while (++index < n) {
        result[index] = callback(index);
      }
      return result;
    }

    /**
     * The inverse of `_.escape` this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
     * corresponding characters.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} string The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('Fred, Barney &amp; Pebbles');
     * // => 'Fred, Barney & Pebbles'
     */
    function unescape(string) {
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return String(prefix == null ? '' : prefix) + id;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps the given value with explicit
     * method chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney',  'age': 36 },
     *   { 'name': 'fred',    'age': 40 },
     *   { 'name': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(characters)
     *     .sortBy('age')
     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
     *     .first()
     *     .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      value = new lodashWrapper(value);
      value.__chain__ = true;
      return value;
    }

    /**
     * Invokes `interceptor` with the `value` as the first argument and then
     * returns `value`. The purpose of this method is to "tap into" a method
     * chain in order to perform operations on intermediate results within
     * the chain.
     *
     * @static
     * @memberOf _
     * @category Chaining
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3, 4])
     *  .tap(function(array) { array.pop(); })
     *  .reverse()
     *  .value();
     * // => [3, 2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chaining
     * @returns {*} Returns the wrapper object.
     * @example
     *
     * var characters = [
     *   { 'name': 'barney', 'age': 36 },
     *   { 'name': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(characters).first();
     * // => { 'name': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(characters).chain()
     *   .first()
     *   .pick('age')
     *   .value()
     * // => { 'age': 36 }
     */
    function wrapperChain() {
      this.__chain__ = true;
      return this;
    }

    /**
     * Produces the `toString` result of the wrapped value.
     *
     * @name toString
     * @memberOf _
     * @category Chaining
     * @returns {string} Returns the string result.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return String(this.__wrapped__);
    }

    /**
     * Extracts the wrapped value.
     *
     * @name valueOf
     * @memberOf _
     * @alias value
     * @category Chaining
     * @returns {*} Returns the wrapped value.
     * @example
     *
     * _([1, 2, 3]).valueOf();
     * // => [1, 2, 3]
     */
    function wrapperValueOf() {
      return this.__wrapped__;
    }

    /*--------------------------------------------------------------------------*/

    // add functions that return wrapped values when chaining
    lodash.after = after;
    lodash.assign = assign;
    lodash.at = at;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.compose = compose;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.createCallback = createCallback;
    lodash.curry = curry;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.map = map;
    lodash.max = max;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.min = min;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.pull = pull;
    lodash.range = range;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.shuffle = shuffle;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.values = values;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.zip = zip;
    lodash.zipObject = zipObject;

    // add aliases
    lodash.collect = map;
    lodash.drop = rest;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;
    lodash.unzip = zip;

    // add functions to `lodash.prototype`
    mixin(lodash);

    /*--------------------------------------------------------------------------*/

    // add functions that return unwrapped values when chaining
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.contains = contains;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.has = has;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.lastIndexOf = lastIndexOf;
    lodash.mixin = mixin;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.result = result;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.template = template;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;

    // add aliases
    lodash.all = every;
    lodash.any = some;
    lodash.detect = find;
    lodash.findWhere = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.include = contains;
    lodash.inject = reduce;

    forOwn(lodash, function(func, methodName) {
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName] = function() {
          var args = [this.__wrapped__],
              chainAll = this.__chain__;

          push.apply(args, arguments);
          var result = func.apply(lodash, args);
          return chainAll
            ? new lodashWrapper(result, chainAll)
            : result;
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    // add functions capable of returning wrapped and unwrapped values when chaining
    lodash.first = first;
    lodash.last = last;
    lodash.sample = sample;

    // add aliases
    lodash.take = first;
    lodash.head = first;

    forOwn(lodash, function(func, methodName) {
      var callbackable = methodName !== 'sample';
      if (!lodash.prototype[methodName]) {
        lodash.prototype[methodName]= function(n, guard) {
          var chainAll = this.__chain__,
              result = func(this.__wrapped__, n, guard);

          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
            ? result
            : new lodashWrapper(result, chainAll);
        };
      }
    });

    /*--------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = '2.3.0';

    // add "Chaining" functions to the wrapper
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.value = wrapperValueOf;
    lodash.prototype.valueOf = wrapperValueOf;

    // add `Array` functions that return unwrapped values
    forEach(['join', 'pop', 'shift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        var chainAll = this.__chain__,
            result = func.apply(this.__wrapped__, arguments);

        return chainAll
          ? new lodashWrapper(result, chainAll)
          : result;
      };
    });

    // add `Array` functions that return the wrapped value
    forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        func.apply(this.__wrapped__, arguments);
        return this;
      };
    });

    // add `Array` functions that return new wrapped values
    forEach(['concat', 'slice', 'splice'], function(methodName) {
      var func = arrayRef[methodName];
      lodash.prototype[methodName] = function() {
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
      };
    });

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // expose Lo-Dash
  var _ = runInContext();

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lo-Dash to the global object even when an AMD loader is present in
    // case Lo-Dash was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the Lo-Dash
    // module by its `noConflict()` method.
    root._ = _;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return _;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = _;
    }
  }
  else {
    // in a browser or Rhino
    root._ = _;
  }
}.call(this));
;(function(){
  var BackboneEvents = {
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = Array.prototype.slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }
  };
  if (typeof define == "function") define(function(){ return BackboneEvents; });
  else if (typeof module == "object") module.exports = BackboneEvents;
  else window.BackboneEvents = BackboneEvents;
})();
;/**
 * csv.js
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2013 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/csv.js/master/LICENSE>
 * @link https://github.com/avoidwork/csv.js
 * @module csv.js
 * @version 0.1.2
 */
( function ( global ) {
"use strict";

var REGEX_IE      = /msie|ie/i,
    REGEX_NL      = /\n$/,
    REGEX_OBJTYPE = /\[object Object\]/,
    REGEX_QUOTE   = /^\s|\"|\n|,|\s$/,
    navigator     = global.navigator,
    ie            = navigator ? REGEX_IE.test( navigator.userAgent ) : false,
    version       = ie ? parseInt( navigator.userAgent.replace( /(.*msie|;.*)/gi, "" ), 10 ) : null;

/**
 * Returns an Object ( NodeList, etc. ) as an Array
 *
 * @method cast
 * @param  {Object}  obj Object to cast
 * @param  {Boolean} key [Optional] Returns key or value, only applies to Objects without a length property
 * @return {Array}       Object as an Array
 */
var cast = function () {
	if ( !ie || version > 8) {
		return function ( obj, key ) {
			key = ( key === true );
			var o = [];

			if ( !isNaN( obj.length ) ) {
				o = Array.prototype.slice.call( obj );
			}
			else {
				key ? o = keys( obj )
				    : iterate( obj, function ( i ) {
				    	o.push( i );
				      });
			}

			return o;
		};
	}
	else {
		return function ( obj, key ) {
			key   = ( key === true );
			var o = [];

			if ( !isNaN( obj.length ) ) {
				try {
					o = Array.prototype.slice.call( obj );
				}
				catch ( e ) {
					iterate( obj, function ( i, idx ) {
						if ( idx !== "length" ) {
							o.push( i );
						}
					});
				}
			}
			else {
				key ? o = keys( obj )
				    : iterate(obj, function ( i ) {
				    	o.push(i);
				      });
			}

			return o;
		};
	}
}();

/**
 * Transforms JSON to CSV
 * 
 * @method csv
 * @param  {String}  arg       Array, Object or JSON String to transform
 * @param  {String}  delimiter [Optional] Character to separate fields
 * @param  {Boolean} header    [Optional] False to not include field names as first row
 * @return {String}            CSV string
 */
var csv = function ( arg, delimiter, header ) {
	delimiter  = delimiter || ",";
	header     = ( header !== false );
	var obj    = decode( arg ) || arg,
	    result = "";

	if ( obj instanceof Array ) {
		if ( obj[0] instanceof Object ) {
			if ( header ) {
				result = ( keys( obj[0] ).join( delimiter ) + "\n" );
			}

			result += obj.map( function ( i ) {
				return csv( i, delimiter, false );
			}).join( "\n" );
		}
		else {
			result += ( prepare( obj, delimiter ) + "\n" );
		}
	}
	else {
		if ( header ) {
			result = ( keys( obj ).join( delimiter ) + "\n" );
		}

		result += ( cast( obj ).map( function ( i ) {
			return prepare( i, delimiter );
		}).join( delimiter ) + "\n" );
	}

	return result.replace( REGEX_NL, "" );
};

/**
 * Decodes the argument
 *
 * @method decode
 * @param  {String}  arg String to parse
 * @return {Mixed}       Entity resulting from parsing JSON, or undefined
 */
function decode ( arg ) {
	try {
		return JSON.parse( arg );
	}
	catch ( e ) {
		return undefined;
	}
};

/**
 * Iterates an Object and executes a function against the properties
 *
 * Iteration can be stopped by returning false from fn
 * 
 * @method iterate
 * @param  {Object}   obj Object to iterate
 * @param  {Function} fn  Function to execute against properties
 * @return {Object}       Object
 */
var iterate = function () {
	if ( typeof Object.keys === "function" ) {
		return function ( obj, fn ) {
			if ( typeof fn !== "function" ) {
				throw Error( "Invalid arguments" );
			}

			Object.keys( obj ).forEach( function ( i ) {
				return fn.call( obj, obj[i], i );
			});

			return obj;
		};
	}
	else {
		return function ( obj, fn ) {
			var has = Object.prototype.hasOwnProperty,
			    i, result;

			if ( typeof fn !== "function" ) {
				throw Error( "Invalid arguments" );
			}

			for ( i in obj ) {
				if ( has.call( obj, i ) ) {
					result = fn.call( obj, obj[i], i );

					if ( result === false ) {
						break;
					}
				}
				else {
					break;
				}
			}

			return obj;
		};
	}
}();

/**
 * Returns the keys in an "Associative Array"
 *
 * @method keys
 * @param  {Mixed} obj Array or Object to extract keys from
 * @return {Array}     Array of the keys
 */
var keys = function () {
	if ( typeof Object.keys === "function" ) {
		return function ( obj ) {
			return Object.keys( obj );
		};
	}
	else {
		return function ( obj ) {
			var keys = [];

			iterate( obj, function ( v, k ) {
				keys.push( k );
			});

			return keys;
		};
	}
}();

/**
 * Prepares input based on CSV rules
 * 
 * @method param
 * @param  {Mixed}  input     Array, Object or String
 * @param  {String} delimiter [Optional] Character to separate fields
 * @return {String}           CSV formatted String
 */
var prepare = function ( input, delimiter ) {
	var output;

	if ( input instanceof Array ) {
		output = "\"" + input.toString() + "\"";

		if ( REGEX_OBJTYPE.test( output ) ) {
			output = "\"" + csv( input, delimiter ) + "\"";
		}
	}
	else if ( input instanceof Object ) {
		output = "\"" + csv( input, delimiter ) + "\"";
	}
	else if ( REGEX_QUOTE.test( input ) ) {
		output = "\"" + input.replace( /"/g, "\"\"" ) + "\"";
	}
	else {
		output = input;
	}

	return output;
};

// Setting version hint
csv.version = "0.1.2";

// CommonJS, AMD, script tag
if ( typeof exports !== "undefined" ) {
	module.exports = csv;
}
else if ( typeof define === "function" ) {
	define( function () {
		return csv;
	});
}
else {
	global.csv = csv;
}
})( this );;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2013-10-21
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  || (function(view) {
	"use strict";
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link =  !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function (ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
                        window.open(object_url, "_blank");
                    }
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				// FF for Android has a nasty garbage collection mechanism
				// that turns all objects that are not pure javascript into 'deadObject'
				// this means `doc` and `save_link` are unusable and need to be recreated
				// `view` is usable though:
				doc = view.document;
				save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = object_url;
				save_link.download = name;
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
				);
				save_link.dispatchEvent(event);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	return saveAs;
}(this.self || this.window || this.content));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== 'undefined') module.exports = saveAs;
;(function(definition){if(typeof exports==="object"){module.exports=definition();}else if(typeof define==="function"&&define.amd){define(definition);}else{mori=definition();}})(function(){return function(){
function aa(){return function(a){return a}}function f(a){return function(){return this[a]}}function m(a){return function(){return a}}var n,ba=this;
function p(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}var ca="closure_uid_"+(1E9*Math.random()>>>0),da=0;function r(a,b){var c=a.split("."),d=ba;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b};function ea(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c),b%=4294967296;return b};var fa=Array.prototype;function ga(a,b){fa.sort.call(a,b||ha)}function ia(a,b){for(var c=0;c<a.length;c++)a[c]={index:c,value:a[c]};var d=b||ha;ga(a,function(a,b){return d(a.value,b.value)||a.index-b.index});for(c=0;c<a.length;c++)a[c]=a[c].value}function ha(a,b){return a>b?1:a<b?-1:0};function ja(a,b){for(var c in a)b.call(void 0,a[c],c,a)};function ka(a,b){null!=a&&this.append.apply(this,arguments)}ka.prototype.Ha="";ka.prototype.append=function(a,b,c){this.Ha+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.Ha+=arguments[d];return this};ka.prototype.toString=f("Ha");var la;function t(a){return null!=a&&!1!==a}function na(a){return t(a)?!1:!0}function v(a,b){return a[p(null==b?null:b)]?!0:a._?!0:w?!1:null}function oa(a){return null==a?null:a.constructor}function x(a,b){var c=oa(b),c=t(t(c)?c.$a:c)?c.Za:p(b);return Error(["No protocol method ",a," defined for type ",c,": ",b].join(""))}function pa(a){var b=a.Za;return t(b)?b:""+y(a)}function qa(a){return Array.prototype.slice.call(arguments)}
var sa=function(){function a(a,b){return z.c?z.c(function(a,b){a.push(b);return a},[],b):z.call(null,function(a,b){a.push(b);return a},[],b)}function b(a){return c.a(null,a)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,0,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),ta={},ua={};
function va(a){if(a?a.G:a)return a.G(a);var b;b=va[p(null==a?null:a)];if(!b&&(b=va._,!b))throw x("ICounted.-count",a);return b.call(null,a)}function wa(a){if(a?a.H:a)return a.H(a);var b;b=wa[p(null==a?null:a)];if(!b&&(b=wa._,!b))throw x("IEmptyableCollection.-empty",a);return b.call(null,a)}var xa={};function ya(a,b){if(a?a.F:a)return a.F(a,b);var c;c=ya[p(null==a?null:a)];if(!c&&(c=ya._,!c))throw x("ICollection.-conj",a);return c.call(null,a,b)}
var za={},B=function(){function a(a,b,c){if(a?a.P:a)return a.P(a,b,c);var h;h=B[p(null==a?null:a)];if(!h&&(h=B._,!h))throw x("IIndexed.-nth",a);return h.call(null,a,b,c)}function b(a,b){if(a?a.L:a)return a.L(a,b);var c;c=B[p(null==a?null:a)];if(!c&&(c=B._,!c))throw x("IIndexed.-nth",a);return c.call(null,a,b)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),
Aa={};function Ba(a){if(a?a.Q:a)return a.Q(a);var b;b=Ba[p(null==a?null:a)];if(!b&&(b=Ba._,!b))throw x("ISeq.-first",a);return b.call(null,a)}function Ca(a){if(a?a.S:a)return a.S(a);var b;b=Ca[p(null==a?null:a)];if(!b&&(b=Ca._,!b))throw x("ISeq.-rest",a);return b.call(null,a)}
var Da={},Ea={},Fa=function(){function a(a,b,c){if(a?a.v:a)return a.v(a,b,c);var h;h=Fa[p(null==a?null:a)];if(!h&&(h=Fa._,!h))throw x("ILookup.-lookup",a);return h.call(null,a,b,c)}function b(a,b){if(a?a.M:a)return a.M(a,b);var c;c=Fa[p(null==a?null:a)];if(!c&&(c=Fa._,!c))throw x("ILookup.-lookup",a);return c.call(null,a,b)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=
a;return c}(),Ga={};function Ia(a,b){if(a?a.Ua:a)return a.Ua(a,b);var c;c=Ia[p(null==a?null:a)];if(!c&&(c=Ia._,!c))throw x("IAssociative.-contains-key?",a);return c.call(null,a,b)}function Ja(a,b,c){if(a?a.Z:a)return a.Z(a,b,c);var d;d=Ja[p(null==a?null:a)];if(!d&&(d=Ja._,!d))throw x("IAssociative.-assoc",a);return d.call(null,a,b,c)}var Ka={};function La(a,b){if(a?a.Xa:a)return a.Xa(a,b);var c;c=La[p(null==a?null:a)];if(!c&&(c=La._,!c))throw x("IMap.-dissoc",a);return c.call(null,a,b)}var Ma={};
function Na(a){if(a?a.Ka:a)return a.Ka(a);var b;b=Na[p(null==a?null:a)];if(!b&&(b=Na._,!b))throw x("IMapEntry.-key",a);return b.call(null,a)}function Oa(a){if(a?a.La:a)return a.La(a);var b;b=Oa[p(null==a?null:a)];if(!b&&(b=Oa._,!b))throw x("IMapEntry.-val",a);return b.call(null,a)}var Pa={};function Qa(a,b){if(a?a.sb:a)return a.sb(a,b);var c;c=Qa[p(null==a?null:a)];if(!c&&(c=Qa._,!c))throw x("ISet.-disjoin",a);return c.call(null,a,b)}
function Ra(a){if(a?a.ua:a)return a.ua(a);var b;b=Ra[p(null==a?null:a)];if(!b&&(b=Ra._,!b))throw x("IStack.-peek",a);return b.call(null,a)}function Sa(a){if(a?a.va:a)return a.va(a);var b;b=Sa[p(null==a?null:a)];if(!b&&(b=Sa._,!b))throw x("IStack.-pop",a);return b.call(null,a)}var Ta={};function Ua(a,b,c){if(a?a.Oa:a)return a.Oa(a,b,c);var d;d=Ua[p(null==a?null:a)];if(!d&&(d=Ua._,!d))throw x("IVector.-assoc-n",a);return d.call(null,a,b,c)}
function Va(a){if(a?a.eb:a)return a.eb(a);var b;b=Va[p(null==a?null:a)];if(!b&&(b=Va._,!b))throw x("IDeref.-deref",a);return b.call(null,a)}var Wa={};function Xa(a){if(a?a.C:a)return a.C(a);var b;b=Xa[p(null==a?null:a)];if(!b&&(b=Xa._,!b))throw x("IMeta.-meta",a);return b.call(null,a)}var Ya={};function Za(a,b){if(a?a.D:a)return a.D(a,b);var c;c=Za[p(null==a?null:a)];if(!c&&(c=Za._,!c))throw x("IWithMeta.-with-meta",a);return c.call(null,a,b)}
var $a={},ab=function(){function a(a,b,c){if(a?a.J:a)return a.J(a,b,c);var h;h=ab[p(null==a?null:a)];if(!h&&(h=ab._,!h))throw x("IReduce.-reduce",a);return h.call(null,a,b,c)}function b(a,b){if(a?a.N:a)return a.N(a,b);var c;c=ab[p(null==a?null:a)];if(!c&&(c=ab._,!c))throw x("IReduce.-reduce",a);return c.call(null,a,b)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}();
function bb(a,b,c){if(a?a.Ja:a)return a.Ja(a,b,c);var d;d=bb[p(null==a?null:a)];if(!d&&(d=bb._,!d))throw x("IKVReduce.-kv-reduce",a);return d.call(null,a,b,c)}function cb(a,b){if(a?a.u:a)return a.u(a,b);var c;c=cb[p(null==a?null:a)];if(!c&&(c=cb._,!c))throw x("IEquiv.-equiv",a);return c.call(null,a,b)}function eb(a){if(a?a.B:a)return a.B(a);var b;b=eb[p(null==a?null:a)];if(!b&&(b=eb._,!b))throw x("IHash.-hash",a);return b.call(null,a)}var fb={};
function gb(a){if(a?a.t:a)return a.t(a);var b;b=gb[p(null==a?null:a)];if(!b&&(b=gb._,!b))throw x("ISeqable.-seq",a);return b.call(null,a)}var hb={},ib={},jb={};function kb(a){if(a?a.Ma:a)return a.Ma(a);var b;b=kb[p(null==a?null:a)];if(!b&&(b=kb._,!b))throw x("IReversible.-rseq",a);return b.call(null,a)}function lb(a,b){if(a?a.vb:a)return a.vb(a,b);var c;c=lb[p(null==a?null:a)];if(!c&&(c=lb._,!c))throw x("ISorted.-sorted-seq",a);return c.call(null,a,b)}
function mb(a,b,c){if(a?a.wb:a)return a.wb(a,b,c);var d;d=mb[p(null==a?null:a)];if(!d&&(d=mb._,!d))throw x("ISorted.-sorted-seq-from",a);return d.call(null,a,b,c)}function nb(a,b){if(a?a.ub:a)return a.ub(a,b);var c;c=nb[p(null==a?null:a)];if(!c&&(c=nb._,!c))throw x("ISorted.-entry-key",a);return c.call(null,a,b)}function ob(a){if(a?a.tb:a)return a.tb(a);var b;b=ob[p(null==a?null:a)];if(!b&&(b=ob._,!b))throw x("ISorted.-comparator",a);return b.call(null,a)}
function pb(a,b){if(a?a.Ob:a)return a.Ob(0,b);var c;c=pb[p(null==a?null:a)];if(!c&&(c=pb._,!c))throw x("IWriter.-write",a);return c.call(null,a,b)}function qb(a){if(a?a.Xb:a)return null;var b;b=qb[p(null==a?null:a)];if(!b&&(b=qb._,!b))throw x("IWriter.-flush",a);return b.call(null,a)}var rb={};function sb(a,b,c){if(a?a.w:a)return a.w(a,b,c);var d;d=sb[p(null==a?null:a)];if(!d&&(d=sb._,!d))throw x("IPrintWithWriter.-pr-writer",a);return d.call(null,a,b,c)}
function tb(a,b,c){if(a?a.Nb:a)return a.Nb(a,b,c);var d;d=tb[p(null==a?null:a)];if(!d&&(d=tb._,!d))throw x("IWatchable.-notify-watches",a);return d.call(null,a,b,c)}function ub(a){if(a?a.Ia:a)return a.Ia(a);var b;b=ub[p(null==a?null:a)];if(!b&&(b=ub._,!b))throw x("IEditableCollection.-as-transient",a);return b.call(null,a)}function vb(a,b){if(a?a.pa:a)return a.pa(a,b);var c;c=vb[p(null==a?null:a)];if(!c&&(c=vb._,!c))throw x("ITransientCollection.-conj!",a);return c.call(null,a,b)}
function wb(a){if(a?a.wa:a)return a.wa(a);var b;b=wb[p(null==a?null:a)];if(!b&&(b=wb._,!b))throw x("ITransientCollection.-persistent!",a);return b.call(null,a)}function xb(a,b,c){if(a?a.Da:a)return a.Da(a,b,c);var d;d=xb[p(null==a?null:a)];if(!d&&(d=xb._,!d))throw x("ITransientAssociative.-assoc!",a);return d.call(null,a,b,c)}function yb(a,b){if(a?a.xb:a)return a.xb(a,b);var c;c=yb[p(null==a?null:a)];if(!c&&(c=yb._,!c))throw x("ITransientMap.-dissoc!",a);return c.call(null,a,b)}
function zb(a){if(a?a.Mb:a)return a.Mb(a);var b;b=zb[p(null==a?null:a)];if(!b&&(b=zb._,!b))throw x("ITransientVector.-pop!",a);return b.call(null,a)}function Ab(a,b){if(a?a.Lb:a)return a.Lb(a,b);var c;c=Ab[p(null==a?null:a)];if(!c&&(c=Ab._,!c))throw x("ITransientSet.-disjoin!",a);return c.call(null,a,b)}function Bb(a){if(a?a.Fb:a)return a.Fb();var b;b=Bb[p(null==a?null:a)];if(!b&&(b=Bb._,!b))throw x("IChunk.-drop-first",a);return b.call(null,a)}
function Cb(a){if(a?a.cb:a)return a.cb(a);var b;b=Cb[p(null==a?null:a)];if(!b&&(b=Cb._,!b))throw x("IChunkedSeq.-chunked-first",a);return b.call(null,a)}function Db(a){if(a?a.Va:a)return a.Va(a);var b;b=Db[p(null==a?null:a)];if(!b&&(b=Db._,!b))throw x("IChunkedSeq.-chunked-rest",a);return b.call(null,a)}function Eb(a){this.cc=a;this.p=0;this.h=1073741824}Eb.prototype.Ob=function(a,b){return this.cc.append(b)};Eb.prototype.Xb=m(null);
function Fb(a){var b=new ka,c=new Eb(b);a.w(a,c,Gb([Hb,!0,Ib,!0,Jb,!1,Kb,!1],!0));qb(c);return""+y(b)}function Lb(a,b,c,d,e){this.Aa=a;this.name=b;this.Ba=c;this.ta=d;this.W=e;this.h=2154168321;this.p=4096}n=Lb.prototype;n.w=function(a,b){return pb(b,this.Ba)};n.B=function(a){var b=this.ta;return null!=b?b:this.ta=a=Mb.a?Mb.a(C.b?C.b(a.Aa):C.call(null,a.Aa),C.b?C.b(a.name):C.call(null,a.name)):Mb.call(null,C.b?C.b(a.Aa):C.call(null,a.Aa),C.b?C.b(a.name):C.call(null,a.name))};
n.D=function(a,b){return new Lb(this.Aa,this.name,this.Ba,this.ta,b)};n.C=f("W");n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return Fa.c(c,this,null);case 3:return Fa.c(c,this,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.u=function(a,b){return b instanceof Lb?this.Ba===b.Ba:!1};n.toString=f("Ba");
function D(a){if(null==a)return null;var b;b=a?((b=a.h&8388608)?b:a.Wb)?!0:!1:!1;if(b)return a.t(a);if(a instanceof Array||"string"===typeof a)return 0===a.length?null:new Nb(a,0);if(v(fb,a))return gb(a);if(w)throw Error([y(a),y("is not ISeqable")].join(""));return null}function E(a){if(null==a)return null;var b;b=a?((b=a.h&64)?b:a.Na)?!0:!1:!1;if(b)return a.Q(a);a=D(a);return null==a?null:Ba(a)}
function F(a){if(null!=a){var b;b=a?((b=a.h&64)?b:a.Na)?!0:!1:!1;if(b)return a.S(a);a=D(a);return null!=a?Ca(a):G}return G}function H(a){if(null==a)a=null;else{var b;b=a?((b=a.h&128)?b:a.Ya)?!0:!1:!1;a=b?a.V(a):D(F(a))}return a}
var Ob=function(){function a(a,b){var c=a===b;return c?c:cb(a,b)}var b=null,c=function(){function a(b,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,b,d,l)}function c(a,d,e){for(;;)if(t(b.a(a,d)))if(H(e))a=d,d=E(e),e=H(e);else return b.a(d,E(e));else return!1}a.j=2;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};a.e=c;return a}(),b=function(b,e,g){switch(arguments.length){case 1:return!0;case 2:return a.call(this,b,e);default:return c.e(b,
e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.b=m(!0);b.a=a;b.e=c.e;return b}();eb["null"]=m(0);Da["null"]=!0;bb["null"]=function(a,b,c){return c};Pa["null"]=!0;Qa["null"]=m(null);ua["null"]=!0;va["null"]=m(0);Ra["null"]=m(null);Sa["null"]=m(null);cb["null"]=function(a,b){return null==b};Ya["null"]=!0;Za["null"]=m(null);Wa["null"]=!0;Xa["null"]=m(null);wa["null"]=m(null);Ka["null"]=!0;La["null"]=m(null);
Date.prototype.u=function(a,b){var c=b instanceof Date;return c?a.toString()===b.toString():c};eb.number=function(a){return Math.floor(a)%2147483647};cb.number=function(a,b){return a===b};eb["boolean"]=function(a){return!0===a?1:0};Wa["function"]=!0;Xa["function"]=m(null);ta["function"]=!0;eb._=function(a){return a[ca]||(a[ca]=++da)};function Pb(a){this.k=a;this.p=0;this.h=32768}Pb.prototype.eb=f("k");function Qb(a){return a instanceof Pb}
var Rb=function(){function a(a,b,c,d){for(var l=va(a);;)if(d<l){c=b.a?b.a(c,B.a(a,d)):b.call(null,c,B.a(a,d));if(Qb(c))return J.b?J.b(c):J.call(null,c);d+=1}else return c}function b(a,b,c){for(var d=va(a),l=0;;)if(l<d){c=b.a?b.a(c,B.a(a,l)):b.call(null,c,B.a(a,l));if(Qb(c))return J.b?J.b(c):J.call(null,c);l+=1}else return c}function c(a,b){var c=va(a);if(0===c)return b.o?b.o():b.call(null);for(var d=B.a(a,0),l=1;;)if(l<c){d=b.a?b.a(d,B.a(a,l)):b.call(null,d,B.a(a,l));if(Qb(d))return J.b?J.b(d):J.call(null,
d);l+=1}else return d}var d=null,d=function(d,g,h,k){switch(arguments.length){case 2:return c.call(this,d,g);case 3:return b.call(this,d,g,h);case 4:return a.call(this,d,g,h,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;d.c=b;d.n=a;return d}(),Sb=function(){function a(a,b,c,d){for(var l=a.length;;)if(d<l){c=b.a?b.a(c,a[d]):b.call(null,c,a[d]);if(Qb(c))return J.b?J.b(c):J.call(null,c);d+=1}else return c}function b(a,b,c){for(var d=a.length,l=0;;)if(l<d){c=b.a?b.a(c,a[l]):b.call(null,c,
a[l]);if(Qb(c))return J.b?J.b(c):J.call(null,c);l+=1}else return c}function c(a,b){var c=a.length;if(0===a.length)return b.o?b.o():b.call(null);for(var d=a[0],l=1;;)if(l<c){d=b.a?b.a(d,a[l]):b.call(null,d,a[l]);if(Qb(d))return J.b?J.b(d):J.call(null,d);l+=1}else return d}var d=null,d=function(d,g,h,k){switch(arguments.length){case 2:return c.call(this,d,g);case 3:return b.call(this,d,g,h);case 4:return a.call(this,d,g,h,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;d.c=b;d.n=a;return d}();
function Tb(a){if(a){var b=a.h&2;a=(b?b:a.Qb)?!0:a.h?!1:v(ua,a)}else a=v(ua,a);return a}function Ub(a){if(a){var b=a.h&16;a=(b?b:a.Jb)?!0:a.h?!1:v(za,a)}else a=v(za,a);return a}function Nb(a,b){this.d=a;this.m=b;this.p=0;this.h=166199550}n=Nb.prototype;n.B=function(a){return Vb.b?Vb.b(a):Vb.call(null,a)};n.V=function(){return this.m+1<this.d.length?new Nb(this.d,this.m+1):null};n.F=function(a,b){return K.a?K.a(b,a):K.call(null,b,a)};n.Ma=function(a){var b=a.G(a);return 0<b?new Wb(a,b-1,null):G};
n.toString=function(){return Fb(this)};n.N=function(a,b){return Sb.n(this.d,b,this.d[this.m],this.m+1)};n.J=function(a,b,c){return Sb.n(this.d,b,c,this.m)};n.t=aa();n.G=function(){return this.d.length-this.m};n.Q=function(){return this.d[this.m]};n.S=function(){return this.m+1<this.d.length?new Nb(this.d,this.m+1):Xb.o?Xb.o():Xb.call(null)};n.u=function(a,b){return Yb.a?Yb.a(a,b):Yb.call(null,a,b)};n.L=function(a,b){var c=b+this.m;return c<this.d.length?this.d[c]:null};
n.P=function(a,b,c){a=b+this.m;return a<this.d.length?this.d[a]:c};n.H=function(){return G};
var Zb=function(){function a(a,b){return b<a.length?new Nb(a,b):null}function b(a){return c.a(a,0)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),I=function(){function a(a,b){return Zb.a(a,b)}function b(a){return Zb.a(a,0)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+
arguments.length);};c.b=b;c.a=a;return c}();function Wb(a,b,c){this.bb=a;this.m=b;this.i=c;this.p=0;this.h=32374862}n=Wb.prototype;n.B=function(a){return Vb.b?Vb.b(a):Vb.call(null,a)};n.F=function(a,b){return K.a?K.a(b,a):K.call(null,b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a?M.a(b,a):M.call(null,b,a)};n.J=function(a,b,c){return M.c?M.c(b,c,a):M.call(null,b,c,a)};n.t=aa();n.G=function(){return this.m+1};n.Q=function(){return B.a(this.bb,this.m)};
n.S=function(){return 0<this.m?new Wb(this.bb,this.m-1,null):G};n.u=function(a,b){return Yb.a?Yb.a(a,b):Yb.call(null,a,b)};n.D=function(a,b){return new Wb(this.bb,this.m,b)};n.C=f("i");n.H=function(){return N.a?N.a(G,this.i):N.call(null,G,this.i)};function $b(a){for(;;){var b=H(a);if(null!=b)a=b;else return E(a)}}cb._=function(a,b){return a===b};
var ac=function(){function a(a,b){return null!=a?ya(a,b):Xb.b?Xb.b(b):Xb.call(null,b)}var b=null,c=function(){function a(b,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,b,d,l)}function c(a,d,e){for(;;)if(t(e))a=b.a(a,d),d=E(e),e=H(e);else return b.a(a,d)}a.j=2;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};a.e=c;return a}(),b=function(b,e,g){switch(arguments.length){case 2:return a.call(this,b,e);default:return c.e(b,
e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.a=a;b.e=c.e;return b}();function O(a){if(null!=a){var b;b=a?((b=a.h&2)?b:a.Qb)?!0:!1:!1;if(b)a=a.G(a);else if(a instanceof Array)a=a.length;else if("string"===typeof a)a=a.length;else if(v(ua,a))a=va(a);else if(w)a:{a=D(a);for(b=0;;){if(Tb(a)){a=b+va(a);break a}a=H(a);b+=1}a=void 0}else a=null}else a=0;return a}
var bc=function(){function a(a,b,c){for(;;){if(null==a)return c;if(0===b)return D(a)?E(a):c;if(Ub(a))return B.c(a,b,c);if(D(a))a=H(a),b-=1;else return w?c:null}}function b(a,b){for(;;){if(null==a)throw Error("Index out of bounds");if(0===b){if(D(a))return E(a);throw Error("Index out of bounds");}if(Ub(a))return B.a(a,b);if(D(a)){var c=H(a),h=b-1;a=c;b=h}else{if(w)throw Error("Index out of bounds");return null}}}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,
c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),Q=function(){function a(a,b,c){if(null!=a){if(function(){var b;b=a?((b=a.h&16)?b:a.Jb)?!0:!1:!1;return b}())return a.P(a,Math.floor(b),c);if(a instanceof Array||"string"===typeof a)return b<a.length?a[b]:c;if(v(za,a))return B.a(a,b);if(w){if(function(){var b;b=a?((b=a.h&64)?b:a.Na)?!0:a.h?!1:v(Aa,a):v(Aa,a);return b}())return bc.c(a,Math.floor(b),c);throw Error([y("nth not supported on this type "),y(pa(oa(a)))].join(""));
}return null}return c}function b(a,b){if(null==a)return null;if(function(){var b;b=a?((b=a.h&16)?b:a.Jb)?!0:!1:!1;return b}())return a.L(a,Math.floor(b));if(a instanceof Array||"string"===typeof a)return b<a.length?a[b]:null;if(v(za,a))return B.a(a,b);if(w){if(function(){var b;b=a?((b=a.h&64)?b:a.Na)?!0:a.h?!1:v(Aa,a):v(Aa,a);return b}())return bc.a(a,Math.floor(b));throw Error([y("nth not supported on this type "),y(pa(oa(a)))].join(""));}return null}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,
c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),R=function(){function a(a,b,c){if(null!=a){var h;h=a?((h=a.h&256)?h:a.Wa)?!0:!1:!1;a=h?a.v(a,b,c):a instanceof Array?b<a.length?a[b]:c:"string"===typeof a?b<a.length?a[b]:c:v(Ea,a)?Fa.c(a,b,c):w?c:null}else a=c;return a}function b(a,b){var c;null==a?c=null:(c=a?((c=a.h&256)?c:a.Wa)?!0:!1:!1,c=c?a.M(a,b):a instanceof Array?b<a.length?a[b]:null:"string"===typeof a?b<a.length?a[b]:null:v(Ea,
a)?Fa.a(a,b):null);return c}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),S=function(){function a(a,b,c){return null!=a?Ja(a,b,c):cc.a?cc.a(b,c):cc.call(null,b,c)}var b=null,c=function(){function a(b,d,k,l){var q=null;3<arguments.length&&(q=I(Array.prototype.slice.call(arguments,3),0));return c.call(this,b,d,k,q)}function c(a,d,e,l){for(;;)if(a=b.c(a,d,
e),t(l))d=E(l),e=E(H(l)),l=H(H(l));else return a}a.j=3;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=H(a);var l=E(a);a=F(a);return c(b,d,l,a)};a.e=c;return a}(),b=function(b,e,g,h){switch(arguments.length){case 3:return a.call(this,b,e,g);default:return c.e(b,e,g,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};b.j=3;b.g=c.g;b.c=a;b.e=c.e;return b}(),dc=function(){var a=null,b=function(){function b(a,c,h){var k=null;2<arguments.length&&(k=I(Array.prototype.slice.call(arguments,2),
0));return d.call(this,a,c,k)}function d(b,c,d){for(;;)if(b=a.a(b,c),t(d))c=E(d),d=H(d);else return b}b.j=2;b.g=function(a){var b=E(a);a=H(a);var c=E(a);a=F(a);return d(b,c,a)};b.e=d;return b}(),a=function(a,d,e){switch(arguments.length){case 1:return a;case 2:return La(a,d);default:return b.e(a,d,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};a.j=2;a.g=b.g;a.b=aa();a.a=function(a,b){return La(a,b)};a.e=b.e;return a}();
function ec(a){var b="function"==p(a);return b?b:a?t(t(null)?null:a.Pb)?!0:a.zb?!1:v(ta,a):v(ta,a)}
var N=function fc(b,c){return function(){var c=ec(b);c&&(c=b?((c=b.h&262144)?c:b.tc)?!0:b.h?!1:v(Ya,b):v(Ya,b),c=!c);return c}()?fc(function(){"undefined"===typeof la&&(la={},la=function(b,c,g,h){this.i=b;this.Ab=c;this.fc=g;this.Zb=h;this.p=0;this.h=393217},la.$a=!0,la.Za="cljs.core/t4205",la.yb=function(b,c){return pb(c,"cljs.core/t4205")},la.prototype.call=function(){function b(d,h){d=this;var k=null;1<arguments.length&&(k=I(Array.prototype.slice.call(arguments,1),0));return c.call(this,d,k)}function c(b,
d){return T.a?T.a(b.Ab,d):T.call(null,b.Ab,d)}b.j=1;b.g=function(b){var d=E(b);b=F(b);return c(d,b)};b.e=c;return b}(),la.prototype.apply=function(b,c){b=this;return b.call.apply(b,[b].concat(c.slice()))},la.prototype.Pb=!0,la.prototype.C=f("Zb"),la.prototype.D=function(b,c){return new la(this.i,this.Ab,this.fc,c)});return new la(c,b,fc,null)}(),c):Za(b,c)};function hc(a){var b;b=a?((b=a.h&131072)?b:a.Vb)?!0:a.h?!1:v(Wa,a):v(Wa,a);return b?Xa(a):null}
var ic=function(){var a=null,b=function(){function b(a,c,h){var k=null;2<arguments.length&&(k=I(Array.prototype.slice.call(arguments,2),0));return d.call(this,a,c,k)}function d(b,c,d){for(;;)if(b=a.a(b,c),t(d))c=E(d),d=H(d);else return b}b.j=2;b.g=function(a){var b=E(a);a=H(a);var c=E(a);a=F(a);return d(b,c,a)};b.e=d;return b}(),a=function(a,d,e){switch(arguments.length){case 1:return a;case 2:return Qa(a,d);default:return b.e(a,d,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};
a.j=2;a.g=b.g;a.b=aa();a.a=function(a,b){return Qa(a,b)};a.e=b.e;return a}(),jc={},kc=0,C=function(){function a(a,b){var c="string"==typeof a;(c?b:c)?(255<kc&&(jc={},kc=0),c=jc[a],"number"!==typeof c&&(c=ea(a),jc[a]=c,kc+=1)):c=eb(a);return c}function b(a){return c.a(a,!0)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}();
function lc(a){var b=null==a;return b?b:na(D(a))}function mc(a){if(null==a)a=!1;else if(a){var b=a.h&8;a=(b?b:a.jc)?!0:a.h?!1:v(xa,a)}else a=v(xa,a);return a}function nc(a){if(null==a)a=!1;else if(a){var b=a.h&4096;a=(b?b:a.rc)?!0:a.h?!1:v(Pa,a)}else a=v(Pa,a);return a}function oc(a){if(a){var b=a.h&512;a=(b?b:a.hc)?!0:a.h?!1:v(Ga,a)}else a=v(Ga,a);return a}function pc(a){if(a){var b=a.h&16777216;a=(b?b:a.qc)?!0:a.h?!1:v(hb,a)}else a=v(hb,a);return a}
function qc(a){if(null==a)a=!1;else if(a){var b=a.h&1024;a=(b?b:a.nc)?!0:a.h?!1:v(Ka,a)}else a=v(Ka,a);return a}function rc(a){if(a){var b=a.h&16384;a=(b?b:a.sc)?!0:a.h?!1:v(Ta,a)}else a=v(Ta,a);return a}function sc(a){if(a){var b=a.p&512;a=(b?b:a.ic)?!0:!1}else a=!1;return a}function tc(a){var b=[];ja(a,function(a,d){return b.push(d)});return b}function uc(a,b,c,d,e){for(;0!==e;)c[d]=a[b],d+=1,e-=1,b+=1}var wc={};
function xc(a){if(null==a)a=!1;else if(a){var b=a.h&64;a=(b?b:a.Na)?!0:a.h?!1:v(Aa,a)}else a=v(Aa,a);return a}function yc(a){return t(a)?!0:!1}function zc(a,b){return R.c(a,b,wc)===wc?!1:!0}function Ac(a,b){if(a===b)return 0;if(null==a)return-1;if(null==b)return 1;if(oa(a)===oa(b)){var c;c=a?((c=a.p&2048)?c:a.Hb)?!0:!1:!1;return c?a.Ib(a,b):ha(a,b)}if(w)throw Error("compare on non-nil objects of different types");return null}
var Bc=function(){function a(a,b,c,h){for(;;){var k=Ac(Q.a(a,h),Q.a(b,h)),l=0===k;if(l?h+1<c:l)h+=1;else return k}}function b(a,b){var g=O(a),h=O(b);return g<h?-1:g>h?1:w?c.n(a,b,g,0):null}var c=null,c=function(c,e,g,h){switch(arguments.length){case 2:return b.call(this,c,e);case 4:return a.call(this,c,e,g,h)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.n=a;return c}();
function Cc(a){return Ob.a(a,Ac)?Ac:function(b,c){var d=a.a?a.a(b,c):a.call(null,b,c);return"number"===typeof d?d:t(d)?-1:t(a.a?a.a(c,b):a.call(null,c,b))?1:0}}
var Ec=function(){function a(a,b){if(D(b)){var c=Dc.b?Dc.b(b):Dc.call(null,b);ia(c,Cc(a));return D(c)}return G}function b(a){return c.a(Ac,a)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),Fc=function(){function a(a,b,c){return Ec.a(function(c,g){return Cc(b).call(null,a.b?a.b(c):a.call(null,c),a.b?a.b(g):a.call(null,g))},c)}function b(a,b){return c.c(a,Ac,b)}
var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),M=function(){function a(a,b,c){for(c=D(c);;)if(c){b=a.a?a.a(b,E(c)):a.call(null,b,E(c));if(Qb(b))return J.b?J.b(b):J.call(null,b);c=H(c)}else return b}function b(a,b){var c=D(b);return c?z.c?z.c(a,E(c),H(c)):z.call(null,a,E(c),H(c)):a.o?a.o():a.call(null)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,
c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),z=function(){function a(a,b,c){var h;h=c?((h=c.h&524288)?h:c.Kb)?!0:!1:!1;return h?c.J(c,a,b):c instanceof Array?Sb.c(c,a,b):"string"===typeof c?Sb.c(c,a,b):v($a,c)?ab.c(c,a,b):w?M.c(a,b,c):null}function b(a,b){var c;c=b?((c=b.h&524288)?c:b.Kb)?!0:!1:!1;return c?b.N(b,a):b instanceof Array?Sb.a(b,a):"string"===typeof b?Sb.a(b,a):v($a,b)?ab.a(b,a):w?M.a(a,b):null}var c=null,c=function(c,
e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}(),Gc=function(){var a=null,b=function(){function a(c,g,h){var k=null;2<arguments.length&&(k=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,c,g,k)}function b(a,c,d){for(;;)if(a>c)if(H(d))a=c,c=E(d),d=H(d);else return c>E(d);else return!1}a.j=2;a.g=function(a){var c=E(a);a=H(a);var h=E(a);a=F(a);return b(c,h,a)};a.e=b;
return a}(),a=function(a,d,e){switch(arguments.length){case 1:return!0;case 2:return a>d;default:return b.e(a,d,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};a.j=2;a.g=b.g;a.b=m(!0);a.a=function(a,b){return a>b};a.e=b.e;return a}(),Hc=function(){var a=null,b=function(){function a(c,g,h){var k=null;2<arguments.length&&(k=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,c,g,k)}function b(a,c,d){for(;;)if(a>=c)if(H(d))a=c,c=E(d),d=H(d);else return c>=E(d);else return!1}
a.j=2;a.g=function(a){var c=E(a);a=H(a);var h=E(a);a=F(a);return b(c,h,a)};a.e=b;return a}(),a=function(a,d,e){switch(arguments.length){case 1:return!0;case 2:return a>=d;default:return b.e(a,d,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};a.j=2;a.g=b.g;a.b=m(!0);a.a=function(a,b){return a>=b};a.e=b.e;return a}();function Ic(a){return a-1}
function Jc(a){return 0<=(a-a%2)/2?Math.floor.b?Math.floor.b((a-a%2)/2):Math.floor.call(null,(a-a%2)/2):Math.ceil.b?Math.ceil.b((a-a%2)/2):Math.ceil.call(null,(a-a%2)/2)}function Kc(a){a-=a>>1&1431655765;a=(a&858993459)+(a>>2&858993459);return 16843009*(a+(a>>4)&252645135)>>24}function Lc(a){var b=1;for(a=D(a);;){var c=a;if(t(c?0<b:c))b-=1,a=H(a);else return a}}
var y=function(){function a(a){return null==a?"":a.toString()}var b=null,c=function(){function a(b,d){var k=null;1<arguments.length&&(k=I(Array.prototype.slice.call(arguments,1),0));return c.call(this,b,k)}function c(a,d){return function(a,c){for(;;)if(t(c)){var d=a.append(b.b(E(c))),e=H(c);a=d;c=e}else return a.toString()}.call(null,new ka(b.b(a)),d)}a.j=1;a.g=function(a){var b=E(a);a=F(a);return c(b,a)};a.e=c;return a}(),b=function(b,e){switch(arguments.length){case 0:return"";case 1:return a.call(this,
b);default:return c.e(b,I(arguments,1))}throw Error("Invalid arity: "+arguments.length);};b.j=1;b.g=c.g;b.o=m("");b.b=a;b.e=c.e;return b}();function Yb(a,b){return yc(pc(b)?function(){for(var c=D(a),d=D(b);;){if(null==c)return null==d;if(null==d)return!1;if(Ob.a(E(c),E(d)))c=H(c),d=H(d);else return w?!1:null}}():null)}function Mb(a,b){return a^b+2654435769+(a<<6)+(a>>2)}function Vb(a){return z.c(function(a,c){return Mb(a,C.a(c,!1))},C.a(E(a),!1),H(a))}
function Mc(a){var b=0;for(a=D(a);;)if(a){var c=E(a),b=(b+(C.b(Nc.b?Nc.b(c):Nc.call(null,c))^C.b(Oc.b?Oc.b(c):Oc.call(null,c))))%4503599627370496;a=H(a)}else return b}function Pc(a){var b=0;for(a=D(a);;)if(a){var c=E(a),b=(b+C.b(c))%4503599627370496;a=H(a)}else return b}function Qc(a,b,c,d,e){this.i=a;this.Fa=b;this.na=c;this.count=d;this.l=e;this.p=0;this.h=65937646}n=Qc.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.V=function(){return 1===this.count?null:this.na};
n.F=function(a,b){return new Qc(this.i,b,a,this.count+1,null)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.G=f("count");n.ua=f("Fa");n.va=function(a){return a.S(a)};n.Q=f("Fa");n.S=function(){return 1===this.count?G:this.na};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Qc(b,this.Fa,this.na,this.count,this.l)};n.C=f("i");n.H=function(){return G};function Rc(a){this.i=a;this.p=0;this.h=65937614}n=Rc.prototype;
n.B=m(0);n.V=m(null);n.F=function(a,b){return new Qc(this.i,b,null,1,null)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=m(null);n.G=m(0);n.ua=m(null);n.va=function(){throw Error("Can't pop empty list");};n.Q=m(null);n.S=function(){return G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Rc(b)};n.C=f("i");n.H=aa();var G=new Rc(null);
function Sc(a){if(a){var b=a.h&134217728;a=(b?b:a.pc)?!0:a.h?!1:v(jb,a)}else a=v(jb,a);return a}function Tc(a){return Sc(a)?kb(a):z.c(ac,G,a)}
var Xb=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){var b;if(a instanceof Nb)b=a.d;else a:{for(b=[];;)if(null!=a)b.push(a.Q(a)),a=a.V(a);else break a;b=void 0}a=b.length;for(var e=G;;)if(0<a){var g=a-1,e=e.F(e,b[a-1]);a=g}else return e}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}();function Uc(a,b,c,d){this.i=a;this.Fa=b;this.na=c;this.l=d;this.p=0;this.h=65929452}n=Uc.prototype;
n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.V=function(){return null==this.na?null:gb(this.na)};n.F=function(a,b){return new Uc(null,b,a,this.l)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.Q=f("Fa");n.S=function(){return null==this.na?G:this.na};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Uc(b,this.Fa,this.na,this.l)};n.C=f("i");n.H=function(){return N(G,this.i)};
function K(a,b){var c=null==b;c||(c=b?((c=b.h&64)?c:b.Na)?!0:!1:!1);return c?new Uc(null,a,b,null):new Uc(null,a,D(b),null)}eb.string=function(a){return ea(a)};function U(a,b,c,d){this.Aa=a;this.name=b;this.ra=c;this.ta=d;this.h=2153775105;this.p=4096}n=U.prototype;n.w=function(a,b){return pb(b,[y(":"),y(this.ra)].join(""))};n.B=function(){null==this.ta&&(this.ta=Mb(C.b(this.Aa),C.b(this.name))+2654435769);return this.ta};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:var e;null==c?e=null:(e=c?((e=c.h&256)?e:c.Wa)?!0:c.h?!1:v(Ea,c):v(Ea,c),e=e?Fa.c(c,this,null):null);return e;case 3:return null==c?e=d:(e=c?((e=c.h&256)?e:c.Wa)?!0:c.h?!1:v(Ea,c):v(Ea,c),e=e?Fa.c(c,this,d):d),e}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.u=function(a,b){return b instanceof U?this.ra===b.ra:!1};
n.toString=function(){return[y(":"),y(this.ra)].join("")};var Wc=function(){function a(a,b){return new U(a,b,[y(t(a)?[y(a),y("/")].join(""):null),y(b)].join(""),null)}function b(a){return a instanceof U?a:a instanceof Lb?new U(null,Vc.b?Vc.b(a):Vc.call(null,a),Vc.b?Vc.b(a):Vc.call(null,a),null):w?new U(null,a,a,null):null}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}();
function V(a,b,c,d){this.i=a;this.Ga=b;this.A=c;this.l=d;this.p=0;this.h=32374988}n=V.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.V=function(a){a.t(a);return null==this.A?null:this.A.V(this.A)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};function Xc(a){null!=a.Ga&&(a.A=a.Ga.o?a.Ga.o():a.Ga.call(null),a.Ga=null);return a.A}n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};
n.t=function(a){Xc(a);if(null==this.A)return null;for(a=this.A;;)if(a instanceof V)a=Xc(a);else return this.A=a,null==this.A?null:this.A.t(this.A)};n.Q=function(a){a.t(a);return null==this.A?null:this.A.Q(this.A)};n.S=function(a){a.t(a);return null!=this.A?this.A.S(this.A):G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new V(b,this.Ga,this.A,this.l)};n.C=f("i");n.H=function(){return N(G,this.i)};function Yc(a,b){this.ab=a;this.end=b;this.p=0;this.h=2}Yc.prototype.G=f("end");
Yc.prototype.add=function(a){this.ab[this.end]=a;return this.end+=1};Yc.prototype.aa=function(){var a=new Zc(this.ab,0,this.end);this.ab=null;return a};function Zc(a,b,c){this.d=a;this.K=b;this.end=c;this.p=0;this.h=524306}n=Zc.prototype;n.N=function(a,b){return Sb.n(this.d,b,this.d[this.K],this.K+1)};n.J=function(a,b,c){return Sb.n(this.d,b,c,this.K)};n.Fb=function(){if(this.K===this.end)throw Error("-drop-first of empty chunk");return new Zc(this.d,this.K+1,this.end)};
n.L=function(a,b){return this.d[this.K+b]};n.P=function(a,b,c){return((a=0<=b)?b<this.end-this.K:a)?this.d[this.K+b]:c};n.G=function(){return this.end-this.K};
var $c=function(){function a(a,b,c){return new Zc(a,b,c)}function b(a,b){return new Zc(a,b,a.length)}function c(a){return new Zc(a,0,a.length)}var d=null,d=function(d,g,h){switch(arguments.length){case 1:return c.call(this,d);case 2:return b.call(this,d,g);case 3:return a.call(this,d,g,h)}throw Error("Invalid arity: "+arguments.length);};d.b=c;d.a=b;d.c=a;return d}();function ad(a,b,c,d){this.aa=a;this.ja=b;this.i=c;this.l=d;this.h=31850732;this.p=1536}n=ad.prototype;
n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.V=function(){if(1<va(this.aa))return new ad(Bb(this.aa),this.ja,this.i,null);var a=gb(this.ja);return null==a?null:a};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.t=aa();n.Q=function(){return B.a(this.aa,0)};n.S=function(){return 1<va(this.aa)?new ad(Bb(this.aa),this.ja,this.i,null):null==this.ja?G:this.ja};n.Gb=function(){return null==this.ja?null:this.ja};n.u=function(a,b){return Yb(a,b)};
n.D=function(a,b){return new ad(this.aa,this.ja,b,this.l)};n.C=f("i");n.H=function(){return N(G,this.i)};n.cb=f("aa");n.Va=function(){return null==this.ja?G:this.ja};function bd(a,b){return 0===va(a)?b:new ad(a,b,null,null)}function Dc(a){for(var b=[];;)if(D(a))b.push(E(a)),a=H(a);else return b}function cd(a,b){if(Tb(a))return O(a);for(var c=a,d=b,e=0;;){var g;g=(g=0<d)?D(c):g;if(t(g))c=H(c),d-=1,e+=1;else return e}}
var ed=function dd(b){return null==b?null:null==H(b)?D(E(b)):w?K(E(b),dd(H(b))):null},fd=function(){function a(a,b){return new V(null,function(){var c=D(a);return c?sc(c)?bd(Cb(c),d.a(Db(c),b)):K(E(c),d.a(F(c),b)):b},null,null)}function b(a){return new V(null,function(){return a},null,null)}function c(){return new V(null,m(null),null,null)}var d=null,e=function(){function a(c,d,e){var g=null;2<arguments.length&&(g=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,c,d,g)}function b(a,
c,e){return function u(a,b){return new V(null,function(){var c=D(a);return c?sc(c)?bd(Cb(c),u(Db(c),b)):K(E(c),u(F(c),b)):t(b)?u(E(b),H(b)):null},null,null)}(d.a(a,c),e)}a.j=2;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=F(a);return b(c,d,a)};a.e=b;return a}(),d=function(d,h,k){switch(arguments.length){case 0:return c.call(this);case 1:return b.call(this,d);case 2:return a.call(this,d,h);default:return e.e(d,h,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};d.j=2;d.g=e.g;d.o=c;
d.b=b;d.a=a;d.e=e.e;return d}(),gd=function(){function a(a,b,c,d){return K(a,K(b,K(c,d)))}function b(a,b,c){return K(a,K(b,c))}var c=null,d=function(){function a(c,d,e,q,s){var u=null;4<arguments.length&&(u=I(Array.prototype.slice.call(arguments,4),0));return b.call(this,c,d,e,q,u)}function b(a,c,d,e,g){return K(a,K(c,K(d,K(e,ed(g)))))}a.j=4;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var s=E(a);a=F(a);return b(c,d,e,s,a)};a.e=b;return a}(),c=function(c,g,h,k,l){switch(arguments.length){case 1:return D(c);
case 2:return K(c,g);case 3:return b.call(this,c,g,h);case 4:return a.call(this,c,g,h,k);default:return d.e(c,g,h,k,I(arguments,4))}throw Error("Invalid arity: "+arguments.length);};c.j=4;c.g=d.g;c.b=function(a){return D(a)};c.a=function(a,b){return K(a,b)};c.c=b;c.n=a;c.e=d.e;return c}();function hd(a){return wb(a)}function id(a,b,c){return xb(a,b,c)}
function jd(a,b,c){var d=D(c);if(0===b)return a.o?a.o():a.call(null);c=Ba(d);var e=Ca(d);if(1===b)return a.b?a.b(c):a.b?a.b(c):a.call(null,c);var d=Ba(e),g=Ca(e);if(2===b)return a.a?a.a(c,d):a.a?a.a(c,d):a.call(null,c,d);var e=Ba(g),h=Ca(g);if(3===b)return a.c?a.c(c,d,e):a.c?a.c(c,d,e):a.call(null,c,d,e);var g=Ba(h),k=Ca(h);if(4===b)return a.n?a.n(c,d,e,g):a.n?a.n(c,d,e,g):a.call(null,c,d,e,g);h=Ba(k);k=Ca(k);if(5===b)return a.s?a.s(c,d,e,g,h):a.s?a.s(c,d,e,g,h):a.call(null,c,d,e,g,h);a=Ba(k);var l=
Ca(k);if(6===b)return a.da?a.da(c,d,e,g,h,a):a.da?a.da(c,d,e,g,h,a):a.call(null,c,d,e,g,h,a);var k=Ba(l),q=Ca(l);if(7===b)return a.Ca?a.Ca(c,d,e,g,h,a,k):a.Ca?a.Ca(c,d,e,g,h,a,k):a.call(null,c,d,e,g,h,a,k);var l=Ba(q),s=Ca(q);if(8===b)return a.qb?a.qb(c,d,e,g,h,a,k,l):a.qb?a.qb(c,d,e,g,h,a,k,l):a.call(null,c,d,e,g,h,a,k,l);var q=Ba(s),u=Ca(s);if(9===b)return a.rb?a.rb(c,d,e,g,h,a,k,l,q):a.rb?a.rb(c,d,e,g,h,a,k,l,q):a.call(null,c,d,e,g,h,a,k,l,q);var s=Ba(u),A=Ca(u);if(10===b)return a.fb?a.fb(c,d,
e,g,h,a,k,l,q,s):a.fb?a.fb(c,d,e,g,h,a,k,l,q,s):a.call(null,c,d,e,g,h,a,k,l,q,s);var u=Ba(A),P=Ca(A);if(11===b)return a.gb?a.gb(c,d,e,g,h,a,k,l,q,s,u):a.gb?a.gb(c,d,e,g,h,a,k,l,q,s,u):a.call(null,c,d,e,g,h,a,k,l,q,s,u);var A=Ba(P),L=Ca(P);if(12===b)return a.hb?a.hb(c,d,e,g,h,a,k,l,q,s,u,A):a.hb?a.hb(c,d,e,g,h,a,k,l,q,s,u,A):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A);var P=Ba(L),W=Ca(L);if(13===b)return a.ib?a.ib(c,d,e,g,h,a,k,l,q,s,u,A,P):a.ib?a.ib(c,d,e,g,h,a,k,l,q,s,u,A,P):a.call(null,c,d,e,g,h,a,k,l,
q,s,u,A,P);var L=Ba(W),ma=Ca(W);if(14===b)return a.jb?a.jb(c,d,e,g,h,a,k,l,q,s,u,A,P,L):a.jb?a.jb(c,d,e,g,h,a,k,l,q,s,u,A,P,L):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L);var W=Ba(ma),ra=Ca(ma);if(15===b)return a.kb?a.kb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W):a.kb?a.kb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,W);var ma=Ba(ra),Ha=Ca(ra);if(16===b)return a.lb?a.lb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma):a.lb?a.lb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,
W,ma);var ra=Ba(Ha),db=Ca(Ha);if(17===b)return a.mb?a.mb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra):a.mb?a.mb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra);var Ha=Ba(db),vc=Ca(db);if(18===b)return a.nb?a.nb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha):a.nb?a.nb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha);db=Ba(vc);vc=Ca(vc);if(19===b)return a.ob?a.ob(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha,db):a.ob?a.ob(c,d,e,g,h,a,k,l,q,
s,u,A,P,L,W,ma,ra,Ha,db):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha,db);var gc=Ba(vc);Ca(vc);if(20===b)return a.pb?a.pb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha,db,gc):a.pb?a.pb(c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha,db,gc):a.call(null,c,d,e,g,h,a,k,l,q,s,u,A,P,L,W,ma,ra,Ha,db,gc);throw Error("Only up to 20 arguments supported on functions");}
var T=function(){function a(a,b,c,d,e){b=gd.n(b,c,d,e);c=a.j;return a.g?(d=cd(b,c+1),d<=c?jd(a,d,b):a.g(b)):a.apply(a,Dc(b))}function b(a,b,c,d){b=gd.c(b,c,d);c=a.j;return a.g?(d=cd(b,c+1),d<=c?jd(a,d,b):a.g(b)):a.apply(a,Dc(b))}function c(a,b,c){b=gd.a(b,c);c=a.j;if(a.g){var d=cd(b,c+1);return d<=c?jd(a,d,b):a.g(b)}return a.apply(a,Dc(b))}function d(a,b){var c=a.j;if(a.g){var d=cd(b,c+1);return d<=c?jd(a,d,b):a.g(b)}return a.apply(a,Dc(b))}var e=null,g=function(){function a(c,d,e,g,h,P){var L=null;
5<arguments.length&&(L=I(Array.prototype.slice.call(arguments,5),0));return b.call(this,c,d,e,g,h,L)}function b(a,c,d,e,g,h){c=K(c,K(d,K(e,K(g,ed(h)))));d=a.j;return a.g?(e=cd(c,d+1),e<=d?jd(a,e,c):a.g(c)):a.apply(a,Dc(c))}a.j=5;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var g=E(a);a=H(a);var h=E(a);a=F(a);return b(c,d,e,g,h,a)};a.e=b;return a}(),e=function(e,k,l,q,s,u){switch(arguments.length){case 2:return d.call(this,e,k);case 3:return c.call(this,e,k,l);case 4:return b.call(this,
e,k,l,q);case 5:return a.call(this,e,k,l,q,s);default:return g.e(e,k,l,q,s,I(arguments,5))}throw Error("Invalid arity: "+arguments.length);};e.j=5;e.g=g.g;e.a=d;e.c=c;e.n=b;e.s=a;e.e=g.e;return e}();function kd(a,b){for(;;){if(null==D(b))return!0;if(t(a.b?a.b(E(b)):a.call(null,E(b)))){var c=a,d=H(b);a=c;b=d}else return w?!1:null}}function ld(a){return a}
function md(a){return function(){var b=null,c=function(){function b(a,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,a,d,l)}function c(b,d,e){return na(T.n(a,b,d,e))}b.j=2;b.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};b.e=c;return b}(),b=function(b,e,g){switch(arguments.length){case 0:return na(a.o?a.o():a.call(null));case 1:return na(a.b?a.b(b):a.call(null,b));case 2:return na(a.a?a.a(b,e):a.call(null,b,e));default:return c.e(b,
e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;return b}()}
var nd=function(){function a(a,b,c){return function(){var d=null,l=function(){function d(a,b,c,e){var g=null;3<arguments.length&&(g=I(Array.prototype.slice.call(arguments,3),0));return k.call(this,a,b,c,g)}function k(d,l,q,s){return a.b?a.b(b.b?b.b(T.s(c,d,l,q,s)):b.call(null,T.s(c,d,l,q,s))):a.call(null,b.b?b.b(T.s(c,d,l,q,s)):b.call(null,T.s(c,d,l,q,s)))}d.j=3;d.g=function(a){var b=E(a);a=H(a);var c=E(a);a=H(a);var d=E(a);a=F(a);return k(b,c,d,a)};d.e=k;return d}(),d=function(d,k,u,A){switch(arguments.length){case 0:return a.b?
a.b(b.b?b.b(c.o?c.o():c.call(null)):b.call(null,c.o?c.o():c.call(null))):a.call(null,b.b?b.b(c.o?c.o():c.call(null)):b.call(null,c.o?c.o():c.call(null)));case 1:return a.b?a.b(b.b?b.b(c.b?c.b(d):c.call(null,d)):b.call(null,c.b?c.b(d):c.call(null,d))):a.call(null,b.b?b.b(c.b?c.b(d):c.call(null,d)):b.call(null,c.b?c.b(d):c.call(null,d)));case 2:return a.b?a.b(b.b?b.b(c.a?c.a(d,k):c.call(null,d,k)):b.call(null,c.a?c.a(d,k):c.call(null,d,k))):a.call(null,b.b?b.b(c.a?c.a(d,k):c.call(null,d,k)):b.call(null,
c.a?c.a(d,k):c.call(null,d,k)));case 3:return a.b?a.b(b.b?b.b(c.c?c.c(d,k,u):c.call(null,d,k,u)):b.call(null,c.c?c.c(d,k,u):c.call(null,d,k,u))):a.call(null,b.b?b.b(c.c?c.c(d,k,u):c.call(null,d,k,u)):b.call(null,c.c?c.c(d,k,u):c.call(null,d,k,u)));default:return l.e(d,k,u,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};d.j=3;d.g=l.g;return d}()}function b(a,b){return function(){var c=null,d=function(){function c(a,b,e,g){var h=null;3<arguments.length&&(h=I(Array.prototype.slice.call(arguments,
3),0));return d.call(this,a,b,e,h)}function d(c,h,k,l){return a.b?a.b(T.s(b,c,h,k,l)):a.call(null,T.s(b,c,h,k,l))}c.j=3;c.g=function(a){var b=E(a);a=H(a);var c=E(a);a=H(a);var e=E(a);a=F(a);return d(b,c,e,a)};c.e=d;return c}(),c=function(c,h,s,u){switch(arguments.length){case 0:return a.b?a.b(b.o?b.o():b.call(null)):a.call(null,b.o?b.o():b.call(null));case 1:return a.b?a.b(b.b?b.b(c):b.call(null,c)):a.call(null,b.b?b.b(c):b.call(null,c));case 2:return a.b?a.b(b.a?b.a(c,h):b.call(null,c,h)):a.call(null,
b.a?b.a(c,h):b.call(null,c,h));case 3:return a.b?a.b(b.c?b.c(c,h,s):b.call(null,c,h,s)):a.call(null,b.c?b.c(c,h,s):b.call(null,c,h,s));default:return d.e(c,h,s,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};c.j=3;c.g=d.g;return c}()}var c=null,d=function(){function a(c,d,e,q){var s=null;3<arguments.length&&(s=I(Array.prototype.slice.call(arguments,3),0));return b.call(this,c,d,e,s)}function b(a,c,d,e){var g=Tc(gd.n(a,c,d,e));return function(){function a(c){var d=null;0<arguments.length&&
(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){a=T.a(E(g),a);for(var c=H(g);;)if(c)a=E(c).call(null,a),c=H(c);else return a}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}()}a.j=3;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=F(a);return b(c,d,e,a)};a.e=b;return a}(),c=function(c,g,h,k){switch(arguments.length){case 0:return ld;case 1:return c;case 2:return b.call(this,c,g);case 3:return a.call(this,c,g,h);default:return d.e(c,g,h,
I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};c.j=3;c.g=d.g;c.o=function(){return ld};c.b=aa();c.a=b;c.c=a;c.e=d.e;return c}(),od=function(){function a(a,b,c,d){return function(){function e(a){var b=null;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return s.call(this,b)}function s(e){return T.s(a,b,c,d,e)}e.j=0;e.g=function(a){a=D(a);return s(a)};e.e=s;return e}()}function b(a,b,c){return function(){function d(a){var b=null;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,
0),0));return e.call(this,b)}function e(d){return T.n(a,b,c,d)}d.j=0;d.g=function(a){a=D(a);return e(a)};d.e=e;return d}()}function c(a,b){return function(){function c(a){var b=null;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return d.call(this,b)}function d(c){return T.c(a,b,c)}c.j=0;c.g=function(a){a=D(a);return d(a)};c.e=d;return c}()}var d=null,e=function(){function a(c,d,e,g,u){var A=null;4<arguments.length&&(A=I(Array.prototype.slice.call(arguments,4),0));return b.call(this,
c,d,e,g,A)}function b(a,c,d,e,g){return function(){function b(a){var c=null;0<arguments.length&&(c=I(Array.prototype.slice.call(arguments,0),0));return h.call(this,c)}function h(b){return T.s(a,c,d,e,fd.a(g,b))}b.j=0;b.g=function(a){a=D(a);return h(a)};b.e=h;return b}()}a.j=4;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var g=E(a);a=F(a);return b(c,d,e,g,a)};a.e=b;return a}(),d=function(d,h,k,l,q){switch(arguments.length){case 2:return c.call(this,d,h);case 3:return b.call(this,
d,h,k);case 4:return a.call(this,d,h,k,l);default:return e.e(d,h,k,l,I(arguments,4))}throw Error("Invalid arity: "+arguments.length);};d.j=4;d.g=e.g;d.a=c;d.c=b;d.n=a;d.e=e.e;return d}(),pd=function(){function a(a,b,c,d){return function(){var l=null,q=function(){function l(a,b,c,d){var e=null;3<arguments.length&&(e=I(Array.prototype.slice.call(arguments,3),0));return q.call(this,a,b,c,e)}function q(l,s,u,W){return T.s(a,null==l?b:l,null==s?c:s,null==u?d:u,W)}l.j=3;l.g=function(a){var b=E(a);a=H(a);
var c=E(a);a=H(a);var d=E(a);a=F(a);return q(b,c,d,a)};l.e=q;return l}(),l=function(l,u,A,P){switch(arguments.length){case 2:return a.a?a.a(null==l?b:l,null==u?c:u):a.call(null,null==l?b:l,null==u?c:u);case 3:return a.c?a.c(null==l?b:l,null==u?c:u,null==A?d:A):a.call(null,null==l?b:l,null==u?c:u,null==A?d:A);default:return q.e(l,u,A,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};l.j=3;l.g=q.g;return l}()}function b(a,b,c){return function(){var d=null,l=function(){function d(a,b,
c,e){var g=null;3<arguments.length&&(g=I(Array.prototype.slice.call(arguments,3),0));return k.call(this,a,b,c,g)}function k(d,l,q,s){return T.s(a,null==d?b:d,null==l?c:l,q,s)}d.j=3;d.g=function(a){var b=E(a);a=H(a);var c=E(a);a=H(a);var d=E(a);a=F(a);return k(b,c,d,a)};d.e=k;return d}(),d=function(d,k,u,A){switch(arguments.length){case 2:return a.a?a.a(null==d?b:d,null==k?c:k):a.call(null,null==d?b:d,null==k?c:k);case 3:return a.c?a.c(null==d?b:d,null==k?c:k,u):a.call(null,null==d?b:d,null==k?c:k,
u);default:return l.e(d,k,u,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};d.j=3;d.g=l.g;return d}()}function c(a,b){return function(){var c=null,d=function(){function c(a,b,e,g){var h=null;3<arguments.length&&(h=I(Array.prototype.slice.call(arguments,3),0));return d.call(this,a,b,e,h)}function d(c,h,k,l){return T.s(a,null==c?b:c,h,k,l)}c.j=3;c.g=function(a){var b=E(a);a=H(a);var c=E(a);a=H(a);var e=E(a);a=F(a);return d(b,c,e,a)};c.e=d;return c}(),c=function(c,h,s,u){switch(arguments.length){case 1:return a.b?
a.b(null==c?b:c):a.call(null,null==c?b:c);case 2:return a.a?a.a(null==c?b:c,h):a.call(null,null==c?b:c,h);case 3:return a.c?a.c(null==c?b:c,h,s):a.call(null,null==c?b:c,h,s);default:return d.e(c,h,s,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};c.j=3;c.g=d.g;return c}()}var d=null,d=function(d,g,h,k){switch(arguments.length){case 2:return c.call(this,d,g);case 3:return b.call(this,d,g,h);case 4:return a.call(this,d,g,h,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;
d.c=b;d.n=a;return d}(),qd=function(){function a(a,b,c,e){return new V(null,function(){var q=D(b),s=D(c),u=D(e);return(q?s?u:s:q)?K(a.c?a.c(E(q),E(s),E(u)):a.call(null,E(q),E(s),E(u)),d.n(a,F(q),F(s),F(u))):null},null,null)}function b(a,b,c){return new V(null,function(){var e=D(b),q=D(c);return(e?q:e)?K(a.a?a.a(E(e),E(q)):a.call(null,E(e),E(q)),d.c(a,F(e),F(q))):null},null,null)}function c(a,b){return new V(null,function(){var c=D(b);if(c){if(sc(c)){for(var e=Cb(c),q=O(e),s=new Yc(Array(q),0),u=0;;)if(u<
q){var A=a.b?a.b(B.a(e,u)):a.call(null,B.a(e,u));s.add(A);u+=1}else break;return bd(s.aa(),d.a(a,Db(c)))}return K(a.b?a.b(E(c)):a.call(null,E(c)),d.a(a,F(c)))}return null},null,null)}var d=null,e=function(){function a(c,d,e,g,u){var A=null;4<arguments.length&&(A=I(Array.prototype.slice.call(arguments,4),0));return b.call(this,c,d,e,g,A)}function b(a,c,e,g,h){return d.a(function(b){return T.a(a,b)},function P(a){return new V(null,function(){var b=d.a(D,a);return kd(ld,b)?K(d.a(E,b),P(d.a(F,b))):null},
null,null)}(ac.e(h,g,I([e,c],0))))}a.j=4;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var g=E(a);a=F(a);return b(c,d,e,g,a)};a.e=b;return a}(),d=function(d,h,k,l,q){switch(arguments.length){case 2:return c.call(this,d,h);case 3:return b.call(this,d,h,k);case 4:return a.call(this,d,h,k,l);default:return e.e(d,h,k,l,I(arguments,4))}throw Error("Invalid arity: "+arguments.length);};d.j=4;d.g=e.g;d.a=c;d.c=b;d.n=a;d.e=e.e;return d}(),sd=function rd(b,c){return new V(null,function(){if(0<
b){var d=D(c);return d?K(E(d),rd(b-1,F(d))):null}return null},null,null)};function td(a,b){return new V(null,function(){var c;a:{c=a;for(var d=b;;){var d=D(d),e=0<c;if(t(e?d:e))c-=1,d=F(d);else{c=d;break a}}c=void 0}return c},null,null)}
var ud=function(){function a(a,b){return sd(a,c.b(b))}function b(a){return new V(null,function(){return K(a,c.b(a))},null,null)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),vd=function(){function a(a,b){return sd(a,c.b(b))}function b(a){return new V(null,function(){return K(a.o?a.o():a.call(null),c.b(a))},null,null)}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,
c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),wd=function(){function a(a,c){return new V(null,function(){var g=D(a),h=D(c);return(g?h:g)?K(E(g),K(E(h),b.a(F(g),F(h)))):null},null,null)}var b=null,c=function(){function a(b,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,b,d,l)}function c(a,d,e){return new V(null,function(){var c=qd.a(D,ac.e(e,d,I([a],0)));return kd(ld,c)?fd.a(qd.a(E,
c),T.a(b,qd.a(F,c))):null},null,null)}a.j=2;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};a.e=c;return a}(),b=function(b,e,g){switch(arguments.length){case 2:return a.call(this,b,e);default:return c.e(b,e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.a=a;b.e=c.e;return b}();function xd(a){return function c(a,e){return new V(null,function(){var g=D(a);return g?K(E(g),c(F(g),e)):D(e)?c(E(e),F(e)):null},null,null)}(null,a)}
var yd=function(){function a(a,b){return xd(qd.a(a,b))}var b=null,c=function(){function a(c,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,c,d,l)}function b(a,c,d){return xd(T.n(qd,a,c,d))}a.j=2;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=F(a);return b(c,d,a)};a.e=b;return a}(),b=function(b,e,g){switch(arguments.length){case 2:return a.call(this,b,e);default:return c.e(b,e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};
b.j=2;b.g=c.g;b.a=a;b.e=c.e;return b}(),Ad=function zd(b,c){return new V(null,function(){var d=D(c);if(d){if(sc(d)){for(var e=Cb(d),g=O(e),h=new Yc(Array(g),0),k=0;;)if(k<g){if(t(b.b?b.b(B.a(e,k)):b.call(null,B.a(e,k)))){var l=B.a(e,k);h.add(l)}k+=1}else break;return bd(h.aa(),zd(b,Db(d)))}e=E(d);d=F(d);return t(b.b?b.b(e):b.call(null,e))?K(e,zd(b,d)):zd(b,d)}return null},null,null)};function Bd(a,b){return Ad(md(a),b)}
function Cd(a){var b=Dd;return function d(a){return new V(null,function(){return K(a,t(b.b?b.b(a):b.call(null,a))?yd.a(d,D.b?D.b(a):D.call(null,a)):null)},null,null)}(a)}function Ed(a,b){var c;null!=a?(c=a?((c=a.p&4)?c:a.kc)?!0:!1:!1,c=c?hd(z.c(vb,ub(a),b)):z.c(ya,a,b)):c=z.c(ac,G,b);return c}
var Fd=function(){function a(a,b,c,k){return new V(null,function(){var l=D(k);if(l){var q=sd(a,l);return a===O(q)?K(q,d.n(a,b,c,td(b,l))):Xb.e(I([sd(a,fd.a(q,c))],0))}return null},null,null)}function b(a,b,c){return new V(null,function(){var k=D(c);if(k){var l=sd(a,k);return a===O(l)?K(l,d.c(a,b,td(b,k))):null}return null},null,null)}function c(a,b){return d.c(a,a,b)}var d=null,d=function(d,g,h,k){switch(arguments.length){case 2:return c.call(this,d,g);case 3:return b.call(this,d,g,h);case 4:return a.call(this,
d,g,h,k)}throw Error("Invalid arity: "+arguments.length);};d.a=c;d.c=b;d.n=a;return d}(),Gd=function(){function a(a,b,c){var h=wc;for(b=D(b);;)if(b){var k=a,l=void 0;l=k?((l=k.h&256)?l:k.Wa)?!0:k.h?!1:v(Ea,k):v(Ea,k);if(l){a=R.c(a,E(b),h);if(h===a)return c;b=H(b)}else return c}else return a}function b(a,b){return c.c(a,b,null)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=
b;c.c=a;return c}(),Hd=function(){function a(a,b,c,d,g,u){var A=Q.c(b,0,null);b=Lc(b);return t(b)?S.c(a,A,e.da(R.a(a,A),b,c,d,g,u)):S.c(a,A,c.n?c.n(R.a(a,A),d,g,u):c.call(null,R.a(a,A),d,g,u))}function b(a,b,c,d,g){var u=Q.c(b,0,null);b=Lc(b);return t(b)?S.c(a,u,e.s(R.a(a,u),b,c,d,g)):S.c(a,u,c.c?c.c(R.a(a,u),d,g):c.call(null,R.a(a,u),d,g))}function c(a,b,c,d){var g=Q.c(b,0,null);b=Lc(b);return t(b)?S.c(a,g,e.n(R.a(a,g),b,c,d)):S.c(a,g,c.a?c.a(R.a(a,g),d):c.call(null,R.a(a,g),d))}function d(a,b,c){var d=
Q.c(b,0,null);b=Lc(b);return t(b)?S.c(a,d,e.c(R.a(a,d),b,c)):S.c(a,d,c.b?c.b(R.a(a,d)):c.call(null,R.a(a,d)))}var e=null,g=function(){function a(c,d,e,g,h,P,L){var W=null;6<arguments.length&&(W=I(Array.prototype.slice.call(arguments,6),0));return b.call(this,c,d,e,g,h,P,W)}function b(a,c,d,g,h,k,L){var W=Q.c(c,0,null);c=Lc(c);return t(c)?S.c(a,W,T.e(e,R.a(a,W),c,d,g,I([h,k,L],0))):S.c(a,W,T.e(d,R.a(a,W),g,h,k,I([L],0)))}a.j=6;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var g=
E(a);a=H(a);var h=E(a);a=H(a);var L=E(a);a=F(a);return b(c,d,e,g,h,L,a)};a.e=b;return a}(),e=function(e,k,l,q,s,u,A){switch(arguments.length){case 3:return d.call(this,e,k,l);case 4:return c.call(this,e,k,l,q);case 5:return b.call(this,e,k,l,q,s);case 6:return a.call(this,e,k,l,q,s,u);default:return g.e(e,k,l,q,s,u,I(arguments,6))}throw Error("Invalid arity: "+arguments.length);};e.j=6;e.g=g.g;e.c=d;e.n=c;e.s=b;e.da=a;e.e=g.e;return e}();function Id(a,b){this.q=a;this.d=b}
function Jd(a){return new Id(a.q,a.d.slice())}function Kd(a){a=a.f;return 32>a?0:a-1>>>5<<5}function Ld(a,b,c){for(;;){if(0===b)return c;var d=new Id(a,Array(32));d.d[0]=c;c=d;b-=5}}var Nd=function Md(b,c,d,e){var g=Jd(d),h=b.f-1>>>c&31;5===c?g.d[h]=e:(d=d.d[h],b=null!=d?Md(b,c-5,d,e):Ld(null,c-5,e),g.d[h]=b);return g};function Od(a,b){throw Error([y("No item "),y(a),y(" in vector of length "),y(b)].join(""));}
function Pd(a,b){var c=0<=b;if(c?b<a.f:c){if(b>=Kd(a))return a.U;for(var c=a.root,d=a.shift;;)if(0<d)var e=d-5,c=c.d[b>>>d&31],d=e;else return c.d}else return Od(b,a.f)}var Rd=function Qd(b,c,d,e,g){var h=Jd(d);if(0===c)h.d[e&31]=g;else{var k=e>>>c&31;b=Qd(b,c-5,d.d[k],e,g);h.d[k]=b}return h},Td=function Sd(b,c,d){var e=b.f-2>>>c&31;if(5<c){b=Sd(b,c-5,d.d[e]);if((c=null==b)?0===e:c)return null;d=Jd(d);d.d[e]=b;return d}return 0===e?null:w?(d=Jd(d),d.d[e]=null,d):null};
function Ud(a,b,c,d,e,g){this.i=a;this.f=b;this.shift=c;this.root=d;this.U=e;this.l=g;this.p=4;this.h=167668511}n=Ud.prototype;n.Ia=function(){return new Vd(this.f,this.shift,Wd.b?Wd.b(this.root):Wd.call(null,this.root),Xd.b?Xd.b(this.U):Xd.call(null,this.U))};n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.M=function(a,b){return a.P(a,b,null)};n.v=function(a,b,c){return a.P(a,b,c)};
n.Z=function(a,b,c){var d=0<=b;if(d?b<this.f:d)return Kd(a)<=b?(a=this.U.slice(),a[b&31]=c,new Ud(this.i,this.f,this.shift,this.root,a,null)):new Ud(this.i,this.f,this.shift,Rd(a,this.shift,this.root,b,c),this.U,null);if(b===this.f)return a.F(a,c);if(w)throw Error([y("Index "),y(b),y(" out of bounds  [0,"),y(this.f),y("]")].join(""));return null};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.L(this,c);case 3:return this.P(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};
n.Ja=function(a,b,c){c=[0,c];for(var d=0;;)if(d<this.f){var e=Pd(a,d),g=e.length;a:{for(var h=0,k=c[1];;)if(h<g){k=b.c?b.c(k,h+d,e[h]):b.call(null,k,h+d,e[h]);if(Qb(k)){e=k;break a}h+=1}else{c[0]=g;e=c[1]=k;break a}e=void 0}if(Qb(e))return J.b?J.b(e):J.call(null,e);d+=c[0]}else return c[1]};
n.F=function(a,b){if(32>this.f-Kd(a)){var c=this.U.slice();c.push(b);return new Ud(this.i,this.f+1,this.shift,this.root,c,null)}var d=this.f>>>5>1<<this.shift,c=d?this.shift+5:this.shift;if(d){d=new Id(null,Array(32));d.d[0]=this.root;var e=Ld(null,this.shift,new Id(null,this.U));d.d[1]=e}else d=Nd(a,this.shift,this.root,new Id(null,this.U));return new Ud(this.i,this.f+1,c,d,[b],null)};n.Ma=function(a){return 0<this.f?new Wb(a,this.f-1,null):G};n.Ka=function(a){return a.L(a,0)};
n.La=function(a){return a.L(a,1)};n.toString=function(){return Fb(this)};n.N=function(a,b){return Rb.a(a,b)};n.J=function(a,b,c){return Rb.c(a,b,c)};n.t=function(a){return 0===this.f?null:32>this.f?I.b(this.U):w?Yd.c?Yd.c(a,0,0):Yd.call(null,a,0,0):null};n.G=f("f");n.ua=function(a){return 0<this.f?a.L(a,this.f-1):null};
n.va=function(a){if(0===this.f)throw Error("Can't pop empty vector");if(1===this.f)return Za(Zd,this.i);if(1<this.f-Kd(a))return new Ud(this.i,this.f-1,this.shift,this.root,this.U.slice(0,-1),null);if(w){var b=Pd(a,this.f-2);a=Td(a,this.shift,this.root);a=null==a?$d:a;var c=this.f-1,d=5<this.shift;return(d?null==a.d[1]:d)?new Ud(this.i,c,this.shift-5,a.d[0],b,null):new Ud(this.i,c,this.shift,a,b,null)}return null};n.Oa=function(a,b,c){return a.Z(a,b,c)};n.u=function(a,b){return Yb(a,b)};
n.D=function(a,b){return new Ud(b,this.f,this.shift,this.root,this.U,this.l)};n.C=f("i");n.L=function(a,b){return Pd(a,b)[b&31]};n.P=function(a,b,c){var d=0<=b;return(d?b<this.f:d)?a.L(a,b):c};n.H=function(){return N(Zd,this.i)};var $d=new Id(null,Array(32)),Zd=new Ud(null,0,5,$d,[],0);function X(a){var b=a.length;if(32>b)return new Ud(null,b,5,$d,a,null);for(var c=a.slice(0,32),d=32,e=ub(new Ud(null,32,5,$d,c,null));;)if(d<b)c=d+1,e=vb(e,a[d]),d=c;else return wb(e)}
function ae(a){return wb(z.c(vb,ub(Zd),a))}var be=function(){function a(a){var c=null;0<arguments.length&&(c=I(Array.prototype.slice.call(arguments,0),0));return ae(c)}a.j=0;a.g=function(a){a=D(a);return ae(a)};a.e=function(a){return ae(a)};return a}();function ce(a,b,c,d,e,g){this.R=a;this.ba=b;this.m=c;this.K=d;this.i=e;this.l=g;this.h=32243948;this.p=1536}n=ce.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};
n.V=function(a){return this.K+1<this.ba.length?(a=Yd.n?Yd.n(this.R,this.ba,this.m,this.K+1):Yd.call(null,this.R,this.ba,this.m,this.K+1),null==a?null:a):a.Gb(a)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return Rb.a(de.c?de.c(this.R,this.m+this.K,O(this.R)):de.call(null,this.R,this.m+this.K,O(this.R)),b)};n.J=function(a,b,c){return Rb.c(de.c?de.c(this.R,this.m+this.K,O(this.R)):de.call(null,this.R,this.m+this.K,O(this.R)),b,c)};n.t=aa();n.Q=function(){return this.ba[this.K]};
n.S=function(a){return this.K+1<this.ba.length?(a=Yd.n?Yd.n(this.R,this.ba,this.m,this.K+1):Yd.call(null,this.R,this.ba,this.m,this.K+1),null==a?G:a):a.Va(a)};n.Gb=function(){var a=this.ba.length,a=this.m+a<va(this.R)?Yd.c?Yd.c(this.R,this.m+a,0):Yd.call(null,this.R,this.m+a,0):null;return null==a?null:a};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return Yd.s?Yd.s(this.R,this.ba,this.m,this.K,b):Yd.call(null,this.R,this.ba,this.m,this.K,b)};n.H=function(){return N(Zd,this.i)};
n.cb=function(){return $c.a(this.ba,this.K)};n.Va=function(){var a=this.ba.length,a=this.m+a<va(this.R)?Yd.c?Yd.c(this.R,this.m+a,0):Yd.call(null,this.R,this.m+a,0):null;return null==a?G:a};
var Yd=function(){function a(a,b,c,d,l){return new ce(a,b,c,d,l,null)}function b(a,b,c,d){return new ce(a,b,c,d,null,null)}function c(a,b,c){return new ce(a,Pd(a,b),b,c,null,null)}var d=null,d=function(d,g,h,k,l){switch(arguments.length){case 3:return c.call(this,d,g,h);case 4:return b.call(this,d,g,h,k);case 5:return a.call(this,d,g,h,k,l)}throw Error("Invalid arity: "+arguments.length);};d.c=c;d.n=b;d.s=a;return d}();
function ee(a,b,c,d,e){this.i=a;this.$=b;this.start=c;this.end=d;this.l=e;this.p=0;this.h=32400159}n=ee.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.M=function(a,b){return a.P(a,b,null)};n.v=function(a,b,c){return a.P(a,b,c)};n.Z=function(a,b,c){var d=this,e=d.start+b;return fe.s?fe.s(d.i,S.c(d.$,e,c),d.start,function(){var a=d.end,b=e+1;return a>b?a:b}(),null):fe.call(null,d.i,S.c(d.$,e,c),d.start,function(){var a=d.end,b=e+1;return a>b?a:b}(),null)};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.L(this,c);case 3:return this.P(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.F=function(a,b){return fe.s?fe.s(this.i,Ua(this.$,this.end,b),this.start,this.end+1,null):fe.call(null,this.i,Ua(this.$,this.end,b),this.start,this.end+1,null)};n.toString=function(){return Fb(this)};
n.N=function(a,b){return Rb.a(a,b)};n.J=function(a,b,c){return Rb.c(a,b,c)};n.t=function(){var a=this;return function c(d){return d===a.end?null:K(B.a(a.$,d),new V(null,function(){return c(d+1)},null,null))}(a.start)};n.G=function(){return this.end-this.start};n.ua=function(){return B.a(this.$,this.end-1)};n.va=function(){if(this.start===this.end)throw Error("Can't pop empty vector");return fe.s?fe.s(this.i,this.$,this.start,this.end-1,null):fe.call(null,this.i,this.$,this.start,this.end-1,null)};
n.Oa=function(a,b,c){return a.Z(a,b,c)};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return fe.s?fe.s(b,this.$,this.start,this.end,this.l):fe.call(null,b,this.$,this.start,this.end,this.l)};n.C=f("i");n.L=function(a,b){var c=0>b;return(c?c:this.end<=this.start+b)?Od(b,this.end-this.start):B.a(this.$,this.start+b)};n.P=function(a,b,c){return((a=0>b)?a:this.end<=this.start+b)?c:B.c(this.$,this.start+b,c)};n.H=function(){return N(Zd,this.i)};
function fe(a,b,c,d,e){for(;;)if(b instanceof ee){var g=b.start+c,h=b.start+d;b=b.$;c=g;d=h}else{var k=O(b);if(function(){var a=0>c;return a||(a=0>d)?a:(a=c>k)?a:d>k}())throw Error("Index out of bounds");return new ee(a,b,c,d,e)}}
var de=function(){function a(a,b,c){return fe(null,a,b,c,null)}function b(a,b){return c.c(a,b,O(a))}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,c,e);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.c=a;return c}();function ge(a,b){return a===b.q?b:new Id(a,b.d.slice())}function Wd(a){return new Id({},a.d.slice())}function Xd(a){var b=Array(32);uc(a,0,b,0,a.length);return b}
var ie=function he(b,c,d,e){d=ge(b.root.q,d);var g=b.f-1>>>c&31;if(5===c)b=e;else{var h=d.d[g];b=null!=h?he(b,c-5,h,e):Ld(b.root.q,c-5,e)}d.d[g]=b;return d},ke=function je(b,c,d){d=ge(b.root.q,d);var e=b.f-2>>>c&31;if(5<c){b=je(b,c-5,d.d[e]);if((c=null==b)?0===e:c)return null;d.d[e]=b;return d}return 0===e?null:w?(d.d[e]=null,d):null};
function le(a,b){var c=0<=b;if(c?b<a.f:c){if(b>=Kd(a))return a.U;for(var d=c=a.root,e=a.shift;;)if(0<e)d=ge(c.q,d.d[b>>>e&31]),e-=5;else return d.d}else throw Error([y("No item "),y(b),y(" in transient vector of length "),y(a.f)].join(""));}function Vd(a,b,c,d){this.f=a;this.shift=b;this.root=c;this.U=d;this.h=275;this.p=88}n=Vd.prototype;
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.M=function(a,b){return a.P(a,b,null)};n.v=function(a,b,c){return a.P(a,b,c)};n.L=function(a,b){if(this.root.q)return Pd(a,b)[b&31];throw Error("nth after persistent!");};n.P=function(a,b,c){var d=0<=b;return(d?b<this.f:d)?a.L(a,b):c};
n.G=function(){if(this.root.q)return this.f;throw Error("count after persistent!");};
function me(a,b,c,d){if(a.root.q){if(function(){var b=0<=c;return b?c<a.f:b}()){if(Kd(b)<=c)a.U[c&31]=d;else{var e=function h(b,e){var q=ge(a.root.q,e);if(0===b)q.d[c&31]=d;else{var s=c>>>b&31,u=h(b-5,q.d[s]);q.d[s]=u}return q}.call(null,a.shift,a.root);a.root=e}return b}if(c===a.f)return b.pa(b,d);if(w)throw Error([y("Index "),y(c),y(" out of bounds for TransientVector of length"),y(a.f)].join(""));return null}throw Error("assoc! after persistent!");}
n.Mb=function(a){var b=this;if(b.root.q){if(0===b.f)throw Error("Can't pop empty vector");if(1===b.f)return b.f=0,a;if(0<(b.f-1&31))return b.f-=1,a;if(w){var c=le(a,b.f-2),d=function(){var c=ke(a,b.shift,b.root);return null!=c?c:new Id(b.root.q,Array(32))}();if(function(){var a=5<b.shift;return a?null==d.d[1]:a}()){var e=ge(b.root.q,d.d[0]);b.root=e;b.shift-=5}else b.root=d;b.f-=1;b.U=c;return a}return null}throw Error("pop! after persistent!");};n.Da=function(a,b,c){return me(a,a,b,c)};
n.pa=function(a,b){if(this.root.q){if(32>this.f-Kd(a))this.U[this.f&31]=b;else{var c=new Id(this.root.q,this.U),d=Array(32);d[0]=b;this.U=d;if(this.f>>>5>1<<this.shift){var d=Array(32),e=this.shift+5;d[0]=this.root;d[1]=Ld(this.root.q,this.shift,c);this.root=new Id(this.root.q,d);this.shift=e}else this.root=ie(a,this.shift,this.root,c)}this.f+=1;return a}throw Error("conj! after persistent!");};
n.wa=function(a){if(this.root.q){this.root.q=null;a=this.f-Kd(a);var b=Array(a);uc(this.U,0,b,0,a);return new Ud(null,this.f,this.shift,this.root,b,null)}throw Error("persistent! called twice");};function ne(){this.p=0;this.h=2097152}ne.prototype.u=m(!1);var oe=new ne;function pe(a,b){return yc(qc(b)?O(a)===O(b)?kd(ld,qd.a(function(a){return Ob.a(R.c(b,E(a),oe),E(H(a)))},a)):null:null)}
function qe(a,b){var c=a.d;if(b instanceof U)a:{for(var d=c.length,e=b.ra,g=0;;){if(d<=g){c=-1;break a}var h=c[g],k=h instanceof U;if(k?e===h.ra:k){c=g;break a}if(w)g+=2;else{c=null;break a}}c=void 0}else if((d="string"==typeof b)?d:"number"===typeof b)a:{d=c.length;for(e=0;;){if(d<=e){c=-1;break a}if(b===c[e]){c=e;break a}if(w)e+=2;else{c=null;break a}}c=void 0}else if(b instanceof Lb)a:{d=c.length;e=b.Ba;for(g=0;;){if(d<=g){c=-1;break a}h=c[g];if((k=h instanceof Lb)?e===h.Ba:k){c=g;break a}if(w)g+=
2;else{c=null;break a}}c=void 0}else if(null==b)a:{d=c.length;for(e=0;;){if(d<=e){c=-1;break a}if(null==c[e]){c=e;break a}if(w)e+=2;else{c=null;break a}}c=void 0}else if(w)a:{d=c.length;for(e=0;;){if(d<=e){c=-1;break a}if(Ob.a(b,c[e])){c=e;break a}if(w)e+=2;else{c=null;break a}}c=void 0}else c=null;return c}function re(a,b,c){this.d=a;this.m=b;this.W=c;this.p=0;this.h=32374990}n=re.prototype;n.B=function(a){return Vb(a)};
n.V=function(){return this.m<this.d.length-2?new re(this.d,this.m+2,this.W):null};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.G=function(){return(this.d.length-this.m)/2};n.Q=function(){return X([this.d[this.m],this.d[this.m+1]])};n.S=function(){return this.m<this.d.length-2?new re(this.d,this.m+2,this.W):G};n.u=function(a,b){return Yb(a,b)};
n.D=function(a,b){return new re(this.d,this.m,b)};n.C=f("W");n.H=function(){return N(G,this.W)};function se(a,b,c,d){this.i=a;this.f=b;this.d=c;this.l=d;this.p=4;this.h=16123663}n=se.prototype;n.Ia=function(){return new te({},this.d.length,this.d.slice())};n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Mc(a)};n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){a=qe(a,b);return-1===a?c:this.d[a+1]};
n.Z=function(a,b,c){var d=qe(a,b);if(-1===d){if(this.f<ue){d=a.d;a=d.length;for(var e=Array(a+2),g=0;;)if(g<a)e[g]=d[g],g+=1;else break;e[a]=b;e[a+1]=c;return new se(this.i,this.f+1,e,null)}return Za(Ja(Ed(ve,a),b,c),this.i)}return c===this.d[d+1]?a:w?(b=this.d.slice(),b[d+1]=c,new se(this.i,this.f,b,null)):null};n.Ua=function(a,b){return-1!==qe(a,b)};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.Ja=function(a,b,c){a=this.d.length;for(var d=0;;)if(d<a){c=b.c?b.c(c,this.d[d],this.d[d+1]):b.call(null,c,this.d[d],this.d[d+1]);if(Qb(c))return J.b?J.b(c):J.call(null,c);d+=2}else return c};
n.F=function(a,b){return rc(b)?a.Z(a,B.a(b,0),B.a(b,1)):z.c(ya,a,b)};n.toString=function(){return Fb(this)};n.t=function(){return 0<=this.d.length-2?new re(this.d,0,null):null};n.G=f("f");n.u=function(a,b){return pe(a,b)};n.D=function(a,b){return new se(b,this.f,this.d,this.l)};n.C=f("i");n.H=function(){return Za(we,this.i)};
n.Xa=function(a,b){if(0<=qe(a,b)){var c=this.d.length,d=c-2;if(0===d)return a.H(a);for(var d=Array(d),e=0,g=0;;){if(e>=c)return new se(this.i,this.f-1,d,null);if(Ob.a(b,this.d[e]))e+=2;else if(w)d[g]=this.d[e],d[g+1]=this.d[e+1],g+=2,e+=2;else return null}}else return a};var we=new se(null,0,[],null),ue=8;function Gb(a,b){var c=b?a:a.slice();return new se(null,c.length/2,c,null)}function te(a,b,c){this.xa=a;this.ga=b;this.d=c;this.p=56;this.h=258}n=te.prototype;
n.xb=function(a,b){if(t(this.xa)){var c=qe(a,b);0<=c&&(this.d[c]=this.d[this.ga-2],this.d[c+1]=this.d[this.ga-1],c=this.d,c.pop(),c.pop(),this.ga-=2);return a}throw Error("dissoc! after persistent!");};n.Da=function(a,b,c){if(t(this.xa)){var d=qe(a,b);if(-1===d)return this.ga+2<=2*ue?(this.ga+=2,this.d.push(b),this.d.push(c),a):id(xe.a?xe.a(this.ga,this.d):xe.call(null,this.ga,this.d),b,c);c!==this.d[d+1]&&(this.d[d+1]=c);return a}throw Error("assoc! after persistent!");};
n.pa=function(a,b){if(t(this.xa)){var c;c=b?((c=b.h&2048)?c:b.Ub)?!0:b.h?!1:v(Ma,b):v(Ma,b);if(c)return a.Da(a,Nc.b?Nc.b(b):Nc.call(null,b),Oc.b?Oc.b(b):Oc.call(null,b));c=D(b);for(var d=a;;){var e=E(c);if(t(e))c=H(c),d=d.Da(d,Nc.b?Nc.b(e):Nc.call(null,e),Oc.b?Oc.b(e):Oc.call(null,e));else return d}}else throw Error("conj! after persistent!");};n.wa=function(){if(t(this.xa))return this.xa=!1,new se(null,Jc(this.ga),this.d,null);throw Error("persistent! called twice");};
n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){if(t(this.xa))return a=qe(a,b),-1===a?c:this.d[a+1];throw Error("lookup after persistent!");};n.G=function(){if(t(this.xa))return Jc(this.ga);throw Error("count after persistent!");};function xe(a,b){for(var c=ub(ve),d=0;;)if(d<a)c=xb(c,b[d],b[d+1]),d+=2;else return c}function ye(){this.k=!1}function ze(a,b){var c;a===b?c=!0:(c=a===b?!0:((c=a instanceof U)?b instanceof U:c)?a.ra===b.ra:!1,c=c?!0:w?Ob.a(a,b):null);return c}
var Ae=function(){function a(a,b,c,h,k){a=a.slice();a[b]=c;a[h]=k;return a}function b(a,b,c){a=a.slice();a[b]=c;return a}var c=null,c=function(c,e,g,h,k){switch(arguments.length){case 3:return b.call(this,c,e,g);case 5:return a.call(this,c,e,g,h,k)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.s=a;return c}();function Be(a,b){var c=Array(a.length-2);uc(a,0,c,0,2*b);uc(a,2*(b+1),c,2*b,c.length-2*b);return c}
var Ce=function(){function a(a,b,c,h,k,l){a=a.qa(b);a.d[c]=h;a.d[k]=l;return a}function b(a,b,c,h){a=a.qa(b);a.d[c]=h;return a}var c=null,c=function(c,e,g,h,k,l){switch(arguments.length){case 4:return b.call(this,c,e,g,h);case 6:return a.call(this,c,e,g,h,k,l)}throw Error("Invalid arity: "+arguments.length);};c.n=b;c.da=a;return c}();
function De(a,b,c){for(var d=a.length,e=0;;)if(e<d){var g=a[e];null!=g?c=b.c?b.c(c,g,a[e+1]):b.call(null,c,g,a[e+1]):(g=a[e+1],c=null!=g?g.za(b,c):c);if(Qb(c))return J.b?J.b(c):J.call(null,c);e+=2}else return c}function Ee(a,b,c){this.q=a;this.r=b;this.d=c}function Fe(a,b,c,d){if(a.r===c)return null;a=a.qa(b);b=a.d;var e=b.length;a.r^=c;uc(b,2*(d+1),b,2*d,e-2*(d+1));b[e-2]=null;b[e-1]=null;return a}n=Ee.prototype;
n.fa=function(a,b,c,d,e,g){var h=1<<(c>>>b&31),k=Kc(this.r&h-1);if(0===(this.r&h)){var l=Kc(this.r);if(2*l<this.d.length){a=this.qa(a);b=a.d;g.k=!0;a:for(c=2*(l-k),g=2*k+(c-1),l=2*(k+1)+(c-1);;){if(0===c)break a;b[l]=b[g];l-=1;c-=1;g-=1}b[2*k]=d;b[2*k+1]=e;a.r|=h;return a}if(16<=l){k=Array(32);k[c>>>b&31]=Ge.fa(a,b+5,c,d,e,g);for(e=d=0;;)if(32>d)0!==(this.r>>>d&1)&&(k[d]=null!=this.d[e]?Ge.fa(a,b+5,C.b(this.d[e]),this.d[e],this.d[e+1],g):this.d[e+1],e+=2),d+=1;else break;return new He(a,l+1,k)}return w?
(b=Array(2*(l+4)),uc(this.d,0,b,0,2*k),b[2*k]=d,b[2*k+1]=e,uc(this.d,2*k,b,2*(k+1),2*(l-k)),g.k=!0,a=this.qa(a),a.d=b,a.r|=h,a):null}l=this.d[2*k];h=this.d[2*k+1];return null==l?(l=h.fa(a,b+5,c,d,e,g),l===h?this:Ce.n(this,a,2*k+1,l)):ze(d,l)?e===h?this:Ce.n(this,a,2*k+1,e):w?(g.k=!0,Ce.da(this,a,2*k,null,2*k+1,Ie.Ca?Ie.Ca(a,b+5,l,h,c,d,e):Ie.call(null,a,b+5,l,h,c,d,e))):null};n.Pa=function(){return Je.b?Je.b(this.d):Je.call(null,this.d)};
n.Ra=function(a,b,c,d,e){var g=1<<(c>>>b&31);if(0===(this.r&g))return this;var h=Kc(this.r&g-1),k=this.d[2*h],l=this.d[2*h+1];return null==k?(b=l.Ra(a,b+5,c,d,e),b===l?this:null!=b?Ce.n(this,a,2*h+1,b):this.r===g?null:w?Fe(this,a,g,h):null):ze(d,k)?(e[0]=!0,Fe(this,a,g,h)):w?this:null};n.qa=function(a){if(a===this.q)return this;var b=Kc(this.r),c=Array(0>b?4:2*(b+1));uc(this.d,0,c,0,2*b);return new Ee(a,this.r,c)};n.za=function(a,b){return De(this.d,a,b)};
n.Qa=function(a,b,c){var d=1<<(b>>>a&31);if(0===(this.r&d))return this;var e=Kc(this.r&d-1),g=this.d[2*e],h=this.d[2*e+1];return null==g?(a=h.Qa(a+5,b,c),a===h?this:null!=a?new Ee(null,this.r,Ae.c(this.d,2*e+1,a)):this.r===d?null:w?new Ee(null,this.r^d,Be(this.d,e)):null):ze(c,g)?new Ee(null,this.r^d,Be(this.d,e)):w?this:null};
n.ea=function(a,b,c,d,e){var g=1<<(b>>>a&31),h=Kc(this.r&g-1);if(0===(this.r&g)){var k=Kc(this.r);if(16<=k){h=Array(32);h[b>>>a&31]=Ge.ea(a+5,b,c,d,e);for(d=c=0;;)if(32>c)0!==(this.r>>>c&1)&&(h[c]=null!=this.d[d]?Ge.ea(a+5,C.b(this.d[d]),this.d[d],this.d[d+1],e):this.d[d+1],d+=2),c+=1;else break;return new He(null,k+1,h)}a=Array(2*(k+1));uc(this.d,0,a,0,2*h);a[2*h]=c;a[2*h+1]=d;uc(this.d,2*h,a,2*(h+1),2*(k-h));e.k=!0;return new Ee(null,this.r|g,a)}k=this.d[2*h];g=this.d[2*h+1];return null==k?(k=g.ea(a+
5,b,c,d,e),k===g?this:new Ee(null,this.r,Ae.c(this.d,2*h+1,k))):ze(c,k)?d===g?this:new Ee(null,this.r,Ae.c(this.d,2*h+1,d)):w?(e.k=!0,new Ee(null,this.r,Ae.s(this.d,2*h,null,2*h+1,Ie.da?Ie.da(a+5,k,g,b,c,d):Ie.call(null,a+5,k,g,b,c,d)))):null};n.sa=function(a,b,c,d){var e=1<<(b>>>a&31);if(0===(this.r&e))return d;var g=Kc(this.r&e-1),e=this.d[2*g],g=this.d[2*g+1];return null==e?g.sa(a+5,b,c,d):ze(c,e)?g:w?d:null};var Ge=new Ee(null,0,[]);
function Ke(a,b,c){var d=a.d;a=2*(a.f-1);for(var e=Array(a),g=0,h=1,k=0;;)if(g<a){var l=g!==c;if(l?null!=d[g]:l)e[h]=d[g],h+=2,k|=1<<g;g+=1}else return new Ee(b,k,e)}function He(a,b,c){this.q=a;this.f=b;this.d=c}n=He.prototype;n.fa=function(a,b,c,d,e,g){var h=c>>>b&31,k=this.d[h];if(null==k)return a=Ce.n(this,a,h,Ge.fa(a,b+5,c,d,e,g)),a.f+=1,a;b=k.fa(a,b+5,c,d,e,g);return b===k?this:Ce.n(this,a,h,b)};n.Pa=function(){return Le.b?Le.b(this.d):Le.call(null,this.d)};
n.Ra=function(a,b,c,d,e){var g=c>>>b&31,h=this.d[g];if(null==h)return this;b=h.Ra(a,b+5,c,d,e);if(b===h)return this;if(null==b){if(8>=this.f)return Ke(this,a,g);a=Ce.n(this,a,g,b);a.f-=1;return a}return w?Ce.n(this,a,g,b):null};n.qa=function(a){return a===this.q?this:new He(a,this.f,this.d.slice())};n.za=function(a,b){for(var c=this.d.length,d=0,e=b;;)if(d<c){var g=this.d[d];if(null!=g&&(e=g.za(a,e),Qb(e)))return J.b?J.b(e):J.call(null,e);d+=1}else return e};
n.Qa=function(a,b,c){var d=b>>>a&31,e=this.d[d];return null!=e?(a=e.Qa(a+5,b,c),a===e?this:null==a?8>=this.f?Ke(this,null,d):new He(null,this.f-1,Ae.c(this.d,d,a)):w?new He(null,this.f,Ae.c(this.d,d,a)):null):this};n.ea=function(a,b,c,d,e){var g=b>>>a&31,h=this.d[g];if(null==h)return new He(null,this.f+1,Ae.c(this.d,g,Ge.ea(a+5,b,c,d,e)));a=h.ea(a+5,b,c,d,e);return a===h?this:new He(null,this.f,Ae.c(this.d,g,a))};n.sa=function(a,b,c,d){var e=this.d[b>>>a&31];return null!=e?e.sa(a+5,b,c,d):d};
function Me(a,b,c){b*=2;for(var d=0;;)if(d<b){if(ze(c,a[d]))return d;d+=2}else return-1}function Ne(a,b,c,d){this.q=a;this.ma=b;this.f=c;this.d=d}n=Ne.prototype;
n.fa=function(a,b,c,d,e,g){if(c===this.ma){b=Me(this.d,this.f,d);if(-1===b){if(this.d.length>2*this.f)return a=Ce.da(this,a,2*this.f,d,2*this.f+1,e),g.k=!0,a.f+=1,a;c=this.d.length;b=Array(c+2);uc(this.d,0,b,0,c);b[c]=d;b[c+1]=e;g.k=!0;g=this.f+1;a===this.q?(this.d=b,this.f=g,a=this):a=new Ne(this.q,this.ma,g,b);return a}return this.d[b+1]===e?this:Ce.n(this,a,b+1,e)}return(new Ee(a,1<<(this.ma>>>b&31),[null,this,null,null])).fa(a,b,c,d,e,g)};
n.Pa=function(){return Je.b?Je.b(this.d):Je.call(null,this.d)};n.Ra=function(a,b,c,d,e){b=Me(this.d,this.f,d);if(-1===b)return this;e[0]=!0;if(1===this.f)return null;a=this.qa(a);e=a.d;e[b]=e[2*this.f-2];e[b+1]=e[2*this.f-1];e[2*this.f-1]=null;e[2*this.f-2]=null;a.f-=1;return a};n.qa=function(a){if(a===this.q)return this;var b=Array(2*(this.f+1));uc(this.d,0,b,0,2*this.f);return new Ne(a,this.ma,this.f,b)};n.za=function(a,b){return De(this.d,a,b)};
n.Qa=function(a,b,c){a=Me(this.d,this.f,c);return-1===a?this:1===this.f?null:w?new Ne(null,this.ma,this.f-1,Be(this.d,Jc(a))):null};n.ea=function(a,b,c,d,e){return b===this.ma?(a=Me(this.d,this.f,c),-1===a?(a=this.d.length,b=Array(a+2),uc(this.d,0,b,0,a),b[a]=c,b[a+1]=d,e.k=!0,new Ne(null,this.ma,this.f+1,b)):Ob.a(this.d[a],d)?this:new Ne(null,this.ma,this.f,Ae.c(this.d,a+1,d))):(new Ee(null,1<<(this.ma>>>a&31),[null,this])).ea(a,b,c,d,e)};
n.sa=function(a,b,c,d){a=Me(this.d,this.f,c);return 0>a?d:ze(c,this.d[a])?this.d[a+1]:w?d:null};
var Ie=function(){function a(a,b,c,h,k,l,q){var s=C.b(c);if(s===k)return new Ne(null,s,2,[c,h,l,q]);var u=new ye;return Ge.fa(a,b,s,c,h,u).fa(a,b,k,l,q,u)}function b(a,b,c,h,k,l){var q=C.b(b);if(q===h)return new Ne(null,q,2,[b,c,k,l]);var s=new ye;return Ge.ea(a,q,b,c,s).ea(a,h,k,l,s)}var c=null,c=function(c,e,g,h,k,l,q){switch(arguments.length){case 6:return b.call(this,c,e,g,h,k,l);case 7:return a.call(this,c,e,g,h,k,l,q)}throw Error("Invalid arity: "+arguments.length);};c.da=b;c.Ca=a;return c}();
function Oe(a,b,c,d,e){this.i=a;this.ha=b;this.m=c;this.A=d;this.l=e;this.p=0;this.h=32374860}n=Oe.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.Q=function(){return null==this.A?X([this.ha[this.m],this.ha[this.m+1]]):E(this.A)};
n.S=function(){return null==this.A?Je.c?Je.c(this.ha,this.m+2,null):Je.call(null,this.ha,this.m+2,null):Je.c?Je.c(this.ha,this.m,H(this.A)):Je.call(null,this.ha,this.m,H(this.A))};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Oe(b,this.ha,this.m,this.A,this.l)};n.C=f("i");n.H=function(){return N(G,this.i)};
var Je=function(){function a(a,b,c){if(null==c)for(c=a.length;;)if(b<c){if(null!=a[b])return new Oe(null,a,b,null,null);var h=a[b+1];if(t(h)&&(h=h.Pa(),t(h)))return new Oe(null,a,b+2,h,null);b+=2}else return null;else return new Oe(null,a,b,c,null)}function b(a){return c.c(a,0,null)}var c=null,c=function(c,e,g){switch(arguments.length){case 1:return b.call(this,c);case 3:return a.call(this,c,e,g)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.c=a;return c}();
function Pe(a,b,c,d,e){this.i=a;this.ha=b;this.m=c;this.A=d;this.l=e;this.p=0;this.h=32374860}n=Pe.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.Q=function(){return E(this.A)};n.S=function(){return Le.n?Le.n(null,this.ha,this.m,H(this.A)):Le.call(null,null,this.ha,this.m,H(this.A))};n.u=function(a,b){return Yb(a,b)};
n.D=function(a,b){return new Pe(b,this.ha,this.m,this.A,this.l)};n.C=f("i");n.H=function(){return N(G,this.i)};
var Le=function(){function a(a,b,c,h){if(null==h)for(h=b.length;;)if(c<h){var k=b[c];if(t(k)&&(k=k.Pa(),t(k)))return new Pe(a,b,c+1,k,null);c+=1}else return null;else return new Pe(a,b,c,h,null)}function b(a){return c.n(null,a,0,null)}var c=null,c=function(c,e,g,h){switch(arguments.length){case 1:return b.call(this,c);case 4:return a.call(this,c,e,g,h)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.n=a;return c}();
function Qe(a,b,c,d,e,g){this.i=a;this.f=b;this.root=c;this.T=d;this.X=e;this.l=g;this.p=4;this.h=16123663}n=Qe.prototype;n.Ia=function(){return new Re({},this.root,this.f,this.T,this.X)};n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Mc(a)};n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){return null==b?this.T?this.X:c:null==this.root?c:w?this.root.sa(0,C.b(b),b,c):null};
n.Z=function(a,b,c){if(null==b){var d=this.T;return(d?c===this.X:d)?a:new Qe(this.i,this.T?this.f:this.f+1,this.root,!0,c,null)}d=new ye;c=(null==this.root?Ge:this.root).ea(0,C.b(b),b,c,d);return c===this.root?a:new Qe(this.i,d.k?this.f+1:this.f,c,this.T,this.X,null)};n.Ua=function(a,b){return null==b?this.T:null==this.root?!1:w?this.root.sa(0,C.b(b),b,wc)!==wc:null};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.Ja=function(a,b,c){a=this.T?b.c?b.c(c,null,this.X):b.call(null,c,null,this.X):c;return Qb(a)?J.b?J.b(a):J.call(null,a):null!=this.root?this.root.za(b,a):w?a:null};n.F=function(a,b){return rc(b)?a.Z(a,B.a(b,0),B.a(b,1)):z.c(ya,a,b)};
n.toString=function(){return Fb(this)};n.t=function(){if(0<this.f){var a=null!=this.root?this.root.Pa():null;return this.T?K(X([null,this.X]),a):a}return null};n.G=f("f");n.u=function(a,b){return pe(a,b)};n.D=function(a,b){return new Qe(b,this.f,this.root,this.T,this.X,this.l)};n.C=f("i");n.H=function(){return Za(ve,this.i)};
n.Xa=function(a,b){if(null==b)return this.T?new Qe(this.i,this.f-1,this.root,!1,null,null):a;if(null==this.root)return a;if(w){var c=this.root.Qa(0,C.b(b),b);return c===this.root?a:new Qe(this.i,this.f-1,c,this.T,this.X,null)}return null};var ve=new Qe(null,0,null,!1,null,0);function Re(a,b,c,d,e){this.q=a;this.root=b;this.count=c;this.T=d;this.X=e;this.p=56;this.h=258}n=Re.prototype;
n.xb=function(a,b){if(a.q)if(null==b)a.T&&(a.T=!1,a.X=null,a.count-=1);else{if(null!=a.root){var c=new ye,d=a.root.Ra(a.q,0,C.b(b),b,c);d!==a.root&&(a.root=d);t(c[0])&&(a.count-=1)}}else throw Error("dissoc! after persistent!");return a};n.Da=function(a,b,c){return Se(a,b,c)};
n.pa=function(a,b){var c;a:{if(a.q){c=b?((c=b.h&2048)?c:b.Ub)?!0:b.h?!1:v(Ma,b):v(Ma,b);if(c){c=Se(a,Nc.b?Nc.b(b):Nc.call(null,b),Oc.b?Oc.b(b):Oc.call(null,b));break a}c=D(b);for(var d=a;;){var e=E(c);if(t(e))c=H(c),d=Se(d,Nc.b?Nc.b(e):Nc.call(null,e),Oc.b?Oc.b(e):Oc.call(null,e));else{c=d;break a}}}else throw Error("conj! after persistent");c=void 0}return c};n.wa=function(a){if(a.q)a.q=null,a=new Qe(null,a.count,a.root,a.T,a.X,null);else throw Error("persistent! called twice");return a};
n.M=function(a,b){return null==b?this.T?this.X:null:null==this.root?null:this.root.sa(0,C.b(b),b)};n.v=function(a,b,c){return null==b?this.T?this.X:c:null==this.root?c:this.root.sa(0,C.b(b),b,c)};n.G=function(){if(this.q)return this.count;throw Error("count after persistent!");};
function Se(a,b,c){if(a.q){if(null==b)a.X!==c&&(a.X=c),a.T||(a.count+=1,a.T=!0);else{var d=new ye;b=(null==a.root?Ge:a.root).fa(a.q,0,C.b(b),b,c,d);b!==a.root&&(a.root=b);d.k&&(a.count+=1)}return a}throw Error("assoc! after persistent!");}function Te(a,b,c){for(var d=b;;)if(null!=a)b=c?a.left:a.right,d=ac.a(d,a),a=b;else return d}function Ue(a,b,c,d,e){this.i=a;this.stack=b;this.Ta=c;this.f=d;this.l=e;this.p=0;this.h=32374862}n=Ue.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};
n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.G=function(a){return 0>this.f?O(H(a))+1:this.f};n.Q=function(){return Ra(this.stack)};n.S=function(){var a=E(this.stack),a=Te(this.Ta?a.right:a.left,H(this.stack),this.Ta);return null!=a?new Ue(null,a,this.Ta,this.f-1,null):G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Ue(b,this.stack,this.Ta,this.f,this.l)};n.C=f("i");
n.H=function(){return N(G,this.i)};function Ve(a,b,c,d){return c instanceof Y?c.left instanceof Y?new Y(c.key,c.k,c.left.la(),new Z(a,b,c.right,d,null),null):c.right instanceof Y?new Y(c.right.key,c.right.k,new Z(c.key,c.k,c.left,c.right.left,null),new Z(a,b,c.right.right,d,null),null):w?new Z(a,b,c,d,null):null:new Z(a,b,c,d,null)}
function We(a,b,c,d){return d instanceof Y?d.right instanceof Y?new Y(d.key,d.k,new Z(a,b,c,d.left,null),d.right.la(),null):d.left instanceof Y?new Y(d.left.key,d.left.k,new Z(a,b,c,d.left.left,null),new Z(d.key,d.k,d.left.right,d.right,null),null):w?new Z(a,b,c,d,null):null:new Z(a,b,c,d,null)}
function Xe(a,b,c,d){if(c instanceof Y)return new Y(a,b,c.la(),d,null);if(d instanceof Z)return We(a,b,c,d.Sa());var e=d instanceof Y;if(e?d.left instanceof Z:e)return new Y(d.left.key,d.left.k,new Z(a,b,c,d.left.left,null),We(d.key,d.k,d.left.right,d.right.Sa()),null);if(w)throw Error("red-black tree invariant violation");return null}
function Ye(a,b,c,d){if(d instanceof Y)return new Y(a,b,c,d.la(),null);if(c instanceof Z)return Ve(a,b,c.Sa(),d);var e=c instanceof Y;if(e?c.right instanceof Z:e)return new Y(c.right.key,c.right.k,Ve(c.key,c.k,c.left.Sa(),c.right.left),new Z(a,b,c.right.right,d,null),null);if(w)throw Error("red-black tree invariant violation");return null}
var $e=function Ze(b,c,d){d=null!=b.left?Ze(b.left,c,d):d;if(Qb(d))return J.b?J.b(d):J.call(null,d);d=c.c?c.c(d,b.key,b.k):c.call(null,d,b.key,b.k);if(Qb(d))return J.b?J.b(d):J.call(null,d);b=null!=b.right?Ze(b.right,c,d):d;return Qb(b)?J.b?J.b(b):J.call(null,b):b};function Z(a,b,c,d,e){this.key=a;this.k=b;this.left=c;this.right=d;this.l=e;this.p=0;this.h=32402207}n=Z.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.M=function(a,b){return a.P(a,b,null)};
n.v=function(a,b,c){return a.P(a,b,c)};n.Z=function(a,b,c){return S.c(X([this.key,this.k]),b,c)};n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.F=function(a,b){return X([this.key,this.k,b])};n.Ka=f("key");n.La=f("k");n.Cb=function(a){return a.Eb(this)};
n.Sa=function(){return new Y(this.key,this.k,this.left,this.right,null)};n.replace=function(a,b,c,d){return new Z(a,b,c,d,null)};n.za=function(a,b){return $e(this,a,b)};n.Bb=function(a){return a.Db(this)};n.Db=function(a){return new Z(a.key,a.k,this,a.right,null)};n.Eb=function(a){return new Z(a.key,a.k,a.left,this,null)};n.la=function(){return this};n.N=function(a,b){return Rb.a(a,b)};n.J=function(a,b,c){return Rb.c(a,b,c)};n.t=function(){return Xb.e(I([this.key,this.k],0))};n.G=m(2);n.ua=f("k");
n.va=function(){return X([this.key])};n.Oa=function(a,b,c){return Ua(X([this.key,this.k]),b,c)};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return N(X([this.key,this.k]),b)};n.C=m(null);n.L=function(a,b){return 0===b?this.key:1===b?this.k:null};n.P=function(a,b,c){return 0===b?this.key:1===b?this.k:w?c:null};n.H=function(){return Zd};function Y(a,b,c,d,e){this.key=a;this.k=b;this.left=c;this.right=d;this.l=e;this.p=0;this.h=32402207}n=Y.prototype;
n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};n.M=function(a,b){return a.P(a,b,null)};n.v=function(a,b,c){return a.P(a,b,c)};n.Z=function(a,b,c){return S.c(X([this.key,this.k]),b,c)};n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};
n.F=function(a,b){return X([this.key,this.k,b])};n.Ka=f("key");n.La=f("k");n.Cb=function(a){return new Y(this.key,this.k,this.left,a,null)};n.Sa=function(){throw Error("red-black tree invariant violation");};n.replace=function(a,b,c,d){return new Y(a,b,c,d,null)};n.za=function(a,b){return $e(this,a,b)};n.Bb=function(a){return new Y(this.key,this.k,a,this.right,null)};
n.Db=function(a){return this.left instanceof Y?new Y(this.key,this.k,this.left.la(),new Z(a.key,a.k,this.right,a.right,null),null):this.right instanceof Y?new Y(this.right.key,this.right.k,new Z(this.key,this.k,this.left,this.right.left,null),new Z(a.key,a.k,this.right.right,a.right,null),null):w?new Z(a.key,a.k,this,a.right,null):null};
n.Eb=function(a){return this.right instanceof Y?new Y(this.key,this.k,new Z(a.key,a.k,a.left,this.left,null),this.right.la(),null):this.left instanceof Y?new Y(this.left.key,this.left.k,new Z(a.key,a.k,a.left,this.left.left,null),new Z(this.key,this.k,this.left.right,this.right,null),null):w?new Z(a.key,a.k,a.left,this,null):null};n.la=function(){return new Z(this.key,this.k,this.left,this.right,null)};n.N=function(a,b){return Rb.a(a,b)};n.J=function(a,b,c){return Rb.c(a,b,c)};
n.t=function(){return Xb.e(I([this.key,this.k],0))};n.G=m(2);n.ua=f("k");n.va=function(){return X([this.key])};n.Oa=function(a,b,c){return Ua(X([this.key,this.k]),b,c)};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return N(X([this.key,this.k]),b)};n.C=m(null);n.L=function(a,b){return 0===b?this.key:1===b?this.k:null};n.P=function(a,b,c){return 0===b?this.key:1===b?this.k:w?c:null};n.H=function(){return Zd};
var bf=function af(b,c,d,e,g){if(null==c)return new Y(d,e,null,null,null);var h=b.a?b.a(d,c.key):b.call(null,d,c.key);return 0===h?(g[0]=c,null):0>h?(b=af(b,c.left,d,e,g),null!=b?c.Bb(b):null):w?(b=af(b,c.right,d,e,g),null!=b?c.Cb(b):null):null},df=function cf(b,c){if(null==b)return c;if(null==c)return b;if(b instanceof Y){if(c instanceof Y){var d=cf(b.right,c.left);return d instanceof Y?new Y(d.key,d.k,new Y(b.key,b.k,b.left,d.left,null),new Y(c.key,c.k,d.right,c.right,null),null):new Y(b.key,b.k,
b.left,new Y(c.key,c.k,d,c.right,null),null)}return new Y(b.key,b.k,b.left,cf(b.right,c),null)}return c instanceof Y?new Y(c.key,c.k,cf(b,c.left),c.right,null):w?(d=cf(b.right,c.left),d instanceof Y?new Y(d.key,d.k,new Z(b.key,b.k,b.left,d.left,null),new Z(c.key,c.k,d.right,c.right,null),null):Xe(b.key,b.k,b.left,new Z(c.key,c.k,d,c.right,null))):null},ff=function ef(b,c,d,e){if(null!=c){var g=b.a?b.a(d,c.key):b.call(null,d,c.key);if(0===g)return e[0]=c,df(c.left,c.right);if(0>g){var h=ef(b,c.left,
d,e);return function(){var b=null!=h;return b?b:null!=e[0]}()?c.left instanceof Z?Xe(c.key,c.k,h,c.right):new Y(c.key,c.k,h,c.right,null):null}if(w)return h=ef(b,c.right,d,e),function(){var b=null!=h;return b?b:null!=e[0]}()?c.right instanceof Z?Ye(c.key,c.k,c.left,h):new Y(c.key,c.k,c.left,h,null):null}return null},hf=function gf(b,c,d,e){var g=c.key,h=b.a?b.a(d,g):b.call(null,d,g);return 0===h?c.replace(g,e,c.left,c.right):0>h?c.replace(g,c.k,gf(b,c.left,d,e),c.right):w?c.replace(g,c.k,c.left,gf(b,
c.right,d,e)):null};function jf(a,b,c,d,e){this.Y=a;this.ia=b;this.f=c;this.i=d;this.l=e;this.p=0;this.h=418776847}n=jf.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Mc(a)};n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){a=kf(a,b);return null!=a?a.k:c};n.Z=function(a,b,c){var d=[null],e=bf(this.Y,this.ia,b,c,d);return null==e?(d=Q.a(d,0),Ob.a(c,d.k)?a:new jf(this.Y,hf(this.Y,this.ia,b,c),this.f,this.i,null)):new jf(this.Y,e.la(),this.f+1,this.i,null)};
n.Ua=function(a,b){return null!=kf(a,b)};n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.Ja=function(a,b,c){return null!=this.ia?$e(this.ia,b,c):c};n.F=function(a,b){return rc(b)?a.Z(a,B.a(b,0),B.a(b,1)):z.c(ya,a,b)};
n.Ma=function(){return 0<this.f?new Ue(null,Te(this.ia,null,!1),!1,this.f,null):null};function kf(a,b){for(var c=a.ia;;)if(null!=c){var d=a.Y.a?a.Y.a(b,c.key):a.Y.call(null,b,c.key);if(0===d)return c;if(0>d)c=c.left;else if(w)c=c.right;else return null}else return null}n.vb=function(a,b){return 0<this.f?new Ue(null,Te(this.ia,null,b),b,this.f,null):null};
n.wb=function(a,b,c){if(0<this.f){a=null;for(var d=this.ia;;)if(null!=d){var e=this.Y.a?this.Y.a(b,d.key):this.Y.call(null,b,d.key);if(0===e)return new Ue(null,ac.a(a,d),c,-1,null);if(t(c))0>e?(a=ac.a(a,d),d=d.left):d=d.right;else if(w)0<e?(a=ac.a(a,d),d=d.right):d=d.left;else return null}else return null==a?null:new Ue(null,a,c,-1,null)}else return null};n.ub=function(a,b){return Nc.b?Nc.b(b):Nc.call(null,b)};n.tb=f("Y");
n.t=function(){return 0<this.f?new Ue(null,Te(this.ia,null,!0),!0,this.f,null):null};n.G=f("f");n.u=function(a,b){return pe(a,b)};n.D=function(a,b){return new jf(this.Y,this.ia,this.f,b,this.l)};n.C=f("i");n.H=function(){return N(lf,this.i)};n.Xa=function(a,b){var c=[null],d=ff(this.Y,this.ia,b,c);return null==d?null==Q.a(c,0)?a:new jf(this.Y,null,0,this.i,null):new jf(this.Y,d.la(),this.f-1,this.i,null)};
var lf=new jf(Ac,null,0,null,0),cc=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){a=D(a);for(var b=ub(ve);;)if(a){var e=H(H(a)),b=id(b,E(a),E(H(a)));a=e}else return wb(b)}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}(),mf=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){return new se(null,Jc(O(a)),T.a(qa,
a),null)}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}(),nf=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){a=D(a);for(var b=lf;;)if(a){var e=H(H(a)),b=S.c(b,E(a),E(H(a)));a=e}else return b}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}(),of=function(){function a(a,d){var e=null;1<arguments.length&&(e=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,a,e)}function b(a,
b){for(var e=D(b),g=new jf(Cc(a),null,0,null,0);;)if(e)var h=H(H(e)),g=S.c(g,E(e),E(H(e))),e=h;else return g}a.j=1;a.g=function(a){var d=E(a);a=F(a);return b(d,a)};a.e=b;return a}();function pf(a,b){this.O=a;this.W=b;this.p=0;this.h=32374988}n=pf.prototype;n.B=function(a){return Vb(a)};n.V=function(){var a=this.O;if(a)var b=a.h&128,a=(b?b:a.Ya)?!0:a.h?!1:v(Da,a);else a=v(Da,a);a=a?this.O.V(this.O):H(this.O);return null==a?null:new pf(a,this.W)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};
n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.Q=function(){var a=this.O.Q(this.O);return a.Ka(a)};n.S=function(){var a=this.O;if(a)var b=a.h&128,a=(b?b:a.Ya)?!0:a.h?!1:v(Da,a);else a=v(Da,a);a=a?this.O.V(this.O):H(this.O);return null!=a?new pf(a,this.W):G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new pf(this.O,b)};n.C=f("W");n.H=function(){return N(G,this.W)};function qf(a){return(a=D(a))?new pf(a,null):null}function Nc(a){return Na(a)}
function rf(a,b){this.O=a;this.W=b;this.p=0;this.h=32374988}n=rf.prototype;n.B=function(a){return Vb(a)};n.V=function(){var a=this.O;if(a)var b=a.h&128,a=(b?b:a.Ya)?!0:a.h?!1:v(Da,a);else a=v(Da,a);a=a?this.O.V(this.O):H(this.O);return null==a?null:new rf(a,this.W)};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return M.a(b,a)};n.J=function(a,b,c){return M.c(b,c,a)};n.t=aa();n.Q=function(){var a=this.O.Q(this.O);return a.La(a)};
n.S=function(){var a=this.O;if(a)var b=a.h&128,a=(b?b:a.Ya)?!0:a.h?!1:v(Da,a);else a=v(Da,a);a=a?this.O.V(this.O):H(this.O);return null!=a?new rf(a,this.W):G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new rf(this.O,b)};n.C=f("W");n.H=function(){return N(G,this.W)};function Oc(a){return Oa(a)}function sf(a,b,c){this.i=a;this.ya=b;this.l=c;this.p=4;this.h=15077647}n=sf.prototype;n.Ia=function(){return new tf(ub(this.ya))};n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Pc(a)};
n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){return t(Ia(this.ya,b))?b:c};n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.F=function(a,b){return new sf(this.i,S.c(this.ya,b,null),null)};n.toString=function(){return Fb(this)};n.t=function(){return qf(this.ya)};
n.sb=function(a,b){return new sf(this.i,La(this.ya,b),null)};n.G=function(){return va(this.ya)};n.u=function(a,b){var c=nc(b);return c?(c=O(a)===O(b))?kd(function(b){return zc(a,b)},b):c:c};n.D=function(a,b){return new sf(b,this.ya,this.l)};n.C=f("i");n.H=function(){return N(uf,this.i)};var uf=new sf(null,we,0);function tf(a){this.oa=a;this.h=259;this.p=136}n=tf.prototype;
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return Fa.c(this.oa,c,wc)===wc?null:c;case 3:return Fa.c(this.oa,c,wc)===wc?d:c}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){return Fa.c(this.oa,b,wc)===wc?c:b};n.G=function(){return O(this.oa)};n.Lb=function(a,b){this.oa=yb(this.oa,b);return a};
n.pa=function(a,b){this.oa=xb(this.oa,b,null);return a};n.wa=function(){return new sf(null,wb(this.oa),null)};function vf(a,b,c){this.i=a;this.ka=b;this.l=c;this.p=0;this.h=417730831}n=vf.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Pc(a)};n.M=function(a,b){return a.v(a,b,null)};n.v=function(a,b,c){a=kf(this.ka,b);return null!=a?a.key:c};
n.call=function(){var a=null;return a=function(a,c,d){switch(arguments.length){case 2:return this.M(this,c);case 3:return this.v(this,c,d)}throw Error("Invalid arity: "+arguments.length);}}();n.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};n.F=function(a,b){return new vf(this.i,S.c(this.ka,b,null),null)};n.Ma=function(){return qd.a(Nc,kb(this.ka))};n.toString=function(){return Fb(this)};n.vb=function(a,b){return qd.a(Nc,lb(this.ka,b))};
n.wb=function(a,b,c){return qd.a(Nc,mb(this.ka,b,c))};n.ub=function(a,b){return b};n.tb=function(){return ob(this.ka)};n.t=function(){return qf(this.ka)};n.sb=function(a,b){return new vf(this.i,dc.a(this.ka,b),null)};n.G=function(){return O(this.ka)};n.u=function(a,b){var c=nc(b);return c?(c=O(a)===O(b))?kd(function(b){return zc(a,b)},b):c:c};n.D=function(a,b){return new vf(b,this.ka,this.l)};n.C=f("i");n.H=function(){return N(wf,this.i)};
var wf=new vf(null,lf,0),xf=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){return z.c(ya,wf,a)}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}(),yf=function(){function a(a,d){var e=null;1<arguments.length&&(e=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,a,e)}function b(a,b){return z.c(ya,new vf(null,of(a),0),b)}a.j=1;a.g=function(a){var d=E(a);a=F(a);return b(d,a)};a.e=b;return a}();
function zf(a){for(var b=Zd;;)if(H(a))b=ac.a(b,E(a)),a=H(a);else return D(b)}function Vc(a){var b;b=a?((b=a.p&4096)?b:a.oc)?!0:!1:!1;if(b)return a.name;if("string"===typeof a)return a;throw Error([y("Doesn't support name: "),y(a)].join(""));}
var Af=function(){function a(a,b,c){return(a.b?a.b(b):a.call(null,b))>(a.b?a.b(c):a.call(null,c))?b:c}var b=null,c=function(){function a(b,d,k,l){var q=null;3<arguments.length&&(q=I(Array.prototype.slice.call(arguments,3),0));return c.call(this,b,d,k,q)}function c(a,d,e,l){return z.c(function(c,d){return b.c(a,c,d)},b.c(a,d,e),l)}a.j=3;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=H(a);var l=E(a);a=F(a);return c(b,d,l,a)};a.e=c;return a}(),b=function(b,e,g,h){switch(arguments.length){case 2:return e;
case 3:return a.call(this,b,e,g);default:return c.e(b,e,g,I(arguments,3))}throw Error("Invalid arity: "+arguments.length);};b.j=3;b.g=c.g;b.a=function(a,b){return b};b.c=a;b.e=c.e;return b}(),Cf=function Bf(b,c){return new V(null,function(){var d=D(c);return d?t(b.b?b.b(E(d)):b.call(null,E(d)))?K(E(d),Bf(b,F(d))):null:null},null,null)};
function Df(a,b,c){return function(d){var e=ob(a);return b.a?b.a(e.a?e.a(nb(a,d),c):e.call(null,nb(a,d),c),0):b.call(null,e.a?e.a(nb(a,d),c):e.call(null,nb(a,d),c),0)}}
var Ef=function(){function a(a,b,c,h,k){var l=mb(a,c,!0);if(t(l)){var q=Q.c(l,0,null);return Cf(Df(a,h,k),t(Df(a,b,c).call(null,q))?l:H(l))}return null}function b(a,b,c){var h=Df(a,b,c),k;a:{k=[Gc,null,Hc,null];var l=k.length;if(l/2<=ue)k=new sf(null,Gb.a?Gb.a(k,!0):Gb.call(null,k,!0),null);else{for(var q=0,s=ub(uf);;)if(q<l)var u=q+2,s=vb(s,k[q]),q=u;else{k=wb(s);break a}k=void 0}}return t(k.call(null,b))?(a=mb(a,c,!0),t(a)?(b=Q.c(a,0,null),t(h.b?h.b(b):h.call(null,b))?a:H(a)):null):Cf(h,lb(a,!0))}
var c=null,c=function(c,e,g,h,k){switch(arguments.length){case 3:return b.call(this,c,e,g);case 5:return a.call(this,c,e,g,h,k)}throw Error("Invalid arity: "+arguments.length);};c.c=b;c.s=a;return c}();function Ff(a,b,c,d,e){this.i=a;this.start=b;this.end=c;this.step=d;this.l=e;this.p=0;this.h=32375006}n=Ff.prototype;n.B=function(a){var b=this.l;return null!=b?b:this.l=a=Vb(a)};
n.V=function(){return 0<this.step?this.start+this.step<this.end?new Ff(this.i,this.start+this.step,this.end,this.step,null):null:this.start+this.step>this.end?new Ff(this.i,this.start+this.step,this.end,this.step,null):null};n.F=function(a,b){return K(b,a)};n.toString=function(){return Fb(this)};n.N=function(a,b){return Rb.a(a,b)};n.J=function(a,b,c){return Rb.c(a,b,c)};n.t=function(a){return 0<this.step?this.start<this.end?a:null:this.start>this.end?a:null};
n.G=function(a){return na(a.t(a))?0:Math.ceil((this.end-this.start)/this.step)};n.Q=f("start");n.S=function(a){return null!=a.t(a)?new Ff(this.i,this.start+this.step,this.end,this.step,null):G};n.u=function(a,b){return Yb(a,b)};n.D=function(a,b){return new Ff(b,this.start,this.end,this.step,this.l)};n.C=f("i");n.L=function(a,b){if(b<a.G(a))return this.start+b*this.step;var c=this.start>this.end;if(c?0===this.step:c)return this.start;throw Error("Index out of bounds");};
n.P=function(a,b,c){c=b<a.G(a)?this.start+b*this.step:((a=this.start>this.end)?0===this.step:a)?this.start:c;return c};n.H=function(){return N(G,this.i)};
var Gf=function(){function a(a,b,c){return new Ff(null,a,b,c,null)}function b(a,b){return e.c(a,b,1)}function c(a){return e.c(0,a,1)}function d(){return e.c(0,Number.MAX_VALUE,1)}var e=null,e=function(e,h,k){switch(arguments.length){case 0:return d.call(this);case 1:return c.call(this,e);case 2:return b.call(this,e,h);case 3:return a.call(this,e,h,k)}throw Error("Invalid arity: "+arguments.length);};e.o=d;e.b=c;e.a=b;e.c=a;return e}(),Hf=function(){function a(a,b){for(;;){var c=D(b);if(t(c?0<a:c)){var c=
a-1,h=H(b);a=c;b=h}else return null}}function b(a){for(;;)if(D(a))a=H(a);else return null}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),If=function(){function a(a,b){Hf.a(a,b);return b}function b(a){Hf.b(a);return a}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);
};c.b=b;c.a=a;return c}();function $(a,b,c,d,e,g,h){pb(a,c);D(h)&&(b.c?b.c(E(h),a,g):b.call(null,E(h),a,g));c=D(H(h));h=null;for(var k=0,l=0;;)if(l<k){var q=h.L(h,l);pb(a,d);b.c?b.c(q,a,g):b.call(null,q,a,g);l+=1}else if(c=D(c))h=c,sc(h)?(c=Cb(h),l=Db(h),h=c,k=O(c),c=l):(c=E(h),pb(a,d),b.c?b.c(c,a,g):b.call(null,c,a,g),c=H(h),h=null,k=0),l=0;else break;return pb(a,e)}
var Jf=function(){function a(a,d){var e=null;1<arguments.length&&(e=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,a,e)}function b(a,b){for(var e=D(b),g=null,h=0,k=0;;)if(k<h){var l=g.L(g,k);pb(a,l);k+=1}else if(e=D(e))g=e,sc(g)?(e=Cb(g),h=Db(g),g=e,l=O(e),e=h,h=l):(l=E(g),pb(a,l),e=H(g),g=null,h=0),k=0;else return null}a.j=1;a.g=function(a){var d=E(a);a=F(a);return b(d,a)};a.e=b;return a}(),Kf={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};
function Lf(a){return[y('"'),y(a.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(a){return Kf[a]})),y('"')].join("")}
var Nf=function Mf(b,c,d){if(null==b)return pb(c,"nil");if(void 0===b)return pb(c,"#\x3cundefined\x3e");if(w){t(function(){var c=R.a(d,Jb);return t(c)?(c=b?((c=b.h&131072)?c:b.Vb)?!0:b.h?!1:v(Wa,b):v(Wa,b),t(c)?hc(b):c):c}())&&(pb(c,"^"),Mf(hc(b),c,d),pb(c," "));if(null==b)return pb(c,"nil");if(b.$a)return b.yb(b,c,d);if(function(){var c;c=b?((c=b.h&2147483648)?c:b.I)?!0:!1:!1;return c}())return b.w(b,c,d);if(function(){var c=oa(b)===Boolean;return c?c:"number"===typeof b}())return pb(c,""+y(b));
if(b instanceof Array)return $(c,Mf,"#\x3cArray [",", ","]\x3e",d,b);if("string"==typeof b)return t(Ib.call(null,d))?pb(c,Lf(b)):pb(c,b);if(ec(b))return Jf.e(c,I(["#\x3c",""+y(b),"\x3e"],0));if(b instanceof Date){var e=function(b,c){for(var d=""+y(b);;)if(O(d)<c)d=[y("0"),y(d)].join("");else return d};return Jf.e(c,I(['#inst "',""+y(b.getUTCFullYear()),"-",e(b.getUTCMonth()+1,2),"-",e(b.getUTCDate(),2),"T",e(b.getUTCHours(),2),":",e(b.getUTCMinutes(),2),":",e(b.getUTCSeconds(),2),".",e(b.getUTCMilliseconds(),
3),"-",'00:00"'],0))}return t(b instanceof RegExp)?Jf.e(c,I(['#"',b.source,'"'],0)):function(){var c;c=b?((c=b.h&2147483648)?c:b.I)?!0:b.h?!1:v(rb,b):v(rb,b);return c}()?sb(b,c,d):w?Jf.e(c,I(["#\x3c",""+y(b),"\x3e"],0)):null}return null},Of=function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){var b=Gb([Hb,!0,Ib,!0,Jb,!1,Kb,!1],!0);if(lc(a))b="";else{var e=y,g=new ka,h=new Eb(g);a:{Nf(E(a),h,b);a=D(H(a));for(var k=
null,l=0,q=0;;)if(q<l){var s=k.L(k,q);pb(h," ");Nf(s,h,b);q+=1}else if(a=D(a))k=a,sc(k)?(a=Cb(k),l=Db(k),k=a,s=O(a),a=l,l=s):(s=E(k),pb(h," "),Nf(s,h,b),a=H(k),k=null,l=0),q=0;else break a}qb(h);b=""+e(g)}return b}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}();pf.prototype.I=!0;pf.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Nb.prototype.I=!0;Nb.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};ee.prototype.I=!0;
ee.prototype.w=function(a,b,c){return $(b,Nf,"["," ","]",c,a)};ad.prototype.I=!0;ad.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};jf.prototype.I=!0;jf.prototype.w=function(a,b,c){return $(b,function(a){return $(b,Nf,""," ","",c,a)},"{",", ","}",c,a)};se.prototype.I=!0;se.prototype.w=function(a,b,c){return $(b,function(a){return $(b,Nf,""," ","",c,a)},"{",", ","}",c,a)};V.prototype.I=!0;V.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Wb.prototype.I=!0;
Wb.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};vf.prototype.I=!0;vf.prototype.w=function(a,b,c){return $(b,Nf,"#{"," ","}",c,a)};Oe.prototype.I=!0;Oe.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Y.prototype.I=!0;Y.prototype.w=function(a,b,c){return $(b,Nf,"["," ","]",c,a)};ce.prototype.I=!0;ce.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Qe.prototype.I=!0;
Qe.prototype.w=function(a,b,c){return $(b,function(a){return $(b,Nf,""," ","",c,a)},"{",", ","}",c,a)};sf.prototype.I=!0;sf.prototype.w=function(a,b,c){return $(b,Nf,"#{"," ","}",c,a)};Ud.prototype.I=!0;Ud.prototype.w=function(a,b,c){return $(b,Nf,"["," ","]",c,a)};Qc.prototype.I=!0;Qc.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};re.prototype.I=!0;re.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Rc.prototype.I=!0;Rc.prototype.w=function(a,b){return pb(b,"()")};
Z.prototype.I=!0;Z.prototype.w=function(a,b,c){return $(b,Nf,"["," ","]",c,a)};Uc.prototype.I=!0;Uc.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Ff.prototype.I=!0;Ff.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Pe.prototype.I=!0;Pe.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};rf.prototype.I=!0;rf.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Ue.prototype.I=!0;Ue.prototype.w=function(a,b,c){return $(b,Nf,"("," ",")",c,a)};Ud.prototype.Hb=!0;
Ud.prototype.Ib=function(a,b){return Bc.a(a,b)};ee.prototype.Hb=!0;ee.prototype.Ib=function(a,b){return Bc.a(a,b)};function Pf(a,b,c,d){this.state=a;this.i=b;this.dc=c;this.ec=d;this.h=2153938944;this.p=2}n=Pf.prototype;n.B=function(a){return a[ca]||(a[ca]=++da)};
n.Nb=function(a,b,c){for(var d=D(this.ec),e=null,g=0,h=0;;)if(h<g){var k=e.L(e,h),l=Q.c(k,0,null),k=Q.c(k,1,null);k.n?k.n(l,a,b,c):k.call(null,l,a,b,c);h+=1}else if(d=D(d))sc(d)?(e=Cb(d),d=Db(d),l=e,g=O(e),e=l):(e=E(d),l=Q.c(e,0,null),k=Q.c(e,1,null),k.n?k.n(l,a,b,c):k.call(null,l,a,b,c),d=H(d),e=null,g=0),h=0;else return null};n.w=function(a,b,c){pb(b,"#\x3cAtom: ");Nf(this.state,b,c);return pb(b,"\x3e")};n.C=f("i");n.eb=f("state");n.u=function(a,b){return a===b};
var Rf=function(){function a(a){return new Pf(a,null,null,null)}var b=null,c=function(){function a(c,d){var k=null;1<arguments.length&&(k=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,c,k)}function b(a,c){var d=xc(c)?T.a(cc,c):c,e=R.a(d,Qf),d=R.a(d,Jb);return new Pf(a,d,e,null)}a.j=1;a.g=function(a){var c=E(a);a=F(a);return b(c,a)};a.e=b;return a}(),b=function(b,e){switch(arguments.length){case 1:return a.call(this,b);default:return c.e(b,I(arguments,1))}throw Error("Invalid arity: "+
arguments.length);};b.j=1;b.g=c.g;b.b=a;b.e=c.e;return b}();function Sf(a,b){var c=a.dc;if(t(c)&&!t(c.b?c.b(b):c.call(null,b)))throw Error([y("Assert failed: "),y("Validator rejected reference state"),y("\n"),y(Of.e(I([Xb(new Lb(null,"validate","validate",1233162959,null),new Lb(null,"new-value","new-value",972165309,null))],0)))].join(""));c=a.state;a.state=b;tb(a,c,b);return b}
var Tf=function(){function a(a,b,c,d,e){return Sf(a,b.n?b.n(a.state,c,d,e):b.call(null,a.state,c,d,e))}function b(a,b,c,d){return Sf(a,b.c?b.c(a.state,c,d):b.call(null,a.state,c,d))}function c(a,b,c){return Sf(a,b.a?b.a(a.state,c):b.call(null,a.state,c))}function d(a,b){return Sf(a,b.b?b.b(a.state):b.call(null,a.state))}var e=null,g=function(){function a(c,d,e,g,h,P){var L=null;5<arguments.length&&(L=I(Array.prototype.slice.call(arguments,5),0));return b.call(this,c,d,e,g,h,L)}function b(a,c,d,e,
g,h){return Sf(a,T.e(c,a.state,d,e,g,I([h],0)))}a.j=5;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=H(a);var e=E(a);a=H(a);var g=E(a);a=H(a);var h=E(a);a=F(a);return b(c,d,e,g,h,a)};a.e=b;return a}(),e=function(e,k,l,q,s,u){switch(arguments.length){case 2:return d.call(this,e,k);case 3:return c.call(this,e,k,l);case 4:return b.call(this,e,k,l,q);case 5:return a.call(this,e,k,l,q,s);default:return g.e(e,k,l,q,s,I(arguments,5))}throw Error("Invalid arity: "+arguments.length);};e.j=5;e.g=g.g;e.a=d;
e.c=c;e.n=b;e.s=a;e.e=g.e;return e}();function J(a){return Va(a)}var Uf={};function Vf(a){if(a?a.Tb:a)return a.Tb(a);var b;b=Vf[p(null==a?null:a)];if(!b&&(b=Vf._,!b))throw x("IEncodeJS.-clj-\x3ejs",a);return b.call(null,a)}function Wf(a){return(a?t(t(null)?null:a.Sb)||(a.zb?0:v(Uf,a)):v(Uf,a))?Vf(a):function(){var b="string"===typeof a;return b||(b="number"===typeof a)?b:(b=a instanceof U)?b:a instanceof Lb}()?Xf.b?Xf.b(a):Xf.call(null,a):Of.e(I([a],0))}
var Xf=function Yf(b){if(null==b)return null;if(b?t(t(null)?null:b.Sb)||(b.zb?0:v(Uf,b)):v(Uf,b))return Vf(b);if(b instanceof U)return Vc(b);if(b instanceof Lb)return""+y(b);if(qc(b)){var c={};b=D(b);for(var d=null,e=0,g=0;;)if(g<e){var h=d.L(d,g),k=Q.c(h,0,null),h=Q.c(h,1,null);c[Wf(k)]=Yf(h);g+=1}else if(b=D(b))sc(b)?(e=Cb(b),b=Db(b),d=e,e=O(e)):(e=E(b),d=Q.c(e,0,null),e=Q.c(e,1,null),c[Wf(d)]=Yf(e),b=H(b),d=null,e=0),g=0;else break;return c}return mc(b)?T.a(qa,qd.a(Yf,b)):w?b:null},Zf={};
function $f(a,b){if(a?a.Rb:a)return a.Rb(a,b);var c;c=$f[p(null==a?null:a)];if(!c&&(c=$f._,!c))throw x("IEncodeClojure.-js-\x3eclj",a);return c.call(null,a,b)}
var bg=function(){function a(a){return b.e(a,I([Gb([ag,!1],!0)],0))}var b=null,c=function(){function a(c,d){var k=null;1<arguments.length&&(k=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,c,k)}function b(a,c){if(a?t(t(null)?null:a.lc)||(a.zb?0:v(Zf,a)):v(Zf,a))return $f(a,T.a(mf,c));if(D(c)){var d=xc(c)?T.a(cc,c):c,e=R.a(d,ag);return function(a,b,c,d){return function L(e){return xc(e)?If.b(qd.a(L,e)):mc(e)?Ed(wa(e),qd.a(L,e)):e instanceof Array?ae(qd.a(L,e)):oa(e)===Object?Ed(we,
function(){return function(a,b,c,d){return function gc(g){return new V(null,function(a,b,c,d){return function(){for(;;){var a=D(g);if(a){if(sc(a)){var b=Cb(a),c=O(b),h=new Yc(Array(c),0);a:{for(var k=0;;)if(k<c){var l=B.a(b,k),l=X([d.b?d.b(l):d.call(null,l),L(e[l])]);h.add(l);k+=1}else{b=!0;break a}b=void 0}return b?bd(h.aa(),gc(Db(a))):bd(h.aa(),null)}h=E(a);return K(X([d.b?d.b(h):d.call(null,h),L(e[h])]),gc(F(a)))}return null}}}(a,b,c,d),null,null)}}(a,b,c,d)(tc(e))}()):w?e:null}}(c,d,e,t(e)?Wc:
y)(a)}return null}a.j=1;a.g=function(a){var c=E(a);a=F(a);return b(c,a)};a.e=b;return a}(),b=function(b,e){switch(arguments.length){case 1:return a.call(this,b);default:return c.e(b,I(arguments,1))}throw Error("Invalid arity: "+arguments.length);};b.j=1;b.g=c.g;b.b=a;b.e=c.e;return b}();var Kb=new U(null,"dup","dup"),cg=new U(null,"r","r"),dg=new U(null,"pnodes","pnodes"),eg=new U(null,"ppath","ppath"),fg=new U("zip","branch?","zip/branch?"),ag=new U(null,"keywordize-keys","keywordize-keys"),gg=new U(null,"changed?","changed?"),Hb=new U(null,"flush-on-newline","flush-on-newline"),hg=new U(null,"end","end"),ig=new U(null,"l","l"),jg=new U("zip","make-node","zip/make-node"),w=new U(null,"else","else"),Ib=new U(null,"readably","readably"),Qf=new U(null,"validator","validator"),Jb=new U(null,
"meta","meta"),kg=new U("zip","children","zip/children");var lg,mg,og=function ng(b,c){"undefined"===typeof lg&&(lg={},lg=function(b,c,g,h){this.ca=b;this.Ea=c;this.bc=g;this.$b=h;this.p=0;this.h=917504},lg.$a=!0,lg.Za="clojure.core.reducers/t5022",lg.yb=function(b,c){return pb(c,"clojure.core.reducers/t5022")},lg.prototype.N=function(b,c){return b.J(b,c,c.o?c.o():c.call(null))},lg.prototype.J=function(b,c,g){return ab.c(this.Ea,this.ca.b?this.ca.b(c):this.ca.call(null,c),g)},lg.prototype.C=f("$b"),lg.prototype.D=function(b,c){return new lg(this.ca,this.Ea,
this.bc,c)});return new lg(c,b,ng,null)},qg=function pg(b,c){"undefined"===typeof mg&&(mg={},mg=function(b,c,g,h){this.ca=b;this.Ea=c;this.Yb=g;this.ac=h;this.p=0;this.h=917504},mg.$a=!0,mg.Za="clojure.core.reducers/t5028",mg.yb=function(b,c){return pb(c,"clojure.core.reducers/t5028")},mg.prototype.N=function(b,c){return ab.c(this.Ea,this.ca.b?this.ca.b(c):this.ca.call(null,c),c.o?c.o():c.call(null))},mg.prototype.J=function(b,c,g){return ab.c(this.Ea,this.ca.b?this.ca.b(c):this.ca.call(null,c),g)},
mg.prototype.C=f("ac"),mg.prototype.D=function(b,c){return new mg(this.ca,this.Ea,this.Yb,c)});return new mg(c,b,pg,null)},rg=function(){function a(a,b){return qg(b,function(b){return function(){var c=null;return c=function(c,e,h){switch(arguments.length){case 0:return b.o?b.o():b.call(null);case 2:return b.a?b.a(c,a.b?a.b(e):a.call(null,e)):b.call(null,c,a.b?a.b(e):a.call(null,e));case 3:return b.a?b.a(c,a.a?a.a(e,h):a.call(null,e,h)):b.call(null,c,a.a?a.a(e,h):a.call(null,e,h))}throw Error("Invalid arity: "+
arguments.length);}}()})}function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),sg=function(){function a(a,b){return qg(b,function(b){return function(){var c=null;return c=function(c,e,h){switch(arguments.length){case 0:return b.o?b.o():b.call(null);case 2:return t(a.b?a.b(e):a.call(null,e))?b.a?b.a(c,e):b.call(null,c,
e):c;case 3:return t(a.a?a.a(e,h):a.call(null,e,h))?b.c?b.c(c,e,h):b.call(null,c,e,h):c}throw Error("Invalid arity: "+arguments.length);}}()})}function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),tg=function(){function a(a){return qg(a,function(a){return function(){var b=null;return b=function(b,d){switch(arguments.length){case 0:return a.o?
a.o():a.call(null);case 2:return pc(d)?ab.c(c.b(d),a,b):a.a?a.a(b,d):a.call(null,b,d)}throw Error("Invalid arity: "+arguments.length);}}()})}function b(){return function(a){return c.b(a)}}var c=null,c=function(c){switch(arguments.length){case 0:return b.call(this);case 1:return a.call(this,c)}throw Error("Invalid arity: "+arguments.length);};c.o=b;c.b=a;return c}(),ug=function(){function a(a,b){return sg.a(md(a),b)}function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,
c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),vg=function(){function a(a,b){return og(b,function(b){return function(){var c=null;return c=function(c,e,h){switch(arguments.length){case 0:return b.o?b.o():b.call(null);case 2:return t(a.b?a.b(e):a.call(null,e))?b.a?b.a(c,e):b.call(null,c,e):new Pb(c);case 3:return t(a.a?a.a(e,h):a.call(null,e,h))?b.c?b.c(c,e,h):b.call(null,c,e,h):new Pb(c)}throw Error("Invalid arity: "+arguments.length);}}()})}
function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),wg=function(){function a(a,b){return og(b,function(b){var c=Rf.b(a);return function(){var a=null;return a=function(a,d,e){switch(arguments.length){case 0:return b.o?b.o():b.call(null);case 2:return Tf.a(c,Ic),0>Va(c)?new Pb(a):b.a?b.a(a,d):b.call(null,a,d);case 3:return Tf.a(c,
Ic),0>Va(c)?new Pb(a):b.c?b.c(a,d,e):b.call(null,a,d,e)}throw Error("Invalid arity: "+arguments.length);}}()})}function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}(),xg=function(){function a(a,b){return og(b,function(b){var c=Rf.b(a);return function(){var a=null;return a=function(a,d,e){switch(arguments.length){case 0:return b.o?
b.o():b.call(null);case 2:return Tf.a(c,Ic),0>Va(c)?b.a?b.a(a,d):b.call(null,a,d):a;case 3:return Tf.a(c,Ic),0>Va(c)?b.c?b.c(a,d,e):b.call(null,a,d,e):a}throw Error("Invalid arity: "+arguments.length);}}()})}function b(a){return function(b){return c.a(a,b)}}var c=null,c=function(c,e){switch(arguments.length){case 1:return b.call(this,c);case 2:return a.call(this,c,e)}throw Error("Invalid arity: "+arguments.length);};c.b=b;c.a=a;return c}();function yg(a,b){var c=T.c(Af,a,b);return K(c,Bd(function(a){return c===a},b))}
var zg=function(){function a(a,b){return O(a)<O(b)?z.c(ac,b,a):z.c(ac,a,b)}var b=null,c=function(){function a(c,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,c,d,l)}function b(a,c,d){a=yg(O,ac.e(d,c,I([a],0)));return z.c(Ed,E(a),F(a))}a.j=2;a.g=function(a){var c=E(a);a=H(a);var d=E(a);a=F(a);return b(c,d,a)};a.e=b;return a}(),b=function(b,e,g){switch(arguments.length){case 0:return uf;case 1:return b;case 2:return a.call(this,b,e);default:return c.e(b,
e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.o=function(){return uf};b.b=aa();b.a=a;b.e=c.e;return b}(),Ag=function(){function a(a,b){for(;;)if(O(b)<O(a)){var c=a;a=b;b=c}else return z.c(function(a,b){return function(a,c){return zc(b,c)?a:ic.a(a,c)}}(a,b),a,a)}var b=null,c=function(){function a(b,d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,b,d,l)}function c(a,d,e){a=yg(function(a){return-O(a)},ac.e(e,
d,I([a],0)));return z.c(b,E(a),F(a))}a.j=2;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};a.e=c;return a}(),b=function(b,e,g){switch(arguments.length){case 1:return b;case 2:return a.call(this,b,e);default:return c.e(b,e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.b=aa();b.a=a;b.e=c.e;return b}(),Bg=function(){function a(a,b){return O(a)<O(b)?z.c(function(a,c){return zc(b,c)?ic.a(a,c):a},a,a):z.c(ic,a,b)}var b=null,c=function(){function a(b,
d,k){var l=null;2<arguments.length&&(l=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,b,d,l)}function c(a,d,e){return z.c(b,a,ac.a(e,d))}a.j=2;a.g=function(a){var b=E(a);a=H(a);var d=E(a);a=F(a);return c(b,d,a)};a.e=c;return a}(),b=function(b,e,g){switch(arguments.length){case 1:return b;case 2:return a.call(this,b,e);default:return c.e(b,e,I(arguments,2))}throw Error("Invalid arity: "+arguments.length);};b.j=2;b.g=c.g;b.b=aa();b.a=a;b.e=c.e;return b}();r("mori.count",O);r("mori.empty",function(a){return wa(a)});r("mori.first",E);r("mori.rest",F);r("mori.seq",D);r("mori.conj",ac);r("mori.cons",K);r("mori.find",function(a,b){var c;if(c=null!=a)c=(c=oc(a))?zc(a,b):c;return c?X([b,R.a(a,b)]):null});r("mori.nth",Q);r("mori.last",$b);r("mori.assoc",S);r("mori.dissoc",dc);r("mori.get_in",Gd);r("mori.update_in",Hd);r("mori.assoc_in",function Cg(b,c,d){var e=Q.c(c,0,null);c=Lc(c);return t(c)?S.c(b,e,Cg(R.a(b,e),c,d)):S.c(b,e,d)});r("mori.fnil",pd);
r("mori.disj",ic);r("mori.pop",function(a){return Sa(a)});r("mori.peek",function(a){return Ra(a)});r("mori.hash",C);r("mori.get",R);r("mori.has_key",zc);r("mori.is_empty",lc);r("mori.reverse",Tc);r("mori.take",sd);r("mori.drop",td);r("mori.partition",Fd);
r("mori.partition_by",function Dg(b,c){return new V(null,function(){var d=D(c);if(d){var e=E(d),g=b.b?b.b(e):b.call(null,e),e=K(e,Cf(function(c,d){return function(c){return Ob.a(d,b.b?b.b(c):b.call(null,c))}}(e,g),H(d)));return K(e,Dg(b,D(td(O(e),d))))}return null},null,null)});r("mori.iterate",function Eg(b,c){return K(c,new V(null,function(){return Eg(b,b.b?b.b(c):b.call(null,c))},null,null))});r("mori.into",Ed);r("mori.subvec",de);r("mori.take_while",Cf);
r("mori.drop_while",function(a,b){return new V(null,function(){var c;a:{c=a;for(var d=b;;){var d=D(d),e;e=(e=d)?c.b?c.b(E(d)):c.call(null,E(d)):e;if(t(e))d=F(d);else{c=d;break a}}c=void 0}return c},null,null)});r("mori.group_by",function(a,b){return z.c(function(b,d){var e=a.b?a.b(d):a.call(null,d);return S.c(b,e,ac.a(R.c(b,e,Zd),d))},we,b)});r("mori.interpose",function(a,b){return td(1,wd.a(ud.b(a),b))});r("mori.interleave",wd);r("mori.concat",fd);
function Dd(a){var b=a instanceof Array;return b?b:pc(a)}r("mori.flatten",function(a){return Ad(function(a){return na(Dd(a))},F(Cd(a)))});r("mori.keys",qf);r("mori.vals",function(a){return(a=D(a))?new rf(a,null):null});r("mori.prim_seq",Zb);r("mori.map",qd);r("mori.mapcat",yd);r("mori.reduce",z);r("mori.reduce_kv",function(a,b,c){return bb(c,a,b)});r("mori.filter",Ad);r("mori.remove",Bd);
r("mori.some",function(a,b){for(;;)if(D(b)){var c=a.b?a.b(E(b)):a.call(null,E(b));if(t(c))return c;var c=a,d=H(b);a=c;b=d}else return null});r("mori.every",kd);r("mori.equals",Ob);r("mori.range",Gf);r("mori.repeat",ud);r("mori.repeatedly",vd);r("mori.sort",Ec);r("mori.sort_by",Fc);r("mori.into_array",sa);r("mori.subseq",Ef);r("mori.rmap",rg);r("mori.rfilter",sg);r("mori.rremove",ug);r("mori.rtake",wg);r("mori.rtake_while",vg);r("mori.rdrop",xg);r("mori.rflatten",tg);r("mori.list",Xb);
r("mori.vector",be);r("mori.array_map",mf);r("mori.hash_map",cc);r("mori.set",function(a){a=D(a);if(null==a)return uf;if(a instanceof Nb){a=a.d;a:{for(var b=0,c=ub(uf);;)if(b<a.length)var d=b+1,c=c.pa(c,a[b]),b=d;else{a=c;break a}a=void 0}return a.wa(a)}if(w)for(d=ub(uf);;)if(null!=a)b=a.V(a),d=d.pa(d,a.Q(a)),a=b;else return d.wa(d);else return null});r("mori.sorted_set",xf);r("mori.sorted_set_by",yf);r("mori.sorted_map",nf);r("mori.sorted_map_by",of);
r("mori.zipmap",function(a,b){for(var c=ub(we),d=D(a),e=D(b);;){var g=d;if(g?e:g)c=id(c,E(d),E(e)),d=H(d),e=H(e);else return wb(c)}});r("mori.is_list",function(a){if(a){var b=a.h&33554432;a=(b?b:a.mc)?!0:a.h?!1:v(ib,a)}else a=v(ib,a);return a});r("mori.is_seq",xc);r("mori.is_vector",rc);r("mori.is_map",qc);r("mori.is_set",nc);r("mori.is_collection",mc);r("mori.is_sequential",pc);r("mori.is_associative",oc);r("mori.is_counted",Tb);r("mori.is_indexed",Ub);
r("mori.is_reduceable",function(a){if(a){var b=a.h&524288;a=(b?b:a.Kb)?!0:a.h?!1:v($a,a)}else a=v($a,a);return a});r("mori.is_seqable",function(a){if(a){var b=a.h&8388608;a=(b?b:a.Wb)?!0:a.h?!1:v(fb,a)}else a=v(fb,a);return a});r("mori.is_reversible",Sc);r("mori.union",zg);r("mori.intersection",Ag);r("mori.difference",Bg);r("mori.is_subset",function(a,b){var c=O(a)<=O(b);return c?kd(function(a){return zc(b,a)},a):c});
r("mori.is_superset",function(a,b){var c=O(a)>=O(b);return c?kd(function(b){return zc(a,b)},b):c});r("mori.partial",od);r("mori.comp",nd);r("mori.pipeline",function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){return z.a?z.a(function(a,b){return b.b?b.b(a):b.call(null,a)},a):z.call(null,function(a,b){return b.b?b.b(a):b.call(null,a)},a)}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}());
r("mori.curry",function(){function a(a,d){var e=null;1<arguments.length&&(e=I(Array.prototype.slice.call(arguments,1),0));return b.call(this,a,e)}function b(a,b){return function(e){return T.a(a,K.a?K.a(e,b):K.call(null,e,b))}}a.j=1;a.g=function(a){var d=E(a);a=F(a);return b(d,a)};a.e=b;return a}());
r("mori.juxt",function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){return function(){function b(a){var c=null;0<arguments.length&&(c=I(Array.prototype.slice.call(arguments,0),0));return e.call(this,c)}function e(b){return sa.b?sa.b(qd.a?qd.a(function(a){return T.a(a,b)},a):qd.call(null,function(a){return T.a(a,b)},a)):sa.call(null,qd.a?qd.a(function(a){return T.a(a,b)},a):qd.call(null,function(a){return T.a(a,
b)},a))}b.j=0;b.g=function(a){a=D(a);return e(a)};b.e=e;return b}()}a.j=0;a.g=function(a){a=D(a);return b(a)};a.e=b;return a}());
r("mori.knit",function(){function a(a){var d=null;0<arguments.length&&(d=I(Array.prototype.slice.call(arguments,0),0));return b.call(this,d)}function b(a){return function(b){return sa.b?sa.b(qd.c?qd.c(function(a,b){return a.b?a.b(b):a.call(null,b)},a,b):qd.call(null,function(a,b){return a.b?a.b(b):a.call(null,b)},a,b)):sa.call(null,qd.c?qd.c(function(a,b){return a.b?a.b(b):a.call(null,b)},a,b):qd.call(null,function(a,b){return a.b?a.b(b):a.call(null,b)},a,b))}}a.j=0;a.g=function(a){a=D(a);return b(a)};
a.e=b;return a}());r("mori.sum",function(a,b){return a+b});r("mori.inc",function(a){return a+1});r("mori.dec",function(a){return a-1});r("mori.is_even",function(a){return 0===(a%2+2)%2});r("mori.is_odd",function(a){return 1===(a%2+2)%2});r("mori.each",function(a,b){for(var c=D(a),d=null,e=0,g=0;;)if(g<e){var h=d.L(d,g);b.b?b.b(h):b.call(null,h);g+=1}else if(c=D(c))d=c,sc(d)?(c=Cb(d),e=Db(d),d=c,h=O(c),c=e,e=h):(h=E(d),b.b?b.b(h):b.call(null,h),c=H(d),d=null,e=0),g=0;else return null});
r("mori.identity",ld);r("mori.constantly",function(a){return function(){function b(b){0<arguments.length&&I(Array.prototype.slice.call(arguments,0),0);return a}b.j=0;b.g=function(b){D(b);return a};b.e=function(){return a};return b}()});r("mori.clj_to_js",Xf);r("mori.js_to_clj",bg);V.prototype.inspect=function(){return this.toString()};Nb.prototype.inspect=function(){return this.toString()};Wb.prototype.inspect=function(){return this.toString()};Ue.prototype.inspect=function(){return this.toString()};
Oe.prototype.inspect=function(){return this.toString()};Pe.prototype.inspect=function(){return this.toString()};Qc.prototype.inspect=function(){return this.toString()};Uc.prototype.inspect=function(){return this.toString()};Rc.prototype.inspect=function(){return this.toString()};Ud.prototype.inspect=function(){return this.toString()};ad.prototype.inspect=function(){return this.toString()};ce.prototype.inspect=function(){return this.toString()};ee.prototype.inspect=function(){return this.toString()};
Z.prototype.inspect=function(){return this.toString()};Y.prototype.inspect=function(){return this.toString()};se.prototype.inspect=function(){return this.toString()};Qe.prototype.inspect=function(){return this.toString()};jf.prototype.inspect=function(){return this.toString()};sf.prototype.inspect=function(){return this.toString()};vf.prototype.inspect=function(){return this.toString()};Ff.prototype.inspect=function(){return this.toString()};function Fg(a,b,c,d){return N(X([d,null]),Gb([jg,c,kg,b,fg,a],!0))}function Gg(a){return a.b?a.b(0):a.call(null,0)}function Hg(a){return fg.call(null,hc(a)).call(null,Gg(a))}function Ig(a){if(t(Hg(a)))return kg.call(null,hc(a)).call(null,Gg(a));throw"called children on a leaf node";}function Jg(a,b,c){return jg.call(null,hc(a)).call(null,b,c)}
function Kg(a){if(t(Hg(a))){var b=Q.c(a,0,null),c=Q.c(a,1,null),d=Ig(a),e=Q.c(d,0,null),g=Lc(d);return t(d)?N(X([e,Gb([ig,Zd,dg,t(c)?ac.a(dg.call(null,c),b):X([b]),eg,c,cg,g],!0)]),hc(a)):null}return null}function Lg(a){var b=Q.c(a,0,null),c=Q.c(a,1,null),d=xc(c)?T.a(cc,c):c,c=R.a(d,ig),e=R.a(d,eg),g=R.a(d,dg),h=R.a(d,cg),d=R.a(d,gg);return t(g)?(g=Ra(g),N(t(d)?X([Jg(a,g,fd.a(c,K(b,h))),t(e)?S.c(e,gg,!0):e]):X([g,e]),hc(a))):null}
function Mg(a){var b=Q.c(a,0,null),c=Q.c(a,1,null),c=xc(c)?T.a(cc,c):c,d=R.a(c,ig),e=R.a(c,cg),g=Q.c(e,0,null),h=Lc(e);return t(t(c)?e:c)?N(X([g,S.e(c,ig,ac.a(d,b),I([cg,h],0))]),hc(a)):null}function Ng(a){var b=Q.c(a,0,null),c=Q.c(a,1,null),c=xc(c)?T.a(cc,c):c,d=R.a(c,ig),e=R.a(c,cg);return t(t(c)?e:c)?N(X([$b(e),S.e(c,ig,T.n(ac,d,b,zf(e)),I([cg,null],0))]),hc(a)):a}
function Og(a){var b=Q.c(a,0,null),c=Q.c(a,1,null),c=xc(c)?T.a(cc,c):c,d=R.a(c,ig),e=R.a(c,cg);return t(t(c)?D(d):c)?N(X([Ra(d),S.e(c,ig,Sa(d),I([cg,K(b,e)],0))]),hc(a)):null}function Pg(a,b){Q.c(a,0,null);var c=Q.c(a,1,null);return N(X([b,S.c(c,gg,!0)]),hc(a))}
var Qg=function(){function a(a,d,e){var g=null;2<arguments.length&&(g=I(Array.prototype.slice.call(arguments,2),0));return b.call(this,a,d,g)}function b(a,b,e){return Pg(a,T.c(b,Gg(a),e))}a.j=2;a.g=function(a){var d=E(a);a=H(a);var e=E(a);a=F(a);return b(d,e,a)};a.e=b;return a}();r("mori.zip.zipper",Fg);r("mori.zip.seq_zip",function(a){return Fg(xc,ld,function(a,c){return N(c,hc(a))},a)});r("mori.zip.vector_zip",function(a){return Fg(rc,D,function(a,c){return N(ae(c),hc(a))},a)});r("mori.zip.node",Gg);r("mori.zip.is_branch",{}.gc);r("mori.zip.children",Ig);r("mori.zip.make_node",Jg);r("mori.zip.path",function(a){return dg.call(null,a.b?a.b(1):a.call(null,1))});r("mori.zip.lefts",function(a){return D(ig.call(null,a.b?a.b(1):a.call(null,1)))});
r("mori.zip.rights",function(a){return cg.call(null,a.b?a.b(1):a.call(null,1))});r("mori.zip.down",Kg);r("mori.zip.up",Lg);r("mori.zip.root",function(a){for(;;){if(Ob.a(hg,a.b?a.b(1):a.call(null,1)))return Gg(a);var b=Lg(a);if(t(b))a=b;else return Gg(a)}});r("mori.zip.right",Mg);r("mori.zip.rightmost",Ng);r("mori.zip.left",Og);
r("mori.zip.leftmost",function(a){var b=Q.c(a,0,null),c=Q.c(a,1,null),c=xc(c)?T.a(cc,c):c,d=R.a(c,ig),e=R.a(c,cg);return t(t(c)?D(d):c)?N(X([E(d),S.e(c,ig,Zd,I([cg,fd.e(F(d),X([b]),I([e],0))],0))]),hc(a)):a});r("mori.zip.insert_left",function(a,b){var c=Q.c(a,0,null),d=Q.c(a,1,null),d=xc(d)?T.a(cc,d):d,e=R.a(d,ig);if(null==d)throw"Insert at top";return N(X([c,S.e(d,ig,ac.a(e,b),I([gg,!0],0))]),hc(a))});
r("mori.zip.insert_right",function(a,b){var c=Q.c(a,0,null),d=Q.c(a,1,null),d=xc(d)?T.a(cc,d):d,e=R.a(d,cg);if(null==d)throw"Insert at top";return N(X([c,S.e(d,cg,K(b,e),I([gg,!0],0))]),hc(a))});r("mori.zip.replace",Pg);r("mori.zip.edit",Qg);r("mori.zip.insert_child",function(a,b){return Pg(a,Jg(a,Gg(a),K(b,Ig(a))))});r("mori.zip.append_child",function(a,b){return Pg(a,Jg(a,Gg(a),fd.a(Ig(a),X([b]))))});
r("mori.zip.next",function(a){if(Ob.a(hg,a.b?a.b(1):a.call(null,1)))return a;var b;b=Hg(a);b=t(b)?Kg(a):b;if(t(b))return b;b=Mg(a);if(t(b))return b;for(;;)if(t(Lg(a))){b=Mg(Lg(a));if(t(b))return b;a=Lg(a)}else return X([Gg(a),hg])});r("mori.zip.prev",function(a){var b=Og(a);if(t(b))for(a=b;;)if(b=Hg(a),b=t(b)?Kg(a):b,t(b))a=Ng(b);else return a;else return Lg(a)});r("mori.zip.is_end",function(a){return Ob.a(hg,a.b?a.b(1):a.call(null,1))});
r("mori.zip.remove",function(a){Q.c(a,0,null);var b=Q.c(a,1,null),b=xc(b)?T.a(cc,b):b,c=R.a(b,ig),d=R.a(b,eg),e=R.a(b,dg),g=R.a(b,cg);if(null==b)throw"Remove at top";if(0<O(c))for(a=N(X([Ra(c),S.e(b,ig,Sa(c),I([gg,!0],0))]),hc(a));;)if(b=Hg(a),b=t(b)?Kg(a):b,t(b))a=Ng(b);else return a;else return N(X([Jg(a,Ra(e),g),t(d)?S.c(d,gg,!0):d]),hc(a))});r("mori.mutable.thaw",function(a){return ub(a)});r("mori.mutable.freeze",hd);r("mori.mutable.conj",function(a,b){return vb(a,b)});r("mori.mutable.assoc",id);r("mori.mutable.dissoc",function(a,b){return yb(a,b)});r("mori.mutable.pop",function(a){return zb(a)});r("mori.mutable.disj",function(a,b){return Ab(a,b)});;return this.mori;}.call({});});
;(function() {
  /**
   * Require the given path.
   *
   * @param {String} path
   * @return {Object} exports
   * @api public
   */
  function require(path, parent, orig) {
    var resolved = require.resolve(path);

    // lookup failed
    if (null == resolved) {
      orig = orig || path;
      parent = parent || 'root';
      var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
      err.path = orig;
      err.parent = parent;
      err.require = true;
      throw err;
    }

    var module = require.modules[resolved];

    // perform real require()
    // by invoking the module's
    // registered function
    if (!module._resolving && !module.exports) {
      var mod = {};
      mod.exports = {};
      mod.client = mod.component = true;
      module._resolving = true;
      module.call(this, mod.exports, require.relative(resolved), mod);
      delete module._resolving;
      module.exports = mod.exports;
    }

    return module.exports;
  }

  /**
   * Registered modules.
   */

  require.modules = {};

  /**
   * Registered aliases.
   */

  require.aliases = {};

  /**
   * Resolve `path`.
   *
   * Lookup:
   *
   *   - PATH/index.js
   *   - PATH.js
   *   - PATH
   *
   * @param {String} path
   * @return {String} path or null
   * @api private
   */

  require.resolve = function(path) {
    if (path.charAt(0) === '/') path = path.slice(1);

    var paths = [
      path,
      path + '.js',
      path + '.json',
      path + '/index.js',
      path + '/index.json'
    ];

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (require.modules.hasOwnProperty(path)) return path;
      if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
    }
  };

  /**
   * Normalize `path` relative to the current path.
   *
   * @param {String} curr
   * @param {String} path
   * @return {String}
   * @api private
   */

  require.normalize = function(curr, path) {
    var segs = [];

    if ('.' != path.charAt(0)) return path;

    curr = curr.split('/');
    path = path.split('/');

    for (var i = 0; i < path.length; ++i) {
      if ('..' == path[i]) {
        curr.pop();
      } else if ('.' != path[i] && '' != path[i]) {
        segs.push(path[i]);
      }
    }

    return curr.concat(segs).join('/');
  };

  /**
   * Register module at `path` with callback `definition`.
   *
   * @param {String} path
   * @param {Function} definition
   * @api private
   */

  require.register = function(path, definition) {
    require.modules[path] = definition;
  };

  /**
   * Alias a module definition.
   *
   * @param {String} from
   * @param {String} to
   * @api private
   */

  require.alias = function(from, to) {
    if (!require.modules.hasOwnProperty(from)) {
      throw new Error('Failed to alias "' + from + '", it does not exist');
    }
    require.aliases[to] = from;
  };

  /**
   * Return a require function relative to the `parent` path.
   *
   * @param {String} parent
   * @return {Function}
   * @api private
   */

  require.relative = function(parent) {
    var p = require.normalize(parent, '..');

    /**
     * lastIndexOf helper.
     */

    function lastIndexOf(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) return i;
      }
      return -1;
    }

    /**
     * The relative require() itself.
     */

    function localRequire(path) {
      var resolved = localRequire.resolve(path);
      return require(resolved, parent, path);
    }

    /**
     * Resolve relative to the parent.
     */

    localRequire.resolve = function(path) {
      var c = path.charAt(0);
      if ('/' == c) return path.slice(1);
      if ('.' == c) return require.normalize(p, path);

      // resolve deps by returning
      // the dep in the nearest "deps"
      // directory
      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    };

    /**
     * Check if module is defined at `path`.
     */
    localRequire.exists = function(path) {
      return require.modules.hasOwnProperty(localRequire.resolve(path));
    };

    return localRequire;
  };

  // Global on server, window in browser.
  var root = this;

  // Do we already have require loader?
  root.require = require = (typeof root.require !== 'undefined') ? root.require : require;

  // All our modules will see our own require.
  (function() {
    
    
    // app.coffee
    require.register('component-400/src/app.js', function(exports, require, module) {
    
      var AppView, Database, mediator, mori;
      
      mori = require('./modules/deps').mori;
      
      mediator = require('./modules/mediator');
      
      AppView = require('./views/app');
      
      Database = require('./models/database');
      
      module.exports = function(opts) {
        var db;
        if (!opts.cb) {
          throw 'Provide your own callback function';
        }
        if (opts.formatter) {
          require('./modules/formatter').primary = opts.formatter;
        }
        db = new Database(opts.data || []);
        mediator.on('object:click', opts.portal || (function() {}), this);
        mediator.on('app:save', function() {
          return opts.cb(null, mori.into_array(db.selected));
        }, this);
        return new AppView({
          'el': opts.target || 'body',
          db: db
        });
      };
      
    });

    
    // database.coffee
    require.register('component-400/src/models/database.js', function(exports, require, module) {
    
      var Database, dict, mediator, mori, _, _ref,
        __hasProp = {}.hasOwnProperty;
      
      _ref = require('../modules/deps'), _ = _ref._, mori = _ref.mori;
      
      mediator = require('../modules/mediator');
      
      Database = (function() {
        function Database(data) {
          var collection, extract, key, name, reason, value, _ref1,
            _this = this;
          this.data = data;
          this.type = this.data.type;
          this.duplicates = this.data.matches.DUPLICATE || [];
          this.matches = (function() {
            var _i, _len, _ref1, _results;
            _ref1 = ['MATCH', 'TYPE_CONVERTED', 'OTHER'];
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              reason = _ref1[_i];
              if (!(((collection = this.data.matches[reason]) != null) && collection.length)) {
                continue;
              }
              name = dict[reason](this.type);
              _results.push({
                name: name,
                collection: collection,
                reason: reason
              });
            }
            return _results;
          }).call(this);
          if ((collection = this.data.unresolved).length) {
            this.matches.push({
              'reason': 'UNRESOLVED',
              collection: collection
            });
          }
          this.selected = mori.set();
          extract = function(obj) {
            var item, key, value, _i, _len, _results, _results1;
            switch (false) {
              case !_.isArray(obj):
                _results = [];
                for (_i = 0, _len = obj.length; _i < _len; _i++) {
                  item = obj[_i];
                  _results.push(extract(item));
                }
                return _results;
              case !_.isObject(obj):
                if (_.has(obj, 'id')) {
                  return _this.selected = mori.conj(_this.selected, obj.id);
                }
                _results1 = [];
                for (key in obj) {
                  if (!__hasProp.call(obj, key)) continue;
                  value = obj[key];
                  _results1.push(extract(value));
                }
                return _results1;
            }
          };
          _ref1 = this.data.matches;
          for (key in _ref1) {
            if (!__hasProp.call(_ref1, key)) continue;
            value = _ref1[key];
            if (key !== 'DUPLICATE') {
              extract(value);
            }
          }
          mediator.on('item:toggle', function(selected, id) {
            var method;
            method = ['disj', 'conj'][+selected];
            return this.selected = mori[method](this.selected, id);
          }, this);
        }
      
        return Database;
      
      })();
      
      dict = {
        'MATCH': function() {
          return 'direct hit';
        },
        'TYPE_CONVERTED': function(type) {
          return "non-" + type + " identifier";
        },
        'OTHER': function() {
          return 'synonym';
        },
        'WILDCARD': function() {
          return 'wildcard';
        }
      };
      
      module.exports = Database;
      
    });

    
    // deps.coffee
    require.register('component-400/src/modules/deps.js', function(exports, require, module) {
    
      module.exports = {
        _: _,
        mori: mori,
        BackboneEvents: BackboneEvents,
        saveAs: saveAs,
        csv: csv,
        $: $
      };
      
    });

    
    // formatter.coffee
    require.register('component-400/src/modules/formatter.js', function(exports, require, module) {
    
      var _;
      
      _ = require('./deps')._;
      
      module.exports = {
        'primary': function(model) {
          var k, key, len, v, val, _i, _len, _ref, _ref1;
          _ref = ['symbol', 'primaryIdentifier', 'secondIdentifier', 'name'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if (val = model.summary[key]) {
              return val;
            }
          }
          val = [0, 'NA'];
          _ref1 = model.summary;
          for (k in _ref1) {
            v = _ref1[k];
            if (v) {
              if ((len = ('' + v).replace(/\W/, '').length) > val[0]) {
                val = [len, v];
              }
            }
          }
          return val[1];
        },
        'csv': function(model, columns) {
          var column, row, value;
          if (!columns) {
            columns = _.keys(model.summary);
          }
          row = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = columns.length; _i < _len; _i++) {
              column = columns[_i];
              _results.push((value = model.summary[column]) ? value : '');
            }
            return _results;
          })();
          return [columns, row];
        },
        'flyout': function(model) {
          var format, k, v, _ref, _results;
          format = function(text) {
            return text.replace(/\./g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase();
          };
          _ref = model.summary;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            if (v) {
              _results.push([format(k), v]);
            }
          }
          return _results;
        }
      };
      
    });

    
    // mediator.coffee
    require.register('component-400/src/modules/mediator.js', function(exports, require, module) {
    
      var BackboneEvents;
      
      BackboneEvents = require('./deps').BackboneEvents;
      
      module.exports = _.extend({}, BackboneEvents);
      
    });

    
    // slicer.coffee
    require.register('component-400/src/modules/slicer.js', function(exports, require, module) {
    
      module.exports = function(collection, aRng, bRng, handler) {
        var aUs, bUs, item, _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = collection.length; _i < _len; _i++) {
          item = collection[_i];
          _ref = item.range, aUs = _ref[0], bUs = _ref[1];
          if (aUs >= aRng) {
            if (aUs === aRng) {
              if (bUs <= bRng) {
                handler.call(this, item, 0, item.matches.length - 1);
                if (bUs === bRng) {
                  break;
                } else {
                  _results.push(void 0);
                }
              } else {
                handler.call(this, item, 0, bRng - aUs);
                break;
              }
            } else {
              if (bUs > bRng) {
                handler.call(this, item, 0, bRng - aUs);
                break;
              } else {
                handler.call(this, item, 0, item.matches.length - 1);
                if (bUs === bRng) {
                  break;
                } else {
                  _results.push(void 0);
                }
              }
            }
          } else {
            if (bUs <= bRng) {
              handler.call(this, item, aRng - aUs, item.matches.length - 1);
              if (bUs === bRng) {
                break;
              } else {
                _results.push(void 0);
              }
            } else {
              handler.call(this, item, aRng - aUs, bRng - aUs);
              break;
            }
          }
        }
        return _results;
      };
      
    });

    
    // view.coffee
    require.register('component-400/src/modules/view.js', function(exports, require, module) {
    
      var $, View, id;
      
      $ = require('./deps').$;
      
      id = 0;
      
      View = (function() {
        View.prototype.autoRender = false;
      
        View.prototype.splitter = /^(\S+)\s*(.*)$/;
      
        View.prototype.tag = 'div';
      
        View.prototype.template = function() {
          return '';
        };
      
        function View(opts) {
          var event, fn, k, v, _fn, _ref,
            _this = this;
          this.cid = 'c' + id++;
          this.options = {};
          for (k in opts) {
            v = opts[k];
            switch (k) {
              case 'collection':
              case 'model':
                this[k] = v;
                break;
              case 'el':
                this.el = $(v);
                break;
              default:
                this.options[k] = v;
            }
          }
          if (!(this.el instanceof $)) {
            this.el = $("<" + this.tag + "/>");
          }
          _ref = this.events;
          _fn = function(event, fn) {
            var ev, selector, _ref1;
            _ref1 = event.match(_this.splitter).slice(1), ev = _ref1[0], selector = _ref1[1];
            return _this.el.on(ev, selector, function() {
              return _this[fn].apply(_this, arguments);
            });
          };
          for (event in _ref) {
            fn = _ref[event];
            _fn(event, fn);
          }
          this.views = [];
          if (this.autoRender) {
            this.render();
          }
        }
      
        View.prototype.render = function() {
          switch (false) {
            case !this.collection:
              this.el.html(this.template({
                'collection': JSON.parse(JSON.stringify(this.collection))
              }));
              break;
            case !this.model:
              this.el.html(this.template(JSON.parse(JSON.stringify(this.model))));
              break;
            default:
              this.el.html(this.template());
          }
          return this;
        };
      
        View.prototype.dispose = function() {
          var view, _i, _len, _ref;
          _ref = this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            view.dispose();
          }
          return this.el.remove();
        };
      
        return View;
      
      })();
      
      module.exports = View;
      
    });

    
    // app.eco
    require.register('component-400/src/templates/app.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="header section"></div>\n<div class="duplicates section"></div>\n<div class="summary section"></div>\n<div class="unresolved section"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // row.eco
    require.register('component-400/src/templates/duplicates/row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        ');
              __out.push(this.input);
              __out.push('\n        ');
              if (this.continuing) {
                __out.push('<em>cont.</em>');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>\n');
          
            if (this.selected) {
              __out.push('\n    <td><span class="tiny secondary button">Remove</span></td>\n');
            } else {
              __out.push('\n    <td><span class="tiny success button">Add</span></td>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    require.register('component-400/src/templates/duplicates/table.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    <span class="small secondary remove-all button">Remove all</span>\n    <span class="small success add-all button">Add all</span>\n    <h2>Which one do you want?</h2>\n    <span data-id="1" class="help"></span>\n</header>\n\n<div class="paginator"></div>\n\n<table class="striped">\n    <thead>\n        <tr>\n            <th>Identifier you provided</th>\n            <th>Matches</th>\n            <th>Action</th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // flyout.eco
    require.register('component-400/src/templates/flyout.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var column, row, _i, _j, _len, _len1, _ref;
          
            __out.push('<table>\n    ');
          
            _ref = this.rows;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              row = _ref[_i];
              __out.push('\n        <tr>\n            ');
              for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
                column = row[_j];
                __out.push('\n                <td>');
                __out.push(column);
                __out.push('</td>\n            ');
              }
              __out.push('\n        </tr>\n    ');
            }
          
            __out.push('\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // header.eco
    require.register('component-400/src/templates/header.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    ');
          
            if (this.selected === 1) {
              __out.push('\n        <a class="success button save">Save a list of 1 ');
              __out.push(__sanitize(this.type));
              __out.push('</a>\n    ');
            } else {
              __out.push('\n        <a class="success button save">Save a list of ');
              __out.push(__sanitize(this.selected));
              __out.push(' ');
              __out.push(__sanitize(this.type));
              __out.push('s</a>\n    ');
            }
          
            __out.push('\n\n    <table>\n        <tr>\n            <td>You entered:</td>\n            <td>');
          
            __out.push(__sanitize(this.entered));
          
            __out.push(' identifier');
          
            if (this.entered !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n        <tr>\n            <td>We found:</td>\n            <td>');
          
            __out.push(__sanitize(this.found));
          
            __out.push(' ');
          
            __out.push(__sanitize(this.type));
          
            if (this.found !== 1) {
              __out.push('s');
            }
          
            __out.push('</td>\n        </tr>\n    </table>\n\n    ');
          
            if (this.entered !== this.found) {
              __out.push('\n        <p>Why are the numbers different? See below.</p>\n    ');
            }
          
            __out.push('\n</header>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // paginator.eco
    require.register('component-400/src/templates/paginator.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var n, page, _i, _j, _len, _len1, _ref, _ref1;
          
            if (this.pages > 1) {
              __out.push('\n    <div class="small button dropdown right">\n        ');
              __out.push(__sanitize(this.perPage));
              __out.push(' rows per page\n        <ul class="no-hover">\n            ');
              _ref = [5, 10, 20, 50, 100];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                n = _ref[_i];
                __out.push('\n                ');
                if (n !== this.perPage) {
                  __out.push('\n                    <li data-action="resize" data-n="');
                  __out.push(__sanitize(n));
                  __out.push('">\n                        <a>Show ');
                  __out.push(__sanitize(n));
                  __out.push(' rows</a>\n                    </li>\n                ');
                }
                __out.push('\n            ');
              }
              __out.push('\n            <!--\n            <li class="divider"></li>\n            <li><a data-action="resize" data-n="');
              __out.push(__sanitize(this.total));
              __out.push('">Show all ');
              __out.push(__sanitize(this.total));
              __out.push(' rows</a></li>\n            -->\n        </ul>\n    </div>\n\n    <ul class="pagination">\n        <li class="unavailable"><a>Page ');
              __out.push(__sanitize(this.current));
              __out.push(' of ');
              __out.push(__sanitize(this.pages));
              __out.push('</a></li>\n        ');
              if (this.current === 1) {
                __out.push('\n            <li class="unavailable arrow"><a>&lsaquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="prev" title="Previous"><a>&lsaquo;</a></li>\n        ');
              }
              __out.push('\n\n        ');
              _ref1 = this.range;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                page = _ref1[_j];
                __out.push('\n            ');
                if (page === null) {
                  __out.push('\n                <li class="unavailable"><a>&hellip;</a></li>\n            ');
                } else {
                  __out.push('\n                <li data-action="select" data-n="');
                  __out.push(__sanitize(page));
                  __out.push('"\n                    ');
                  if (page === this.current) {
                    __out.push('\n                        class="current"\n                    ');
                  }
                  __out.push('\n                ><a>');
                  __out.push(__sanitize(page));
                  __out.push('</a></li>\n            ');
                }
                __out.push('\n        ');
              }
              __out.push('\n\n        ');
              if (this.current === this.pages) {
                __out.push('\n            <li class="unavailable arrow"><a>&rsaquo;</a></li>\n        ');
              } else {
                __out.push('\n            <li class="arrow" data-action="next" title="Next"><a>&rsaquo;</a></li>\n        ');
              }
              __out.push('\n    </ul>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tab.eco
    require.register('component-400/src/templates/summary/tab.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<a>');
          
            __out.push(__sanitize(this.name));
          
            __out.push('s <span data-id="3" class="help"></span></a>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tabs.eco
    require.register('component-400/src/templates/summary/tabs.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<header>\n    <span class="small download button">Download summary</span>\n    <h2>Summary</h2>\n    <span data-id="2" class="help"></span>\n</header>\n<dl class="tabs contained"></dl>\n<ul class="tabs-content contained"></ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // many-to-one-row.eco
    require.register('component-400/src/templates/table/many-to-one-row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var item, _i, _len, _ref;
          
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        <ul class="inline">\n            ');
              _ref = this.input;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                __out.push('\n                <li>');
                __out.push(item);
                __out.push('</li>\n            ');
              }
              __out.push('\n        </ul>\n        ');
              if (this.input.length !== 1) {
                __out.push('\n            <span data-id="5" class="help"></span>\n        ');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // one-to-many-row.eco
    require.register('component-400/src/templates/table/one-to-many-row.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            if (this.input) {
              __out.push('\n    <td rowspan="');
              __out.push(__sanitize(this.rowspan));
              __out.push('" class="');
              __out.push(__sanitize(this["class"]));
              __out.push('">\n        ');
              __out.push(this.input);
              __out.push('\n        ');
              if (this.continuing) {
                __out.push('<em>cont.</em>');
              }
              __out.push('\n    </td>\n');
            }
          
            __out.push('\n<td>\n    <a>');
          
            __out.push(this.matched);
          
            __out.push('</a>\n    <span class="help-flyout"></span>\n</td>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // table.eco
    require.register('component-400/src/templates/table/table.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="paginator"></div>\n\n<table class="striped">\n    <thead>\n        <tr>\n            <th>Identifier you provided</th>\n            <th>Match</th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tooltip.eco
    require.register('component-400/src/templates/tooltip.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push(this.text);
          
            __out.push('<span class="nub" style="top: auto; bottom: -10px; left: auto; right: auto;"></span>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // unresolved.eco
    require.register('component-400/src/templates/unresolved.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var item, _i, _len, _ref;
          
            __out.push('<header>\n    <h2>No matches found</h2>\n    <span data-id="4" class="help"></span>\n</header>\n\n<ul class="inline">\n    ');
          
            _ref = this.collection;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              __out.push('\n        <li>');
              __out.push(__sanitize(item));
              __out.push('</li>\n    ');
            }
          
            __out.push('\n</ul>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // app.coffee
    require.register('component-400/src/views/app.js', function(exports, require, module) {
    
      var $, AppView, DuplicatesTableView, HeaderView, SummaryView, TooltipView, UnresolvedView, View, mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      $ = require('../modules/deps').$;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      HeaderView = require('./header');
      
      DuplicatesTableView = require('./duplicates');
      
      UnresolvedView = require('./unresolved');
      
      SummaryView = require('./summary');
      
      HeaderView = require('./header');
      
      TooltipView = require('./tooltip');
      
      AppView = (function(_super) {
        __extends(AppView, _super);
      
        function AppView() {
          _ref = AppView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        AppView.prototype.autoRender = true;
      
        AppView.prototype.template = require('../templates/app');
      
        AppView.prototype.events = {
          'mouseover .help': 'toggleTooltip',
          'mouseout  .help': 'toggleTooltip'
        };
      
        AppView.prototype.render = function() {
          var collection, view;
          AppView.__super__.render.apply(this, arguments);
          new HeaderView({
            'db': this.options.db,
            'el': this.el.find('div.header.section')
          });
          if ((collection = this.options.db.duplicates).length) {
            view = new DuplicatesTableView({
              'el': this.el.find('div.duplicates.section'),
              collection: collection
            });
            view.render();
          }
          new SummaryView({
            'matches': this.options.db.matches,
            'el': this.el.find('div.summary.section')
          });
          if ((collection = this.options.db.data.unresolved).length) {
            new UnresolvedView({
              'el': this.el.find('div.unresolved.section'),
              collection: collection
            });
          }
          return this;
        };
      
        AppView.prototype.toggleTooltip = function(ev) {
          var id, target, view, _i, _len, _ref1, _results;
          switch (ev.type) {
            case 'mouseover':
              id = (target = $(ev.target)).data('id');
              this.views.push(view = new TooltipView({
                'model': {
                  id: id
                }
              }));
              return target.append(view.render().el);
            case 'mouseout':
              _ref1 = this.views;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                view = _ref1[_i];
                _results.push(view.dispose());
              }
              return _results;
          }
        };
      
        return AppView;
      
      })(View);
      
      module.exports = AppView;
      
    });

    
    // duplicates.coffee
    require.register('component-400/src/views/duplicates.js', function(exports, require, module) {
    
      var DuplicatesTableRowView, DuplicatesTableView, FlyoutView, Table, View, formatter, mediator, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      formatter = require('../modules/formatter');
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      FlyoutView = require('../views/flyout');
      
      Table = require('../views/table');
      
      DuplicatesTableRowView = (function(_super) {
        __extends(DuplicatesTableRowView, _super);
      
        function DuplicatesTableRowView() {
          _ref = DuplicatesTableRowView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        DuplicatesTableRowView.prototype.template = require('../templates/duplicates/row');
      
        DuplicatesTableRowView.prototype.events = {
          'click .button': 'toggle',
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        DuplicatesTableRowView.prototype.toggle = function() {
          var _base;
          if ((_base = this.model).selected == null) {
            _base.selected = false;
          }
          this.model.selected = !this.model.selected;
          mediator.trigger('item:toggle', this.model.selected, this.model.id);
          return this.render();
        };
      
        return DuplicatesTableRowView;
      
      })(Table.TableRowView);
      
      DuplicatesTableView = (function(_super) {
        __extends(DuplicatesTableView, _super);
      
        function DuplicatesTableView() {
          _ref1 = DuplicatesTableView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        DuplicatesTableView.prototype.template = require('../templates/duplicates/table');
      
        DuplicatesTableView.prototype.rowClass = DuplicatesTableRowView;
      
        DuplicatesTableView.prototype.events = {
          'click .button.add-all': 'addAll',
          'click .button.remove-all': 'removeAll'
        };
      
        DuplicatesTableView.prototype.addAll = function() {
          return this.doAll(true);
        };
      
        DuplicatesTableView.prototype.removeAll = function() {
          return this.doAll(false);
        };
      
        DuplicatesTableView.prototype.doAll = function(state) {
          var item, match, _i, _j, _len, _len1, _ref2, _ref3;
          _ref2 = this.collection;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            item = _ref2[_i];
            _ref3 = item.matches;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
              match = _ref3[_j];
              mediator.trigger('item:toggle', (match.selected = state), match.id);
            }
          }
          return this.renderPage.apply(this, this.range);
        };
      
        return DuplicatesTableView;
      
      })(Table.OtMTableView);
      
      module.exports = DuplicatesTableView;
      
    });

    
    // flyout.coffee
    require.register('component-400/src/views/flyout.js', function(exports, require, module) {
    
      var FlyoutView, View, formatter,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      FlyoutView = (function(_super) {
        __extends(FlyoutView, _super);
      
        FlyoutView.prototype.template = require('../templates/flyout');
      
        function FlyoutView() {
          FlyoutView.__super__.constructor.apply(this, arguments);
          this.el.addClass('flyout');
        }
      
        FlyoutView.prototype.render = function() {
          this.el.html(this.template({
            'rows': formatter.flyout(this.model)
          }));
          return this;
        };
      
        return FlyoutView;
      
      })(View);
      
      module.exports = FlyoutView;
      
    });

    
    // header.coffee
    require.register('component-400/src/views/header.js', function(exports, require, module) {
    
      var HeaderView, View, mediator,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      HeaderView = (function(_super) {
        __extends(HeaderView, _super);
      
        HeaderView.prototype.autoRender = true;
      
        HeaderView.prototype.template = require('../templates/header');
      
        HeaderView.prototype.events = {
          'click .button.save': 'save'
        };
      
        function HeaderView() {
          HeaderView.__super__.constructor.apply(this, arguments);
          this.found = mori.count(this.options.db.selected);
          mediator.on('item:toggle', this.render, this);
        }
      
        HeaderView.prototype.render = function() {
          this.el.html(this.template({
            'selected': mori.count(this.options.db.selected),
            'type': this.options.db.type,
            'entered': this.options.db.data.stats.identifiers.all,
            found: this.found
          }));
          return this;
        };
      
        HeaderView.prototype.save = function() {
          return mediator.trigger('app:save');
        };
      
        return HeaderView;
      
      })(View);
      
      module.exports = HeaderView;
      
    });

    
    // paginator.coffee
    require.register('component-400/src/views/paginator.js', function(exports, require, module) {
    
      var $, Paginator, View, mediator, _, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), $ = _ref.$, _ = _ref._;
      
      mediator = require('../modules/mediator');
      
      View = require('../modules/view');
      
      Paginator = (function(_super) {
        __extends(Paginator, _super);
      
        Paginator.prototype.template = require('../templates/paginator');
      
        Paginator.prototype.events = {
          'click a': 'onclick',
          'click div.dropdown': 'dropdown'
        };
      
        function Paginator() {
          var _base, _base1, _base2;
          Paginator.__super__.constructor.apply(this, arguments);
          if ((_base = this.options).total == null) {
            _base.total = 0;
          }
          if ((_base1 = this.options).perPage == null) {
            _base1.perPage = 5;
          }
          if ((_base2 = this.options).current == null) {
            _base2.current = 1;
          }
        }
      
        Paginator.prototype.render = function() {
          var a, b,
            _this = this;
          this.options.pages = Math.ceil(this.options.total / this.options.perPage);
          (function() {
            var diff, max, min, number, previous, range, _i, _j, _len, _ref1, _ref2, _results, _results1;
            _this.options.range = [];
            if (_this.options.pages === 1) {
              return;
            }
            min = _this.options.current - 2;
            max = _this.options.current + 2;
            if ((diff = _this.options.pages - max) < 0) {
              min += diff;
            }
            if ((diff = 1 - min) > 0) {
              max += diff;
            }
            range = (function() {
              _results = [];
              for (var _i = _ref1 = Math.max(1, min), _ref2 = Math.min(_this.options.pages, max); _ref1 <= _ref2 ? _i <= _ref2 : _i >= _ref2; _ref1 <= _ref2 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this);
            range.push(1);
            range.push(_this.options.pages);
            range = _.unique(range).sort(function(a, b) {
              return a - b;
            });
            _this.options.range = [];
            previous = range[0] - 1;
            _results1 = [];
            for (_j = 0, _len = range.length; _j < _len; _j++) {
              number = range[_j];
              if (previous) {
                switch (false) {
                  case previous + 2 !== number:
                    _this.options.range.push(previous + 1);
                    break;
                  case !(previous + 1 < number):
                    _this.options.range.push(null);
                }
              }
              _results1.push(_this.options.range.push(previous = number));
            }
            return _results1;
          })();
          this.el.html(this.template(this.options));
          b = Math.min((a = (this.options.current - 1) * this.options.perPage) + this.options.perPage, this.options.total);
          mediator.trigger('page:change', this.cid, a, b);
          return this;
        };
      
        Paginator.prototype.onclick = function(evt) {
          var fn, li;
          switch (fn = (li = $(evt.target).closest('li')).data('action')) {
            case 'select':
            case 'resize':
              this[fn](parseInt(li.data('n')));
              break;
            case 'first':
            case 'prev':
            case 'next':
            case 'last':
              this[fn]();
          }
          this.render();
          evt.preventDefault();
          return false;
        };
      
        Paginator.prototype.first = function() {
          return this.select(0);
        };
      
        Paginator.prototype.prev = function() {
          return this.select(Math.max(0, this.options.current - 1));
        };
      
        Paginator.prototype.next = function() {
          return this.select(Math.min(this.options.pages - 1, this.options.current + 1));
        };
      
        Paginator.prototype.last = function() {
          return this.select(this.options.pages - 1);
        };
      
        Paginator.prototype.select = function(current) {
          return this.options.current = current;
        };
      
        Paginator.prototype.resize = function(n) {
          var row;
          row = 1 + (this.options.perPage * (this.options.current - 1));
          this.options.perPage = n;
          return this.options.current = Math.ceil(row / this.options.perPage);
        };
      
        Paginator.prototype.dropdown = function() {
          return this.el.find('.dropdown ul').toggleClass('show-dropdown');
        };
      
        return Paginator;
      
      })(View);
      
      module.exports = Paginator;
      
    });

    
    // summary.coffee
    require.register('component-400/src/views/summary.js', function(exports, require, module) {
    
      var SummaryView, TabMatchesTableView, TabSwitcherView, TabTableView, Table, View, csv, formatter, mediator, saveAs, _, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, csv = _ref.csv, saveAs = _ref.saveAs;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      Table = require('./table');
      
      SummaryView = (function(_super) {
        __extends(SummaryView, _super);
      
        function SummaryView() {
          _ref1 = SummaryView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        SummaryView.prototype.autoRender = true;
      
        SummaryView.prototype.template = require('../templates/summary/tabs');
      
        SummaryView.prototype.events = {
          'click .button.download': 'download'
        };
      
        SummaryView.prototype.render = function() {
          var Clazz, collection, content, name, reason, showFirstTab, tabs, view, _i, _len, _ref2, _ref3;
          this.el.html(this.template());
          tabs = this.el.find('.tabs');
          content = this.el.find('.tabs-content');
          showFirstTab = _.once(function(reason) {
            return mediator.trigger('tab:switch', reason);
          });
          _ref2 = this.options.matches;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            _ref3 = _ref2[_i], name = _ref3.name, collection = _ref3.collection, reason = _ref3.reason;
            if (!(reason !== 'UNRESOLVED')) {
              continue;
            }
            this.views.push(view = new TabSwitcherView({
              'model': {
                name: name
              },
              reason: reason
            }));
            tabs.append(view.render().el);
            Clazz = reason === 'MATCH' ? TabMatchesTableView : TabTableView;
            this.views.push(view = new Clazz({
              collection: collection,
              reason: reason
            }));
            content.append(view.render().el);
            showFirstTab(reason);
          }
          return this;
        };
      
        SummaryView.prototype.download = function() {
          var adder, blob, collection, columns, converted, input, item, match, reason, rows, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref2, _ref3, _ref4, _ref5;
          columns = null;
          rows = [];
          adder = function(match, input, count) {
            var row, _ref2;
            _ref2 = formatter.csv(match, columns), columns = _ref2[0], row = _ref2[1];
            return rows.push([input, reason, count].concat(row));
          };
          _ref2 = this.options.matches;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            _ref3 = _ref2[_i], collection = _ref3.collection, reason = _ref3.reason;
            for (_j = 0, _len1 = collection.length; _j < _len1; _j++) {
              item = collection[_j];
              switch (reason) {
                case 'MATCH':
                  _ref4 = item.input;
                  for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
                    input = _ref4[_k];
                    adder(item, input, 1);
                  }
                  break;
                case 'UNRESOLVED':
                  rows.push([item, reason, 0]);
                  break;
                default:
                  _ref5 = item.matches;
                  for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
                    match = _ref5[_l];
                    adder(match, item.input, item.matches.length);
                  }
              }
            }
          }
          columns = ['input', 'reason', 'matches'].concat(columns);
          converted = csv(_.map(rows, function(row) {
            return _.zipObject(columns, row);
          }));
          blob = new Blob([converted], {
            'type': 'text/csv;charset=utf-8'
          });
          return saveAs(blob, 'summary.csv');
        };
      
        return SummaryView;
      
      })(View);
      
      TabSwitcherView = (function(_super) {
        __extends(TabSwitcherView, _super);
      
        TabSwitcherView.prototype.template = require('../templates/summary/tab');
      
        TabSwitcherView.prototype.tag = 'dd';
      
        TabSwitcherView.prototype.events = {
          'click *': 'onclick'
        };
      
        function TabSwitcherView() {
          TabSwitcherView.__super__.constructor.apply(this, arguments);
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
        }
      
        TabSwitcherView.prototype.onclick = function() {
          return mediator.trigger('tab:switch', this.options.reason);
        };
      
        return TabSwitcherView;
      
      })(View);
      
      TabTableView = (function(_super) {
        __extends(TabTableView, _super);
      
        TabTableView.prototype.tag = 'li';
      
        function TabTableView() {
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
          this;
          TabTableView.__super__.constructor.apply(this, arguments);
        }
      
        return TabTableView;
      
      })(Table.OtMTableView);
      
      TabMatchesTableView = (function(_super) {
        __extends(TabMatchesTableView, _super);
      
        TabMatchesTableView.prototype.tag = 'li';
      
        function TabMatchesTableView() {
          mediator.on('tab:switch', function(reason) {
            return this.el.toggleClass('active', this.options.reason === reason);
          }, this);
          this;
          TabMatchesTableView.__super__.constructor.apply(this, arguments);
        }
      
        return TabMatchesTableView;
      
      })(Table.MtOTableView);
      
      module.exports = SummaryView;
      
    });

    
    // table.coffee
    require.register('component-400/src/views/table.js', function(exports, require, module) {
    
      var $, FlyoutView, ManyToOneTableRowView, ManyToOneTableView, OneToManyTableView, Paginator, TableRowView, View, formatter, mediator, slicer, _, _ref, _ref1, _ref2,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      _ref = require('../modules/deps'), _ = _ref._, $ = _ref.$;
      
      mediator = require('../modules/mediator');
      
      formatter = require('../modules/formatter');
      
      View = require('../modules/view');
      
      Paginator = require('./paginator');
      
      FlyoutView = require('./flyout');
      
      slicer = require('../modules/slicer');
      
      TableRowView = (function(_super) {
        __extends(TableRowView, _super);
      
        function TableRowView() {
          _ref1 = TableRowView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        TableRowView.prototype.template = require('../templates/table/one-to-many-row');
      
        TableRowView.prototype.tag = 'tr';
      
        TableRowView.prototype.events = {
          'mouseover .help-flyout': 'toggleFlyout',
          'mouseout .help-flyout': 'toggleFlyout',
          'click a': 'portal'
        };
      
        TableRowView.prototype.render = function() {
          var matched;
          matched = formatter.primary(this.model);
          this.el.html(this.template(_.extend({}, this.model, this.options, {
            matched: matched
          })));
          return this;
        };
      
        TableRowView.prototype.toggleFlyout = function(ev) {
          var view, _i, _len, _ref2, _results;
          switch (ev.type) {
            case 'mouseover':
              this.views.push(view = new FlyoutView({
                model: this.model
              }));
              return $(ev.target).append(view.render().el);
            case 'mouseout':
              _ref2 = this.views;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                view = _ref2[_i];
                _results.push(view.dispose());
              }
              return _results;
          }
        };
      
        TableRowView.prototype.portal = function(ev) {
          return mediator.trigger('object:click', this.model, ev.target);
        };
      
        return TableRowView;
      
      })(View);
      
      OneToManyTableView = (function(_super) {
        __extends(OneToManyTableView, _super);
      
        OneToManyTableView.prototype.template = require('../templates/table/table');
      
        OneToManyTableView.prototype.rowClass = TableRowView;
      
        function OneToManyTableView() {
          var _this = this;
          OneToManyTableView.__super__.constructor.apply(this, arguments);
          this.pagin = new Paginator({
            'total': (function() {
              var i;
              i = 0;
              return _.reduce(_this.collection, function(sum, item) {
                sum += (item.length = item.matches.length);
                item.range = [i, sum - 1];
                i = sum;
                return sum;
              }, 0);
            })()
          });
          mediator.on('page:change', function(cid, a, b) {
            if (cid !== this.pagin.cid) {
              return;
            }
            return this.renderPage.call(this, a, b - 1);
          }, this);
        }
      
        OneToManyTableView.prototype.render = function() {
          this.el.html(this.template());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        OneToManyTableView.prototype.renderPage = function(aRng, bRng) {
          var i, tbody, view, _i, _len, _ref2;
          tbody = this.el.find('tbody');
          this.range = [aRng, bRng];
          _ref2 = this.views;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            view = _ref2[_i];
            view.dispose();
          }
          i = 0;
          return slicer.apply(this, [this.collection].concat(this.range, function(_arg, begin, end) {
            var input, j, matches, model, _ref3;
            input = _arg.input, matches = _arg.matches;
            _ref3 = matches.slice(begin, +end + 1 || 9e9);
            for (j in _ref3) {
              model = _ref3[j];
              if (j === '0') {
                this.views.push(view = new this.rowClass({
                  'rowspan': end - begin + 1,
                  'class': ['even', 'odd'][i % 2],
                  'continuing': begin !== 0,
                  'input': [input],
                  model: model
                }));
              } else {
                this.views.push(view = new this.rowClass({
                  model: model
                }));
              }
              tbody.append(view.render().el);
            }
            return i++;
          }));
        };
      
        return OneToManyTableView;
      
      })(View);
      
      ManyToOneTableRowView = (function(_super) {
        __extends(ManyToOneTableRowView, _super);
      
        function ManyToOneTableRowView() {
          _ref2 = ManyToOneTableRowView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }
      
        ManyToOneTableRowView.prototype.template = require('../templates/table/many-to-one-row');
      
        return ManyToOneTableRowView;
      
      })(TableRowView);
      
      ManyToOneTableView = (function(_super) {
        __extends(ManyToOneTableView, _super);
      
        ManyToOneTableView.prototype.template = require('../templates/table/table');
      
        ManyToOneTableView.prototype.rowClass = ManyToOneTableRowView;
      
        function ManyToOneTableView() {
          ManyToOneTableView.__super__.constructor.apply(this, arguments);
          this.pagin = new Paginator({
            'total': this.collection.length
          });
          mediator.on('page:change', function(cid, a, b) {
            if (cid !== this.pagin.cid) {
              return;
            }
            return this.renderPage.call(this, a, b - 1);
          }, this);
        }
      
        ManyToOneTableView.prototype.render = function() {
          this.el.html(this.template());
          this.el.find('.paginator').html(this.pagin.render().el);
          return this;
        };
      
        ManyToOneTableView.prototype.renderPage = function(aRng, bRng) {
          var model, tbody, view, _i, _j, _len, _len1, _ref3, _ref4, _results;
          tbody = this.el.find('tbody');
          this.range = [aRng, bRng];
          _ref3 = this.views;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            view = _ref3[_i];
            view.dispose();
          }
          _ref4 = this.collection.slice(aRng, +bRng + 1 || 9e9);
          _results = [];
          for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
            model = _ref4[_j];
            this.views.push(view = new this.rowClass({
              model: model
            }));
            _results.push(tbody.append(view.render().el));
          }
          return _results;
        };
      
        return ManyToOneTableView;
      
      })(View);
      
      exports.TableRowView = TableRowView;
      
      exports.OtMTableView = OneToManyTableView;
      
      exports.MtOTableView = ManyToOneTableView;
      
    });

    
    // tooltip.coffee
    require.register('component-400/src/views/tooltip.js', function(exports, require, module) {
    
      var TooltipView, View, tooltips,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      TooltipView = (function(_super) {
        __extends(TooltipView, _super);
      
        TooltipView.prototype.tag = 'span';
      
        TooltipView.prototype.template = require('../templates/tooltip');
      
        function TooltipView() {
          TooltipView.__super__.constructor.apply(this, arguments);
          this.model.text = tooltips[this.model.id];
          this.el.addClass('tooltip tip-top noradius');
        }
      
        return TooltipView;
      
      })(View);
      
      tooltips = {
        '1': 'Choose from among duplicate matches below',
        '2': 'These objects have been automatically added to your list',
        '3': 'A class of matches',
        '4': 'Identifiers that could not be resolved',
        '5': 'Multiple identifiers matched an object'
      };
      
      module.exports = TooltipView;
      
    });

    
    // unresolved.coffee
    require.register('component-400/src/views/unresolved.js', function(exports, require, module) {
    
      var UnresolvedView, View, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../modules/view');
      
      UnresolvedView = (function(_super) {
        __extends(UnresolvedView, _super);
      
        function UnresolvedView() {
          _ref = UnresolvedView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        UnresolvedView.prototype.autoRender = true;
      
        UnresolvedView.prototype.template = require('../templates/unresolved');
      
        return UnresolvedView;
      
      })(View);
      
      module.exports = UnresolvedView;
      
    });
  })();

  // Return the main app.
  var main = require("component-400/src/app.js");

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("component-400", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["component-400"] = main;
  
  }

  // Alias our app.
  
  require.alias("component-400/src/app.js", "component-400/index.js");
  
})();