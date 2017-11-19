/**
 * Array prototype function utilized. 
**/
var isArray = Array.isArray;

/** 
 * @constructor immutableList Constructor
 * @param {Array} list To be defaulted list
 * @returns {Object} with list as its propert containing immutable list 
**/
function immutableList(paramList) {
  if (isArray(paramList)) {
    this.list = createList(paramList);
  } else {
    this.list = createList([]);
  }

  function createList(list) {
    const size = list.length;
    const result = new Array(size);
    let index = -1;
    while (++index < size) {
      result[index] = list[index];
    }
    return result;
  }
};

/** 
 * @method getList To get list form immutable list object
 * @returns {Array} List of immutableList instance
**/
immutableList.prototype.getList = function () {
  return this.list;
};

/** 
 * @method head To obtain first element of the immutable list
 * @returns {Any} first element of immutable list
**/
immutableList.prototype.head = function () {
  return this.list[0];
};

/** 
 * @method tail To obtain tail of the immutable list
 * @returns {Object} a new list with all elements of the original list except the first 
**/
immutableList.prototype.tail = function () {
  const currList = this;
  function recrve(index, list) {
    if (index === 1) {
      return list;
    }
    const offset = index - 1;
    return recrve(offset, list.cons(currList.list[offset]));
  }
  return recrve(this.list.length, new immutableList());
};

/** @method cons To prepend a passed element and obtain new list
 * @param {Any} element Any element to prepend it to the list
 * @returns {Object} a new list with all elements along with the new prepended element 
**/
immutableList.prototype.cons = function (element) {
  let result = new immutableList();
  const length = this.list.length;
  let index = -1;
  while (++index < length) {
    result.list[index + 1] = this.list[index];
  }
  result.list[0] = element;
  return result;
};

/** @method cons To appened a passed element and obtain new list
 * @param {Any} element Any element to appened it to the list
 * @returns {Object} a new list with all elements along with the new appeneded element 
**/
immutableList.prototype.pros = function (element) {
  let result = new immutableList(this.list);
  result.list[result.list.length] = element;
  return result;
};

/** 
 * @method drop To obtain a new list with the first n element removed
 * @param {number} toRemove No of elements to be removed from list
 * @returns {Object} a new list after removing first n elements from the list 
**/
immutableList.prototype.drop = function (toRemove) {
  return toRemove <= 0 ? new immutableList(this.list) : this.tail().drop(--toRemove);
};

/** 
 * @method reverse To obtain new list with a reverse of a list
 * @returns {Object} a new list, reverse to original list
**/
immutableList.prototype.reverse = function () {
  if (this.list.length > 2) {
    return this.tail().reverse().pros(this.head());
  }
  return this.tail().pros(this.head());
}


/** Use new key word followed by immutableList constructor to create a new instance 
 * C O N S T R U C T O R
 * var list = new immutableList();
 * M E T H O D S
 * list.head() => To obtain head of list
 * list.tail() => To obtain new list of original list tail
 * list.cons('element') => To obtain new list with element prepended
 * list.drop(N: number) => To obtain new list without the first N elements
 * list.reverse() => To obtain new list as reverse of original list
**/