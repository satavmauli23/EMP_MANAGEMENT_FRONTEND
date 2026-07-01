'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/api';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
}

export default function Home() {
  const [departmentId, setDepartmentId] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    if (!departmentId) {
      alert('Enter Department ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/employees/departments/${departmentId}`
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      const data = await response.json();
      if (data.length === 0) {
        alert('No employees in this department');
        setEmployees([]);
        return;
      }

      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
      alert('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pdf/report`);

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download report.');
    }
  };

  return (
    <div className="container">
      <h1>Employee Management</h1>
      <div className="search-box">
        <input
          type="text"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          placeholder="Enter Department ID"
        />
        <button onClick={loadEmployees} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <button onClick={downloadReport} style={{ marginLeft: '10px' }}>
        Download Employees Report
      </button>

      {employees.length > 0 && (
        <table id="employeeTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <Link href={`/details?id=${emp.id}`}>{emp.id}</Link>
                </td>
                <td>
                  <Link href={`/details?id=${emp.id}`}>{emp.name}</Link>
                </td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>${emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
