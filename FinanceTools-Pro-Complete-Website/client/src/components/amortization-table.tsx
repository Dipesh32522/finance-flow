import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Printer, Search } from 'lucide-react';
import { AmortizationEntry } from '@/lib/calculations';
import { formatCurrency, exportToCSV, printResults } from '@/lib/export-utils';

interface AmortizationTableProps {
  schedule: AmortizationEntry[];
}

const AmortizationTable = ({ schedule }: AmortizationTableProps) => {
  const [entriesPerPage, setEntriesPerPage] = useState('12');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSchedule = schedule.filter(entry => 
    entry.paymentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.paymentNumber.toString().includes(searchTerm)
  );

  const itemsPerPage = entriesPerPage === 'All' ? filteredSchedule.length : parseInt(entriesPerPage);
  const totalPages = Math.ceil(filteredSchedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredSchedule.length);
  const currentEntries = filteredSchedule.slice(startIndex, endIndex);

  const handleExport = () => {
    const exportData = schedule.map(entry => ({
      'Payment #': entry.paymentNumber,
      'Payment Date': entry.paymentDate,
      'EMI Amount': entry.emiAmount,
      'Principal': entry.principalAmount,
      'Interest': entry.interestAmount,
      'Balance': entry.remainingBalance,
    }));
    
    exportToCSV(exportData, 'amortization_schedule.csv');
  };

  const handlePrint = () => {
    const printData = schedule.map(entry => ({
      'Payment #': entry.paymentNumber,
      'Payment Date': entry.paymentDate,
      'EMI Amount': formatCurrency(entry.emiAmount),
      'Principal': formatCurrency(entry.principalAmount),
      'Interest': formatCurrency(entry.interestAmount),
      'Balance': formatCurrency(entry.remainingBalance),
    }));
    printResults('Amortization Schedule', printData);
  };

  return (
    <Card className="shadow-material-lg">
      <CardHeader>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Amortization Schedule</CardTitle>
            <p className="text-gray-600 mt-2">Detailed month-by-month payment breakdown</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleExport} className="bg-primary-500 hover:bg-primary-600">
              <Download className="w-4 h-4 mr-2" />
              Export Schedule
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Show:</label>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">entries</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-40"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="font-medium text-gray-500 uppercase tracking-wider">Payment #</TableHead>
                <TableHead className="font-medium text-gray-500 uppercase tracking-wider">Payment Date</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">EMI Amount</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Principal</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Interest</TableHead>
                <TableHead className="text-right font-medium text-gray-500 uppercase tracking-wider">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEntries.map((entry) => (
                <TableRow key={entry.paymentNumber} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">{entry.paymentNumber}</TableCell>
                  <TableCell className="text-gray-600">{entry.paymentDate}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(entry.emiAmount)}</TableCell>
                  <TableCell className="text-right text-secondary-600">{formatCurrency(entry.principalAmount)}</TableCell>
                  <TableCell className="text-right text-accent-600">{formatCurrency(entry.interestAmount)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(entry.remainingBalance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{filteredSchedule.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? "bg-primary-500 text-white" : ""}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;