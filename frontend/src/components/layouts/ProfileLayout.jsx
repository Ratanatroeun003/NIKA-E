import { Link } from 'react-router-dom';
const ProfileLayout = ({ user, handleLogout }) => {
  if (!user) return <div className="text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-300 p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Left Sidebar */}
        <div className="card bg-base-100 shadow-xl p-6 flex flex-col items-center text-center h-fit">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                src={
                  user?.avatar ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                }
                alt="avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold uppercase">
            {user?.fname} {user?.lname}
          </h2>
          <div className="badge badge-primary mt-2 uppercase text-xs font-bold p-3">
            {user?.role || 'User'}
          </div>

          <div className="divider w-full"></div>

          <div className="flex flex-col gap-2 w-full">
            <Link to="/update">
              <button className="btn btn-outline btn-sm btn-primary">
                Edit Profile
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm btn-outline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 2. Right Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="card-body p-0">
              <div className="bg-primary p-4 text-primary-content flex justify-between items-center">
                <h3 className="text-lg font-bold uppercase">
                  Personal Information
                </h3>
                <span className="text-xs opacity-70">
                  ID: {user?._id?.slice(-6)}
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoItem label="First Name" value={user?.fname} />
                <InfoItem label="Last Name" value={user?.lname} />
                <InfoItem label="Email Address" value={user?.email} />
                <InfoItem label="Phone Number" value={user?.phone || 'N/A'} />
                <div className="sm:col-span-2">
                  <InfoItem label="Address" value={user?.address || 'N/A'} />
                </div>
                <InfoItem label="Gender" value={user?.gender || 'N/A'} />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatBox title="Total Orders" value="12" color="text-primary" />
            <StatBox title="Member Since" value="2024" color="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ បង្កើត Small Components ដើម្បីឱ្យកូដមើលទៅស្រឡះ (Clean Code)
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
      {label}
    </p>
    <p className="font-semibold text-base-content">{value}</p>
  </div>
);

const StatBox = ({ title, value, color }) => (
  <div className="stats shadow bg-base-100">
    <div className="stat">
      <div className="stat-title text-xs uppercase">{title}</div>
      <div className={`stat-value ${color} text-2xl`}>{value}</div>
    </div>
  </div>
);
export default ProfileLayout;
