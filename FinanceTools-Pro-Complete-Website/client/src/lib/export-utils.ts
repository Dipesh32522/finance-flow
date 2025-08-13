export function exportToCSV(data: any[], filename: string) {
  try {
    if (!data || data.length === 0) {
      console.warn('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log(`Successfully exported ${filename}`);
    } else {
      console.error('Download not supported');
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
  }
}

export function formatCurrency(amount: number, currency: string = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`;
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  });
}

export function printResults(title: string, data: any) {
  try {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Could not open print window');
      return;
    }

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { color: #333; font-size: 24px; margin-bottom: 10px; }
            .subtitle { color: #666; font-size: 14px; }
            .content { margin: 20px 0; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #444; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .number { text-align: right; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${title}</h1>
            <p class="subtitle">Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="content">
            ${formatDataForPrint(data)}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  } catch (error) {
    console.error('Error printing:', error);
  }
}

function formatDataForPrint(data: any): string {
  if (Array.isArray(data)) {
    // Handle array data (like schedules)
    if (data.length === 0) return '<p>No data available</p>';
    
    const headers = Object.keys(data[0]);
    return `
      <table>
        <thead>
          <tr>
            ${headers.map(header => `<th>${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${headers.map(header => `<td class="${typeof row[header] === 'number' ? 'number' : ''}">${row[header]}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (typeof data === 'object') {
    // Handle object data (like results)
    return Object.entries(data).map(([key, value]) => `
      <div class="section">
        <h3>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
        <p>${typeof value === 'number' ? formatCurrency(value) : value}</p>
      </div>
    `).join('');
  }
  return '<p>No data available</p>';
}

export function generatePDFData(title: string, data: any) {
  // This would integrate with a PDF library like jsPDF
  // For now, return structured data that can be used with PDF generation
  return {
    title,
    timestamp: new Date().toLocaleString(),
    data,
  };
}
