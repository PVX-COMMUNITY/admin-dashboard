import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTie, FaLayerGroup, FaBirthdayCake, FaBan, FaComments, FaCrown, FaUserCog } from 'react-icons/fa';
import { MdOutlineCurrencyRupee, MdEvent } from 'react-icons/md';
import { IconType } from 'react-icons';

interface DashboardItem {
  title: string;
  value: number | string;
  color: string;
  route: string;
  icon: IconType;
}

interface User {
  name: string;
  number?: string;
}

interface GroupStat {
  name: string;
  totalMessages: number;
}

interface MemberStat {
  name: string;
  totalMessages: number;
}

interface DashboardData {
  totalMembers: number;
  totalGroups: number;
  totalAdmins: number;
  totalDonations: number;
  totalBirthdays: number;
  totalBlacklists: number;
  totalMessages: number;
  totalEvents: number;
  owner: User;
  admins: User[];
  subAdmins: User[];
  topGroups: GroupStat[];
  topMembers: MemberStat[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'groups' | 'members'>('groups');

  // kuchh bhi dashboard data
  const dashboardData: DashboardData = {
    totalMembers: 5000,
    totalGroups: 500,
    totalAdmins: 50,
    totalDonations: 696969,
    totalBirthdays: 150,
    totalBlacklists: 25,
    totalMessages: 1000000,
    totalEvents: 69,
    owner: { name: 'John Doe', number: '123-456-7890' },
    admins: [
      { name: 'Admin 1', number: '234-567-8901' },
      { name: 'Admin 2', number: '345-678-9012' },
      { name: 'Admin 3', number: '456-789-0123' },
    ],
    subAdmins: [
      { name: 'Sub Admin 1', number: '567-890-1234' },
      { name: 'Sub Admin 2', number: '678-901-2345' },
      { name: 'Sub Admin 3', number: '789-012-3456' },
    ],
    topGroups: Array.from({ length: 10 }, (_, i) => ({
      name: `Group ${i + 1}`,
      totalMessages: Math.floor(Math.random() * 10000)
    })),
    topMembers: Array.from({ length: 20 }, (_, i) => ({
      name: `Member ${i + 1}`,
      totalMessages: Math.floor(Math.random() * 5000)
    })),
  };

  const handleBoxClick = (route: string) => {
    navigate(route);
  };

  const dashboardItems: DashboardItem[] = [
    { title: 'Total Members', value: dashboardData.totalMembers, color: 'bg-green-500', route: '/dashboard/members', icon: FaUsers },
    { title: 'Total Groups', value: dashboardData.totalGroups, color: 'bg-red-700', route: '/dashboard/groups', icon: FaLayerGroup },
    { title: 'Total Admins', value: dashboardData.totalAdmins, color: 'bg-rose-400', route: '/dashboard/admins', icon: FaUserTie },
    { title: 'Total Donations', value: `${dashboardData.totalDonations}`, color: 'bg-stone-700', route: '/dashboard/donations', icon: MdOutlineCurrencyRupee },
    { title: 'Total Birthdays', value: dashboardData.totalBirthdays, color: 'bg-yellow-500', route: '/dashboard/birthdays', icon: FaBirthdayCake },
    { title: 'Total Blacklists', value: dashboardData.totalBlacklists, color: 'bg-gray-800', route: '/dashboard/blacklists', icon: FaBan },
    { title: 'Total Messages', value: dashboardData.totalMessages, color: 'bg-blue-600', route: '/dashboard/messages', icon: FaComments },
    { title: 'Total Events', value: dashboardData.totalEvents, color: 'bg-purple-600', route: '/dashboard/events', icon: MdEvent },
  ];

  const renderDashboardBox = (item: DashboardItem, index: number) => {
    const IconComponent = item.icon;
    return (
      <div 
        key={index} 
        className={`${item.color} rounded-lg p-3 sm:p-4 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity h-28 sm:h-32`}
        onClick={() => handleBoxClick(item.route)}
      >
        <div className="sm:flex sm:items-center">
          <IconComponent className="text-2xl sm:text-3xl mb-1 sm:mb-0 sm:mr-2" />
          <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
        </div>
        <h2 className="text-sm sm:text-base font-semibold mt-1 sm:mt-2">{item.title}</h2>
      </div>
    );
  };
 
  const renderUserBox = (users: User[], title: string, icon: IconType) => {
    const IconComponent = icon;
    return (
      <div className="bg-purple-800 rounded-lg p-3 sm:p-4">
        <div className="flex items-center mb-2">
          <IconComponent className="text-xl sm:text-2xl mr-2" />
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        </div>
        <ul className="space-y-1 sm:space-y-2">
          {users.map((user, index) => (
            <li key={index} className="flex items-center text-sm sm:text-base">
              <div className="bg-purple-600 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 text-xs font-bold">
                {user.name[0]}
              </div>
              <span>{user.name} - {user.number}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };


  const renderStatsTable = () => (
    <div className="bg-purple-900 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4 underline">Statistics</h3>
      <div className="flex mb-4">
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-tl-lg rounded-tr-lg text-sm sm:text-base ${activeTab === 'groups' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveTab('groups')}
        >
          Top Groups
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-tl-lg rounded-tr-lg text-sm sm:text-base ${activeTab === 'members' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveTab('members')}
        >
          Top Members
        </button>
      </div>
      <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm sm:text-base">
          <thead className="sticky top-0 bg-purple-900">
            <tr className="text-left">
              <th className="pb-2">Rank</th>
              <th className="pb-2">{activeTab === 'groups' ? 'Group' : 'Member'}</th>
              <th className="pb-2">Total Messages</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'groups' ? dashboardData.topGroups : dashboardData.topMembers).map((item, index) => (
              <tr key={index} className="border-t border-purple-700">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.totalMessages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  return (
    <div className="p-3 sm:p-6 bg-navy-900 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {dashboardItems.map((item, index) => renderDashboardBox(item, index))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-purple-900 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Team Members</h2>
          <div className="space-y-3 sm:space-y-4">
            {renderUserBox([dashboardData.owner], 'Owner', FaCrown)}
            {renderUserBox(dashboardData.admins, 'Admins', FaUserTie)}
            {renderUserBox(dashboardData.subAdmins, 'Sub Admins', FaUserCog)}
          </div>
        </div>
        {renderStatsTable()}
      </div>
    </div>
  );
}