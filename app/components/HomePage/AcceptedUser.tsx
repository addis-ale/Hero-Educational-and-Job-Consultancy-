interface AcceptedUserProps {
  acceptedUserName: string[];
}

const AcceptedUsers: React.FC<AcceptedUserProps> = ({ acceptedUserName }) => {
  return (
    <section className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 py-12 px-6 sm:px-12">
      <div className="max-w-screen-xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Congratulations to the Accepted Users!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {acceptedUserName.map((user, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-4">
                {/* Optionally, you can add avatars or icons here */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center text-white text-xl font-semibold">
                  {user.charAt(0)} {/* Display the first letter as an avatar */}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center">{user}</h3>
              <p className="text-sm text-center text-gray-500">
                You&apos;re officially accepted! 🎉
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcceptedUsers;
