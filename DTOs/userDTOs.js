// dtos/userDTOs.js

class AddUserDTO {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

class GetUserDTO {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
}

class UpdateUserDTO {
    constructor(id, email, password, name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}

class LoginUserDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

module.exports = {
    AddUserDTO,
    GetUserDTO,
    UpdateUserDTO,
    LoginUserDTO
};