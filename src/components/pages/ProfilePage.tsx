// Import necessary React hooks and UI components
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit, FaSave, FaUserFriends, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

export default function ProfilePage() {
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State to store user information
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    number: "+1234567890",
    role: "Admin",
    avatar: "https://github.com/shadcn.png",
    initials: "JD",
    bio: "Passionate about technology and community building.",
    joinDate: "January 2022",
    totalDonations: "$500",
    groupsJoined: 5
  });

  // Function to toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to save changes (currently just disables edit mode)
  const handleSave = () => {
    setIsEditing(false);
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Profile header with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 rounded-lg"></div>
        <div className="relative z-10 p-6">
          {/* User avatar, name, role, and edit button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-xl text-white opacity-75">{user.role}</p>
              </div>
            </div>
            <Button onClick={handleEdit} variant="secondary" className="flex items-center space-x-2">
              {isEditing ? <FaSave className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
              <span>{isEditing ? "Save" : "Edit Profile"}</span>
            </Button>
          </div>
          
          {/* Grid layout for personal information and statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information Card */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Map through fields to create form inputs or display information */}
                  {["email", "number", "bio"].map((field) => (
                    <div key={field}>
                      <Label htmlFor={field} className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      {isEditing ? (
                        <Input
                          id={field}
                          name={field}
                          value={user[field as keyof typeof user]}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user[field as keyof typeof user]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* this card can be removed if not needed , first remove the fields from statistics eg.bio , joindate and then remove the card */}
            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Join date */}
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>Joined: {user.joinDate}</span>
                  </div>
                  {/* Total donations */}
                  <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-green-500" />
                    <span>Total Donations: {user.totalDonations}</span>
                  </div>
                  {/* Groups joined */}
                  <div className="flex items-center space-x-2">
                    <FaUserFriends className="text-purple-500" />
                    <span>Groups Joined: {user.groupsJoined}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}