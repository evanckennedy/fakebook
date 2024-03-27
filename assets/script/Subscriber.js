class User {
  #id;
  #name;
  #userName;
  #email;

  constructor (id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() { return this.#id; }
  get name() { return this.#id; }
  get userName() { return this.#id; }
  get email() { return this.#id; }

  getInfo() {
    return `${this.#name}, ${this.#userName}, ${this.#email}`;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor (id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() { return this.#pages; }
  get groups() { return this.#groups; }
  get canMonetize() { return this.#canMonetize; }

  getInfo() {
    return `${super.getInfo()}, ${this.#pages}, ${this.#groups}, ${this.#canMonetize}`
  }
}

export default Subscriber;