class User {
  constructor(userId, email, fullName) {
    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
  }

  getProfile() {
    return {
      userId: this.userId,
      email: this.email,
      fullName: this.fullName,
    };
  }
}

const user = new User('1DSU13DW', 'gibran@gmail.com', 'gibran alfares');

console.log(user.getProfile());
