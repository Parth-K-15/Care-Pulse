import { useEffect, useState } from "react";
import { Search, MoreHorizontal, Eye, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function UserRequest() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Requests");
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/requests");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Error fetching user requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term and active filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "Pending") return matchesSearch && user.role === "pending";
    if (activeFilter === "Approved") return matchesSearch && user.role === "admin";
    return matchesSearch;
  });

  const handleActionClick = (userId, action) => {
    setOpenActionMenu(null);
    const user = users.find(u => u._id === userId);
    
    switch (action) {
      case "view":
        console.log("View details for:", user);
        // TODO: Implement view details modal
        break;
      case "approve":
        handleApprovalClick(user);
        break;
    }
  };

  const handleApprovalClick = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const cancelApproval = () => {
    setShowConfirmModal(false);
    setSelectedUser(null);
  };

  const confirmApproval = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/approve/${selectedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      
      const data = await response.json();
      if (data.success) {
        // Update the local state with the approved user
        setUsers(users.map(user =>
          user._id === selectedUser._id ? data.user : user
        ));
        setShowConfirmModal(false);
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Error approving user:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !showConfirmModal) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="w-full max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-gray-400">Loading user requests...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">User Requests</h1>
          <p className="text-gray-400 text-lg">Manage admin access requests and user approvals</p>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm max-w-md w-full mx-4">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Confirm Approval</h3>
                <p className="text-gray-400">
                  Are you sure you want to approve admin access for{" "}
                  <span className="text-white font-medium">
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </span>?
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={cancelApproval}
                    className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 h-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmApproval}
                    disabled={loading}
                    className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-3 h-auto rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Processing...' : 'Approve'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 h-12"
            />
          </div>
          <Button
            onClick={fetchUserRequests}
            variant="outline"
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 h-12"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {["All Requests", "Pending", "Approved"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-white text-black shadow-lg"
                  : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800/80 hover:border-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">User Details</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Contact</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Requested At</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-6 px-8 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-500">
                      No user requests found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-6 px-8">
                        <div className="flex items-center">
                          {user.imageUrl ? (
                            <img
                              src={user.imageUrl}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-600 object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                              {(user.firstName || user.username || user.email)?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white mb-1">
                              {user.firstName && user.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user.username || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                              ID: {user._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-gray-300">
                        <div className="space-y-1">
                          <div className="text-sm break-all">{user.email}</div>
                          {user.username && (
                            <div className="text-xs text-gray-500">@{user.username}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-gray-300">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-6 px-8">
                        {user.role === 'pending' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approved
                          </span>
                        )}
                      </td>
                      <td className="py-6 px-8 relative">
                        <button
                          onClick={() => setOpenActionMenu(openActionMenu === user._id ? null : user._id)}
                          className="p-3 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Action Dropdown */}
                        {openActionMenu === user._id && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleActionClick(user._id, "view")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View details
                              </button>
                              {user.role === 'pending' && (
                                <button
                                  onClick={() => handleActionClick(user._id, "approve")}
                                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-3 transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Click outside to close action menu */}
        {openActionMenu && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setOpenActionMenu(null)}
          />
        )}
      </div>
    </div>
  );
}
