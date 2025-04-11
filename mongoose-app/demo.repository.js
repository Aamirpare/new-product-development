/*
    Using UserRepository
     1. Create Users
     2. Update Users
     3. Delete Users
     4. Get Users
*/
const UserRepository = require("./user-repository");

class RepositoryDemo {

    constructor() {
        this.executeDemo();
    }

    async executeDemo() {
        const userRepo = new UserRepository("mongodb://127.0.0.1:27017/humandb");

        const user = {
            _id: 12,
            name: "Ashwani Reddy",
            age: 30,
            hobbies: ["reading", "writing", "watching movies"],
            address: {
                street: "D-12/4, 132",
                city: "Islamabad"
            },
            status: "married"
        };

        const updateManyWith = {
            name: "Minahil Chaudhary",
            age: 25,
            hobbies: ["reading", "writing", "watching movies"],
            address: {
                street: "D-12/4, 132",
                city: "Islamabad"
            }
        };

        //const result = await userRepo.createUser(user);
        //const result = await userRepo.updateUsers({ name: "Ashwani Reddy" }, updateManyWith)
        //const result = await userRepo.updateUser(10, { name: "Eva Maria", age: 27 });
        //const result = await userRepo.deleteUserById(12);
        //const result = await userRepo.deleteUsersByName("Minahil Chaudhary");

        const result = await userRepo.getUsers();
        console.log(result);

        userRepo.disconnect();
    }
}

const demo = new RepositoryDemo();
