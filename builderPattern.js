/**
 * Builder Pattern
 * 
 * Constructs complex objects step by step.
 * Separates object construction from representation.
 */

// Basic Builder
class URLBuilder {
  constructor() {
    this.protocol = 'https';
    this.domain = '';
    this.path = '';
    this.queryParams = {};
    this.hash = '';
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  setDomain(domain) {
    this.domain = domain;
    return this;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  addQueryParam(key, value) {
    this.queryParams[key] = value;
    return this;
  }

  setHash(hash) {
    this.hash = hash;
    return this;
  }

  build() {
    let url = `${this.protocol}://${this.domain}${this.path}`;

    const queryString = Object.entries(this.queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    if (queryString) {
      url += `?${queryString}`;
    }

    if (this.hash) {
      url += `#${this.hash}`;
    }

    return url;
  }
}

// Usage
const url = new URLBuilder()
  .setDomain('api.example.com')
  .setPath('/users')
  .addQueryParam('page', 1)
  .addQueryParam('limit', 10)
  .setHash('results')
  .build();

console.log(url); // "https://api.example.com/users?page=1&limit=10#results"

// HTTP Request Builder
class RequestBuilder {
  constructor(url) {
    this.url = url;
    this.method = 'GET';
    this.headers = {};
    this.body = null;
    this.params = {};
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  addHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  addParam(key, value) {
    this.params[key] = value;
    return this;
  }

  async execute() {
    const queryString = new URLSearchParams(this.params).toString();
    const fullUrl = queryString ? `${this.url}?${queryString}` : this.url;

    const options = {
      method: this.method,
      headers: this.headers
    };

    if (this.body) {
      options.body = JSON.stringify(this.body);
      if (!this.headers['Content-Type']) {
        this.headers['Content-Type'] = 'application/json';
      }
    }

    const response = await fetch(fullUrl, options);
    return response.json();
  }
}

// Usage
const data = await new RequestBuilder('https://api.example.com/users')
  .setMethod('POST')
  .addHeader('Authorization', 'Bearer token123')
  .setBody({ name: 'John', email: 'john@example.com' })
  .execute();

// Query Builder (SQL-like)
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.selectFields = ['*'];
    this.whereConditions = [];
    this.orderByFields = [];
    this.limitValue = null;
  }

  select(...fields) {
    this.selectFields = fields;
    return this;
  }

  where(field, operator, value) {
    this.whereConditions.push({ field, operator, value });
    return this;
  }

  orderBy(field, direction = 'ASC') {
    this.orderByFields.push({ field, direction });
    return this;
  }

  limit(value) {
    this.limitValue = value;
    return this;
  }

  build() {
    let query = `SELECT ${this.selectFields.join(', ')} FROM ${this.table}`;

    if (this.whereConditions.length > 0) {
      const conditions = this.whereConditions
        .map(({ field, operator, value }) => `${field} ${operator} '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }

    if (this.orderByFields.length > 0) {
      const orderBy = this.orderByFields
        .map(({ field, direction }) => `${field} ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderBy}`;
    }

    if (this.limitValue) {
      query += ` LIMIT ${this.limitValue}`;
    }

    return query;
  }
}

// Usage
const query = new QueryBuilder('users')
  .select('id', 'name', 'email')
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

// HTML Builder
class HTMLBuilder {
  constructor(tag) {
    this.tag = tag;
    this.attributes = {};
    this.children = [];
    this.textContent = '';
  }

  setId(id) {
    this.attributes.id = id;
    return this;
  }

  addClass(...classes) {
    this.attributes.class = [...(this.attributes.class || []), ...classes].join(' ');
    return this;
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
    return this;
  }

  setText(text) {
    this.textContent = text;
    return this;
  }

  addChild(builder) {
    this.children.push(builder);
    return this;
  }

  build() {
    const attrs = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    const opening = attrs ? `<${this.tag} ${attrs}>` : `<${this.tag}>`;
    const closing = `</${this.tag}>`;

    const content = this.textContent ||
      this.children.map(child => child.build()).join('');

    return `${opening}${content}${closing}`;
  }
}

// Usage
const html = new HTMLBuilder('div')
  .setId('container')
  .addClass('flex', 'center')
  .addChild(
    new HTMLBuilder('h1')
      .setText('Hello World')
      .addClass('title')
  )
  .addChild(
    new HTMLBuilder('p')
      .setText('Welcome to the builder pattern')
  )
  .build();

// Form Builder
class FormBuilder {
  constructor() {
    this.fields = [];
    this.submitUrl = '';
    this.method = 'POST';
  }

  addTextField(name, label, required = false) {
    this.fields.push({ type: 'text', name, label, required });
    return this;
  }

  addEmailField(name, label, required = false) {
    this.fields.push({ type: 'email', name, label, required });
    return this;
  }

  addPasswordField(name, label, required = false) {
    this.fields.push({ type: 'password', name, label, required });
    return this;
  }

  addSelectField(name, label, options, required = false) {
    this.fields.push({ type: 'select', name, label, options, required });
    return this;
  }

  setSubmitUrl(url) {
    this.submitUrl = url;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  build() {
    return {
      fields: this.fields,
      submitUrl: this.submitUrl,
      method: this.method
    };
  }
}

// Usage
const form = new FormBuilder()
  .addTextField('username', 'Username', true)
  .addEmailField('email', 'Email Address', true)
  .addPasswordField('password', 'Password', true)
  .addSelectField('country', 'Country', ['US', 'UK', 'CA'])
  .setSubmitUrl('/api/register')
  .build();

export {
  URLBuilder,
  RequestBuilder,
  QueryBuilder,
  HTMLBuilder,
  FormBuilder
};
