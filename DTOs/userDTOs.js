// dtos/userDTOs.js

class AddUserDTO {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    static fromRequest(req) {
        return new AddUserDTO(req.email, req.password, req.name);
    }
}

class GetUserDTO {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    static fromEntity(entity) {
        return new GetUserDTO(entity.id, entity.email, entity.name);
    }
}

class UpdateUserDTO {
    constructor(id, email, password, name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    static fromRequest(req) {
        return new UpdateUserDTO(req.id, req.email, req.password, req.name);
    }
}

class LoginUserDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    static fromRequest(req) {
        return new LoginUserDTO(req.email, req.password);
    }
}

module.exports = {
    AddUserDTO,
    GetUserDTO,
    UpdateUserDTO,
    LoginUserDTO
};