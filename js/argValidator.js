// TODO - i18n
var OrdinalForInteger = function OrdinalForInteger(integer){
  // Common ground achieved by casting to `Number`
  integer = parseInt(integer);

  // Default suffix
  var suffix = 'th';

  var remainder = String(integer / 10).split('.')[1];
  if(remainder){
    if(remainder === '1'){
      suffix = 'st';
    }else if(remainder === '2'){
      suffix = 'nd';
    }else if(remainder === '3'){
      suffix = 'rd';
    }
  }

  return String(integer).concat(suffix);
};


var TypeErrorCreate = function TypeErrorCreate(options /* args, index, name, context */){
  var args = options.args;
  // Enable passing of `Arguments`, while treating as an `Array`
  args = Array.prototype.slice.call(args);

  var index = options.index;
  var name = options.name;
  var context = options.context;

  // Allow bound calls e.g. `TypeErrorCreate.bind(this)(anArg, someName)`
  !context && (context = this);

  var arg = args[index];

  if(!arg || !arg.constructor || arg.constructor.name !== name){
    var what = 'Failed to execute \''+context.name+'\'';
    var why  = OrdinalForInteger(index)+' argument must be of type \''+name+'\'.';
    var msg  = what.concat(': ', why);
    return new TypeError(msg);
  }
};


var ArgValidator = function ArgValidator(args, names, context){
  // Enable passing of `Arguments`, while treating as an `Array`
  args = Array.prototype.slice.call(args);

  // Allow bound calls e.g. `TypeErrorCreate.bind(this)(anArg, someName)`
  !context && (context = this);

  args.forEach(function(arg, index, collection){
    var typeError = null;
    var name = names[index];
    if(name && (typeError = TypeErrorCreate({
      args: collection,
      index: index,
      name: name,
      context: context
    }))){
      throw typeError;
    }
  });
};

module.exports = ArgValidator;
