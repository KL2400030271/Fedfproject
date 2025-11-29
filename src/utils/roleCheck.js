const hasRole = (user, roles) => {
  if (!user) return false;
  if (!roles) return true;
  const roleList = Array.isArray(roles) ? roles : [roles];
  return roleList.includes(user.role);
};

export default hasRole;



