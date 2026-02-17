const StatsCards = ({ users = [], currentUser }) => {
  const totalUsers = users.length;

  const currentUserData = users.find(
    (user) => user.email === currentUser
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm">Total Users</h3>
        <p className="text-2xl font-bold mt-2">{totalUsers}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm">Current User</h3>
        <p className="text-lg mt-2">{currentUser}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-gray-400 text-sm">Total Logins</h3>
        <p className="text-2xl font-bold mt-2">
          {currentUserData?.loginHistory?.length || 0}
        </p>
      </div>
    </div>
  );
};

export default StatsCards;
