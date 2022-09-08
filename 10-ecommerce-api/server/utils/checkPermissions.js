const CustomError = require("../errors"); //or ('../errors/index')

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof requestUser, typeof resourceUserId);

  //if user.role is admin --> allow access
  //if currentUser id matches with its own id--> allow access
  //else throw error --> do not allow
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermissions;

//a user should be able to access its own details and accessing other details should be based on role(eg: admin has access to all users details)
//a user should not be able to access other user details by just getting its id
