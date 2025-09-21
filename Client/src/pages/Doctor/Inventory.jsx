import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

const Inventory = () => {
  const stats = {
    total: 1248,
    lowStock: 42,
    expiringSoon: 18,
    categories: 36,
  };

  const items = [
    { id: 'MED001', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: '1250 units', expiry: '2025-06-15', status: 'In Stock' },
    { id: 'MED002', name: 'Paracetamol 500mg', category: 'Analgesics', stock: '3500 units', expiry: '2025-08-22', status: 'In Stock' },
    { id: 'MED003', name: 'Metformin 850mg', category: 'Antidiabetics', stock: '850 units', expiry: '2024-12-10', status: 'In Stock' },
  ];

  const statusBadge = (status) => (
    <Badge className="bg-green-600 text-white">{status}</Badge>
  );

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Medicine List</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Medicine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-300 text-sm">Total Medicines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-300 text-sm">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.lowStock}</div>
          </CardContent>
        </Card>
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-300 text-sm">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.expiringSoon}</div>
          </CardContent>
        </Card>
        <Card className="bg-black border-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-300 text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-gray-900">
        <CardHeader>
          <CardTitle className="text-white">All Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-900">
                <TableHead className="text-gray-300">ID</TableHead>
                <TableHead className="text-gray-300">Medicine Name</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Stock</TableHead>
                <TableHead className="text-gray-300">Expiry Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it) => (
                <TableRow key={it.id} className="border-gray-900">
                  <TableCell className="text-white">{it.id}</TableCell>
                  <TableCell className="text-white">{it.name}</TableCell>
                  <TableCell className="text-gray-400">{it.category}</TableCell>
                  <TableCell className="text-gray-400">{it.stock}</TableCell>
                  <TableCell className="text-gray-400">{it.expiry}</TableCell>
                  <TableCell>{statusBadge(it.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
