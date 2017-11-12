var isArray = Array.isArray;

function concatArray(destArray, srcArray) {
  const lenght = srcArray.length;
  const currIdx = destArray.length;
  let index = -1;
  while (++index < lenght) {
    destArray[currIdx + index] = srcArray[index]
  }
  return destArray;
};

immutableList = function (list) {
  this.list = list ? isArray(list) ? list : [list] : [];
};

immutableList.prototype.head = function () {
  return this.list[0];
};

immutableList.prototype.tail = function () {
  let result = new immutableList();
  const length = this.list.length;
  let index = 0;
  while (++index < length) {
    result.list[index - 1] = this.list[index];
  }
  return result;
};

immutableList.prototype.cons = function (element) {
  let result = new immutableList();
  result.list[0] = element;
  if (this.head()) {
    result.list = concatArray(result.list, this.list);
  }
  return result;
};

immutableList.prototype.drop = function (number) {
  return number <= 0 ? new immutableList(this.list) : this.tail().drop(--number);
}

immutableList.prototype.reverse = function () {
  debugger;
  if (this.tail().list.length >= 2) {
    return new immutableList(concatArray(this.tail().reverse().list, [this.head()]));
  }
  let result = new immutableList();
  result.list = concatArray(this.tail().list, [this.head()]);
  return result;
}