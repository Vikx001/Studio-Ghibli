const userService = require("../services/userService");
const UserController = {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      console.log(user);
      res
        .status(201)
        .send({ message: "User created Successfully", user: req.body });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating user", error: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const userList = await userService.getAllUsers();
      return res.json(userList);
    } 
    catch (error) {
      res
        .status(500)
        .send({ message: "User is empty", user: req.body });
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      //Call Service Fuunction
      const user = await userService.getUserById(userId);
      res
        .status(201)
        .json(user);
    } 
    catch (error) {
      res.status(500).json({msg: error.message});
    }
  },

  async updateUser(req, res) {
    // Business logic for updating a user's details
    // Update user with the given ID in the database
    const userId = req.params.id;
    try 
    {
    const user = await userService.updateUser(userId,req);
    res
      .status(200)
      .send({ message: `User ${userId} updated successfully`, user: req.body });
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User not found", error: error.message });
    }
  },

  async deleteUser(req, res) {
    // Business logic for deleting a user
    // Delete user with the given ID from the database
    const userId = req.params.id;
    try 
    {
    const user = await userService.deleteUser(userId);
    res
      .status(200)
      .status(200).send({ message: `User ${userId} deleted successfully` });
    }
    
    catch (error) {
    res
      .status(500)
      .send({ message: "User not found", error: error.message });
  }
},

  async loginUser(req, res) {
    // Business logic for user login
    // Authenticate user and issue a token/session
    res
      .status(200)
      .send({ message: "Login successful", token: "your_token_here" });
  },

  async logoutUser(req, res) {
    // Business logic for user logout
    // Invalidate the user's session/token
    try{
      const user = await userService.logoutUser(req);
      res
      .status(400)
      .json({msg: "Unable to logout"});
    }
    catch (error) {
      res
      .status(200)
      .send({ message: "Logout successful" });
    }
  },

  async getUserProfile(req, res) {
    // Business logic for getting a user's profile
    // Fetch user profile details from the database
    const userId = req.params.id;
    res.status(200).send({ message: `Profile of user ${userId}`, profile: {} });
  },

  async updatePassword(req, res) {
    // Business logic for updating a user's password
    // Update the password for the user with the given ID in the database
    console.log("test1")
 const userId = req.params.id;
 console.log("test")
    try
    {
    const user = await userService.updatePassword(userId,req.body);
    res
      .status(200)
      .send({ message: `Password for user ${userId} updated successfully` });
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User not found", error: error.message });
    }

  },
};

module.exports = UserController;
