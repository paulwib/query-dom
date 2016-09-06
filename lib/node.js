import cssauron from 'cssauron';

const css = cssauron({
  tag: node => node.tagName,
  contents: node => node.textContent,
  id: node => node.getAttribute('id'),
  'class': node => node.getAttribute('class'),
  'parent': node => node.parentNode && node.parentNode.tagName ? node.parentNode : undefined,
  children: node => node.childNodes.filter(child => child.tagName),
  attr: (node, attr) => node.getAttribute(attr) || ''
});

const queryOne = (childNodes, selector) => {
  for (var i = 0; i < childNodes.length; i++) {
    let elm = childNodes[i];
    if (elm.tagName && selector(elm)) {
      return elm;
    }
    if (elm.childNodes) {
      const result = queryOne(elm.childNodes, selector);
      if (result) {
        return result;
      }
    }
  }
};

const queryAll = (childNodes, selector, result) => {
  for (var i = 0; i < childNodes.length; i++) {
    let elm = childNodes[i];
    if (elm.tagName && selector(elm)) {
      result.push(elm);
    }
    if (elm.childNodes) {
      queryAll(elm.childNodes, selector, result);
    }
  }
  return result;
};

function Node (nodeName) {
  this.nodeName = nodeName;
  this.childNodes = [];
}

Node.prototype = {
  get textContent () {
    return null;
  },

  getElementsByTagName (tagName) {
    tagName = tagName.toLowerCase();
    const selector = elm => elm.tagName === tagName;

    return queryAll(this.childNodes, selector, []);
  },

  querySelector (query) {
    return queryOne(this.childNodes, css(query));
  },

  querySelectorAll (query) {
    return queryAll(this.childNodes, css(query), []);
  }
};

export default Node;
