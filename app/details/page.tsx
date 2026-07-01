'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/api';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
}

export default function EmployeeDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const employeeId = searchParams.get('id');

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employeeId) {
      loadEmployee();
    }
  }, [employeeId]);

  const loadEmployee = async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees`);
      const employees = await response.json();
      const emp = employees.find((e: Employee) => e.id == employeeId);

      if (emp) {
        setEmployee(emp);
        setFormData({
          name: emp.name,
          email: emp.email,
          position: emp.position,
          salary: emp.salary.toString(),
        });
      }
    } catch (error) {
      console.error('Error loading employee:', error);
      alert('Failed to load employee details');
    }
  };

  const updateEmployee = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/employees/${employeeId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      alert('Employee updated successfully');
      router.push('/');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async () => {
    const deptId = prompt('Enter Department ID');
    if (!deptId) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/employees/departments/${deptId}/${employeeId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
      }

      alert('Employee deleted successfully');
      router.push('/');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div className="card">
      <h2>Employee Details</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      <input
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
      />
      <button onClick={updateEmployee} disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
      <button
        onClick={deleteEmployee}
        disabled={loading}
        style={{ background: '#dc3545' }}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
