/** @format */

const buildUserPropQuery = (mobileNo) => {
  aggrArr = [
    {
      $match: {
        mobile: mobileNo,
      },
    },
    {
      $group: {
        _id: {
          user_id: "$user_id",
          user_type: "$user_type",
          user_facilities: "$user_facilities",
          user_roles: "$user_roles",
          _id: "$_id",
        },
      },
    },
    {
      $project: {
        user_id: "$_id.user_id",
        user_facilities: "$_id.user_facilities",
        user_type: "$_id.user_type",
        user_roles: "$_id.user_roles",
        _id: {
          $toString: "$_id._id",
        },
      },
    },
  ];

  return aggrArr;
};

module.exports = {
  buildUserPropQuery,
};
