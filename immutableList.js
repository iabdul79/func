/**
 * Array prototype function utilized. 
**/
var isArray = Array.isArray;

/** 
 * @function concatArray To concat two arrays and return an array
 * @param {Array} destArray The final array in to which the source array is to be concatinated
 * @param {Array} srctArray To be appened Array
 * @returns {Array} destArray is returned after concatination with srcArray
**/
function concatArray(destArray, srcArray) {
  const lenght = srcArray.length;
  const currIdx = destArray.length;
  let index = -1;
  while (++index < lenght) {
    destArray[currIdx + index] = srcArray[index]
  }
  return destArray;
};

/** 
 * @constructor immutableList Constructor
 * @param {Array} list To be defaulted list
 * @returns {Object} with list as its propert containing immutable list 
**/
function immutableList (list) {
  this.list = list ? isArray(list) ? list : [list] : [];
};

/** 
 * @method getList immutableList Constructor
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
  let result = new immutableList();
  const length = this.list.length;
  let index = 0;
  while (++index < length) {
    result.list[index - 1] = this.list[index];
  }
  return result;
};

/** @method cons To prepend a passed element and obtain new list
 * @param {Any} element Any element to prepend it to the list
 * @returns {Object} a new list with all elements along with the new prepended element 
**/
immutableList.prototype.cons = function (element) {
  let result = new immutableList();
  result.list[0] = element;
  if (this.head()) {
    result.list = concatArray(result.list, this.list);
  }
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
    return new immutableList(concatArray(this.tail().reverse().list, [this.head()]));
  }
  return new immutableList(concatArray(this.tail().list, [this.head()]));
}


/** Use new key word followed by immutableList constructor to create a new instance 
 * @constructor
 * var list = new immutableList();
 * @method
 * list.head() => To obtain head of list
 * list.tail() => To obtain new list of original list tail
 * list.cons('element') => To obtain new list with element prepended
 * list.drop(N: number) => To obtain new list without the first N elements
 * list.reverse() => To obtain new list as reverse of original list
**/