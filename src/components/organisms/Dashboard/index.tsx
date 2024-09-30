import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTie, FaLayerGroup} from 'react-icons/fa';

import { MdOutlineCurrencyRupee } from 'react-icons/md';

//for later
// const API_URL = 'http://localhost:3000/api';

interface DashboardItem {
  title: string;
  value: number | string;
  color: string;
  route: string;
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
  owner: User;
  admins: User[];
  subAdmins: User[];
  topGroups: GroupStat[];
  topMembers: MemberStat[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'groups' | 'members'>('groups');
  const [activeUserTab, setActiveUserTab] = useState<'owner' | 'admin' | 'subAdmin'>('owner');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        
        //later replace this is with actual API call
        // const response = await fetch(`${API_URL}/dashboard`);
        // const data = await response.json();

        // Simulated API response
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data: DashboardData = {
          totalMembers: Math.floor(Math.random() * 10000),
          totalGroups: Math.floor(Math.random() * 1000),
          totalAdmins: Math.floor(Math.random() * 100),
          totalDonations: 696969,
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

        setDashboardData(data);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleBoxClick = (route: string) => {
    navigate(route);
  };

  const renderDashboardBox = (item: DashboardItem, index: number) => {
    const IconComponent = [FaUsers, FaLayerGroup, FaUserTie, MdOutlineCurrencyRupee][index];
    return (
      <div 
        key={index} 
        className={`${item.color} rounded-lg p-6 flex flex-col justify-between cursor-pointer hover:opacity-90 transition-opacity h-48`}
        onClick={() => handleBoxClick(item.route)}
      >
        <div>
          <IconComponent className="text-5xl mb-3" />
          <p className="text-4xl font-bold">{item.value}</p>
        </div>
        <h2 className="text-xl font-semibold">{item.title}</h2>
      </div>
    );
  };

  const renderUserTable = (users: User[], role: string) => (
    <div className="bg-purple-900 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4 underline">Team Members - {role}</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Name</th>
            <th className="pb-2">Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t border-purple-700">
              <td className="py-2 flex items-center">
                <div className="bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm font-bold">
                  {user.name[0]}
                </div>
                {user.name}
              </td>
              <td className="py-2">{user.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderUserTabs = () => (
    <div className="bg-purple-900 rounded-lg p-4">
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeUserTab === 'owner' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveUserTab('owner')}
        >
          Owner
        </button>
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeUserTab === 'admin' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveUserTab('admin')}
        >
          Admins
        </button>
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeUserTab === 'subAdmin' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveUserTab('subAdmin')}
        >
          Sub Admins
        </button>
      </div>
      {activeUserTab === 'owner' && renderUserTable([dashboardData!.owner], 'Owner')}
      {activeUserTab === 'admin' && renderUserTable(dashboardData!.admins, 'Admin')}
      {activeUserTab === 'subAdmin' && renderUserTable(dashboardData!.subAdmins, 'Sub Admin')}
    </div>
  );

  const renderStatsTable = () => (
    <div className="bg-purple-900 rounded-lg p-4">
       <h3 className="text-xl font-semibold mb-4 underline">Statistics</h3>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === 'groups' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveTab('groups')}
        >
          Top Groups
        </button>
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-tr-lg ${activeTab === 'members' ? 'bg-purple-700 text-white' : 'bg-purple-800 text-gray-300'}`}
          onClick={() => setActiveTab('members')}
        >
          Top Members
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Rank</th>
            <th className="pb-2">{activeTab === 'groups' ? 'Group' : 'Member'}</th>
            <th className="pb-2">Total Messages</th>
          </tr>
        </thead>
        <tbody>
          {(activeTab === 'groups' ? dashboardData!.topGroups : dashboardData!.topMembers).map((item, index) => (
            <tr key={index} className="border-t border-purple-700">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.totalMessages}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-navy-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-navy-900 text-white">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const dashboardItems: DashboardItem[] = [
    { title: 'Total Members', value: dashboardData.totalMembers, color: 'bg-green-500', route: '/dashboard/members' },
    { title: 'Total Groups', value: dashboardData.totalGroups, color: 'bg-red-700', route: '/dashboard/groups' },
    { title: 'Total Admins', value: dashboardData.totalAdmins, color: 'bg-rose-400', route: '/dashboard/admins' },
    { title: 'Total Donations', value: `${dashboardData.totalDonations}`, color: 'bg-stone-700', route: '/dashboard/donations' },
  ];

  return (
    <div className="p-8 bg-navy-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {dashboardItems.map((item, index) => renderDashboardBox(item, index))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderUserTabs()}
        {renderStatsTable()}
      </div>
    </div>
  );

}