(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail(elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail(elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail(elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send(elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if (elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2(elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2(elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return elm$http$Http$Internal$FormDataBody(formData);
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var author$project$Main$ChangedUrl = function (a) {
	return {$: 'ChangedUrl', a: a};
};
var author$project$Main$ClickedLink = function (a) {
	return {$: 'ClickedLink', a: a};
};
var author$project$Main$Redirect = function (a) {
	return {$: 'Redirect', a: a};
};
var author$project$Main$FeedItems = function (a) {
	return {$: 'FeedItems', a: a};
};
var author$project$Main$Feeds = function (a) {
	return {$: 'Feeds', a: a};
};
var author$project$Main$GotFeedItemsMsg = function (a) {
	return {$: 'GotFeedItemsMsg', a: a};
};
var author$project$Main$GotFeedsMsg = function (a) {
	return {$: 'GotFeedsMsg', a: a};
};
var author$project$Main$GotReadLaterMsg = function (a) {
	return {$: 'GotReadLaterMsg', a: a};
};
var author$project$Main$GotSavedEditMsg = function (a) {
	return {$: 'GotSavedEditMsg', a: a};
};
var author$project$Main$GotSavedListMsg = function (a) {
	return {$: 'GotSavedListMsg', a: a};
};
var author$project$Main$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var author$project$Main$ReadLater = function (a) {
	return {$: 'ReadLater', a: a};
};
var author$project$Main$SavedEdit = F2(
	function (a, b) {
		return {$: 'SavedEdit', a: a, b: b};
	});
var author$project$Main$SavedList = function (a) {
	return {$: 'SavedList', a: a};
};
var author$project$Page$FeedItems$toSession = function (model) {
	return model.session;
};
var author$project$Page$Feeds$toSession = function (model) {
	return model.session;
};
var author$project$Page$ReadLater$toSession = function (model) {
	return model.session;
};
var author$project$Page$SavedItemEdit$toSession = function (model) {
	return model.session;
};
var author$project$Page$SavedItemList$toSession = function (model) {
	return model.session;
};
var author$project$Main$toSession = function (model) {
	switch (model.$) {
		case 'Redirect':
			var session = model.a;
			return session;
		case 'NotFound':
			var session = model.a;
			return session;
		case 'ReadLater':
			var readLater = model.a;
			return author$project$Page$ReadLater$toSession(readLater);
		case 'Feeds':
			var feeds = model.a;
			return author$project$Page$Feeds$toSession(feeds);
		case 'FeedItems':
			var feedItems = model.a;
			return author$project$Page$FeedItems$toSession(feedItems);
		case 'SavedList':
			var saved = model.a;
			return author$project$Page$SavedItemList$toSession(saved);
		default:
			var saved = model.b;
			return author$project$Page$SavedItemEdit$toSession(saved);
	}
};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Main$updateWith = F4(
	function (toModel, toMsg, model, _n0) {
		var subModel = _n0.a;
		var subCmd = _n0.b;
		return _Utils_Tuple2(
			toModel(subModel),
			A2(elm$core$Platform$Cmd$map, toMsg, subCmd));
	});
var author$project$Page$FeedItems$ReceiveFeedItems = function (a) {
	return {$: 'ReceiveFeedItems', a: a};
};
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Page$FeedItems$FeedItem = F6(
	function (id, feed, title, content, link, publishedOn) {
		return {content: content, feed: feed, id: id, link: link, publishedOn: publishedOn, title: title};
	});
var elm$json$Json$Decode$string = _Json_decodeString;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Page$FeedItems$feedItemDecoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'publishedOn',
	elm$json$Json$Decode$string,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'link',
		elm$json$Json$Decode$string,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'content',
			elm$json$Json$Decode$string,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'title',
				elm$json$Json$Decode$string,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'feed',
					elm$json$Json$Decode$string,
					A3(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'id',
						elm$json$Json$Decode$string,
						elm$json$Json$Decode$succeed(author$project$Page$FeedItems$FeedItem)))))));
var author$project$RemoteDataHelpers$AuthError = {$: 'AuthError'};
var author$project$RemoteDataHelpers$WebResponse = function (a) {
	return {$: 'WebResponse', a: a};
};
var elm$http$Http$Internal$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var elm$http$Http$header = elm$http$Http$Internal$Header;
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var elm$http$Http$request = elm$http$Http$Internal$Request;
var author$project$RemoteDataHelpers$makeRequest = F5(
	function (url, user, method, expect, body) {
		return elm$http$Http$request(
			{
				body: body,
				expect: expect,
				headers: _List_fromArray(
					[
						A2(elm$http$Http$header, 'Authorization', 'Bearer ' + user.token)
					]),
				method: method,
				timeout: elm$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var elm$http$Http$emptyBody = elm$http$Http$Internal$EmptyBody;
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var elm$http$Http$NetworkError = {$: 'NetworkError'};
var elm$http$Http$Timeout = {$: 'Timeout'};
var elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = function (decoder) {
	return elm$http$Http$expectStringResponse(
		function (response) {
			var _n0 = A2(elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_n0.$ === 'Err') {
				var decodeError = _n0.a;
				return elm$core$Result$Err(
					elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _n0.a;
				return elm$core$Result$Ok(value);
			}
		});
};
var author$project$RemoteDataHelpers$makeGetRequest = F3(
	function (url, user, decoder) {
		return A5(
			author$project$RemoteDataHelpers$makeRequest,
			url,
			user,
			'GET',
			elm$http$Http$expectJson(decoder),
			elm$http$Http$emptyBody);
	});
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(
					elm$core$Task$onError,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Err),
					A2(
						elm$core$Task$andThen,
						A2(
							elm$core$Basics$composeL,
							A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
							elm$core$Result$Ok),
						task))));
	});
var elm$http$Http$toTask = function (_n0) {
	var request_ = _n0.a;
	return A2(_Http_toTask, request_, elm$core$Maybe$Nothing);
};
var elm$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			elm$core$Task$attempt,
			resultToMessage,
			elm$http$Http$toTask(request_));
	});
var krisajenkins$remotedata$RemoteData$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var krisajenkins$remotedata$RemoteData$Success = function (a) {
	return {$: 'Success', a: a};
};
var krisajenkins$remotedata$RemoteData$fromResult = function (result) {
	if (result.$ === 'Err') {
		var e = result.a;
		return krisajenkins$remotedata$RemoteData$Failure(e);
	} else {
		var x = result.a;
		return krisajenkins$remotedata$RemoteData$Success(x);
	}
};
var krisajenkins$remotedata$RemoteData$sendRequest = elm$http$Http$send(krisajenkins$remotedata$RemoteData$fromResult);
var author$project$Page$FeedItems$fetchFeedItemsCommand = function (user) {
	if (user.$ === 'Nothing') {
		return A2(
			elm$core$Platform$Cmd$map,
			A2(elm$core$Basics$always, author$project$Page$FeedItems$ReceiveFeedItems, author$project$RemoteDataHelpers$AuthError),
			elm$core$Platform$Cmd$none);
	} else {
		var loggedIn = user.a;
		return A2(
			elm$core$Platform$Cmd$map,
			author$project$Page$FeedItems$ReceiveFeedItems,
			A2(
				elm$core$Platform$Cmd$map,
				author$project$RemoteDataHelpers$WebResponse,
				krisajenkins$remotedata$RemoteData$sendRequest(
					A3(
						author$project$RemoteDataHelpers$makeGetRequest,
						'/api/feedItems',
						loggedIn,
						elm$json$Json$Decode$list(author$project$Page$FeedItems$feedItemDecoder)))));
	}
};
var author$project$Session$toUser = function (session) {
	switch (session.$) {
		case 'LoggedIn':
			var key = session.a;
			var user = session.b;
			return elm$core$Maybe$Just(user);
		case 'Guest':
			return elm$core$Maybe$Nothing;
		default:
			return elm$core$Maybe$Nothing;
	}
};
var krisajenkins$remotedata$RemoteData$Loading = {$: 'Loading'};
var author$project$Page$FeedItems$init = function (session) {
	return _Utils_Tuple2(
		{
			feedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading),
			session: session
		},
		author$project$Page$FeedItems$fetchFeedItemsCommand(
			author$project$Session$toUser(session)));
};
var author$project$Page$Feeds$ReceiveFeeds = function (a) {
	return {$: 'ReceiveFeeds', a: a};
};
var author$project$Page$Feeds$Feed = F2(
	function (title, id) {
		return {id: id, title: title};
	});
var author$project$Page$Feeds$feedDecoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'id',
	elm$json$Json$Decode$string,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'title',
		elm$json$Json$Decode$string,
		elm$json$Json$Decode$succeed(author$project$Page$Feeds$Feed)));
var author$project$Page$Feeds$fetchFeedsCommand = function (user) {
	if (user.$ === 'Nothing') {
		return A2(
			elm$core$Platform$Cmd$map,
			A2(elm$core$Basics$always, author$project$Page$Feeds$ReceiveFeeds, author$project$RemoteDataHelpers$AuthError),
			elm$core$Platform$Cmd$none);
	} else {
		var loggedIn = user.a;
		return A2(
			elm$core$Platform$Cmd$map,
			author$project$Page$Feeds$ReceiveFeeds,
			A2(
				elm$core$Platform$Cmd$map,
				author$project$RemoteDataHelpers$WebResponse,
				krisajenkins$remotedata$RemoteData$sendRequest(
					A3(
						author$project$RemoteDataHelpers$makeGetRequest,
						'/api/feeds',
						loggedIn,
						elm$json$Json$Decode$list(author$project$Page$Feeds$feedDecoder)))));
	}
};
var krisajenkins$remotedata$RemoteData$NotAsked = {$: 'NotAsked'};
var author$project$Page$Feeds$init = function (session) {
	return _Utils_Tuple2(
		{
			addFeedResult: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$NotAsked),
			feeds: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading),
			newFeedUrl: '',
			session: session
		},
		author$project$Page$Feeds$fetchFeedsCommand(
			author$project$Session$toUser(session)));
};
var author$project$Page$ReadLater$ReceiveSavedItems = function (a) {
	return {$: 'ReceiveSavedItems', a: a};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$value = _Json_decodeValue;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm$json$Json$Decode$fail(
						elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm$json$Json$Decode$andThen, handleResult, elm$json$Json$Decode$value);
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm$json$Json$Decode$field, key, elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var author$project$SavedItem$SavedItem = F9(
	function (id, title, link, description, tags, itemType, createdOn, isRead, readOn) {
		return {createdOn: createdOn, description: description, id: id, isRead: isRead, itemType: itemType, link: link, readOn: readOn, tags: tags, title: title};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var author$project$SavedItem$dateDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (val) {
		return elm$json$Json$Decode$succeed(
			elm$time$Time$millisToPosix(val));
	},
	elm$json$Json$Decode$int);
var author$project$SavedItem$Reference = {$: 'Reference'};
var author$project$SavedItem$ToDo = {$: 'ToDo'};
var author$project$SavedItem$savedItemTypeDecoder = A2(
	elm$json$Json$Decode$andThen,
	function (str) {
		switch (str) {
			case 'Reference':
				return elm$json$Json$Decode$succeed(author$project$SavedItem$Reference);
			case 'ToDo':
				return elm$json$Json$Decode$succeed(author$project$SavedItem$ToDo);
			default:
				var somethingElse = str;
				return elm$json$Json$Decode$fail('Unknown SavedItemType: ' + somethingElse);
		}
	},
	elm$json$Json$Decode$string);
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$map = _Json_map1;
var author$project$SavedItem$savedItemDecoder = A4(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'readOn',
	A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, author$project$SavedItem$dateDecoder),
	elm$core$Maybe$Nothing,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'isRead',
		elm$json$Json$Decode$bool,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'createdOn',
			author$project$SavedItem$dateDecoder,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'type',
				author$project$SavedItem$savedItemTypeDecoder,
				A3(
					NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'tags',
					elm$json$Json$Decode$list(elm$json$Json$Decode$string),
					A4(
						NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'description',
						A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, elm$json$Json$Decode$string),
						elm$core$Maybe$Nothing,
						A3(
							NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'link',
							elm$json$Json$Decode$string,
							A3(
								NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'title',
								elm$json$Json$Decode$string,
								A3(
									NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'id',
									elm$json$Json$Decode$string,
									elm$json$Json$Decode$succeed(author$project$SavedItem$SavedItem))))))))));
var author$project$Page$ReadLater$fetchSavedItemsCommand = function (user) {
	if (user.$ === 'Nothing') {
		return A2(
			elm$core$Platform$Cmd$map,
			A2(elm$core$Basics$always, author$project$Page$ReadLater$ReceiveSavedItems, author$project$RemoteDataHelpers$AuthError),
			elm$core$Platform$Cmd$none);
	} else {
		var loggedIn = user.a;
		var url = '/api/savedItems?type=ToDo';
		return A2(
			elm$core$Platform$Cmd$map,
			author$project$Page$ReadLater$ReceiveSavedItems,
			A2(
				elm$core$Platform$Cmd$map,
				author$project$RemoteDataHelpers$WebResponse,
				krisajenkins$remotedata$RemoteData$sendRequest(
					A3(
						author$project$RemoteDataHelpers$makeGetRequest,
						url,
						loggedIn,
						elm$json$Json$Decode$list(author$project$SavedItem$savedItemDecoder)))));
	}
};
var author$project$Page$ReadLater$init = function (session) {
	return _Utils_Tuple2(
		{
			savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading),
			session: session
		},
		author$project$Page$ReadLater$fetchSavedItemsCommand(
			author$project$Session$toUser(session)));
};
var author$project$Page$SavedItemEdit$ReceiveItem = function (a) {
	return {$: 'ReceiveItem', a: a};
};
var author$project$Page$SavedItemEdit$fetchItemCommand = F2(
	function (user, id) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$SavedItemEdit$ReceiveItem, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			var url = '/api/savedItems/' + id;
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$SavedItemEdit$ReceiveItem,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A3(author$project$RemoteDataHelpers$makeGetRequest, url, loggedIn, author$project$SavedItem$savedItemDecoder))));
		}
	});
var author$project$Page$SavedItemEdit$ReceiveTags = function (a) {
	return {$: 'ReceiveTags', a: a};
};
var author$project$Page$SavedItemEdit$fetchTagsCommand = function (user) {
	if (user.$ === 'Nothing') {
		return A2(
			elm$core$Platform$Cmd$map,
			A2(elm$core$Basics$always, author$project$Page$SavedItemEdit$ReceiveTags, author$project$RemoteDataHelpers$AuthError),
			elm$core$Platform$Cmd$none);
	} else {
		var loggedIn = user.a;
		return A2(
			elm$core$Platform$Cmd$map,
			author$project$Page$SavedItemEdit$ReceiveTags,
			A2(
				elm$core$Platform$Cmd$map,
				author$project$RemoteDataHelpers$WebResponse,
				krisajenkins$remotedata$RemoteData$sendRequest(
					A3(
						author$project$RemoteDataHelpers$makeGetRequest,
						'/api/tags',
						loggedIn,
						elm$json$Json$Decode$list(elm$json$Json$Decode$string)))));
	}
};
var author$project$SavedItemId$toString = function (_n0) {
	var str = _n0.a;
	return str;
};
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var inkuzmin$elm_multiselect$Multiselect$Closed = {$: 'Closed'};
var inkuzmin$elm_multiselect$Multiselect$Model = function (a) {
	return {$: 'Model', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$initModel = F2(
	function (values, tag1) {
		return inkuzmin$elm_multiselect$Multiselect$Model(
			{
				error: elm$core$Maybe$Nothing,
				filtered: values,
				hovered: elm$core$List$head(values),
				input: '',
				inputWidth: 23.0,
				_protected: false,
				selected: _List_Nil,
				status: inkuzmin$elm_multiselect$Multiselect$Closed,
				tag: tag1,
				values: values
			});
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$not = _Basics_not;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var inkuzmin$elm_multiselect$Multiselect$filter = F2(
	function (selected, values) {
		return A2(
			elm$core$List$filter,
			function (value) {
				return !A2(elm$core$List$member, value, selected);
			},
			values);
	});
var inkuzmin$elm_multiselect$Multiselect$populateValues = F3(
	function (_n0, values, selected) {
		var model = _n0.a;
		var filtered = elm$core$List$isEmpty(selected) ? values : A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, values);
		return inkuzmin$elm_multiselect$Multiselect$Model(
			_Utils_update(
				model,
				{filtered: filtered, selected: selected, values: values}));
	});
var author$project$Page$SavedItemEdit$init = F2(
	function (session, siid) {
		var user = author$project$Session$toUser(session);
		var id = author$project$SavedItemId$toString(siid);
		return _Utils_Tuple2(
			{
				item: {
					createdOn: elm$time$Time$millisToPosix(0),
					description: elm$core$Maybe$Nothing,
					id: id,
					isRead: false,
					itemType: author$project$SavedItem$Reference,
					link: '',
					readOn: elm$core$Maybe$Nothing,
					tags: _List_Nil,
					title: ''
				},
				results: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$NotAsked),
				session: session,
				tagModel: A3(
					inkuzmin$elm_multiselect$Multiselect$populateValues,
					A2(inkuzmin$elm_multiselect$Multiselect$initModel, _List_Nil, '_tags'),
					_List_Nil,
					_List_Nil),
				tags: _List_Nil
			},
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Page$SavedItemEdit$fetchTagsCommand(user),
						A2(author$project$Page$SavedItemEdit$fetchItemCommand, user, id)
					])));
	});
var author$project$Page$SavedItemEdit$SetCreatedOn = function (a) {
	return {$: 'SetCreatedOn', a: a};
};
var author$project$Page$SavedItemEdit$emptyItemId = 'newId';
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var author$project$Page$SavedItemEdit$initNew = F4(
	function (session, title, text, url) {
		var user = author$project$Session$toUser(session);
		var titleValue = A2(elm$core$Maybe$withDefault, '', title);
		var textValue = A2(elm$core$Maybe$withDefault, titleValue, text);
		var link = A2(elm$core$Maybe$withDefault, textValue, url);
		return _Utils_Tuple2(
			{
				item: {
					createdOn: elm$time$Time$millisToPosix(0),
					description: text,
					id: author$project$Page$SavedItemEdit$emptyItemId,
					isRead: false,
					itemType: author$project$SavedItem$Reference,
					link: link,
					readOn: elm$core$Maybe$Nothing,
					tags: _List_Nil,
					title: titleValue
				},
				results: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$NotAsked),
				session: session,
				tagModel: A3(
					inkuzmin$elm_multiselect$Multiselect$populateValues,
					A2(inkuzmin$elm_multiselect$Multiselect$initModel, _List_Nil, '_tags'),
					_List_Nil,
					_List_Nil),
				tags: _List_Nil
			},
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Page$SavedItemEdit$fetchTagsCommand(user),
						A2(elm$core$Task$perform, author$project$Page$SavedItemEdit$SetCreatedOn, elm$time$Time$now)
					])));
	});
var author$project$Page$SavedItemList$ReceiveSavedItems = function (a) {
	return {$: 'ReceiveSavedItems', a: a};
};
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var author$project$Page$SavedItemList$fetchSavedItemsCommand = F3(
	function (user, showAll, tags) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$SavedItemList$ReceiveSavedItems, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			var tagQuery = A2(
				elm$core$String$join,
				',',
				A2(
					elm$core$List$map,
					function (ft) {
						return ft.name;
					},
					A2(
						elm$core$List$filter,
						function (ft) {
							return ft.isFilteredBy;
						},
						tags)));
			var showAllQuery = showAll ? 'true' : 'false';
			var baseUrl = '/api/savedItems?includeRead=' + showAllQuery;
			var url = elm$core$String$isEmpty(tagQuery) ? baseUrl : (baseUrl + ('&tags=' + tagQuery));
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$SavedItemList$ReceiveSavedItems,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A3(
							author$project$RemoteDataHelpers$makeGetRequest,
							url,
							loggedIn,
							elm$json$Json$Decode$list(author$project$SavedItem$savedItemDecoder)))));
		}
	});
var author$project$Page$SavedItemList$ReceiveTags = function (a) {
	return {$: 'ReceiveTags', a: a};
};
var author$project$Page$SavedItemList$fetchTagsCommand = function (user) {
	if (user.$ === 'Nothing') {
		return A2(
			elm$core$Platform$Cmd$map,
			A2(elm$core$Basics$always, author$project$Page$SavedItemList$ReceiveTags, author$project$RemoteDataHelpers$AuthError),
			elm$core$Platform$Cmd$none);
	} else {
		var loggedIn = user.a;
		return A2(
			elm$core$Platform$Cmd$map,
			author$project$Page$SavedItemList$ReceiveTags,
			A2(
				elm$core$Platform$Cmd$map,
				author$project$RemoteDataHelpers$WebResponse,
				krisajenkins$remotedata$RemoteData$sendRequest(
					A3(
						author$project$RemoteDataHelpers$makeGetRequest,
						'/api/tags',
						loggedIn,
						elm$json$Json$Decode$list(elm$json$Json$Decode$string)))));
	}
};
var author$project$Page$SavedItemList$init = function (session) {
	var user = author$project$Session$toUser(session);
	return _Utils_Tuple2(
		{
			filterTags: _List_Nil,
			savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading),
			session: session,
			showAll: false
		},
		elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, false, _List_Nil),
					author$project$Page$SavedItemList$fetchTagsCommand(user)
				])));
};
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Ports$install = _Platform_outgoingPort(
	'install',
	function ($) {
		return elm$json$Json$Encode$null;
	});
var author$project$Ports$installWebShare = function (_n0) {
	return author$project$Ports$install(_Utils_Tuple0);
};
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$authorize = _Platform_outgoingPort(
	'authorize',
	function ($) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'route',
					elm$json$Json$Encode$string($.route))
				]));
	});
var author$project$Ports$logIn = function (options) {
	return author$project$Ports$authorize(options);
};
var author$project$Ports$logout = _Platform_outgoingPort(
	'logout',
	function ($) {
		return elm$json$Json$Encode$null;
	});
var author$project$Ports$logOut = function (_n0) {
	return author$project$Ports$logout(_Utils_Tuple0);
};
var author$project$Route$ReadLater = {$: 'ReadLater'};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (_n0.$ === 'Just') {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$String$length = _String_length;
var author$project$Route$routeToString = function (page) {
	var _n0 = function () {
		switch (page.$) {
			case 'Root':
				return _Utils_Tuple2(_List_Nil, _List_Nil);
			case 'FeedItems':
				return _Utils_Tuple2(
					_List_fromArray(
						['feeditems']),
					_List_Nil);
			case 'Feeds':
				return _Utils_Tuple2(
					_List_fromArray(
						['feeds']),
					_List_Nil);
			case 'ReadLater':
				return _Utils_Tuple2(
					_List_fromArray(
						['readlater']),
					_List_Nil);
			case 'SavedEdit':
				var id = page.a;
				return _Utils_Tuple2(
					_List_fromArray(
						[
							'saved',
							'edit',
							author$project$SavedItemId$toString(id)
						]),
					_List_Nil);
			case 'SavedNew':
				var title = page.a;
				var text = page.b;
				var url = page.c;
				return _Utils_Tuple2(
					_List_fromArray(
						['saved', 'new']),
					_List_fromArray(
						[
							_Utils_Tuple2('title', title),
							_Utils_Tuple2('text', text),
							_Utils_Tuple2('url', url)
						]));
			case 'SavedList':
				return _Utils_Tuple2(
					_List_fromArray(
						['saved', 'list']),
					_List_Nil);
			case 'LogIn':
				return _Utils_Tuple2(
					_List_fromArray(
						['login']),
					_List_Nil);
			case 'LogOut':
				return _Utils_Tuple2(
					_List_fromArray(
						['logout']),
					_List_Nil);
			default:
				return _Utils_Tuple2(
					_List_fromArray(
						['install']),
					_List_Nil);
		}
	}();
	var pieces = _n0.a;
	var params = _n0.b;
	var query = A2(
		elm$core$String$join,
		'&',
		A2(
			elm$core$List$filterMap,
			function (_n3) {
				var k = _n3.a;
				var v = _n3.b;
				if (v.$ === 'Just') {
					var value = v.a;
					return elm$core$Maybe$Just(k + ('=' + value));
				} else {
					return elm$core$Maybe$Nothing;
				}
			},
			params));
	var queryLength = elm$core$String$length(query);
	var queryString = function () {
		if (!queryLength) {
			return '';
		} else {
			return '?' + query;
		}
	}();
	var fragment = '#/' + A2(elm$core$String$join, '/', pieces);
	return _Utils_ap(queryString, fragment);
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var author$project$Route$replaceUrl = F2(
	function (key, route) {
		return A2(
			elm$browser$Browser$Navigation$replaceUrl,
			key,
			author$project$Route$routeToString(route));
	});
var author$project$Route$toUrl = function (route) {
	return author$project$Route$routeToString(route);
};
var author$project$Session$Guest = F2(
	function (a, b) {
		return {$: 'Guest', a: a, b: b};
	});
var author$project$Session$guest = function (key) {
	return A2(author$project$Session$Guest, key, false);
};
var author$project$Session$navKey = function (session) {
	switch (session.$) {
		case 'LoggedIn':
			var key = session.a;
			return key;
		case 'Guest':
			var key = session.a;
			return key;
		default:
			var key = session.a;
			return key;
	}
};
var author$project$Main$changeRouteTo = F2(
	function (maybeRoute, model) {
		var session = author$project$Main$toSession(model);
		if (maybeRoute.$ === 'Nothing') {
			return _Utils_Tuple2(
				author$project$Main$NotFound(session),
				elm$core$Platform$Cmd$none);
		} else {
			switch (maybeRoute.a.$) {
				case 'Root':
					var _n1 = maybeRoute.a;
					return _Utils_Tuple2(
						model,
						A2(
							author$project$Route$replaceUrl,
							author$project$Session$navKey(session),
							author$project$Route$ReadLater));
				case 'ReadLater':
					var _n2 = maybeRoute.a;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$ReadLater,
						author$project$Main$GotReadLaterMsg,
						model,
						author$project$Page$ReadLater$init(session));
				case 'Feeds':
					var _n3 = maybeRoute.a;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$Feeds,
						author$project$Main$GotFeedsMsg,
						model,
						author$project$Page$Feeds$init(session));
				case 'FeedItems':
					var _n4 = maybeRoute.a;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$FeedItems,
						author$project$Main$GotFeedItemsMsg,
						model,
						author$project$Page$FeedItems$init(session));
				case 'SavedList':
					var _n5 = maybeRoute.a;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$SavedList,
						author$project$Main$GotSavedListMsg,
						model,
						author$project$Page$SavedItemList$init(session));
				case 'SavedNew':
					var _n6 = maybeRoute.a;
					var title = _n6.a;
					var text = _n6.b;
					var url = _n6.c;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$SavedEdit(elm$core$Maybe$Nothing),
						author$project$Main$GotSavedEditMsg,
						model,
						A4(author$project$Page$SavedItemEdit$initNew, session, title, text, url));
				case 'SavedEdit':
					var id = maybeRoute.a.a;
					return A4(
						author$project$Main$updateWith,
						author$project$Main$SavedEdit(
							elm$core$Maybe$Just(id)),
						author$project$Main$GotSavedEditMsg,
						model,
						A2(author$project$Page$SavedItemEdit$init, session, id));
				case 'LogIn':
					var _n7 = maybeRoute.a;
					return _Utils_Tuple2(
						model,
						author$project$Ports$logIn(
							{
								route: author$project$Route$toUrl(author$project$Route$ReadLater)
							}));
				case 'LogOut':
					var _n8 = maybeRoute.a;
					var navKey = author$project$Session$navKey(session);
					var guestSession = author$project$Session$guest(navKey);
					var _n9 = author$project$Page$ReadLater$init(guestSession);
					var rlModel = _n9.a;
					var rlCmds = _n9.b;
					return _Utils_Tuple2(
						author$project$Main$ReadLater(rlModel),
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									author$project$Ports$logOut(_Utils_Tuple0),
									A2(elm$core$Platform$Cmd$map, author$project$Main$GotReadLaterMsg, rlCmds)
								])));
				default:
					var _n10 = maybeRoute.a;
					return _Utils_Tuple2(
						model,
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									author$project$Ports$installWebShare(_Utils_Tuple0),
									A2(
									author$project$Route$replaceUrl,
									author$project$Session$navKey(session),
									author$project$Route$ReadLater)
								])));
			}
		}
	});
var author$project$Route$FeedItems = {$: 'FeedItems'};
var author$project$Route$Feeds = {$: 'Feeds'};
var author$project$Route$Install = {$: 'Install'};
var author$project$Route$LogIn = {$: 'LogIn'};
var author$project$Route$LogOut = {$: 'LogOut'};
var author$project$Route$SavedEdit = function (a) {
	return {$: 'SavedEdit', a: a};
};
var author$project$Route$SavedList = {$: 'SavedList'};
var author$project$Route$SavedNew = F3(
	function (a, b, c) {
		return {$: 'SavedNew', a: a, b: b, c: c};
	});
var author$project$SavedItemId$Id = function (a) {
	return {$: 'Id', a: a};
};
var elm$url$Url$Parser$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {frag: frag, params: params, unvisited: unvisited, value: value, visited: visited};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return elm$url$Url$Parser$Parser(
			function (_n0) {
				var visited = _n0.visited;
				var unvisited = _n0.unvisited;
				var params = _n0.params;
				var frag = _n0.frag;
				var value = _n0.value;
				if (!unvisited.b) {
					return _List_Nil;
				} else {
					var next = unvisited.a;
					var rest = unvisited.b;
					var _n2 = stringToSomething(next);
					if (_n2.$ === 'Just') {
						var nextValue = _n2.a;
						return _List_fromArray(
							[
								A5(
								elm$url$Url$Parser$State,
								A2(elm$core$List$cons, next, visited),
								rest,
								params,
								frag,
								value(nextValue))
							]);
					} else {
						return _List_Nil;
					}
				}
			});
	});
var author$project$SavedItemId$urlParser = A2(
	elm$url$Url$Parser$custom,
	'SIID',
	function (str) {
		return elm$core$Maybe$Just(
			author$project$SavedItemId$Id(str));
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.visited;
		var unvisited = _n0.unvisited;
		var params = _n0.params;
		var frag = _n0.frag;
		var value = _n0.value;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0.a;
		return elm$url$Url$Parser$Parser(
			function (_n1) {
				var visited = _n1.visited;
				var unvisited = _n1.unvisited;
				var params = _n1.params;
				var frag = _n1.frag;
				var value = _n1.value;
				return A2(
					elm$core$List$map,
					elm$url$Url$Parser$mapState(value),
					parseArg(
						A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
			});
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return elm$url$Url$Parser$Parser(
		function (state) {
			return A2(
				elm$core$List$concatMap,
				function (_n0) {
					var parser = _n0.a;
					return parser(state);
				},
				parsers);
		});
};
var elm$url$Url$Parser$query = function (_n0) {
	var queryParser = _n0.a;
	return elm$url$Url$Parser$Parser(
		function (_n1) {
			var visited = _n1.visited;
			var unvisited = _n1.unvisited;
			var params = _n1.params;
			var frag = _n1.frag;
			var value = _n1.value;
			return _List_fromArray(
				[
					A5(
					elm$url$Url$Parser$State,
					visited,
					unvisited,
					params,
					frag,
					value(
						queryParser(params)))
				]);
		});
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0.a;
		var parseAfter = _n1.a;
		return elm$url$Url$Parser$Parser(
			function (state) {
				return A2(
					elm$core$List$concatMap,
					parseAfter,
					parseBefore(state));
			});
	});
var elm$url$Url$Parser$questionMark = F2(
	function (parser, queryParser) {
		return A2(
			elm$url$Url$Parser$slash,
			parser,
			elm$url$Url$Parser$query(queryParser));
	});
var elm$url$Url$Parser$s = function (str) {
	return elm$url$Url$Parser$Parser(
		function (_n0) {
			var visited = _n0.visited;
			var unvisited = _n0.unvisited;
			var params = _n0.params;
			var frag = _n0.frag;
			var value = _n0.value;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				return _Utils_eq(next, str) ? _List_fromArray(
					[
						A5(
						elm$url$Url$Parser$State,
						A2(elm$core$List$cons, next, visited),
						rest,
						params,
						frag,
						value)
					]) : _List_Nil;
			}
		});
};
var elm$url$Url$Parser$top = elm$url$Url$Parser$Parser(
	function (state) {
		return _List_fromArray(
			[state]);
	});
var elm$url$Url$Parser$Internal$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$url$Url$Parser$Query$custom = F2(
	function (key, func) {
		return elm$url$Url$Parser$Internal$Parser(
			function (dict) {
				return func(
					A2(
						elm$core$Maybe$withDefault,
						_List_Nil,
						A2(elm$core$Dict$get, key, dict)));
			});
	});
var elm$url$Url$Parser$Query$string = function (key) {
	return A2(
		elm$url$Url$Parser$Query$custom,
		key,
		function (stringList) {
			if (stringList.b && (!stringList.b.b)) {
				var str = stringList.a;
				return elm$core$Maybe$Just(str);
			} else {
				return elm$core$Maybe$Nothing;
			}
		});
};
var author$project$Route$parser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(elm$url$Url$Parser$map, author$project$Route$ReadLater, elm$url$Url$Parser$top),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$FeedItems,
			elm$url$Url$Parser$s('feeditems')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Feeds,
			elm$url$Url$Parser$s('feeds')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$ReadLater,
			elm$url$Url$Parser$s('readlater')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$SavedEdit,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('saved'),
				A2(
					elm$url$Url$Parser$slash,
					elm$url$Url$Parser$s('edit'),
					author$project$SavedItemId$urlParser))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$SavedNew,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('saved'),
				A2(
					elm$url$Url$Parser$questionMark,
					A2(
						elm$url$Url$Parser$questionMark,
						A2(
							elm$url$Url$Parser$questionMark,
							elm$url$Url$Parser$s('new'),
							elm$url$Url$Parser$Query$string('title')),
						elm$url$Url$Parser$Query$string('text')),
					elm$url$Url$Parser$Query$string('url')))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$SavedList,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('saved'),
				elm$url$Url$Parser$s('list'))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$LogIn,
			elm$url$Url$Parser$s('login')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$LogOut,
			elm$url$Url$Parser$s('logout')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Install,
			elm$url$Url$Parser$s('install'))
		]));
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.unvisited;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.value);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.value);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 'Nothing') {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 'Nothing') {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 'Nothing') {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0.a;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.path),
					elm$url$Url$Parser$prepareQuery(url.query),
					url.fragment,
					elm$core$Basics$identity)));
	});
var author$project$Route$fromUrl = function (url) {
	return A2(
		elm$url$Url$Parser$parse,
		author$project$Route$parser,
		_Utils_update(
			url,
			{
				fragment: elm$core$Maybe$Nothing,
				path: A2(elm$core$Maybe$withDefault, '', url.fragment)
			}));
};
var author$project$Session$LoggedIn = F3(
	function (a, b, c) {
		return {$: 'LoggedIn', a: a, b: b, c: c};
	});
var author$project$Session$fromUser = F2(
	function (key, maybeUser) {
		if (maybeUser.$ === 'Just') {
			var user = maybeUser.a;
			return A3(author$project$Session$LoggedIn, key, user, false);
		} else {
			return A2(author$project$Session$Guest, key, false);
		}
	});
var author$project$Main$init = F3(
	function (maybeUser, url, navKey) {
		return A2(
			author$project$Main$changeRouteTo,
			author$project$Route$fromUrl(url),
			author$project$Main$Redirect(
				A2(author$project$Session$fromUser, navKey, maybeUser)));
	});
var author$project$Main$ChangeSessionAndRoute = function (a) {
	return {$: 'ChangeSessionAndRoute', a: a};
};
var author$project$Main$GotSession = function (a) {
	return {$: 'GotSession', a: a};
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Page$FeedItems$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Page$Feeds$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Page$ReadLater$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Page$SavedItemEdit$Tags = function (a) {
	return {$: 'Tags', a: a};
};
var elm$core$Platform$Sub$map = _Platform_map;
var elm$browser$Browser$Events$Document = {$: 'Document'};
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.key;
		var event = _n0.event;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onClick = A2(elm$browser$Browser$Events$on, elm$browser$Browser$Events$Document, 'click');
var inkuzmin$elm_multiselect$Multiselect$Click = {$: 'Click'};
var inkuzmin$elm_multiselect$Multiselect$Opened = {$: 'Opened'};
var inkuzmin$elm_multiselect$Multiselect$subscriptions = function (_n0) {
	var model = _n0.a;
	return _Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Opened) ? elm$browser$Browser$Events$onClick(
		elm$json$Json$Decode$succeed(inkuzmin$elm_multiselect$Multiselect$Click)) : elm$core$Platform$Sub$none;
};
var author$project$Page$SavedItemEdit$subscriptions = function (model) {
	return A2(
		elm$core$Platform$Sub$map,
		author$project$Page$SavedItemEdit$Tags,
		inkuzmin$elm_multiselect$Multiselect$subscriptions(model.tagModel));
};
var author$project$Page$SavedItemList$subscriptions = function (model) {
	return elm$core$Platform$Sub$none;
};
var author$project$Auth0$mapResult = function (result) {
	var _n0 = _Utils_Tuple2(result.err, result.ok);
	if (_n0.a.$ === 'Just') {
		var msg = _n0.a.a;
		return _Utils_Tuple2(
			elm$core$Result$Err(msg),
			result.redirect);
	} else {
		if (_n0.b.$ === 'Nothing') {
			var _n1 = _n0.a;
			var _n2 = _n0.b;
			return _Utils_Tuple2(
				elm$core$Result$Err(
					{code: elm$core$Maybe$Nothing, description: 'No information was received from the authentication provider', name: elm$core$Maybe$Nothing, statusCode: elm$core$Maybe$Nothing}),
				result.redirect);
		} else {
			var _n3 = _n0.a;
			var user = _n0.b.a;
			return _Utils_Tuple2(
				elm$core$Result$Ok(user),
				result.redirect);
		}
	}
};
var author$project$Ports$authResult = _Platform_incomingPort(
	'authResult',
	A2(
		elm$json$Json$Decode$andThen,
		function (redirect) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (ok) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (err) {
							return elm$json$Json$Decode$succeed(
								{err: err, ok: ok, redirect: redirect});
						},
						A2(
							elm$json$Json$Decode$field,
							'err',
							elm$json$Json$Decode$oneOf(
								_List_fromArray(
									[
										elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
										A2(
										elm$json$Json$Decode$map,
										elm$core$Maybe$Just,
										A2(
											elm$json$Json$Decode$andThen,
											function (statusCode) {
												return A2(
													elm$json$Json$Decode$andThen,
													function (name) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (description) {
																return A2(
																	elm$json$Json$Decode$andThen,
																	function (code) {
																		return elm$json$Json$Decode$succeed(
																			{code: code, description: description, name: name, statusCode: statusCode});
																	},
																	A2(
																		elm$json$Json$Decode$field,
																		'code',
																		elm$json$Json$Decode$oneOf(
																			_List_fromArray(
																				[
																					elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
																					A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, elm$json$Json$Decode$string)
																				]))));
															},
															A2(elm$json$Json$Decode$field, 'description', elm$json$Json$Decode$string));
													},
													A2(
														elm$json$Json$Decode$field,
														'name',
														elm$json$Json$Decode$oneOf(
															_List_fromArray(
																[
																	elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
																	A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, elm$json$Json$Decode$string)
																]))));
											},
											A2(
												elm$json$Json$Decode$field,
												'statusCode',
												elm$json$Json$Decode$oneOf(
													_List_fromArray(
														[
															elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
															A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, elm$json$Json$Decode$int)
														])))))
									]))));
				},
				A2(
					elm$json$Json$Decode$field,
					'ok',
					elm$json$Json$Decode$oneOf(
						_List_fromArray(
							[
								elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
								A2(
								elm$json$Json$Decode$map,
								elm$core$Maybe$Just,
								A2(
									elm$json$Json$Decode$andThen,
									function (token) {
										return A2(
											elm$json$Json$Decode$andThen,
											function (profile) {
												return elm$json$Json$Decode$succeed(
													{profile: profile, token: token});
											},
											A2(
												elm$json$Json$Decode$field,
												'profile',
												A2(
													elm$json$Json$Decode$andThen,
													function (email_verified) {
														return A2(
															elm$json$Json$Decode$andThen,
															function (email) {
																return elm$json$Json$Decode$succeed(
																	{email: email, email_verified: email_verified});
															},
															A2(elm$json$Json$Decode$field, 'email', elm$json$Json$Decode$string));
													},
													A2(elm$json$Json$Decode$field, 'email_verified', elm$json$Json$Decode$bool))));
									},
									A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string)))
							]))));
		},
		A2(
			elm$json$Json$Decode$field,
			'redirect',
			elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
						A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, elm$json$Json$Decode$string)
					])))));
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var author$project$Ports$sessionChange = function (toMsg) {
	return author$project$Ports$authResult(
		A2(elm$core$Basics$composeR, author$project$Auth0$mapResult, toMsg));
};
var author$project$Ports$setInstall = _Platform_incomingPort('setInstall', elm$json$Json$Decode$bool);
var author$project$Ports$showInstallWebShare = function (toMsg) {
	return author$project$Ports$setInstall(toMsg);
};
var author$project$Session$Error = F3(
	function (a, b, c) {
		return {$: 'Error', a: a, b: b, c: c};
	});
var author$project$Session$fromLogin = F2(
	function (key, result) {
		if (result.$ === 'Err') {
			var authError = result.a;
			return A3(author$project$Session$Error, key, authError, false);
		} else {
			var user = result.a;
			return A3(author$project$Session$LoggedIn, key, user, false);
		}
	});
var author$project$Session$setInstall = F2(
	function (session, status) {
		switch (session.$) {
			case 'LoggedIn':
				var key = session.a;
				var user = session.b;
				return A3(author$project$Session$LoggedIn, key, user, status);
			case 'Guest':
				var key = session.a;
				return A2(author$project$Session$Guest, key, status);
			default:
				var key = session.a;
				var err = session.b;
				return A3(author$project$Session$Error, key, err, status);
		}
	});
var author$project$Session$changes = F3(
	function (sessionChangeToMsg, sessiontoMsg, session) {
		var key = author$project$Session$navKey(session);
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					author$project$Ports$sessionChange(
					function (_n0) {
						var result = _n0.a;
						var redirect = _n0.b;
						return sessionChangeToMsg(
							_Utils_Tuple2(
								A2(author$project$Session$fromLogin, key, result),
								redirect));
					}),
					author$project$Ports$showInstallWebShare(
					function (result) {
						return sessiontoMsg(
							A2(author$project$Session$setInstall, session, result));
					})
				]));
	});
var author$project$Main$subscriptions = function (model) {
	var session = author$project$Main$toSession(model);
	var modelSubs = function () {
		switch (model.$) {
			case 'NotFound':
				return elm$core$Platform$Sub$none;
			case 'Redirect':
				return elm$core$Platform$Sub$none;
			case 'ReadLater':
				var readLater = model.a;
				return A2(
					elm$core$Platform$Sub$map,
					author$project$Main$GotReadLaterMsg,
					author$project$Page$ReadLater$subscriptions(readLater));
			case 'Feeds':
				var feeds = model.a;
				return A2(
					elm$core$Platform$Sub$map,
					author$project$Main$GotFeedsMsg,
					author$project$Page$Feeds$subscriptions(feeds));
			case 'FeedItems':
				var feedItems = model.a;
				return A2(
					elm$core$Platform$Sub$map,
					author$project$Main$GotFeedItemsMsg,
					author$project$Page$FeedItems$subscriptions(feedItems));
			case 'SavedList':
				var saved = model.a;
				return A2(
					elm$core$Platform$Sub$map,
					author$project$Main$GotSavedListMsg,
					author$project$Page$SavedItemList$subscriptions(saved));
			default:
				var saved = model.b;
				return A2(
					elm$core$Platform$Sub$map,
					author$project$Main$GotSavedEditMsg,
					author$project$Page$SavedItemEdit$subscriptions(saved));
		}
	}();
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				modelSubs,
				A3(author$project$Session$changes, author$project$Main$ChangeSessionAndRoute, author$project$Main$GotSession, session)
			]));
};
var author$project$Page$FeedItems$setSession = F2(
	function (session, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{session: session}),
			author$project$Page$FeedItems$fetchFeedItemsCommand(
				author$project$Session$toUser(session)));
	});
var author$project$Page$Feeds$setSession = F2(
	function (session, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{session: session}),
			author$project$Page$Feeds$fetchFeedsCommand(
				author$project$Session$toUser(session)));
	});
var author$project$Page$ReadLater$setSession = F2(
	function (session, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{session: session}),
			author$project$Page$ReadLater$fetchSavedItemsCommand(
				author$project$Session$toUser(session)));
	});
var author$project$Page$SavedItemEdit$setSession = F2(
	function (session, model) {
		var user = author$project$Session$toUser(session);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{session: session}),
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						author$project$Page$SavedItemEdit$fetchTagsCommand(user),
						A2(author$project$Page$SavedItemEdit$fetchItemCommand, user, model.item.id)
					])));
	});
var author$project$Page$SavedItemList$setSession = F2(
	function (session, model) {
		var user = author$project$Session$toUser(session);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{session: session}),
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, false, _List_Nil),
						author$project$Page$SavedItemList$fetchTagsCommand(user)
					])));
	});
var author$project$Main$setSession = F2(
	function (session, model) {
		switch (model.$) {
			case 'Redirect':
				return _Utils_Tuple2(
					author$project$Main$Redirect(session),
					A2(
						author$project$Route$replaceUrl,
						author$project$Session$navKey(session),
						author$project$Route$ReadLater));
			case 'NotFound':
				return _Utils_Tuple2(
					author$project$Main$NotFound(session),
					elm$core$Platform$Cmd$none);
			case 'ReadLater':
				var readLater = model.a;
				return A4(
					author$project$Main$updateWith,
					author$project$Main$ReadLater,
					author$project$Main$GotReadLaterMsg,
					model,
					A2(author$project$Page$ReadLater$setSession, session, readLater));
			case 'Feeds':
				var feeds = model.a;
				return A4(
					author$project$Main$updateWith,
					author$project$Main$Feeds,
					author$project$Main$GotFeedsMsg,
					model,
					A2(author$project$Page$Feeds$setSession, session, feeds));
			case 'FeedItems':
				var feedItems = model.a;
				return A4(
					author$project$Main$updateWith,
					author$project$Main$FeedItems,
					author$project$Main$GotFeedItemsMsg,
					model,
					A2(author$project$Page$FeedItems$setSession, session, feedItems));
			case 'SavedList':
				var saved = model.a;
				return A4(
					author$project$Main$updateWith,
					author$project$Main$SavedList,
					author$project$Main$GotSavedListMsg,
					model,
					A2(author$project$Page$SavedItemList$setSession, session, saved));
			default:
				var id = model.a;
				var saved = model.b;
				return A4(
					author$project$Main$updateWith,
					author$project$Main$SavedEdit(id),
					author$project$Main$GotSavedEditMsg,
					model,
					A2(author$project$Page$SavedItemEdit$setSession, session, saved));
		}
	});
var author$project$Page$FeedItems$ReceiveCreatedOn = F2(
	function (a, b) {
		return {$: 'ReceiveCreatedOn', a: a, b: b};
	});
var author$project$Page$FeedItems$SaveItemResult = function (a) {
	return {$: 'SaveItemResult', a: a};
};
var author$project$Page$FeedItems$createSavedItem = F2(
	function (feedItem, now) {
		return {
			createdOn: now,
			description: elm$core$Maybe$Nothing,
			id: '',
			isRead: false,
			itemType: author$project$SavedItem$ToDo,
			link: feedItem.link,
			readOn: elm$core$Maybe$Nothing,
			tags: _List_fromArray(
				[feedItem.feed]),
			title: feedItem.title
		};
	});
var elm$http$Http$expectString = elm$http$Http$expectStringResponse(
	function (response) {
		return elm$core$Result$Ok(response.body);
	});
var elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var elm$http$Http$jsonBody = function (value) {
	return A2(
		elm$http$Http$Internal$StringBody,
		'application/json',
		A2(elm$json$Json$Encode$encode, 0, value));
};
var author$project$RemoteDataHelpers$makePutRequest = F3(
	function (url, user, body) {
		return A5(
			author$project$RemoteDataHelpers$makeRequest,
			url,
			user,
			'PUT',
			elm$http$Http$expectString,
			elm$http$Http$jsonBody(body));
	});
var author$project$SavedItem$maybeNullEncoder = F2(
	function (encoder, value) {
		if (value.$ === 'Nothing') {
			return elm$json$Json$Encode$null;
		} else {
			var data = value.a;
			return encoder(data);
		}
	});
var author$project$SavedItem$savedItemTypeEncoder = function (itemType) {
	if (itemType.$ === 'Reference') {
		return 'Reference';
	} else {
		return 'ToDo';
	}
};
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var author$project$SavedItem$savedItemEncoder = function (item) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(item.title)),
				_Utils_Tuple2(
				'link',
				elm$json$Json$Encode$string(item.link)),
				_Utils_Tuple2(
				'description',
				A2(author$project$SavedItem$maybeNullEncoder, elm$json$Json$Encode$string, item.description)),
				_Utils_Tuple2(
				'tags',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, item.tags)),
				_Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(
					author$project$SavedItem$savedItemTypeEncoder(item.itemType))),
				_Utils_Tuple2(
				'createdOn',
				elm$json$Json$Encode$int(
					elm$time$Time$posixToMillis(item.createdOn))),
				_Utils_Tuple2(
				'isRead',
				elm$json$Json$Encode$bool(item.isRead)),
				_Utils_Tuple2(
				'readOn',
				A2(
					author$project$SavedItem$maybeNullEncoder,
					function (v) {
						return elm$json$Json$Encode$int(
							elm$time$Time$posixToMillis(v));
					},
					item.readOn))
			]));
};
var author$project$Page$FeedItems$saveItemCommand = F3(
	function (user, item, now) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$FeedItems$SaveItemResult, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$FeedItems$SaveItemResult,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A3(
							author$project$RemoteDataHelpers$makePutRequest,
							'/api/savedItems',
							loggedIn,
							author$project$SavedItem$savedItemEncoder(
								A2(author$project$Page$FeedItems$createSavedItem, item, now))))));
		}
	});
var author$project$Page$FeedItems$update = F2(
	function (msg, model) {
		var user = author$project$Session$toUser(model.session);
		switch (msg.$) {
			case 'FetchFeedItems':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							feedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					author$project$Page$FeedItems$fetchFeedItemsCommand(user));
			case 'ReceiveFeedItems':
				var response = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{feedItems: response}),
					elm$core$Platform$Cmd$none);
			case 'ReceiveCreatedOn':
				var item = msg.a;
				var now = msg.b;
				return _Utils_Tuple2(
					model,
					A3(author$project$Page$FeedItems$saveItemCommand, user, item, now));
			case 'SaveItem':
				var item = msg.a;
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Task$perform,
						author$project$Page$FeedItems$ReceiveCreatedOn(item),
						elm$time$Time$now));
			default:
				var result = msg.a;
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Feeds$AddFeedResult = function (a) {
	return {$: 'AddFeedResult', a: a};
};
var author$project$Page$Feeds$addFeedCommand = F2(
	function (user, model) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$Feeds$AddFeedResult, 'Not Authenticated'),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$Feeds$AddFeedResult,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A3(
							author$project$RemoteDataHelpers$makePutRequest,
							'/api/feeds',
							loggedIn,
							elm$json$Json$Encode$object(
								_List_fromArray(
									[
										_Utils_Tuple2(
										'feedUrl',
										elm$json$Json$Encode$string(model.newFeedUrl))
									]))))));
		}
	});
var author$project$Page$Feeds$update = F2(
	function (msg, model) {
		var user = author$project$Session$toUser(model.session);
		switch (msg.$) {
			case 'FetchFeeds':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							feeds: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					author$project$Page$Feeds$fetchFeedsCommand(user));
			case 'ReceiveFeeds':
				var response = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{feeds: response}),
					elm$core$Platform$Cmd$none);
			case 'SetFeedUrl':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{newFeedUrl: url}),
					elm$core$Platform$Cmd$none);
			case 'AddFeed':
				return _Utils_Tuple2(
					model,
					A2(author$project$Page$Feeds$addFeedCommand, user, model));
			default:
				var response = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{addFeedResult: response}),
					author$project$Page$Feeds$fetchFeedsCommand(user));
		}
	});
var author$project$Page$ReadLater$MarkReadResult = function (a) {
	return {$: 'MarkReadResult', a: a};
};
var author$project$RemoteDataHelpers$makeEmptyPatchRequest = F2(
	function (url, user) {
		return A5(author$project$RemoteDataHelpers$makeRequest, url, user, 'PATCH', elm$http$Http$expectString, elm$http$Http$emptyBody);
	});
var author$project$Page$ReadLater$markItemReadCommand = F2(
	function (user, id) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$ReadLater$MarkReadResult, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$ReadLater$MarkReadResult,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A2(author$project$RemoteDataHelpers$makeEmptyPatchRequest, '/api/savedItems/read/' + id, loggedIn))));
		}
	});
var author$project$Page$ReadLater$update = F2(
	function (msg, model) {
		var user = author$project$Session$toUser(model.session);
		switch (msg.$) {
			case 'FetchSavedItems':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					author$project$Page$ReadLater$fetchSavedItemsCommand(user));
			case 'ReceiveSavedItems':
				var response = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{savedItems: response}),
					elm$core$Platform$Cmd$none);
			case 'MarkRead':
				var id = msg.a;
				return _Utils_Tuple2(
					model,
					A2(author$project$Page$ReadLater$markItemReadCommand, user, id));
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					author$project$Page$ReadLater$fetchSavedItemsCommand(user));
		}
	});
var author$project$Page$SavedItemEdit$asToBeSavedIn = F2(
	function (model, savedItem) {
		return _Utils_update(
			model,
			{item: savedItem});
	});
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var inkuzmin$elm_multiselect$Multiselect$FocusResult = function (a) {
	return {$: 'FocusResult', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter = '\u200c\u200c';
var inkuzmin$elm_multiselect$Multiselect$clearInputText = function (_n0) {
	var model = _n0.a;
	return _Utils_Tuple2(
		inkuzmin$elm_multiselect$Multiselect$Model(
			_Utils_update(
				model,
				{input: inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter})),
		A2(
			elm$core$Task$attempt,
			inkuzmin$elm_multiselect$Multiselect$FocusResult,
			elm$browser$Browser$Dom$focus('multiselectInput' + model.tag)));
};
var inkuzmin$elm_multiselect$Multiselect$getSelectedValues = function (_n0) {
	var model = _n0.a;
	return model.selected;
};
var inkuzmin$elm_multiselect$Multiselect$getValues = function (_n0) {
	var model = _n0.a;
	return model.values;
};
var author$project$Page$SavedItemEdit$addTag = F2(
	function (multiselectModel, tag) {
		var values = inkuzmin$elm_multiselect$Multiselect$getValues(multiselectModel);
		var selected = inkuzmin$elm_multiselect$Multiselect$getSelectedValues(multiselectModel);
		var alreadyExists = A2(elm$core$List$member, tag, values);
		return alreadyExists ? _Utils_Tuple2(multiselectModel, elm$core$Platform$Cmd$none) : function (_n0) {
			var m = _n0.a;
			var c = _n0.b;
			return _Utils_Tuple2(
				m,
				A2(elm$core$Platform$Cmd$map, author$project$Page$SavedItemEdit$Tags, c));
		}(
			inkuzmin$elm_multiselect$Multiselect$clearInputText(
				A3(
					inkuzmin$elm_multiselect$Multiselect$populateValues,
					multiselectModel,
					_Utils_ap(
						values,
						_List_fromArray(
							[tag])),
					_Utils_ap(
						selected,
						_List_fromArray(
							[tag])))));
	});
var author$project$Page$SavedItemEdit$handleTag = F2(
	function (msg, model) {
		if (msg.$ === 'NotFound') {
			var v = msg.a;
			var tag = _Utils_Tuple2(v, v);
			var multiselectModel = model.tagModel;
			var _n1 = A2(author$project$Page$SavedItemEdit$addTag, multiselectModel, tag);
			var populated = _n1.a;
			var cmd = _n1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{tagModel: populated}),
				cmd);
		} else {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$SavedItemEdit$SaveItemResult = function (a) {
	return {$: 'SaveItemResult', a: a};
};
var author$project$RemoteDataHelpers$makePatchRequest = F3(
	function (url, user, body) {
		return A5(
			author$project$RemoteDataHelpers$makeRequest,
			url,
			user,
			'PATCH',
			elm$http$Http$expectString,
			elm$http$Http$jsonBody(body));
	});
var author$project$Page$SavedItemEdit$saveItemCommand = F3(
	function (user, item, tags) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$SavedItemEdit$SaveItemResult, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			var toSave = _Utils_update(
				item,
				{tags: tags});
			var isNew = _Utils_eq(item.id, author$project$Page$SavedItemEdit$emptyItemId);
			if (isNew) {
				return A2(
					elm$core$Platform$Cmd$map,
					author$project$Page$SavedItemEdit$SaveItemResult,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$RemoteDataHelpers$WebResponse,
						krisajenkins$remotedata$RemoteData$sendRequest(
							A3(
								author$project$RemoteDataHelpers$makePutRequest,
								'/api/savedItems',
								loggedIn,
								author$project$SavedItem$savedItemEncoder(toSave)))));
			} else {
				return A2(
					elm$core$Platform$Cmd$map,
					author$project$Page$SavedItemEdit$SaveItemResult,
					A2(
						elm$core$Platform$Cmd$map,
						author$project$RemoteDataHelpers$WebResponse,
						krisajenkins$remotedata$RemoteData$sendRequest(
							A3(
								author$project$RemoteDataHelpers$makePatchRequest,
								'/api/savedItems/' + item.id,
								loggedIn,
								author$project$SavedItem$savedItemEncoder(toSave)))));
			}
		}
	});
var author$project$Page$SavedItemEdit$setCreatedOn = F2(
	function (savedItem, createdOn) {
		return _Utils_update(
			savedItem,
			{createdOn: createdOn});
	});
var author$project$Page$SavedItemEdit$setDescription = F2(
	function (savedItem, description) {
		return _Utils_update(
			savedItem,
			{
				description: elm$core$Maybe$Just(description)
			});
	});
var author$project$Page$SavedItemEdit$setLink = F2(
	function (savedItem, link) {
		return _Utils_update(
			savedItem,
			{link: link});
	});
var author$project$Page$SavedItemEdit$setTitle = F2(
	function (savedItem, title) {
		return _Utils_update(
			savedItem,
			{title: title});
	});
var author$project$Page$SavedItemEdit$setType = F2(
	function (savedItem, itemType) {
		return _Utils_update(
			savedItem,
			{itemType: itemType});
	});
var author$project$Page$SavedItemEdit$toPair = function (values) {
	return A2(
		elm$core$List$map,
		function (v) {
			return _Utils_Tuple2(v, v);
		},
		values);
};
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$String$toLower = _String_toLower;
var inkuzmin$elm_multiselect$Multiselect$Cleared = {$: 'Cleared'};
var inkuzmin$elm_multiselect$Multiselect$DisableProtection = {$: 'DisableProtection'};
var inkuzmin$elm_multiselect$Multiselect$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$ScrollResult = function (a) {
	return {$: 'ScrollResult', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$ScrollY = function (a) {
	return {$: 'ScrollY', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$Selected = function (a) {
	return {$: 'Selected', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$Unselected = function (a) {
	return {$: 'Unselected', a: a};
};
var elm$core$Process$sleep = _Process_sleep;
var inkuzmin$elm_multiselect$Multiselect$delayInMs = F2(
	function (ms, msg) {
		return A2(
			elm$core$Task$perform,
			function (_n0) {
				return msg;
			},
			elm$core$Process$sleep(ms));
	});
var elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var inkuzmin$elm_multiselect$Multiselect$domScrollToY = F2(
	function (id, y) {
		return A2(
			elm$core$Task$andThen,
			function (vp) {
				return A3(elm$browser$Browser$Dom$setViewportOf, id, vp.viewport.x, y);
			},
			elm$browser$Browser$Dom$getViewportOf(id));
	});
var inkuzmin$elm_multiselect$Multiselect$domScrollY = function (id) {
	return A2(
		elm$core$Task$map,
		function (vp) {
			return vp.viewport.y;
		},
		elm$browser$Browser$Dom$getViewportOf(id));
};
var inkuzmin$elm_multiselect$Multiselect$fitViewPort = F2(
	function (_n0, _n1) {
		var top = _n0.a;
		var bottom = _n0.b;
		var vpTop = _n1.a;
		var vpBottom = _n1.b;
		return (_Utils_cmp(top, vpTop) < 0) ? top : ((_Utils_cmp(bottom, vpBottom) > 0) ? (vpTop + (bottom - vpBottom)) : vpTop);
	});
var inkuzmin$elm_multiselect$Multiselect$SelectCss$itemHeight = 32;
var inkuzmin$elm_multiselect$Multiselect$getBoundaries = function (i) {
	return _Utils_Tuple2(i * inkuzmin$elm_multiselect$Multiselect$SelectCss$itemHeight, (i * inkuzmin$elm_multiselect$Multiselect$SelectCss$itemHeight) + inkuzmin$elm_multiselect$Multiselect$SelectCss$itemHeight);
};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$menuHeight = 200;
var inkuzmin$elm_multiselect$Multiselect$getViewPortBoundaries = function (i) {
	return _Utils_Tuple2(i, i + inkuzmin$elm_multiselect$Multiselect$SelectCss$menuHeight);
};
var inkuzmin$elm_multiselect$Multiselect$indexOf = F2(
	function (el, list) {
		var helper = F2(
			function (l, index) {
				helper:
				while (true) {
					if (!l.b) {
						return elm$core$Maybe$Nothing;
					} else {
						var x = l.a;
						var xs = l.b;
						if (_Utils_eq(x, el)) {
							return elm$core$Maybe$Just(index);
						} else {
							var $temp$l = xs,
								$temp$index = index + 1;
							l = $temp$l;
							index = $temp$index;
							continue helper;
						}
					}
				}
			});
		return A2(helper, list, 0);
	});
var inkuzmin$elm_multiselect$Multiselect$lastElem = A2(
	elm$core$List$foldl,
	A2(elm$core$Basics$composeR, elm$core$Maybe$Just, elm$core$Basics$always),
	elm$core$Maybe$Nothing);
var inkuzmin$elm_multiselect$Multiselect$nextItem = F2(
	function (list, item) {
		var findNextInList = function (l) {
			findNextInList:
			while (true) {
				if (!l.b) {
					return elm$core$Maybe$Nothing;
				} else {
					if (!l.b.b) {
						var x = l.a;
						return _Utils_eq(x, item) ? elm$core$List$head(list) : elm$core$Maybe$Nothing;
					} else {
						var x = l.a;
						var _n1 = l.b;
						var y = _n1.a;
						var rest = _n1.b;
						if (_Utils_eq(x, item)) {
							return elm$core$Maybe$Just(y);
						} else {
							var $temp$l = A2(elm$core$List$cons, y, rest);
							l = $temp$l;
							continue findNextInList;
						}
					}
				}
			}
		};
		return findNextInList(list);
	});
var inkuzmin$elm_multiselect$Multiselect$nextSelectedItem = F2(
	function (list, item) {
		var takeLast = function (l) {
			if (!l.b) {
				return elm$core$Maybe$Nothing;
			} else {
				if (!l.b.b) {
					return elm$core$Maybe$Nothing;
				} else {
					var _n3 = l.b;
					var y = _n3.a;
					return elm$core$Maybe$Just(y);
				}
			}
		};
		var findNextInList = function (l) {
			findNextInList:
			while (true) {
				if (!l.b) {
					return elm$core$Maybe$Nothing;
				} else {
					if (!l.b.b) {
						var x = l.a;
						return _Utils_eq(x, item) ? takeLast(
							elm$core$List$reverse(list)) : elm$core$Maybe$Nothing;
					} else {
						var x = l.a;
						var _n1 = l.b;
						var y = _n1.a;
						var rest = _n1.b;
						if (_Utils_eq(x, item)) {
							return elm$core$Maybe$Just(y);
						} else {
							var $temp$l = A2(elm$core$List$cons, y, rest);
							l = $temp$l;
							continue findNextInList;
						}
					}
				}
			}
		};
		return findNextInList(list);
	});
var inkuzmin$elm_multiselect$Multiselect$prevItem = F2(
	function (list, item) {
		return A2(
			inkuzmin$elm_multiselect$Multiselect$nextItem,
			elm$core$List$reverse(list),
			item);
	});
var inkuzmin$elm_multiselect$Multiselect$Keycodes$backspace = 8;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$downArrow = 40;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$end = 35;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$escape = 27;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$home = 36;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$pageDown = 34;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$pageUp = 33;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$return = 13;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$tab = 9;
var inkuzmin$elm_multiselect$Multiselect$Keycodes$upArrow = 38;
var inkuzmin$elm_multiselect$Multiselect$update = F2(
	function (msg, _n0) {
		var model = _n0.a;
		switch (msg.$) {
			case 'Start':
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(model),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'Toggle':
				return _Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Opened) ? _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{status: inkuzmin$elm_multiselect$Multiselect$Closed})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$FocusResult,
								elm$browser$Browser$Dom$focus('multiselectInput' + model.tag))
							])),
					elm$core$Maybe$Nothing) : _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{status: inkuzmin$elm_multiselect$Multiselect$Opened})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$FocusResult,
								elm$browser$Browser$Dom$focus('multiselectInput' + model.tag))
							])),
					elm$core$Maybe$Nothing);
			case 'Click':
				return model._protected ? _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{_protected: false})),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing) : _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{status: inkuzmin$elm_multiselect$Multiselect$Closed})),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'DisableProtection':
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{_protected: false})),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'ClickOnComponent':
				return model._protected ? _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(model),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing) : _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{_protected: true, status: inkuzmin$elm_multiselect$Multiselect$Opened})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$FocusResult,
								elm$browser$Browser$Dom$focus('multiselectInput' + model.tag)),
								A2(inkuzmin$elm_multiselect$Multiselect$delayInMs, 100, inkuzmin$elm_multiselect$Multiselect$DisableProtection)
							])),
					elm$core$Maybe$Nothing);
			case 'ScrollResult':
				var result = msg.a;
				if (result.$ === 'Err') {
					var id = result.a.a;
					return _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{
									error: elm$core$Maybe$Just('Could not find dom id: ' + id)
								})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				} else {
					return _Utils_eq(model.input, inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter) ? _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{input: ''})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing) : _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{error: elm$core$Maybe$Nothing})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				}
			case 'FocusResult':
				var result = msg.a;
				if (result.$ === 'Err') {
					var id = result.a.a;
					return _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{
									error: elm$core$Maybe$Just('Could not find dom id: ' + id)
								})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				} else {
					return _Utils_eq(model.input, inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter) ? _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{input: ''})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing) : _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{error: elm$core$Maybe$Nothing})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				}
			case 'Adjust':
				var value = msg.a;
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{inputWidth: value})),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'Filter':
				var value = msg.a;
				var filtered = A2(
					inkuzmin$elm_multiselect$Multiselect$filter,
					model.selected,
					A2(
						elm$core$List$filter,
						function (_n5) {
							var val = _n5.b;
							return A2(
								elm$core$String$contains,
								elm$core$String$toLower(value),
								elm$core$String$toLower(val));
						},
						model.values));
				if (model._protected) {
					return _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{_protected: false})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				} else {
					var _n4 = model.hovered;
					if (_n4.$ === 'Nothing') {
						return _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(
								_Utils_update(
									model,
									{
										filtered: filtered,
										hovered: elm$core$List$head(filtered),
										input: value,
										status: elm$core$List$isEmpty(filtered) ? inkuzmin$elm_multiselect$Multiselect$Closed : inkuzmin$elm_multiselect$Multiselect$Opened
									})),
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Nothing);
					} else {
						var item = _n4.a;
						return (!elm$core$List$length(
							A2(
								elm$core$List$filter,
								function (i) {
									return _Utils_eq(i, item);
								},
								filtered))) ? _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(
								_Utils_update(
									model,
									{
										filtered: filtered,
										hovered: elm$core$List$head(filtered),
										input: value,
										status: elm$core$List$isEmpty(filtered) ? inkuzmin$elm_multiselect$Multiselect$Closed : inkuzmin$elm_multiselect$Multiselect$Opened
									})),
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Nothing) : _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(
								_Utils_update(
									model,
									{
										filtered: filtered,
										input: value,
										status: elm$core$List$isEmpty(filtered) ? inkuzmin$elm_multiselect$Multiselect$Closed : inkuzmin$elm_multiselect$Multiselect$Opened
									})),
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Nothing);
					}
				}
			case 'OnSelect':
				var item = msg.a;
				var selected = _Utils_ap(
					model.selected,
					_List_fromArray(
						[item]));
				var filtered = A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, model.values);
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{
								filtered: filtered,
								hovered: A2(inkuzmin$elm_multiselect$Multiselect$nextSelectedItem, model.filtered, item),
								input: inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter,
								selected: selected,
								status: elm$core$List$isEmpty(filtered) ? inkuzmin$elm_multiselect$Multiselect$Closed : inkuzmin$elm_multiselect$Multiselect$Opened
							})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$FocusResult,
								elm$browser$Browser$Dom$focus('multiselectInput' + model.tag))
							])),
					elm$core$Maybe$Just(
						inkuzmin$elm_multiselect$Multiselect$Selected(item)));
			case 'RemoveItem':
				var item = msg.a;
				var selected = A2(
					elm$core$List$filter,
					function (value) {
						return !_Utils_eq(value, item);
					},
					model.selected);
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{
								filtered: A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, model.values),
								hovered: elm$core$Maybe$Just(item),
								selected: selected
							})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$ScrollY,
								inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
							])),
					elm$core$Maybe$Just(
						inkuzmin$elm_multiselect$Multiselect$Unselected(item)));
			case 'Clear':
				var selected = _List_Nil;
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{
								filtered: A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, model.values),
								input: inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter,
								selected: selected,
								status: inkuzmin$elm_multiselect$Multiselect$Closed
							})),
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								elm$core$Task$attempt,
								inkuzmin$elm_multiselect$Multiselect$FocusResult,
								elm$browser$Browser$Dom$focus('multiselectInput' + model.tag))
							])),
					elm$core$Maybe$Just(inkuzmin$elm_multiselect$Multiselect$Cleared));
			case 'OnHover':
				var item = msg.a;
				return _Utils_Tuple3(
					inkuzmin$elm_multiselect$Multiselect$Model(
						_Utils_update(
							model,
							{
								hovered: elm$core$Maybe$Just(item)
							})),
					elm$core$Platform$Cmd$none,
					elm$core$Maybe$Nothing);
			case 'ScrollY':
				var result = msg.a;
				if (result.$ === 'Err') {
					var id = result.a.a;
					return _Utils_Tuple3(
						inkuzmin$elm_multiselect$Multiselect$Model(
							_Utils_update(
								model,
								{
									error: elm$core$Maybe$Just('Could not find dom id: ' + id)
								})),
						elm$core$Platform$Cmd$none,
						elm$core$Maybe$Nothing);
				} else {
					var y = result.a;
					var _n7 = model.hovered;
					if (_n7.$ === 'Nothing') {
						return _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(model),
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Nothing);
					} else {
						var item = _n7.a;
						var _n8 = A2(inkuzmin$elm_multiselect$Multiselect$indexOf, item, model.filtered);
						if (_n8.$ === 'Nothing') {
							return _Utils_Tuple3(
								inkuzmin$elm_multiselect$Multiselect$Model(model),
								elm$core$Platform$Cmd$none,
								elm$core$Maybe$Nothing);
						} else {
							var idx = _n8.a;
							var vpBoundaries = inkuzmin$elm_multiselect$Multiselect$getViewPortBoundaries(y);
							var boundaries = inkuzmin$elm_multiselect$Multiselect$getBoundaries(idx);
							var scroll = A2(inkuzmin$elm_multiselect$Multiselect$fitViewPort, boundaries, vpBoundaries);
							return _Utils_Tuple3(
								inkuzmin$elm_multiselect$Multiselect$Model(
									_Utils_update(
										model,
										{error: elm$core$Maybe$Nothing})),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Task$attempt,
											inkuzmin$elm_multiselect$Multiselect$ScrollResult,
											A2(inkuzmin$elm_multiselect$Multiselect$domScrollToY, 'multiselectMenu' + model.tag, scroll))
										])),
								elm$core$Maybe$Nothing);
						}
					}
				}
			default:
				var key = msg.a;
				if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$upArrow)) {
					var _n9 = model.hovered;
					if (_n9.$ === 'Nothing') {
						return _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(
								_Utils_update(
									model,
									{
										hovered: elm$core$List$head(model.filtered)
									})),
							elm$core$Platform$Cmd$none,
							elm$core$Maybe$Nothing);
					} else {
						var item = _n9.a;
						var prev = A2(inkuzmin$elm_multiselect$Multiselect$prevItem, model.filtered, item);
						return _Utils_Tuple3(
							inkuzmin$elm_multiselect$Multiselect$Model(
								_Utils_update(
									model,
									{hovered: prev})),
							elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										elm$core$Task$attempt,
										inkuzmin$elm_multiselect$Multiselect$ScrollY,
										inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
									])),
							elm$core$Maybe$Nothing);
					}
				} else {
					if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$downArrow)) {
						var _n10 = model.hovered;
						if (_n10.$ === 'Nothing') {
							return _Utils_Tuple3(
								inkuzmin$elm_multiselect$Multiselect$Model(
									_Utils_update(
										model,
										{
											hovered: elm$core$List$head(model.filtered)
										})),
								elm$core$Platform$Cmd$none,
								elm$core$Maybe$Nothing);
						} else {
							var item = _n10.a;
							var next = A2(inkuzmin$elm_multiselect$Multiselect$nextItem, model.filtered, item);
							return _Utils_Tuple3(
								inkuzmin$elm_multiselect$Multiselect$Model(
									_Utils_update(
										model,
										{hovered: next})),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Task$attempt,
											inkuzmin$elm_multiselect$Multiselect$ScrollY,
											inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
										])),
								elm$core$Maybe$Nothing);
						}
					} else {
						if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$pageUp) || _Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$home)) {
							var first = elm$core$List$head(model.filtered);
							return _Utils_Tuple3(
								inkuzmin$elm_multiselect$Multiselect$Model(
									_Utils_update(
										model,
										{hovered: first})),
								elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											elm$core$Task$attempt,
											inkuzmin$elm_multiselect$Multiselect$ScrollY,
											inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
										])),
								elm$core$Maybe$Nothing);
						} else {
							if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$pageDown) || _Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$end)) {
								var last = inkuzmin$elm_multiselect$Multiselect$lastElem(model.filtered);
								return _Utils_Tuple3(
									inkuzmin$elm_multiselect$Multiselect$Model(
										_Utils_update(
											model,
											{hovered: last})),
									elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												A2(
												elm$core$Task$attempt,
												inkuzmin$elm_multiselect$Multiselect$ScrollY,
												inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
											])),
									elm$core$Maybe$Nothing);
							} else {
								if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$return)) {
									var _n11 = model.hovered;
									if (_n11.$ === 'Nothing') {
										var isInvisible = _Utils_eq(model.input, inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter);
										var isEmpty = elm$core$String$isEmpty(model.input);
										return (isInvisible || isEmpty) ? _Utils_Tuple3(
											inkuzmin$elm_multiselect$Multiselect$Model(model),
											elm$core$Platform$Cmd$none,
											elm$core$Maybe$Nothing) : _Utils_Tuple3(
											inkuzmin$elm_multiselect$Multiselect$Model(model),
											elm$core$Platform$Cmd$none,
											elm$core$Maybe$Just(
												inkuzmin$elm_multiselect$Multiselect$NotFound(model.input)));
									} else {
										var item = _n11.a;
										var selected = _Utils_ap(
											model.selected,
											_List_fromArray(
												[item]));
										var filtered = A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, model.values);
										return _Utils_Tuple3(
											inkuzmin$elm_multiselect$Multiselect$Model(
												_Utils_update(
													model,
													{
														filtered: filtered,
														hovered: A2(inkuzmin$elm_multiselect$Multiselect$nextSelectedItem, model.filtered, item),
														input: inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter,
														selected: selected,
														status: elm$core$List$isEmpty(filtered) ? inkuzmin$elm_multiselect$Multiselect$Closed : inkuzmin$elm_multiselect$Multiselect$Opened
													})),
											elm$core$Platform$Cmd$batch(
												_List_fromArray(
													[
														A2(
														elm$core$Task$attempt,
														inkuzmin$elm_multiselect$Multiselect$FocusResult,
														elm$browser$Browser$Dom$focus('multiselectInput' + model.tag))
													])),
											elm$core$Maybe$Just(
												inkuzmin$elm_multiselect$Multiselect$Selected(item)));
									}
								} else {
									if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$escape)) {
										return _Utils_Tuple3(
											inkuzmin$elm_multiselect$Multiselect$Model(
												_Utils_update(
													model,
													{_protected: true, status: inkuzmin$elm_multiselect$Multiselect$Closed})),
											elm$core$Platform$Cmd$none,
											elm$core$Maybe$Nothing);
									} else {
										if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$tab)) {
											return _Utils_Tuple3(
												inkuzmin$elm_multiselect$Multiselect$Model(
													_Utils_update(
														model,
														{status: inkuzmin$elm_multiselect$Multiselect$Closed})),
												elm$core$Platform$Cmd$none,
												elm$core$Maybe$Nothing);
										} else {
											if (_Utils_eq(key, inkuzmin$elm_multiselect$Multiselect$Keycodes$backspace)) {
												if (model.input === '') {
													var _n12 = inkuzmin$elm_multiselect$Multiselect$lastElem(model.selected);
													if (_n12.$ === 'Nothing') {
														return _Utils_Tuple3(
															inkuzmin$elm_multiselect$Multiselect$Model(model),
															elm$core$Platform$Cmd$none,
															elm$core$Maybe$Nothing);
													} else {
														var item = _n12.a;
														var selected = A2(
															elm$core$List$filter,
															function (value) {
																return !_Utils_eq(value, item);
															},
															model.selected);
														return _Utils_Tuple3(
															inkuzmin$elm_multiselect$Multiselect$Model(
																_Utils_update(
																	model,
																	{
																		filtered: A2(inkuzmin$elm_multiselect$Multiselect$filter, selected, model.values),
																		hovered: elm$core$Maybe$Just(item),
																		selected: selected
																	})),
															elm$core$Platform$Cmd$batch(
																_List_fromArray(
																	[
																		A2(
																		elm$core$Task$attempt,
																		inkuzmin$elm_multiselect$Multiselect$ScrollY,
																		inkuzmin$elm_multiselect$Multiselect$domScrollY('multiselectMenu' + model.tag))
																	])),
															elm$core$Maybe$Just(
																inkuzmin$elm_multiselect$Multiselect$Unselected(item)));
													}
												} else {
													return _Utils_Tuple3(
														inkuzmin$elm_multiselect$Multiselect$Model(model),
														elm$core$Platform$Cmd$none,
														elm$core$Maybe$Nothing);
												}
											} else {
												return _Utils_Tuple3(
													inkuzmin$elm_multiselect$Multiselect$Model(model),
													elm$core$Platform$Cmd$none,
													elm$core$Maybe$Nothing);
											}
										}
									}
								}
							}
						}
					}
				}
		}
	});
var author$project$Page$SavedItemEdit$update = F2(
	function (msg, model) {
		var user = author$project$Session$toUser(model.session);
		switch (msg.$) {
			case 'ReceiveTags':
				var response = msg.a;
				if (response.$ === 'WebResponse') {
					var wr = response.a;
					if (wr.$ === 'Success') {
						var tags = wr.a;
						var values = inkuzmin$elm_multiselect$Multiselect$getValues(model.tagModel);
						var selected = inkuzmin$elm_multiselect$Multiselect$getSelectedValues(model.tagModel);
						var newValues = author$project$Page$SavedItemEdit$toPair(tags);
						var multiModel = A3(
							inkuzmin$elm_multiselect$Multiselect$populateValues,
							model.tagModel,
							_Utils_ap(values, newValues),
							selected);
						var newModel = _Utils_update(
							model,
							{tagModel: multiModel, tags: tags});
						return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'ReceiveItem':
				var response = msg.a;
				if (response.$ === 'WebResponse') {
					var wr = response.a;
					if (wr.$ === 'Success') {
						var item = wr.a;
						var values = inkuzmin$elm_multiselect$Multiselect$getValues(model.tagModel);
						var selected = inkuzmin$elm_multiselect$Multiselect$getSelectedValues(model.tagModel);
						var loadedTags = A2(
							elm$core$List$map,
							function (v) {
								return _Utils_Tuple2(v, v);
							},
							item.tags);
						var multiModel = A3(
							inkuzmin$elm_multiselect$Multiselect$populateValues,
							model.tagModel,
							values,
							_Utils_ap(selected, loadedTags));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{item: item, tagModel: multiModel}),
							elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'SetSavedTitle':
				var title = msg.a;
				var newModel = A2(
					author$project$Page$SavedItemEdit$asToBeSavedIn,
					model,
					A2(author$project$Page$SavedItemEdit$setTitle, model.item, title));
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'SetSavedLink':
				var link = msg.a;
				var newModel = A2(
					author$project$Page$SavedItemEdit$asToBeSavedIn,
					model,
					A2(author$project$Page$SavedItemEdit$setLink, model.item, link));
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'SetDescription':
				var description = msg.a;
				var newModel = A2(
					author$project$Page$SavedItemEdit$asToBeSavedIn,
					model,
					A2(author$project$Page$SavedItemEdit$setDescription, model.item, description));
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'SetSavedItemType':
				var itemType = msg.a;
				var newModel = A2(
					author$project$Page$SavedItemEdit$asToBeSavedIn,
					model,
					A2(author$project$Page$SavedItemEdit$setType, model.item, itemType));
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'SetCreatedOn':
				var createdOn = msg.a;
				var newModel = A2(
					author$project$Page$SavedItemEdit$asToBeSavedIn,
					model,
					A2(author$project$Page$SavedItemEdit$setCreatedOn, model.item, createdOn));
				return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
			case 'SaveItem':
				var tags = A2(
					elm$core$List$map,
					function (_n5) {
						var k = _n5.a;
						var v = _n5.b;
						return v;
					},
					inkuzmin$elm_multiselect$Multiselect$getSelectedValues(model.tagModel));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							results: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					A3(author$project$Page$SavedItemEdit$saveItemCommand, user, model.item, tags));
			case 'SaveItemResult':
				var response = msg.a;
				var newEditModel = _Utils_update(
					model,
					{results: response});
				var navKey = author$project$Session$navKey(model.session);
				if (response.$ === 'WebResponse') {
					var wr = response.a;
					if (wr.$ === 'Success') {
						return _Utils_Tuple2(newEditModel, elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(newEditModel, elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(newEditModel, elm$core$Platform$Cmd$none);
				}
			default:
				var sub = msg.a;
				var _n8 = A2(inkuzmin$elm_multiselect$Multiselect$update, sub, model.tagModel);
				var subModel = _n8.a;
				var subCmd = _n8.b;
				var outMsg = _n8.c;
				var newModel = _Utils_update(
					model,
					{tagModel: subModel});
				var _n9 = function () {
					if (outMsg.$ === 'Just') {
						var m = outMsg.a;
						return A2(author$project$Page$SavedItemEdit$handleTag, m, newModel);
					} else {
						return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
					}
				}();
				var newerModel = _n9.a;
				var outCommands = _n9.b;
				return _Utils_Tuple2(
					newerModel,
					elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(elm$core$Platform$Cmd$map, author$project$Page$SavedItemEdit$Tags, subCmd),
								outCommands
							])));
		}
	});
var author$project$Page$SavedItemList$MarkReadResult = function (a) {
	return {$: 'MarkReadResult', a: a};
};
var author$project$Page$SavedItemList$markItemReadCommand = F2(
	function (user, id) {
		if (user.$ === 'Nothing') {
			return A2(
				elm$core$Platform$Cmd$map,
				A2(elm$core$Basics$always, author$project$Page$SavedItemList$MarkReadResult, author$project$RemoteDataHelpers$AuthError),
				elm$core$Platform$Cmd$none);
		} else {
			var loggedIn = user.a;
			return A2(
				elm$core$Platform$Cmd$map,
				author$project$Page$SavedItemList$MarkReadResult,
				A2(
					elm$core$Platform$Cmd$map,
					author$project$RemoteDataHelpers$WebResponse,
					krisajenkins$remotedata$RemoteData$sendRequest(
						A2(author$project$RemoteDataHelpers$makeEmptyPatchRequest, '/api/savedItems/read/' + id, loggedIn))));
		}
	});
var author$project$Page$SavedItemList$update = F2(
	function (msg, model) {
		var user = author$project$Session$toUser(model.session);
		switch (msg.$) {
			case 'ReceiveTags':
				var response = msg.a;
				if (response.$ === 'WebResponse') {
					var wr = response.a;
					if (wr.$ === 'Success') {
						var tags = wr.a;
						var filterTags = A2(
							elm$core$List$map,
							function (t) {
								return {isFilteredBy: false, name: t};
							},
							tags);
						var newModel = _Utils_update(
							model,
							{filterTags: filterTags});
						return _Utils_Tuple2(newModel, elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 'FetchSavedItems':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, model.showAll, model.filterTags));
			case 'ReceiveSavedItems':
				var response = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{savedItems: response}),
					elm$core$Platform$Cmd$none);
			case 'MarkRead':
				var id = msg.a;
				return _Utils_Tuple2(
					model,
					A2(author$project$Page$SavedItemList$markItemReadCommand, user, id));
			case 'MarkReadResult':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading)
						}),
					A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, model.showAll, model.filterTags));
			case 'ToggleShowAll':
				var newModel = _Utils_update(
					model,
					{
						savedItems: author$project$RemoteDataHelpers$WebResponse(krisajenkins$remotedata$RemoteData$Loading),
						showAll: !model.showAll
					});
				return _Utils_Tuple2(
					newModel,
					A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, newModel.showAll, model.filterTags));
			default:
				var value = msg.a;
				var tags = A2(
					elm$core$List$map,
					function (ft) {
						return _Utils_eq(ft.name, value) ? _Utils_update(
							ft,
							{isFilteredBy: !ft.isFilteredBy}) : ft;
					},
					model.filterTags);
				var newModel = _Utils_update(
					model,
					{filterTags: tags});
				return _Utils_Tuple2(
					newModel,
					A3(author$project$Page$SavedItemList$fetchSavedItemsCommand, user, newModel.showAll, newModel.filterTags));
		}
	});
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.protocol;
		if (_n0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model);
		_n0$11:
		while (true) {
			switch (_n0.a.$) {
				case 'Ignored':
					var _n1 = _n0.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				case 'ClickedLink':
					var urlRequest = _n0.a.a;
					if (urlRequest.$ === 'Internal') {
						var url = urlRequest.a;
						var _n3 = url.fragment;
						if (_n3.$ === 'Nothing') {
							return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
						} else {
							return _Utils_Tuple2(
								model,
								A2(
									elm$browser$Browser$Navigation$pushUrl,
									author$project$Session$navKey(
										author$project$Main$toSession(model)),
									elm$url$Url$toString(url)));
						}
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							model,
							elm$browser$Browser$Navigation$load(href));
					}
				case 'ChangedUrl':
					var url = _n0.a.a;
					return A2(
						author$project$Main$changeRouteTo,
						author$project$Route$fromUrl(url),
						model);
				case 'ChangedRoute':
					var route = _n0.a.a;
					return A2(author$project$Main$changeRouteTo, route, model);
				case 'GotReadLaterMsg':
					if (_n0.b.$ === 'ReadLater') {
						var subMsg = _n0.a.a;
						var readLater = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							author$project$Main$ReadLater,
							author$project$Main$GotReadLaterMsg,
							model,
							A2(author$project$Page$ReadLater$update, subMsg, readLater));
					} else {
						break _n0$11;
					}
				case 'GotFeedsMsg':
					if (_n0.b.$ === 'Feeds') {
						var subMsg = _n0.a.a;
						var feeds = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							author$project$Main$Feeds,
							author$project$Main$GotFeedsMsg,
							model,
							A2(author$project$Page$Feeds$update, subMsg, feeds));
					} else {
						break _n0$11;
					}
				case 'GotFeedItemsMsg':
					if (_n0.b.$ === 'FeedItems') {
						var subMsg = _n0.a.a;
						var feedItems = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							author$project$Main$FeedItems,
							author$project$Main$GotFeedItemsMsg,
							model,
							A2(author$project$Page$FeedItems$update, subMsg, feedItems));
					} else {
						break _n0$11;
					}
				case 'GotSavedListMsg':
					if (_n0.b.$ === 'SavedList') {
						var subMsg = _n0.a.a;
						var saved = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							author$project$Main$SavedList,
							author$project$Main$GotSavedListMsg,
							model,
							A2(author$project$Page$SavedItemList$update, subMsg, saved));
					} else {
						break _n0$11;
					}
				case 'GotSavedEditMsg':
					if (_n0.b.$ === 'SavedEdit') {
						var subMsg = _n0.a.a;
						var _n4 = _n0.b;
						var id = _n4.a;
						var saved = _n4.b;
						return A4(
							author$project$Main$updateWith,
							author$project$Main$SavedEdit(id),
							author$project$Main$GotSavedEditMsg,
							model,
							A2(author$project$Page$SavedItemEdit$update, subMsg, saved));
					} else {
						break _n0$11;
					}
				case 'GotSession':
					var session = _n0.a.a;
					return A2(author$project$Main$setSession, session, model);
				default:
					var _n5 = _n0.a.a;
					var session = _n5.a;
					var redirect = _n5.b;
					var cmd = function () {
						if (redirect.$ === 'Just') {
							var fragment = redirect.a;
							return A2(
								elm$browser$Browser$Navigation$pushUrl,
								author$project$Session$navKey(session),
								fragment);
						} else {
							return elm$core$Platform$Cmd$none;
						}
					}();
					var _n6 = A2(author$project$Main$setSession, session, model);
					var sm = _n6.a;
					var sc = _n6.b;
					return _Utils_Tuple2(
						sm,
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[sc, cmd])));
			}
		}
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Main$Ignored = {$: 'Ignored'};
var author$project$Page$FeedItems = {$: 'FeedItems'};
var author$project$Page$Feeds = {$: 'Feeds'};
var author$project$Page$Other = {$: 'Other'};
var author$project$Page$ReadLater = {$: 'ReadLater'};
var author$project$Page$SavedEdit = {$: 'SavedEdit'};
var author$project$Page$SavedList = {$: 'SavedList'};
var author$project$Page$SavedNew = {$: 'SavedNew'};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var author$project$Page$expansion = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			elm$html$Html$Attributes$class('flex-expand')
		]),
	_List_Nil);
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$li = _VirtualDom_node('li');
var author$project$Page$navLink = F2(
	function (attributes, content) {
		var classes = _List_fromArray(
			[
				elm$html$Html$Attributes$class('link f6 fw6')
			]);
		var _final = A2(elm$core$List$append, attributes, classes);
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('dib dim mr3')
				]),
			_List_fromArray(
				[
					A2(elm$html$Html$a, _final, content)
				]));
	});
var elm$html$Html$nav = _VirtualDom_node('nav');
var elm$html$Html$ul = _VirtualDom_node('ul');
var author$project$Page$viewNav = function (content) {
	return A2(
		elm$html$Html$nav,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('db w-100 w-auto-ns tr pointer')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('list pl0')
					]),
				content)
			]));
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Route$href = function (targetRoute) {
	return elm$html$Html$Attributes$href(
		author$project$Route$routeToString(targetRoute));
};
var elm$html$Html$img = _VirtualDom_node('img');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var author$project$Page$viewTitle = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			elm$html$Html$Attributes$class('mt2 f2')
		]),
	_List_fromArray(
		[
			A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('link'),
					author$project$Route$href(author$project$Route$ReadLater)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src('/listingBoat.svg'),
							elm$html$Html$Attributes$class('header-image')
						]),
					_List_Nil),
					elm$html$Html$text('Listings')
				]))
		]));
var author$project$Session$canInstall = function (session) {
	switch (session.$) {
		case 'LoggedIn':
			var status = session.c;
			return status;
		case 'Guest':
			var status = session.b;
			return status;
		default:
			var status = session.c;
			return status;
	}
};
var elm$html$Html$header = _VirtualDom_node('header');
var author$project$Page$viewHeader = F2(
	function (page, session) {
		var maybeViewer = author$project$Session$toUser(session);
		var canInstall = author$project$Session$canInstall(session);
		return A2(
			elm$html$Html$header,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('flex flex-row purple bg-light-blue bb b--black-20 ph1 ph5-ns')
				]),
			_List_fromArray(
				[
					author$project$Page$viewTitle,
					author$project$Page$expansion,
					author$project$Page$viewNav(
					A2(
						elm$core$List$filterMap,
						elm$core$Basics$identity,
						_List_fromArray(
							[
								function () {
								if (canInstall) {
									return elm$core$Maybe$Just(
										A2(
											author$project$Page$navLink,
											_List_fromArray(
												[
													author$project$Route$href(author$project$Route$Install)
												]),
											_List_fromArray(
												[
													elm$html$Html$text('Install')
												])));
								} else {
									return elm$core$Maybe$Nothing;
								}
							}(),
								function () {
								if (maybeViewer.$ === 'Just') {
									var user = maybeViewer.a;
									return elm$core$Maybe$Just(
										A2(
											author$project$Page$navLink,
											_List_fromArray(
												[
													author$project$Route$href(author$project$Route$LogOut)
												]),
											_List_fromArray(
												[
													elm$html$Html$text('Log Out')
												])));
								} else {
									return elm$core$Maybe$Just(
										A2(
											author$project$Page$navLink,
											_List_fromArray(
												[
													author$project$Route$href(author$project$Route$LogIn)
												]),
											_List_fromArray(
												[
													elm$html$Html$text('Log In')
												])));
								}
							}()
							])))
				]));
	});
var elm$html$Html$main_ = _VirtualDom_node('main');
var author$project$Page$view = F3(
	function (session, page, _n0) {
		var title = _n0.title;
		var content = _n0.content;
		return {
			body: _List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('avenir bg-light-green min-vh-100')
						]),
					_List_fromArray(
						[
							A2(author$project$Page$viewHeader, page, session),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									elm$html$Html$Attributes$class(' flex flex-column')
								]),
							_List_fromArray(
								[
									A2(
									elm$html$Html$main_,
									_List_fromArray(
										[
											elm$html$Html$Attributes$class('purple ph1 ph5-ns pv1 pv2-ns')
										]),
									_List_fromArray(
										[content])),
									author$project$Page$expansion
								]))
						]))
				]),
			title: title
		};
	});
var author$project$Page$Blank$view = {
	content: elm$html$Html$text(''),
	title: ''
};
var author$project$Loading$loading = A2(
	elm$html$Html$div,
	_List_Nil,
	_List_fromArray(
		[
			elm$html$Html$text('loading...')
		]));
var author$project$Page$FeedItems$SaveItem = function (a) {
	return {$: 'SaveItem', a: a};
};
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Page$FeedItems$viewItem = function (item) {
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('mv2 pa1 shadow-3 bg-washed-blue flex flex-rows flex-wrap')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('w-75 f7')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(item.feed)
					])),
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$href('#'),
						elm$html$Html$Events$onClick(
						author$project$Page$FeedItems$SaveItem(item)),
						elm$html$Html$Attributes$class('link dim w-25 tr dark-blue')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Save')
					])),
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$href(item.link),
						elm$html$Html$Attributes$class('link dim dark-blue'),
						elm$html$Html$Attributes$target('_blank'),
						elm$html$Html$Attributes$rel('noopener noreferrer')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(item.title)
					]))
			]));
};
var author$project$RemoteDataHelpers$createErrorMessage = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var message = error.a;
			return message;
		case 'Timeout':
			return 'Server took to long to respond.';
		case 'NetworkError':
			return 'Can\'t connect to the internet';
		case 'BadStatus':
			var response = error.a;
			return response.status.message;
		default:
			var message = error.a;
			var response = error.b;
			return message;
	}
};
var author$project$RemoteDataHelpers$handleResult = F2(
	function (result, handleResponse) {
		if (result.$ === 'AuthError') {
			return elm$html$Html$text('Not Authorized');
		} else {
			var response = result.a;
			return handleResponse(response);
		}
	});
var elm$html$Html$h3 = _VirtualDom_node('h3');
var author$project$RemoteDataHelpers$viewError = function (errorMessage) {
	var errorHeading = 'Couldn\'t fetch data at this time.';
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(errorHeading)
					])),
				elm$html$Html$text('Error: ' + errorMessage)
			]));
};
var author$project$Page$FeedItems$viewFeedItems = function (feedItemResults) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		feedItemResults,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return author$project$Loading$loading;
				case 'Success':
					var feedItems = r.a;
					return A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0 item-grid')
							]),
						A2(elm$core$List$map, author$project$Page$FeedItems$viewItem, feedItems));
				default:
					var error = r.a;
					return author$project$RemoteDataHelpers$viewError(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var elm$html$Html$h1 = _VirtualDom_node('h1');
var author$project$Page$FeedItems$viewHtml = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Items')
					])),
				A2(
				elm$html$Html$nav,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$Feeds),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Manage feeds')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$ReadLater),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('To Read')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$SavedList),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('All Saved')
											]))
									]))
							]))
					])),
				author$project$Page$FeedItems$viewFeedItems(model.feedItems)
			]));
};
var author$project$Page$FeedItems$view = function (model) {
	return {
		content: author$project$Page$FeedItems$viewHtml(model),
		title: 'Feed Items'
	};
};
var author$project$Page$Feeds$AddFeed = {$: 'AddFeed'};
var author$project$Page$Feeds$SetFeedUrl = function (a) {
	return {$: 'SetFeedUrl', a: a};
};
var author$project$Page$Feeds$viewAddFeedResult = function (result) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		result,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return elm$html$Html$text('');
				case 'Success':
					return elm$html$Html$text('');
				default:
					var error = r.a;
					return function (m) {
						return elm$html$Html$text(m);
					}(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var author$project$Page$Feeds$viewFeeds = function (feedResults) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		feedResults,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return author$project$Loading$loading;
				case 'Success':
					var feeds = r.a;
					return A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0')
							]),
						A2(
							elm$core$List$map,
							function (f) {
								return A2(
									elm$html$Html$li,
									_List_Nil,
									_List_fromArray(
										[
											elm$html$Html$text(f.title)
										]));
							},
							feeds));
				default:
					var error = r.a;
					return author$project$RemoteDataHelpers$viewError(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Page$Feeds$viewHtml = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Feeds')
					])),
				A2(
				elm$html$Html$nav,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$FeedItems),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Back to Items')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$ReadLater),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('To Read')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$SavedList),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('All Saved')
											]))
									]))
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('text'),
								elm$html$Html$Attributes$placeholder('https://rss-feed-url.here'),
								elm$html$Html$Attributes$value(model.newFeedUrl),
								elm$html$Html$Events$onInput(author$project$Page$Feeds$SetFeedUrl),
								elm$html$Html$Attributes$class('ba br1 mr2 b--black-20 pa1')
							]),
						_List_Nil),
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Page$Feeds$AddFeed),
								elm$html$Html$Attributes$class('dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Add Rss Feed')
							])),
						A2(
						elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								author$project$Page$Feeds$viewAddFeedResult(model.addFeedResult)
							]))
					])),
				author$project$Page$Feeds$viewFeeds(model.feeds)
			]));
};
var author$project$Page$Feeds$view = function (model) {
	return {
		content: author$project$Page$Feeds$viewHtml(model),
		title: 'Feeds'
	};
};
var author$project$Page$NotFound$view = {
	content: elm$html$Html$text(''),
	title: ''
};
var author$project$Page$ReadLater$MarkRead = function (a) {
	return {$: 'MarkRead', a: a};
};
var author$project$Page$ReadLater$viewTags = function (tags) {
	return A2(
		elm$core$List$map,
		function (t) {
			return A2(
				elm$html$Html$li,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('di ma1 pa1 ba b--black-10 bg-washed-blue')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(t)
					]));
		},
		tags);
};
var author$project$Page$ReadLater$viewSavedItem = function (item) {
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('mv2 pa1 shadow-3 bg-washed-blue')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$href(item.link),
						elm$html$Html$Attributes$class('dark-blue link dim truncate mw-70 dib'),
						elm$html$Html$Attributes$target('_blank'),
						elm$html$Html$Attributes$rel('noopener noreferrer')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(item.title)
					])),
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(
						author$project$Page$ReadLater$MarkRead(item.id)),
						elm$html$Html$Attributes$class('dark-blue link dim mh2 dib fr pointer')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('Mark Read')
					])),
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('list pl0 db mh2 flex flex-row')
					]),
				author$project$Page$ReadLater$viewTags(item.tags))
			]));
};
var author$project$Page$ReadLater$viewSavedItems = function (savedItemResults) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		savedItemResults,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return author$project$Loading$loading;
				case 'Success':
					var items = r.a;
					return A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0 item-grid')
							]),
						A2(elm$core$List$map, author$project$Page$ReadLater$viewSavedItem, items));
				default:
					var error = r.a;
					return author$project$RemoteDataHelpers$viewError(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var author$project$Page$ReadLater$viewHtml = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('To Read')
					])),
				A2(
				elm$html$Html$nav,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$FeedItems),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Feed Items')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$SavedList),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('All Saved')
											]))
									]))
							]))
					])),
				author$project$Page$ReadLater$viewSavedItems(model.savedItems)
			]));
};
var author$project$Page$ReadLater$view = function (model) {
	return {
		content: author$project$Page$ReadLater$viewHtml(model),
		title: 'To Read'
	};
};
var author$project$Page$SavedItemEdit$SaveItem = {$: 'SaveItem'};
var author$project$Page$SavedItemEdit$SetDescription = function (a) {
	return {$: 'SetDescription', a: a};
};
var author$project$Page$SavedItemEdit$SetSavedLink = function (a) {
	return {$: 'SetSavedLink', a: a};
};
var author$project$Page$SavedItemEdit$SetSavedTitle = function (a) {
	return {$: 'SetSavedTitle', a: a};
};
var author$project$Page$SavedItemEdit$SetSavedItemType = function (a) {
	return {$: 'SetSavedItemType', a: a};
};
var author$project$Page$SavedItemEdit$changeItemType = function (value) {
	var itemType = function () {
		switch (value) {
			case 'Reference':
				return author$project$SavedItem$Reference;
			case 'ToDo':
				return author$project$SavedItem$ToDo;
			default:
				return author$project$SavedItem$Reference;
		}
	}();
	return author$project$Page$SavedItemEdit$SetSavedItemType(itemType);
};
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$selected = elm$html$Html$Attributes$boolProperty('selected');
var author$project$Page$SavedItemEdit$optionAttributes = F3(
	function (key, selectedKey, attributes) {
		return _Utils_eq(selectedKey, key) ? _Utils_ap(
			attributes,
			_List_fromArray(
				[
					elm$html$Html$Attributes$selected(true)
				])) : attributes;
	});
var elm$html$Html$option = _VirtualDom_node('option');
var author$project$Page$SavedItemEdit$createOption = F2(
	function (key, selectedKey) {
		return A2(
			elm$html$Html$option,
			A3(
				author$project$Page$SavedItemEdit$optionAttributes,
				key,
				selectedKey,
				_List_fromArray(
					[
						elm$html$Html$Attributes$value(key)
					])),
			_List_fromArray(
				[
					elm$html$Html$text(key)
				]));
	});
var author$project$Page$SavedItemEdit$itemTypeToString = function (it) {
	if (it.$ === 'Reference') {
		return 'Reference';
	} else {
		return 'ToDo';
	}
};
var author$project$Page$SavedItemEdit$viewAddSavedItemResults = function (results) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		results,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return elm$html$Html$text('Saving...');
				case 'Success':
					return elm$html$Html$text('Saved!');
				default:
					var error = r.a;
					return function (m) {
						return elm$html$Html$text(m);
					}(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var elm$html$Html$label = _VirtualDom_node('label');
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var elm$html$Html$select = _VirtualDom_node('select');
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var elm$html$Html$Attributes$cols = function (n) {
	return A2(
		_VirtualDom_attribute,
		'cols',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		elm$core$String$fromInt(n));
};
var inkuzmin$elm_multiselect$Multiselect$ClickOnComponent = {$: 'ClickOnComponent'};
var inkuzmin$elm_multiselect$Multiselect$Focused = {$: 'Focused'};
var inkuzmin$elm_multiselect$Multiselect$Toggle = {$: 'Toggle'};
var inkuzmin$elm_multiselect$Multiselect$withOptions = F2(
	function (options, decoder) {
		return A2(
			elm$json$Json$Decode$map,
			function (m) {
				return {message: m, preventDefault: options.preventDefault, stopPropagation: options.stopPropagation};
			},
			decoder);
	});
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Events$custom = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var inkuzmin$elm_multiselect$Multiselect$onClickNoDefault = function (message) {
	var config = {preventDefault: true, stopPropagation: true};
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$custom,
		'click',
		A2(
			inkuzmin$elm_multiselect$Multiselect$withOptions,
			config,
			elm$json$Json$Decode$succeed(message)));
};
var rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var rtfeldman$elm_css$Css$batch = rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2(rtfeldman$elm_css$Css$property, key, arg.value);
	});
var rtfeldman$elm_css$Css$borderBottomWidth = rtfeldman$elm_css$Css$prop1('border-bottom-width');
var rtfeldman$elm_css$Css$borderColor3 = F3(
	function (c1, c2, c3) {
		var value = A2(
			elm$core$String$join,
			' ',
			_List_fromArray(
				[c1.value, c2.value, c3.value]));
		return A2(rtfeldman$elm_css$Css$property, 'border-color', value);
	});
var rtfeldman$elm_css$Css$borderLeftWidth = rtfeldman$elm_css$Css$prop1('border-left-width');
var rtfeldman$elm_css$Css$borderRightWidth = rtfeldman$elm_css$Css$prop1('border-right-width');
var rtfeldman$elm_css$Css$borderStyle = rtfeldman$elm_css$Css$prop1('border-style');
var rtfeldman$elm_css$Css$borderTopWidth = rtfeldman$elm_css$Css$prop1('border-top-width');
var rtfeldman$elm_css$Css$display = rtfeldman$elm_css$Css$prop1('display');
var rtfeldman$elm_css$Css$height = rtfeldman$elm_css$Css$prop1('height');
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm$core$String$cons = _String_cons;
var rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(
		elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var elm$core$String$fromList = _String_fromList;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$pow = _Basics_pow;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2(elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return elm$core$Result$Err(
							elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var rtfeldman$elm_hex$Hex$fromString = function (str) {
	if (elm$core$String$isEmpty(str)) {
		return elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2(elm$core$String$startsWith, '-', str)) {
				var list = A2(
					elm$core$Maybe$withDefault,
					_List_Nil,
					elm$core$List$tail(
						elm$core$String$toList(str)));
				return A2(
					elm$core$Result$map,
					elm$core$Basics$negate,
					A3(
						rtfeldman$elm_hex$Hex$fromStringHelp,
						elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					rtfeldman$elm_hex$Hex$fromStringHelp,
					elm$core$String$length(str) - 1,
					elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2(elm$core$Result$mapError, formatError, result);
	}
};
var rtfeldman$elm_css$Css$validHex = F5(
	function (str, _n0, _n1, _n2, _n3) {
		var r1 = _n0.a;
		var r2 = _n0.b;
		var g1 = _n1.a;
		var g2 = _n1.b;
		var b1 = _n2.a;
		var b2 = _n2.b;
		var a1 = _n3.a;
		var a2 = _n3.b;
		var toResult = A2(
			elm$core$Basics$composeR,
			elm$core$String$fromList,
			A2(elm$core$Basics$composeR, elm$core$String$toLower, rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2(elm$core$String$startsWith, '#', str) ? A2(elm$core$String$dropLeft, 1, str) : str;
	var _n0 = elm$core$String$toList(withoutHash);
	_n0$4:
	while (true) {
		if ((_n0.b && _n0.b.b) && _n0.b.b.b) {
			if (!_n0.b.b.b.b) {
				var r = _n0.a;
				var _n1 = _n0.b;
				var g = _n1.a;
				var _n2 = _n1.b;
				var b = _n2.a;
				return A5(
					rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_n0.b.b.b.b.b) {
					var r = _n0.a;
					var _n3 = _n0.b;
					var g = _n3.a;
					var _n4 = _n3.b;
					var b = _n4.a;
					var _n5 = _n4.b;
					var a = _n5.a;
					return A5(
						rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_n0.b.b.b.b.b.b) {
						if (!_n0.b.b.b.b.b.b.b) {
							var r1 = _n0.a;
							var _n6 = _n0.b;
							var r2 = _n6.a;
							var _n7 = _n6.b;
							var g1 = _n7.a;
							var _n8 = _n7.b;
							var g2 = _n8.a;
							var _n9 = _n8.b;
							var b1 = _n9.a;
							var _n10 = _n9.b;
							var b2 = _n10.a;
							return A5(
								rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_n0.b.b.b.b.b.b.b.b && (!_n0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _n0.a;
								var _n11 = _n0.b;
								var r2 = _n11.a;
								var _n12 = _n11.b;
								var g1 = _n12.a;
								var _n13 = _n12.b;
								var g2 = _n13.a;
								var _n14 = _n13.b;
								var b1 = _n14.a;
								var _n15 = _n14.b;
								var b2 = _n15.a;
								var _n16 = _n15.b;
								var a1 = _n16.a;
								var _n17 = _n16.b;
								var a2 = _n17.a;
								return A5(
									rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _n0$4;
							}
						}
					} else {
						break _n0$4;
					}
				}
			}
		} else {
			break _n0$4;
		}
	}
	return rtfeldman$elm_css$Css$erroneousHex(str);
};
var rtfeldman$elm_css$Css$inlineBlock = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline-block'};
var rtfeldman$elm_css$Css$position = rtfeldman$elm_css$Css$prop1('position');
var rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var elm$core$String$fromFloat = _String_fromNumber;
var rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: rtfeldman$elm_css$Css$Structure$Compatible,
			calc: rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: rtfeldman$elm_css$Css$Structure$Compatible,
			length: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var rtfeldman$elm_css$Css$px = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PxUnits, 'px');
var rtfeldman$elm_css$Css$relative = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var rtfeldman$elm_css$Css$solid = {borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var rtfeldman$elm_css$Css$transparent = {color: rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var rtfeldman$elm_css$Css$width = rtfeldman$elm_css$Css$prop1('width');
var rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var rtfeldman$elm_css$Css$zero = {length: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible, number: rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: rtfeldman$elm_css$Css$UnitlessInteger, value: '0'};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$arrow = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$borderColor3,
			rtfeldman$elm_css$Css$hex('#999'),
			rtfeldman$elm_css$Css$transparent,
			rtfeldman$elm_css$Css$transparent),
			rtfeldman$elm_css$Css$borderStyle(rtfeldman$elm_css$Css$solid),
			rtfeldman$elm_css$Css$borderTopWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$borderLeftWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$borderRightWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$borderBottomWidth(
			rtfeldman$elm_css$Css$px(2.5)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$height(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$width(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative)
		]));
var rtfeldman$elm_css$Css$top = rtfeldman$elm_css$Css$prop1('top');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$arrowUpside = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$borderColor3,
			rtfeldman$elm_css$Css$transparent,
			rtfeldman$elm_css$Css$transparent,
			rtfeldman$elm_css$Css$hex('#999')),
			rtfeldman$elm_css$Css$borderStyle(rtfeldman$elm_css$Css$solid),
			rtfeldman$elm_css$Css$borderTopWidth(
			rtfeldman$elm_css$Css$px(2.5)),
			rtfeldman$elm_css$Css$borderLeftWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$borderRightWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$borderBottomWidth(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$height(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$width(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(-2.5))
		]));
var rtfeldman$elm_css$Css$center = rtfeldman$elm_css$Css$prop1('center');
var rtfeldman$elm_css$Css$cursor = rtfeldman$elm_css$Css$prop1('cursor');
var rtfeldman$elm_css$Css$middle = rtfeldman$elm_css$Css$prop1('middle');
var rtfeldman$elm_css$Css$paddingRight = rtfeldman$elm_css$Css$prop1('padding-right');
var rtfeldman$elm_css$Css$pointer = {cursor: rtfeldman$elm_css$Css$Structure$Compatible, value: 'pointer'};
var rtfeldman$elm_css$Css$tableCell = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'table-cell'};
var rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a;
					var key = A2(
						elm$core$Maybe$withDefault,
						'',
						elm$core$List$head(
							A2(elm$core$String$split, ':', str)));
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _n1 = style.a;
							var only = _n1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _n2 = style.a;
							var first = _n2.a;
							var rest = _n2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$verticalAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'verticalAlign',
		'vertical-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$arrowWrap = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$tableCell),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
			rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle),
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$px(25)),
			rtfeldman$elm_css$Css$paddingRight(
			rtfeldman$elm_css$Css$px(5))
		]));
var rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$Node;
var rtfeldman$elm_css$Html$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$node;
var rtfeldman$elm_css$Html$Styled$div = rtfeldman$elm_css$Html$Styled$node('div');
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var Skinney$murmur3$Murmur3$c1 = 3432918353;
var Skinney$murmur3$Murmur3$c2 = 461845907;
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var Skinney$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var elm$core$Bitwise$or = _Bitwise_or;
var Skinney$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var elm$core$Bitwise$xor = _Bitwise_xor;
var Skinney$murmur3$Murmur3$finalize = function (data) {
	var acc = data.hash ? (data.seed ^ A2(
		Skinney$murmur3$Murmur3$multiplyBy,
		Skinney$murmur3$Murmur3$c2,
		A2(
			Skinney$murmur3$Murmur3$rotlBy,
			15,
			A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2(Skinney$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2(Skinney$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var Skinney$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			Skinney$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				Skinney$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					Skinney$murmur3$Murmur3$multiplyBy,
					Skinney$murmur3$Murmur3$c2,
					A2(
						Skinney$murmur3$Murmur3$rotlBy,
						15,
						A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & elm$core$Char$toCode(c)) << data.shift);
		var _n0 = data.shift;
		if (_n0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2(Skinney$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var elm$core$String$foldl = _String_foldl;
var Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return Skinney$murmur3$Murmur3$finalize(
			A3(
				elm$core$String$foldl,
				Skinney$murmur3$Murmur3$hashFold,
				A4(Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_n0) {
	var declarations = _n0.a;
	return declarations;
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _n1 = declarations.a.a;
				var firstSelector = _n1.a;
				var otherSelectors = _n1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2(elm$core$List$cons, firstSelector, otherSelectors),
					rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		return A3(
			rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2(rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _n1 = declarations.a;
						var mediaQueries = _n1.a;
						var styleBlocks = _n1.b;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									rtfeldman$elm_css$Css$Structure$mapLast,
									rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2(elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _n0) {
		var sequence = _n0.a;
		var selectors = _n0.b;
		return A3(
			rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			elm$core$Maybe$Just(pseudo));
	});
var rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _n1 = list.a;
				var combinator = _n1.a;
				var sequence = _n1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_n0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _n1 = declarations.a;
									var mediaQueries = _n1.a;
									var _n2 = _n1.b;
									var styleBlock = _n2.a;
									return _List_fromArray(
										[
											A2(
											rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _n3 = declarations.a;
									var mediaQueries = _n3.a;
									var _n4 = _n3.b;
									var first = _n4.a;
									var rest = _n4.b;
									var _n5 = A2(
										rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2(rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_n5.b && (_n5.a.$ === 'MediaRule')) && (!_n5.b.b)) {
										var _n6 = _n5.a;
										var newMediaQueries = _n6.a;
										var newStyleBlocks = _n6.b;
										return _List_fromArray(
											[
												A2(
												rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2(elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _n5;
										return newDeclarations;
									}
								}
							} else {
								break _n0$12;
							}
						case 'SupportsRule':
							var _n7 = declarations.a;
							var str = _n7.a;
							var nestedDeclarations = _n7.b;
							return _List_fromArray(
								[
									A2(
									rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _n8 = declarations.a;
							var str1 = _n8.a;
							var str2 = _n8.b;
							var str3 = _n8.c;
							var str4 = _n8.d;
							var styleBlock = _n8.e;
							return A2(
								elm$core$List$map,
								A4(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _n9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _n0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			elm$core$List$cons,
			first,
			A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Hash$murmurSeed = 15739;
var elm$core$Basics$modBy = _Basics_modBy;
var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2(elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var rtfeldman$elm_hex$Hex$toString = function (num) {
	return elm$core$String$fromList(
		(num < 0) ? A2(
			elm$core$List$cons,
			_Utils_chr('-'),
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		elm$core$String$cons,
		_Utils_chr('_'),
		rtfeldman$elm_hex$Hex$toString(
			A2(Skinney$murmur3$Murmur3$hashString, rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				elm$core$List$tail(decls));
		};
		var nextResult = A2(
			rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _n14 = _Utils_Tuple2(
				elm$core$List$head(nextResult),
				rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_n14.a.$ === 'Just') && (_n14.b.$ === 'Just')) {
				var nextResultParent = _n14.a.a;
				var originalParent = _n14.b.a;
				return _Utils_ap(
					A2(
						elm$core$List$take,
						elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return elm$core$List$concat(
				A2(
					rtfeldman$elm_css$Css$Structure$mapLast,
					rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						elm$core$List$map,
						elm$core$List$singleton,
						A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				insertStylesToNestedDecl,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _n4 = styles.a;
					var selector = _n4.a;
					var nestedStyles = _n4.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _n5 = styles.a;
					var selectorCombinator = _n5.a;
					var snippets = _n5.b;
					var rest = styles.b;
					var chain = F2(
						function (_n9, _n10) {
							var originalSequence = _n9.a;
							var originalTuples = _n9.b;
							var originalPseudoElement = _n9.c;
							var newSequence = _n10.a;
							var newTuples = _n10.b;
							var newPseudoElement = _n10.c;
							return A3(
								rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _n7 = declaration.a;
								var firstSelector = _n7.a;
								var otherSelectors = _n7.b;
								var nestedStyles = _n7.c;
								var newSelectors = A2(
									elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											elm$core$List$map,
											chain(originalSelector),
											A2(elm$core$List$cons, firstSelector, otherSelectors));
									},
									rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									elm$core$List$map,
									A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								elm$core$List$map,
								expandDeclaration,
								A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _n11 = styles.a;
					var pseudoElement = _n11.a;
					var nestedStyles = _n11.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _n12 = styles.a;
					var mediaQueries = _n12.a;
					var nestedStyles = _n12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _n13 = rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_n13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _n13.a;
							var otherSelectors = _n13.b;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									elm$core$List$singleton(
										rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_n2) {
	var firstSelector = _n2.a;
	var otherSelectors = _n2.b;
	var styles = _n2.c;
	return A2(
		rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2(elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2(rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				elm$core$List$map,
				A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var snippets = _n0.snippets;
	var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _n0) {
		var keyframesByName = _n0.a;
		var declarations = _n0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _n2 = declaration.a;
				var properties = _n2.c;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					elm$core$List$all,
					function (_n3) {
						var properties = _n3.c;
						return elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3(elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					elm$core$List$all,
					function (_n4) {
						var properties = _n4.b;
						return elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
		}
	});
var rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			elm$core$List$append,
			A2(
				elm$core$List$map,
				function (_n0) {
					var name = _n0.a;
					var decl = _n0.b;
					return rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var declarations = _n0.declarations;
	var _n1 = A3(
		elm$core$List$foldr,
		rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2(elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _n1.a;
	var compactedDeclarations = _n1.b;
	var finalDeclarations = A2(rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				elm$core$String$join,
				' and ',
				A2(
					elm$core$List$cons,
					rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				elm$core$String$join,
				' and ',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + (rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var rtfeldman$elm_css$Css$Structure$Output$importToString = function (_n0) {
	var name = _n0.a;
	var mediaQueries = _n0.b;
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_n0) {
	var prefix = _n0.a;
	var str = _n0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap(rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			A2(elm$core$Basics$composeL, rtfeldman$elm_css$Css$Structure$Output$indent, rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var elm$core$String$append = _String_append;
var rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_n0) {
	var str = _n0.a;
	return '::' + str;
};
var rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				elm$core$String$join,
				'',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_n0) {
	var combinator = _n0.a;
	var sequence = _n0.b;
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_n0) {
	var simpleSelectorSequence = _n0.a;
	var chain = _n0.b;
	var pseudoElement = _n0.c;
	var segments = A2(
		elm$core$List$cons,
		rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				elm$core$Maybe$withDefault,
				'',
				A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		elm$core$String$append,
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$filter,
				A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		var selectorStr = A2(
			elm$core$String$join,
			', ',
			A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2(elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2(rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				elm$core$String$join,
				',\n',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				elm$core$String$join,
				'\n\n',
				A2(
					elm$core$List$map,
					A2(
						elm$core$Basics$composeL,
						rtfeldman$elm_css$Css$Structure$Output$indent,
						rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_n0) {
	var charset = _n0.charset;
	var imports = _n0.imports;
	var namespaces = _n0.namespaces;
	var declarations = _n0.declarations;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(
			elm$core$List$filter,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					elm$core$String$join,
					'\n\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		rtfeldman$elm_css$Css$Structure$compactStylesheet(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		elm$core$String$cons,
		_Utils_chr('_'),
		rtfeldman$elm_hex$Hex$toString(
			A2(
				Skinney$murmur3$Murmur3$hashString,
				rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					elm$core$List$singleton(
						rtfeldman$elm_css$Css$Preprocess$stylesheet(
							elm$core$List$singleton(
								A2(
									rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(classname));
	return A3(rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var rtfeldman$elm_css$Html$Styled$Attributes$css = rtfeldman$elm_css$Html$Styled$Internal$css;
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$attribute, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$rel = rtfeldman$elm_css$VirtualDom$Styled$attribute('rel');
var inkuzmin$elm_multiselect$Multiselect$arrow = function (_n0) {
	var model = _n0.a;
	var arrowRel = _Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Opened) ? 'arrowUpside' : 'arrow';
	var arrowCss = _Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Opened) ? _List_fromArray(
		[inkuzmin$elm_multiselect$Multiselect$SelectCss$arrowUpside]) : _List_fromArray(
		[inkuzmin$elm_multiselect$Multiselect$SelectCss$arrow]);
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[inkuzmin$elm_multiselect$Multiselect$SelectCss$arrowWrap])),
				inkuzmin$elm_multiselect$Multiselect$onClickNoDefault(inkuzmin$elm_multiselect$Multiselect$Toggle)
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(arrowCss),
						rtfeldman$elm_css$Html$Styled$Attributes$rel(arrowRel)
					]),
				_List_Nil)
			]));
};
var inkuzmin$elm_multiselect$Multiselect$Clear = {$: 'Clear'};
var rtfeldman$elm_css$Css$fontSize = rtfeldman$elm_css$Css$prop1('font-size');
var rtfeldman$elm_css$Css$lineHeight = rtfeldman$elm_css$Css$prop1('line-height');
var rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
		number: rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: rtfeldman$elm_css$Css$UnitlessFloat,
		value: elm$core$String$fromFloat(val)
	};
};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$clear = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$fontSize(
			rtfeldman$elm_css$Css$px(18)),
			rtfeldman$elm_css$Css$lineHeight(
			rtfeldman$elm_css$Css$num(1))
		]));
var rtfeldman$elm_css$Css$color = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'color', c.value);
};
var rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var rtfeldman$elm_css$Css$hover = rtfeldman$elm_css$Css$pseudoClass('hover');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$clearWrap = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$px(17)),
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('#999')),
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$tableCell),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
			rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle),
			rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$color(
					rtfeldman$elm_css$Css$hex('#D0021B'))
				]))
		]));
var rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		elm$virtual_dom$VirtualDom$text(str));
};
var rtfeldman$elm_css$Html$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
var inkuzmin$elm_multiselect$Multiselect$clear = function (_n0) {
	var model = _n0.a;
	return (!elm$core$List$isEmpty(model.selected)) ? A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[inkuzmin$elm_multiselect$Multiselect$SelectCss$clearWrap])),
				inkuzmin$elm_multiselect$Multiselect$onClickNoDefault(inkuzmin$elm_multiselect$Multiselect$Clear)
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[inkuzmin$elm_multiselect$Multiselect$SelectCss$clear]))
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('×')
					]))
			])) : A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
};
var inkuzmin$elm_multiselect$Multiselect$Adjust = function (a) {
	return {$: 'Adjust', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$Filter = function (a) {
	return {$: 'Filter', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$Shortcut = function (a) {
	return {$: 'Shortcut', a: a};
};
var elm$json$Json$Decode$float = _Json_decodeFloat;
var debois$elm_dom$DOM$offsetWidth = A2(elm$json$Json$Decode$field, 'offsetWidth', elm$json$Json$Decode$float);
var debois$elm_dom$DOM$previousSibling = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'previousSibling', decoder);
};
var debois$elm_dom$DOM$target = function (decoder) {
	return A2(elm$json$Json$Decode$field, 'target', decoder);
};
var rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var inkuzmin$elm_multiselect$Multiselect$onKeyDown = function (tagger) {
	var domF = debois$elm_dom$DOM$target(
		debois$elm_dom$DOM$previousSibling(debois$elm_dom$DOM$offsetWidth));
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'keypress',
		A2(elm$json$Json$Decode$map, tagger, domF));
};
var rtfeldman$elm_css$Html$Styled$Events$keyCode = A2(elm$json$Json$Decode$field, 'keyCode', elm$json$Json$Decode$int);
var inkuzmin$elm_multiselect$Multiselect$onKeyPress = function (tagger) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'keydown',
		A2(elm$json$Json$Decode$map, tagger, rtfeldman$elm_css$Html$Styled$Events$keyCode));
};
var rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var inkuzmin$elm_multiselect$Multiselect$onKeyUp = function (tagger) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'keyup',
		A2(elm$json$Json$Decode$map, tagger, rtfeldman$elm_css$Html$Styled$Events$targetValue));
};
var inkuzmin$elm_multiselect$Multiselect$Start = {$: 'Start'};
var inkuzmin$elm_multiselect$Multiselect$fromResult = function (result) {
	if (result.$ === 'Ok') {
		var successValue = result.a;
		return elm$json$Json$Decode$succeed(successValue);
	} else {
		var errorMessage = result.a;
		return elm$json$Json$Decode$fail(errorMessage);
	}
};
var inkuzmin$elm_multiselect$Multiselect$preventDefaultButtons = function () {
	var options = {preventDefault: true, stopPropagation: false};
	var filterKey = function (code) {
		return (_Utils_eq(code, inkuzmin$elm_multiselect$Multiselect$Keycodes$upArrow) || _Utils_eq(code, inkuzmin$elm_multiselect$Multiselect$Keycodes$downArrow)) ? elm$core$Result$Ok(code) : elm$core$Result$Err('ignored input');
	};
	var decoder = A2(
		elm$json$Json$Decode$map,
		elm$core$Basics$always(inkuzmin$elm_multiselect$Multiselect$Start),
		A2(
			elm$json$Json$Decode$andThen,
			A2(elm$core$Basics$composeR, filterKey, inkuzmin$elm_multiselect$Multiselect$fromResult),
			rtfeldman$elm_css$Html$Styled$Events$keyCode));
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$custom,
		'keydown',
		A2(inkuzmin$elm_multiselect$Multiselect$withOptions, options, decoder));
}();
var rtfeldman$elm_css$Css$border = rtfeldman$elm_css$Css$prop1('border');
var rtfeldman$elm_css$Css$initial = {alignItems: rtfeldman$elm_css$Css$Structure$Compatible, all: rtfeldman$elm_css$Css$Structure$Compatible, backgroundAttachment: rtfeldman$elm_css$Css$Structure$Compatible, backgroundBlendMode: rtfeldman$elm_css$Css$Structure$Compatible, backgroundImage: rtfeldman$elm_css$Css$Structure$Compatible, backgroundOrigin: rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeat: rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeatShorthand: rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: rtfeldman$elm_css$Css$Structure$Compatible, color: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, display: rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: rtfeldman$elm_css$Css$Structure$Compatible, flexDirection: rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: rtfeldman$elm_css$Css$Structure$Compatible, fontFamily: rtfeldman$elm_css$Css$Structure$Compatible, fontSize: rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: rtfeldman$elm_css$Css$Structure$Compatible, fontVariant: rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, justifyContent: rtfeldman$elm_css$Css$Structure$Compatible, keyframes: rtfeldman$elm_css$Css$Structure$Compatible, length: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, listStylePosition: rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: rtfeldman$elm_css$Css$Structure$Compatible, none: rtfeldman$elm_css$Css$Structure$Compatible, number: rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: rtfeldman$elm_css$Css$Structure$Compatible, textIndent: rtfeldman$elm_css$Css$Structure$Compatible, textRendering: rtfeldman$elm_css$Css$Structure$Compatible, textTransform: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: rtfeldman$elm_css$Css$Internal$IncompatibleUnits, value: 'initial', visibility: rtfeldman$elm_css$Css$Structure$Compatible, whiteSpace: rtfeldman$elm_css$Css$Structure$Compatible};
var rtfeldman$elm_css$Css$inherit = _Utils_update(
	rtfeldman$elm_css$Css$initial,
	{value: 'inherit'});
var rtfeldman$elm_css$Css$int = function (val) {
	return {
		fontWeight: rtfeldman$elm_css$Css$Structure$Compatible,
		intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
		number: rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: rtfeldman$elm_css$Css$UnitlessInteger,
		value: elm$core$String$fromInt(val)
	};
};
var rtfeldman$elm_css$Css$none = {backgroundImage: rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, display: rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, keyframes: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: rtfeldman$elm_css$Css$Structure$Compatible, none: rtfeldman$elm_css$Css$Structure$Compatible, outline: rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, resize: rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: rtfeldman$elm_css$Css$Structure$Compatible, textTransform: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, transform: rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var rtfeldman$elm_css$Css$outlineStyle = rtfeldman$elm_css$Css$prop1('outline-style');
var rtfeldman$elm_css$Css$padding = rtfeldman$elm_css$Css$prop1('padding');
var rtfeldman$elm_css$Css$paddingTop = rtfeldman$elm_css$Css$prop1('padding-top');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$input = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$borderStyle(rtfeldman$elm_css$Css$none),
			rtfeldman$elm_css$Css$border(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$lineHeight(
			rtfeldman$elm_css$Css$px(14)),
			rtfeldman$elm_css$Css$outlineStyle(rtfeldman$elm_css$Css$none),
			rtfeldman$elm_css$Css$fontSize(rtfeldman$elm_css$Css$inherit),
			rtfeldman$elm_css$Css$lineHeight(
			rtfeldman$elm_css$Css$int(1)),
			rtfeldman$elm_css$Css$padding(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$paddingTop(
			rtfeldman$elm_css$Css$px(8))
		]));
var rtfeldman$elm_css$Css$absolute = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var rtfeldman$elm_css$Css$fontStyle = rtfeldman$elm_css$Css$prop1('font-style');
var rtfeldman$elm_css$Css$fontWeight = function (_n0) {
	var value = _n0.value;
	return A2(rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var rtfeldman$elm_css$Css$left = rtfeldman$elm_css$Css$prop1('left');
var rtfeldman$elm_css$Css$normal = {featureTagValue: rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: rtfeldman$elm_css$Css$Structure$Compatible, overflowWrap: rtfeldman$elm_css$Css$Structure$Compatible, value: 'normal', whiteSpace: rtfeldman$elm_css$Css$Structure$Compatible};
var rtfeldman$elm_css$Css$overflow = rtfeldman$elm_css$Css$prop1('overflow');
var rtfeldman$elm_css$Css$scroll = {backgroundAttachment: rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, scroll: rtfeldman$elm_css$Css$Structure$Compatible, value: 'scroll'};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$inputMirrow = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$top(
			rtfeldman$elm_css$Css$px(-100)),
			rtfeldman$elm_css$Css$left(
			rtfeldman$elm_css$Css$px(-100)),
			rtfeldman$elm_css$Css$height(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$overflow(rtfeldman$elm_css$Css$scroll),
			rtfeldman$elm_css$Css$fontWeight(rtfeldman$elm_css$Css$normal),
			rtfeldman$elm_css$Css$fontStyle(rtfeldman$elm_css$Css$normal),
			rtfeldman$elm_css$Css$fontSize(rtfeldman$elm_css$Css$inherit),
			rtfeldman$elm_css$Css$lineHeight(
			rtfeldman$elm_css$Css$int(1))
		]));
var rtfeldman$elm_css$Css$marginLeft = rtfeldman$elm_css$Css$prop1('margin-left');
var rtfeldman$elm_css$Css$paddingBottom = rtfeldman$elm_css$Css$prop1('padding-bottom');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$inputWrap = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$padding(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle),
			rtfeldman$elm_css$Css$paddingBottom(
			rtfeldman$elm_css$Css$px(8))
		]));
var rtfeldman$elm_css$Html$Styled$input = rtfeldman$elm_css$Html$Styled$node('input');
var rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			elm$json$Json$Encode$string(string));
	});
var rtfeldman$elm_css$Html$Styled$Attributes$id = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var rtfeldman$elm_css$Html$Styled$Attributes$property = rtfeldman$elm_css$VirtualDom$Styled$property;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var rtfeldman$elm_css$VirtualDom$Styled$style = F2(
	function (key, val) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$style, key, val),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$style = rtfeldman$elm_css$VirtualDom$Styled$style;
var inkuzmin$elm_multiselect$Multiselect$input = function (_n0) {
	var model = _n0.a;
	var w = elm$core$String$fromFloat(model.inputWidth + 23.0);
	var value = _Utils_eq(model.input, inkuzmin$elm_multiselect$Multiselect$Utils$invisibleCharacter) ? A2(
		rtfeldman$elm_css$Html$Styled$Attributes$property,
		'value',
		elm$json$Json$Encode$string(model.input)) : A2(
		rtfeldman$elm_css$Html$Styled$Attributes$property,
		'type',
		elm$json$Json$Encode$string('text'));
	var inputStyle = A2(rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', w + 'px');
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				inkuzmin$elm_multiselect$Multiselect$preventDefaultButtons,
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[inkuzmin$elm_multiselect$Multiselect$SelectCss$inputWrap]))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[inkuzmin$elm_multiselect$Multiselect$SelectCss$inputMirrow]))
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(model.input)
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$input,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$id('multiselectInput' + model.tag),
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[inkuzmin$elm_multiselect$Multiselect$SelectCss$input])),
						inkuzmin$elm_multiselect$Multiselect$onKeyDown(inkuzmin$elm_multiselect$Multiselect$Adjust),
						inkuzmin$elm_multiselect$Multiselect$onKeyPress(inkuzmin$elm_multiselect$Multiselect$Shortcut),
						inkuzmin$elm_multiselect$Multiselect$onKeyUp(inkuzmin$elm_multiselect$Multiselect$Filter),
						inputStyle,
						value
					]),
				_List_Nil)
			]));
};
var inkuzmin$elm_multiselect$Multiselect$OnHover = function (a) {
	return {$: 'OnHover', a: a};
};
var inkuzmin$elm_multiselect$Multiselect$OnSelect = function (a) {
	return {$: 'OnSelect', a: a};
};
var rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value])));
	});
var rtfeldman$elm_css$Css$border3 = rtfeldman$elm_css$Css$prop3('border');
var rtfeldman$elm_css$Css$borderBottomLeftRadius = rtfeldman$elm_css$Css$prop1('border-bottom-left-radius');
var rtfeldman$elm_css$Css$borderBottomRightRadius = rtfeldman$elm_css$Css$prop1('border-bottom-right-radius');
var rtfeldman$elm_css$Css$borderTopColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'border-top-color', c.value);
};
var rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value, argD.value])));
	});
var rtfeldman$elm_css$Css$boxShadow4 = rtfeldman$elm_css$Css$prop4('box-shadow');
var rtfeldman$elm_css$Css$marginTop = rtfeldman$elm_css$Css$prop1('margin-top');
var rtfeldman$elm_css$Css$maxHeight = rtfeldman$elm_css$Css$prop1('max-height');
var rtfeldman$elm_css$Css$overflowY = rtfeldman$elm_css$Css$prop1('overflow-y');
var rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var rtfeldman$elm_css$Css$pct = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PercentageUnits, '%');
var rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2(elm$core$String$join, ', ', args) + ')'));
	});
var rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			alpha: alpha,
			blue: b,
			color: rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						elm$core$List$map,
						elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							elm$core$String$fromFloat(alpha)
						])))
		};
	});
var rtfeldman$elm_css$Css$zIndex = rtfeldman$elm_css$Css$prop1('z-index');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$menu = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$borderBottomRightRadius(
			rtfeldman$elm_css$Css$px(4)),
			rtfeldman$elm_css$Css$borderBottomLeftRadius(
			rtfeldman$elm_css$Css$px(4)),
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('#fff')),
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('#ccc')),
			rtfeldman$elm_css$Css$borderTopColor(
			rtfeldman$elm_css$Css$hex('#e6e6e6')),
			A4(
			rtfeldman$elm_css$Css$boxShadow4,
			rtfeldman$elm_css$Css$zero,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$zero,
			A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 6.0e-2)),
			rtfeldman$elm_css$Css$marginTop(
			rtfeldman$elm_css$Css$px(-1)),
			rtfeldman$elm_css$Css$maxHeight(
			rtfeldman$elm_css$Css$px(inkuzmin$elm_multiselect$Multiselect$SelectCss$menuHeight)),
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$pct(100)),
			rtfeldman$elm_css$Css$zIndex(
			rtfeldman$elm_css$Css$int(1)),
			rtfeldman$elm_css$Css$overflowY(rtfeldman$elm_css$Css$scroll)
		]));
var rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var rtfeldman$elm_css$Css$padding2 = rtfeldman$elm_css$Css$prop2('padding');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$menuItem = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('#666')),
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(8),
			rtfeldman$elm_css$Css$px(10)),
			rtfeldman$elm_css$Css$maxHeight(
			rtfeldman$elm_css$Css$px(inkuzmin$elm_multiselect$Multiselect$SelectCss$itemHeight))
		]));
var inkuzmin$elm_multiselect$Multiselect$SelectCss$menuItemHovered = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$backgroundColor(
			A4(rtfeldman$elm_css$Css$rgba, 0, 126, 255, 8.0e-2)),
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('#333'))
		]));
var inkuzmin$elm_multiselect$Multiselect$Utils$fst = elm$core$Tuple$first;
var rtfeldman$elm_css$Html$Styled$Events$onMouseOver = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseover',
		elm$json$Json$Decode$succeed(msg));
};
var inkuzmin$elm_multiselect$Multiselect$menu = function (_n0) {
	var model = _n0.a;
	var _n1 = model.status;
	if (_n1.$ === 'Opened') {
		var hovered = function () {
			var _n3 = model.hovered;
			if (_n3.$ === 'Nothing') {
				return '';
			} else {
				var item = _n3.a;
				return inkuzmin$elm_multiselect$Multiselect$Utils$fst(item);
			}
		}();
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[inkuzmin$elm_multiselect$Multiselect$SelectCss$menu])),
					rtfeldman$elm_css$Html$Styled$Attributes$id('multiselectMenu' + model.tag)
				]),
			A2(
				elm$core$List$map,
				function (_n2) {
					var name = _n2.a;
					var value = _n2.b;
					return A2(
						rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$Attributes$css(
								_Utils_eq(name, hovered) ? _List_fromArray(
									[inkuzmin$elm_multiselect$Multiselect$SelectCss$menuItemHovered, inkuzmin$elm_multiselect$Multiselect$SelectCss$menuItem]) : _List_fromArray(
									[inkuzmin$elm_multiselect$Multiselect$SelectCss$menuItem])),
								inkuzmin$elm_multiselect$Multiselect$onClickNoDefault(
								inkuzmin$elm_multiselect$Multiselect$OnSelect(
									_Utils_Tuple2(name, value))),
								rtfeldman$elm_css$Html$Styled$Events$onMouseOver(
								inkuzmin$elm_multiselect$Multiselect$OnHover(
									_Utils_Tuple2(name, value)))
							]),
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(value)
							]));
				},
				model.filtered));
	} else {
		return A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	}
};
var inkuzmin$elm_multiselect$Multiselect$RemoveItem = function (a) {
	return {$: 'RemoveItem', a: a};
};
var rtfeldman$elm_css$Css$border2 = rtfeldman$elm_css$Css$prop2('border');
var rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'border-color', c.value);
};
var rtfeldman$elm_css$Css$borderRadius = rtfeldman$elm_css$Css$prop1('border-radius');
var rtfeldman$elm_css$Css$EmUnits = {$: 'EmUnits'};
var rtfeldman$elm_css$Css$em = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$EmUnits, 'em');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$tag = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('#007eff')),
			A2(
			rtfeldman$elm_css$Css$border2,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid),
			rtfeldman$elm_css$Css$borderColor(
			A4(rtfeldman$elm_css$Css$rgba, 0, 126, 255, 0.24)),
			rtfeldman$elm_css$Css$borderRadius(
			rtfeldman$elm_css$Css$px(2)),
			rtfeldman$elm_css$Css$backgroundColor(
			A4(rtfeldman$elm_css$Css$rgba, 0, 126, 255, 8.0e-2)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$fontSize(
			rtfeldman$elm_css$Css$em(0.9)),
			rtfeldman$elm_css$Css$lineHeight(
			rtfeldman$elm_css$Css$num(1.4)),
			rtfeldman$elm_css$Css$marginLeft(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$marginTop(
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$top)
		]));
var rtfeldman$elm_css$Css$borderRight3 = rtfeldman$elm_css$Css$prop3('border-right');
var rtfeldman$elm_css$Css$padding3 = rtfeldman$elm_css$Css$prop3('padding');
var inkuzmin$elm_multiselect$Multiselect$SelectCss$tagIcon = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$backgroundColor(
					rtfeldman$elm_css$Css$hex('#d8eafd'))
				])),
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			A3(
			rtfeldman$elm_css$Css$borderRight3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			A4(rtfeldman$elm_css$Css$rgba, 0, 126, 255, 0.24)),
			A3(
			rtfeldman$elm_css$Css$padding3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$px(5),
			rtfeldman$elm_css$Css$px(3)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle)
		]));
var inkuzmin$elm_multiselect$Multiselect$SelectCss$tagLabel = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(2),
			rtfeldman$elm_css$Css$px(5)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inlineBlock),
			rtfeldman$elm_css$Css$verticalAlign(rtfeldman$elm_css$Css$middle)
		]));
var rtfeldman$elm_css$Html$Styled$span = rtfeldman$elm_css$Html$Styled$node('span');
var rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var inkuzmin$elm_multiselect$Multiselect$tag = F2(
	function (name, value) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[inkuzmin$elm_multiselect$Multiselect$SelectCss$tag]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$span,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[inkuzmin$elm_multiselect$Multiselect$SelectCss$tagIcon])),
							rtfeldman$elm_css$Html$Styled$Events$onClick(
							inkuzmin$elm_multiselect$Multiselect$RemoveItem(
								_Utils_Tuple2(name, value)))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text('×')
						])),
					A2(
					rtfeldman$elm_css$Html$Styled$span,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[inkuzmin$elm_multiselect$Multiselect$SelectCss$tagLabel]))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(value)
						]))
				]));
	});
var rtfeldman$elm_css$Css$inline = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'inline'};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$tagWrap = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$inline)
		]));
var inkuzmin$elm_multiselect$Multiselect$tags = function (_n0) {
	var model = _n0.a;
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[inkuzmin$elm_multiselect$Multiselect$SelectCss$tagWrap]))
			]),
		A2(
			elm$core$List$map,
			function (_n1) {
				var name = _n1.a;
				var value = _n1.b;
				return A2(inkuzmin$elm_multiselect$Multiselect$tag, name, value);
			},
			model.selected));
};
var rtfeldman$elm_css$Css$table = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'table'};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$container = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			rtfeldman$elm_css$Css$hex('#ccc')),
			rtfeldman$elm_css$Css$borderRadius(
			rtfeldman$elm_css$Css$px(4)),
			A3(
			rtfeldman$elm_css$Css$borderColor3,
			rtfeldman$elm_css$Css$hex('#d9d9d9'),
			rtfeldman$elm_css$Css$hex('#ccc'),
			rtfeldman$elm_css$Css$hex('#b3b3b3')),
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('#fff')),
			rtfeldman$elm_css$Css$color(
			rtfeldman$elm_css$Css$hex('#333')),
			rtfeldman$elm_css$Css$height(
			rtfeldman$elm_css$Css$px(34)),
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$pct(100)),
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$table)
		]));
var inkuzmin$elm_multiselect$Multiselect$SelectCss$boxShadowCustom = function (p) {
	return A2(rtfeldman$elm_css$Css$property, 'box-shadow', p);
};
var inkuzmin$elm_multiselect$Multiselect$SelectCss$focused = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$borderColor(
			rtfeldman$elm_css$Css$hex('#007eff')),
			inkuzmin$elm_multiselect$Multiselect$SelectCss$boxShadowCustom('inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1)')
		]));
var inkuzmin$elm_multiselect$Multiselect$SelectCss$opened = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$borderBottomLeftRadius(rtfeldman$elm_css$Css$zero),
			rtfeldman$elm_css$Css$borderBottomRightRadius(rtfeldman$elm_css$Css$zero)
		]));
var inkuzmin$elm_multiselect$Multiselect$SelectCss$wrap = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$pct(100))
		]));
var inkuzmin$elm_multiselect$Multiselect$styledView = function (_n0) {
	var model = _n0.a;
	var inputCss = _Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Focused) ? _List_fromArray(
		[inkuzmin$elm_multiselect$Multiselect$SelectCss$container, inkuzmin$elm_multiselect$Multiselect$SelectCss$focused]) : (_Utils_eq(model.status, inkuzmin$elm_multiselect$Multiselect$Opened) ? _List_fromArray(
		[inkuzmin$elm_multiselect$Multiselect$SelectCss$container, inkuzmin$elm_multiselect$Multiselect$SelectCss$opened]) : _List_fromArray(
		[inkuzmin$elm_multiselect$Multiselect$SelectCss$container]));
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[inkuzmin$elm_multiselect$Multiselect$SelectCss$wrap])),
				rtfeldman$elm_css$Html$Styled$Events$onClick(inkuzmin$elm_multiselect$Multiselect$ClickOnComponent)
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(inputCss)
					]),
				_List_fromArray(
					[
						inkuzmin$elm_multiselect$Multiselect$tags(
						inkuzmin$elm_multiselect$Multiselect$Model(model)),
						inkuzmin$elm_multiselect$Multiselect$input(
						inkuzmin$elm_multiselect$Multiselect$Model(model)),
						inkuzmin$elm_multiselect$Multiselect$clear(
						inkuzmin$elm_multiselect$Multiselect$Model(model)),
						inkuzmin$elm_multiselect$Multiselect$arrow(
						inkuzmin$elm_multiselect$Multiselect$Model(model))
					])),
				inkuzmin$elm_multiselect$Multiselect$menu(
				inkuzmin$elm_multiselect$Multiselect$Model(model))
			]));
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_n0, styles) {
		var newStyles = _n0.b;
		var classname = _n0.c;
		return elm$core$List$isEmpty(newStyles) ? styles : A3(elm$core$Dict$insert, classname, newStyles, styles);
	});
var rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_n0) {
	var val = _n0.a;
	return val;
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_n6, _n7) {
		var key = _n6.a;
		var html = _n6.b;
		var pairs = _n7.a;
		var styles = _n7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n9 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n9.a;
				var finalStyles = _n9.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n10 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n10.a;
				var finalStyles = _n10.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n11 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n11.a;
				var finalStyles = _n11.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n12 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n12.a;
				var finalStyles = _n12.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _n0) {
		var nodes = _n0.a;
		var styles = _n0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n2 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n2.a;
				var finalStyles = _n2.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n3 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n3.a;
				var finalStyles = _n3.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n4 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n4.a;
				var finalStyles = _n4.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n5 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n5.a;
				var finalStyles = _n5.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _n1 = properties.a;
				var styles = _n1.b;
				var classname = _n1.c;
				var rest = properties.b;
				if (elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _n0 = A2(rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, elm$core$Maybe$Nothing, properties);
	if (_n0.$ === 'Nothing') {
		return elm$core$Dict$empty;
	} else {
		var _n1 = _n0.a;
		var classname = _n1.a;
		var styles = _n1.b;
		return A2(elm$core$Dict$singleton, classname, styles);
	}
};
var rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_n0) {
	var classname = _n0.a;
	var styles = _n0.b;
	return A2(
		rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		elm$core$List$singleton(
			rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					elm$core$List$map,
					rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					elm$core$Dict$toList(dict)))));
};
var rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		elm$core$List$singleton(
			elm$virtual_dom$VirtualDom$text(
				rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _n1 = pairs.a;
				var str = _n1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _n1 = pairs.a;
				var firstKey = _n1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2(rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2(rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var rtfeldman$elm_css$Html$Styled$toUnstyled = rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var inkuzmin$elm_multiselect$Multiselect$view = A2(elm$core$Basics$composeR, inkuzmin$elm_multiselect$Multiselect$styledView, rtfeldman$elm_css$Html$Styled$toUnstyled);
var author$project$Page$SavedItemEdit$viewHtml = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('w-70 mw7')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								author$project$Route$href(author$project$Route$SavedList)
							]),
						_List_fromArray(
							[
								elm$html$Html$text('← Back to List')
							]))
					])),
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Save Url')
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Title'),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('db ba br1 mr2 b--black-20 pa1 mv1 w-100'),
								elm$html$Html$Attributes$type_('text'),
								elm$html$Html$Attributes$placeholder('Saved Item Title'),
								elm$html$Html$Attributes$value(model.item.title),
								elm$html$Html$Events$onInput(author$project$Page$SavedItemEdit$SetSavedTitle)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Link'),
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('db ba br1 mr2 b--black-20 pa1 mv1 w-100'),
								elm$html$Html$Attributes$type_('text'),
								elm$html$Html$Attributes$placeholder('https://saved-item.link'),
								elm$html$Html$Attributes$value(model.item.link),
								elm$html$Html$Events$onInput(author$project$Page$SavedItemEdit$SetSavedLink)
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Description'),
						A2(
						elm$html$Html$textarea,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('db ba br1 mr2 b--black-20 pa1 mv1 w-100'),
								elm$html$Html$Attributes$cols(80),
								elm$html$Html$Attributes$rows(5),
								elm$html$Html$Events$onInput(author$project$Page$SavedItemEdit$SetDescription),
								elm$html$Html$Attributes$placeholder('Enter description of content here'),
								elm$html$Html$Attributes$value(
								A2(elm$core$Maybe$withDefault, '', model.item.description))
							]),
						_List_Nil)
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Type'),
						A2(
						elm$html$Html$select,
						_List_fromArray(
							[
								elm$html$Html$Events$onInput(author$project$Page$SavedItemEdit$changeItemType),
								elm$html$Html$Attributes$class('mv1 ba br1 db pa1 w-100')
							]),
						_List_fromArray(
							[
								A2(
								author$project$Page$SavedItemEdit$createOption,
								author$project$Page$SavedItemEdit$itemTypeToString(author$project$SavedItem$Reference),
								author$project$Page$SavedItemEdit$itemTypeToString(model.item.itemType)),
								A2(
								author$project$Page$SavedItemEdit$createOption,
								author$project$Page$SavedItemEdit$itemTypeToString(author$project$SavedItem$ToDo),
								author$project$Page$SavedItemEdit$itemTypeToString(model.item.itemType))
							]))
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Tags'),
						A2(
						elm$html$Html$map,
						author$project$Page$SavedItemEdit$Tags,
						inkuzmin$elm_multiselect$Multiselect$view(model.tagModel))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('mv1')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Page$SavedItemEdit$SaveItem),
								elm$html$Html$Attributes$class('dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Save Item')
							])),
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								author$project$Route$href(author$project$Route$SavedList),
								elm$html$Html$Attributes$class('mh2 dib ba b--black-20 bg-moon-gray pa1 br2 no-underline hover-bg-washed-blue purple')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Cancel')
							]))
					])),
				A2(
				elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						author$project$Page$SavedItemEdit$viewAddSavedItemResults(model.results)
					]))
			]));
};
var author$project$Page$SavedItemEdit$view = function (model) {
	return {
		content: author$project$Page$SavedItemEdit$viewHtml(model),
		title: 'Edit Item'
	};
};
var author$project$Page$SavedItemList$ToggleFilterBy = function (a) {
	return {$: 'ToggleFilterBy', a: a};
};
var author$project$Page$SavedItemList$ToggleShowAll = {$: 'ToggleShowAll'};
var author$project$Page$SavedItemList$MarkRead = function (a) {
	return {$: 'MarkRead', a: a};
};
var author$project$Page$SavedItemList$itemTypeToString = function (it) {
	if (it.$ === 'Reference') {
		return 'Reference';
	} else {
		return 'ToDo';
	}
};
var author$project$Page$SavedItemList$viewTags = function (tags) {
	return A2(
		elm$core$List$map,
		function (t) {
			return A2(
				elm$html$Html$li,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('di ma1 pa1 ba b--black-10 bg-washed-blue')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(t)
					]));
		},
		tags);
};
var author$project$Page$SavedItemList$viewSavedItem = function (item) {
	var id = author$project$SavedItemId$Id(item.id);
	return A2(
		elm$html$Html$li,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('mv2 pa1 shadow-3 bg-washed-blue flex flex-rows flex-wrap')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('fa6 w-50')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						author$project$Page$SavedItemList$itemTypeToString(item.itemType))
					])),
				A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('w-50 tr')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$a,
						_List_fromArray(
							[
								author$project$Route$href(
								author$project$Route$SavedEdit(id)),
								elm$html$Html$Attributes$class('link dim dark-blue')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Edit')
							])),
						A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(
								author$project$Page$SavedItemList$MarkRead(item.id)),
								elm$html$Html$Attributes$class('mh2 link dim dark-blue pointer')
							]),
						_List_fromArray(
							[
								elm$html$Html$text('Mark Read')
							]))
					])),
				A2(
				elm$html$Html$a,
				_List_fromArray(
					[
						elm$html$Html$Attributes$href(item.link),
						elm$html$Html$Attributes$class('link dim dark-blue truncate w-100'),
						elm$html$Html$Attributes$target('_blank'),
						elm$html$Html$Attributes$rel('noopener noreferrer')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(item.title)
					])),
				A2(
				elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(
						A2(elm$core$Maybe$withDefault, '', item.description))
					])),
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('list pl0 db flex flex-row w-100')
					]),
				author$project$Page$SavedItemList$viewTags(item.tags))
			]));
};
var author$project$Page$SavedItemList$viewSavedItems = function (savedItemResults) {
	return A2(
		author$project$RemoteDataHelpers$handleResult,
		savedItemResults,
		function (r) {
			switch (r.$) {
				case 'NotAsked':
					return elm$html$Html$text('');
				case 'Loading':
					return author$project$Loading$loading;
				case 'Success':
					var items = r.a;
					return A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0 item-grid')
							]),
						A2(elm$core$List$map, author$project$Page$SavedItemList$viewSavedItem, items));
				default:
					var error = r.a;
					return author$project$RemoteDataHelpers$viewError(
						author$project$RemoteDataHelpers$createErrorMessage(error));
			}
		});
};
var elm$html$Html$p = _VirtualDom_node('p');
var author$project$Page$SavedItemList$viewHtml = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Saved Items')
					])),
				A2(
				elm$html$Html$nav,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$ReadLater),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('To Read')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(author$project$Route$FeedItems),
												elm$html$Html$Attributes$class('link f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Feed Items')
											]))
									])),
								A2(
								elm$html$Html$li,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('dib dim mr3')
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$a,
										_List_fromArray(
											[
												author$project$Route$href(
												A3(author$project$Route$SavedNew, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing)),
												elm$html$Html$Attributes$class('link dim f6 fw6')
											]),
										_List_fromArray(
											[
												elm$html$Html$text('Add Item')
											]))
									]))
							]))
					])),
				A2(
				elm$html$Html$label,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$input,
						_List_fromArray(
							[
								elm$html$Html$Attributes$type_('checkbox'),
								elm$html$Html$Events$onClick(author$project$Page$SavedItemList$ToggleShowAll)
							]),
						_List_Nil),
						elm$html$Html$text('Show All')
					])),
				A2(
				elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$ul,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('list pl0 flex flex-row flex-wrap')
							]),
						A2(
							elm$core$List$map,
							function (ft) {
								return A2(
									elm$html$Html$li,
									_List_fromArray(
										[
											elm$html$Html$Events$onClick(
											author$project$Page$SavedItemList$ToggleFilterBy(ft.name)),
											elm$html$Html$Attributes$class('di ma1 pa1 ba b--black-10 pointer dark-blue bg-animate'),
											elm$html$Html$Attributes$class(
											ft.isFilteredBy ? 'bg-navy hover-bg-light-gray' : 'bg-washed-blue hover-bg-light-yellow')
										]),
									_List_fromArray(
										[
											elm$html$Html$text(ft.name)
										]));
							},
							model.filterTags))
					])),
				author$project$Page$SavedItemList$viewSavedItems(model.savedItems)
			]));
};
var author$project$Page$SavedItemList$view = function (model) {
	return {
		content: author$project$Page$SavedItemList$viewHtml(model),
		title: 'Saved Items'
	};
};
var author$project$Main$view = function (model) {
	var viewPage = F3(
		function (page, toMsg, config) {
			var _n4 = A3(
				author$project$Page$view,
				author$project$Main$toSession(model),
				page,
				config);
			var title = _n4.title;
			var body = _n4.body;
			return {
				body: A2(
					elm$core$List$map,
					elm$html$Html$map(toMsg),
					body),
				title: title
			};
		});
	switch (model.$) {
		case 'Redirect':
			return A3(
				viewPage,
				author$project$Page$Other,
				function (_n1) {
					return author$project$Main$Ignored;
				},
				author$project$Page$Blank$view);
		case 'NotFound':
			return A3(
				viewPage,
				author$project$Page$Other,
				function (_n2) {
					return author$project$Main$Ignored;
				},
				author$project$Page$NotFound$view);
		case 'ReadLater':
			var readLater = model.a;
			return A3(
				viewPage,
				author$project$Page$ReadLater,
				author$project$Main$GotReadLaterMsg,
				author$project$Page$ReadLater$view(readLater));
		case 'Feeds':
			var feeds = model.a;
			return A3(
				viewPage,
				author$project$Page$Feeds,
				author$project$Main$GotFeedsMsg,
				author$project$Page$Feeds$view(feeds));
		case 'FeedItems':
			var feedItems = model.a;
			return A3(
				viewPage,
				author$project$Page$FeedItems,
				author$project$Main$GotFeedItemsMsg,
				author$project$Page$FeedItems$view(feedItems));
		case 'SavedList':
			var saved = model.a;
			return A3(
				viewPage,
				author$project$Page$SavedList,
				author$project$Main$GotSavedListMsg,
				author$project$Page$SavedItemList$view(saved));
		default:
			if (model.a.$ === 'Nothing') {
				var _n3 = model.a;
				var saved = model.b;
				return A3(
					viewPage,
					author$project$Page$SavedNew,
					author$project$Main$GotSavedEditMsg,
					author$project$Page$SavedItemEdit$view(saved));
			} else {
				var saved = model.b;
				return A3(
					viewPage,
					author$project$Page$SavedEdit,
					author$project$Main$GotSavedEditMsg,
					author$project$Page$SavedItemEdit$view(saved));
			}
	}
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{init: author$project$Main$init, onUrlChange: author$project$Main$ChangedUrl, onUrlRequest: author$project$Main$ClickedLink, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				elm$json$Json$Decode$null(elm$core$Maybe$Nothing),
				A2(
				elm$json$Json$Decode$map,
				elm$core$Maybe$Just,
				A2(
					elm$json$Json$Decode$andThen,
					function (token) {
						return A2(
							elm$json$Json$Decode$andThen,
							function (profile) {
								return elm$json$Json$Decode$succeed(
									{profile: profile, token: token});
							},
							A2(
								elm$json$Json$Decode$field,
								'profile',
								A2(
									elm$json$Json$Decode$andThen,
									function (email_verified) {
										return A2(
											elm$json$Json$Decode$andThen,
											function (email) {
												return elm$json$Json$Decode$succeed(
													{email: email, email_verified: email_verified});
											},
											A2(elm$json$Json$Decode$field, 'email', elm$json$Json$Decode$string));
									},
									A2(elm$json$Json$Decode$field, 'email_verified', elm$json$Json$Decode$bool))));
					},
					A2(elm$json$Json$Decode$field, 'token', elm$json$Json$Decode$string)))
			])))(0)}});}(this));