// dtos/friendGroupDTOs.js

class AddFriendGroupDTO {
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
    }
}

class GetFriendGroupDTO {
    constructor(id, name, friends) {
        this.id = id;
        this.name = name;
        this.friends = friends; // This should be an array of FriendDTO instances
    }
}

class FriendDTO {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

module.exports = {
    AddFriendGroupDTO,
    GetFriendGroupDTO,
    FriendDTO
};