import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      positive: true
    },
    {
      title: "Appointments",
      value: "2,350",
      change: "+180.1% from last month",
      positive: true
    },
    {
      title: "Patients",
      value: "12,234",
      change: "+19% from last month",
      positive: true
    },
    {
      title: "Staff",
      value: "573",
      change: "+201 new",
      positive: true
    }
  ];

  const staffPerformance = [
    { name: "Dr. Sarah Johnson", designation: "Cardiologist", patients: 156 },
    { name: "Dr. Michael Chen", designation: "Neurologist", patients: 142 },
    { name: "Dr. Emily Davis", designation: "Pediatrician", patients: 138 },
    { name: "Dr. James Wilson", designation: "Orthopedist", patients: 134 },
    { name: "Dr. Lisa Anderson", designation: "Dermatologist", patients: 129 }
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
      </div>
      
      <p className="text-gray-400">Welcome to your admin dashboard. Here's what's happening today.</p>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-black border-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-gray-400"
              >
                <path d="M12 2v20m9-9H3" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-black border border-gray-900">
          <TabsTrigger 
            value="overview" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="text-gray-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Analysis Chart</CardTitle>
              <CardDescription className="text-gray-400">
                Overview of hospital performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Analysis data will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-black border-gray-900">
              <CardHeader>
                <CardTitle className="text-white">Age and Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <p className="text-gray-500">Demographics chart placeholder</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black border-gray-900">
              <CardHeader>
                <CardTitle className="text-white">Appointment Types</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <p className="text-gray-500">Appointment types chart placeholder</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-black border-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Staff Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Top performing staff members this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-900">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Designation</TableHead>
                    <TableHead className="text-gray-300 text-right">No. of patients served</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffPerformance.map((staff, index) => (
                    <TableRow key={index} className="border-gray-900">
                      <TableCell className="text-white font-medium">{staff.name}</TableCell>
                      <TableCell className="text-gray-400">{staff.designation}</TableCell>
                      <TableCell className="text-gray-400 text-right">{staff.patients}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
