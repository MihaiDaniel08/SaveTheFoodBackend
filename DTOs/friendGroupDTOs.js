// dtos/friendGroupDTOs.js

class AddFriendGroupDTO {
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
    }

    static fromRequest(req) {
        return new AddFriendGroupDTO(req.name, req.userId);
    }
}

class GetFriendGroupDTO {
    constructor(id, name, friends) {
        this.id = id;
        this.name = name;
        this.friends = friends; // This should be an array of FriendDTO instances
    }

    static fromEntity(entity) {
        console.log(entity);
        return new GetFriendGroupDTO(entity.id, entity.name, entity.friendGroupUsers.map(f => FriendDTO.fromEntity(f.user6)));
    }
}

class FriendDTO {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromEntity(entity) {
        return new FriendDTO(entity.id, entity.name, entity.email);
    }
}

module.exports = {
    AddFriendGroupDTO,
    GetFriendGroupDTO,
    FriendDTO
};