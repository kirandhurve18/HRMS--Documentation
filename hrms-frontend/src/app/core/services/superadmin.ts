import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LeaveService {
  _id: string;
  title: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  _id: string;
  department_name: string;
  status: 'active' | 'inactive';
}

export interface Designation {
  _id: string;
  designation_name: string;
  departmentId: string;
  status: 'active' | 'inactive';
}

export interface SubDesignation {
  _id: string;
  sub_designation_name: string;
  status: 'active' | 'inactive';
}

export interface WeekOff {
  id: string;
  day: string;
  status: 'active' | 'inactive';
}

export interface Shift {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class Superadmin {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }

  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    });
  }

  getAttendanceSummary(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/hrms/attendance/get_attendance_summary`,
      {}, // empty body
      { headers: this.getAuthHeaders() }
    );
  }

  getMyTasks(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/hrms/dashboard/my_tasks`,
      '',
      { headers: this.getHeaders() }
    );
  }

  getEmployeesOnLeaveToday(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/hrms/dashboard/employees_on_leave_today`,
      '',
      { headers: this.getHeaders() }
    );
  }

  // getUpcomingBirthdaysAndAnniversaries(): Observable<any> {
  //   const body = new URLSearchParams();
  //   body.set('Staging', 'true');
  //   return this.http.post<any>(
  //     `${this.baseUrl}/api/hrms/dashboard/upcomming_birthday`,
  //     body.toString(),
  //     { headers: this.getHeaders() }
  //   );
  // }

  getApprovalPendings(): Observable<any> {
    const body = new URLSearchParams();
    body.set('Staging', 'true');
    return this.http.post<any>(
      `${this.baseUrl}/api/hrms/dashboard/approval_pendings`,
      body.toString(),
      { headers: this.getHeaders() }
    );
  }

  // getAllEmployees(): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `${this.baseUrl}/api/hrms/employee/get_all_employees?Staging=true`,
  //     { headers: this.getAuthHeaders() }
  //   );
  // }
  getAllEmployees(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/hrms/employee/get_all_employees?Staging=true&page=${page}&limit=${limit}`,
      { headers: this.getAuthHeaders() }
    );
  }

  addNewEmployee(
    payload: any,
    files?: { [key: string]: File }
  ): Observable<any> {
    const formData = new FormData();

    // Append text fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        if (Array.isArray(payload[key]) || typeof payload[key] === 'object') {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    // ✅ Append files exactly as Multer expects
    if (files) {
      if (files['aadhar_card'])
        formData.append('aadhar_card', files['aadhar_card']);
      if (files['pan_card']) formData.append('pan_card', files['pan_card']);
      if (files['passport_photo'])
        formData.append('passport_photo', files['passport_photo']);
      if (files['employee_sign'])
        formData.append('employee_sign', files['employee_sign']);
      if (files['tenth_certificate'])
        formData.append('tenth_certificate', files['tenth_certificate']);
      if (files['twelfth_certificate'])
        formData.append('twelfth_certificate', files['twelfth_certificate']);
      if (files['graduation_certificate'])
        formData.append(
          'graduation_certificate',
          files['graduation_certificate']
        );
      if (files['resume']) formData.append('resume', files['resume']);
      if (files['previous_pay_slips'])
        formData.append('previous_pay_slips', files['previous_pay_slips']);
      if (files['previous_offer_letter'])
        formData.append(
          'previous_offer_letter',
          files['previous_offer_letter']
        );
      if (files['previous_experience_letter'])
        formData.append(
          'previous_experience_letter',
          files['previous_experience_letter']
        );
      if (files['form16']) formData.append('form16', files['form16']);
    }

    return this.http.post(
      `${this.baseUrl}/api/hrms/employee/add_new_employee`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }),
      }
    );
  }

  downloadEmployeeListService(): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/api/hrms/employee/download_employee_list`,
      { responseType: 'blob' }
    );
  }

  getFestivalLeaves(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/hrms/festival_leaves?Staging=true`,
      { headers: this.getAuthHeaders() }
    );
  }

  addFestivalLeaves(festival: {
    festival: string;
    festival_date: string;
    festival_day: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/add_festival_leave`,
      festival, // ✅ send as JSON
      { headers: this.getJsonHeaders() }
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(
      `${this.baseUrl}/api/hrms/department/get_all_departments`,
      { headers: this.getAuthHeaders() }
    );
  }

  addDepartment(data: any): Observable<any> {
    const body = {
      departments: [
        {
          name: data.department_name || data.dept_name,
          status: data.status || 'active',
        },
      ],
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/department/add_department`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  updateDepartment(data: any): Observable<any> {
    const body = {
      dept_id: data._id || data.dept_id || data.id,
      dept_name: data.department_name || data.dept_name,
      status: (data.status || 'active').toLowerCase(),
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/department/update_department`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/department/delete_department`,
      { dept_id: id },
      { headers: this.getJsonHeaders() }
    );
  }

  getDesignations(): Observable<Designation[]> {
    return this.http.get<Designation[]>(
      `${this.baseUrl}/api/hrms/designation/get_all_designation`,
      { headers: this.getAuthHeaders() }
    );
  }

  addDesignation(data: any): Observable<any> {
    const body = {
      designations: [
        {
          designation_name: data.designation_name,
          departmentId: data.departmentId,
          status: data.status || 'active',
        },
      ],
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/designation/add_designation`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  updateDesignation(data: any): Observable<any> {
    const body = {
      designation_id: data._id || data.designation_id || data.id,
      designation_name: data.designation_name,
      departmentId: data.departmentId,
      status: (data.status || 'active').toLowerCase(),
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/designation/update_designation`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteDesignation(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/designation/delete_designation`,
      { designation_id: id },
      { headers: this.getJsonHeaders() }
    );
  }

  getSubdesignations(): Observable<SubDesignation[]> {
    return this.http.get<SubDesignation[]>(
      `${this.baseUrl}/api/hrms/sub_designation/get_all_subdesignation`,
      { headers: this.getAuthHeaders() }
    );
  }

  addSubdesignation(data: any): Observable<any> {
    const body = {
      subdesignations: [
        {
          sub_designation_name: data.sub_designation_name,
          status: data.status || 'active',
        },
      ],
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/sub_designation/add_subdesignation`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  updateSubdesignation(data: any): Observable<any> {
    const body = {
      sub_designation_id: data._id || data.sub_designation_id || data.id,
      sub_designation_name: data.sub_designation_name,
      status: (data.status || 'active').toLowerCase(),
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/sub_designation/update_subdesignation`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteSubdesignation(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/sub_designation/delete_subdesignation`,
      { sub_designation_id: id },
      { headers: this.getJsonHeaders() }
    );
  }

  getLeaveServices(): Observable<LeaveService[]> {
    return this.http.get<LeaveService[]>(
      `${this.baseUrl}/api/hrms/admin_settings/get_leave_services`,
      { headers: this.getJsonHeaders() }
    );
  }

  addLeaveOrService(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/add_leave_services`,
      data,
      { headers: this.getJsonHeaders() }
    );
  }

  updateLeaveOrService(data: {
    id: string;
    title: string;
    duration: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/update_leave_services`,
      data,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteLeaveOrService(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/delete_leave_services`,
      { id },
      { headers: this.getJsonHeaders() }
    );
  }

  getWeekOff(): Observable<WeekOff[]> {
    return this.http.get<WeekOff[]>(
      `${this.baseUrl}/api/hrms/admin_settings/get_week_off_setup
`,
      { headers: this.getAuthHeaders() }
    );
  }

  addWeekOff(data: any): Observable<any> {
    const payload = {
      work_mode: data.work_mode,
      days: data.days,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/add_week_off_setup`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  updateWeekOff(data: any): Observable<any> {
    const payload = {
      id: data.id, // API expects "id"
      work_mode: data.work_mode, // ✅ match your UI model
      days: data.days,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/update_week_off_setup`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteWeekOff(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/delete_week_off_setup`,
      { id },
      { headers: this.getJsonHeaders() }
    );
  }

  getShifts(): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      `${this.baseUrl}/api/hrms/admin_settings/get_shift_timings`,
      { headers: this.getAuthHeaders() }
    );
  }

  addShift(data: any): Observable<any> {
    const payload = {
      shift_timings: data.shift_timings || data,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/add_shift_timings`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  updateShift(data: any): Observable<any> {
    const payload = {
      shift_timings: data.shift_timings || data,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/update_shift_timings`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  deleteShift(id: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/delete_shift_timings`,
      { id },
      { headers: this.getJsonHeaders() }
    );
  }

  getTeamLeads(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/hrms/employee/get_team_leads`,
      { headers: this.getAuthHeaders() }
    );
  }

  getTeamManagers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/hrms/employee/get_team_managers`,
      { headers: this.getAuthHeaders() }
    );
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/hrms/admin_settings/get_roles_list`,
      { headers: this.getAuthHeaders() }
    );
  }

  getMenus(category: string = 'ALL'): Observable<any> {
    const body = { category }; // same as Postman
    return this.http.post(`${this.baseUrl}/api/hrms/get_menus`, body, {
      headers: this.getJsonHeaders(),
    });
  }

  addRole(data: any): Observable<any> {
    const payload = {
      roles: [
        {
          role_name: data.role_name,
          description: data.description || '',
          permissions: data.permissions || [],
          is_active: data.is_active ?? true,
        },
      ],
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/admin_settings/add_roles`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  // ---- Check-In ----
  // ---- Check-In ----
  checkIn(data: {
    employee_id: string;
    checkin_location: string;
    latitude: string;
    longitude: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/attendance/checkIn`,
      data,
      { headers: this.getJsonHeaders() } // ✅ includes token + JSON content type
    );
  }

  // ---- Check-Out ----
  checkOut(data: {
    employee_id: string;
    checkout_location: string;
    latitude: string;
    longitude: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/attendance/checkOut`,
      data,
      { headers: this.getJsonHeaders() } // ✅ includes token + JSON content type
    );
  }

  // ----  ----
  getAttendance(data: { employee_id: string }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/attendance/get_attendance`,
      data,
      { headers: this.getJsonHeaders() } // ✅ includes token + JSON content type
    );
  }
  // ----  ----
  getMonthlyAttendance(data: {
    employee_id: String;
    month: String;
    year: String;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/attendance/get_monthly_attendance`,
      data,
      { headers: this.getJsonHeaders() } // ✅ includes token + JSON content type
    );
  }

  // // Add Timesheet
  // addTimesheet(payload: any): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/api/hrms/timesheet/add_timesheet`,
  //     payload,
  //     { headers: this.getJsonHeaders() }
  //   );
  // }

  // // Get Timesheet by Employee
  // getTimesheetByEmployee(employee: string, date: string): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/api/hrms/timesheet/get_timesheet`,
  //     { employee, date },
  //     { headers: this.getJsonHeaders() }
  //   );
  // }

  // getTimesheetStatusByEmployee(payload: {
  //   fromDate: string;
  //   toDate: string;
  //   employee_id: string;
  //   page: number;
  //   limit: number;
  //   sortBy?: string;
  //   order?: 'asc' | 'desc';
  // }): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/api/hrms/timesheet/get_timesheet_status_by_employee`,
  //     payload,
  //     { headers: this.getJsonHeaders() }
  //   );
  // }

  /** ✅ Add or Update Timesheet */
  addTimesheet(payload: any): Observable<any> {
    const body = {
      employee: payload.employee, // 👈 backend expects `employee` (see Postman)
      date: payload.date,
      submitStatus: payload.submitStatus,
      workLogs: payload.workLogs,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/timesheet/add_timesheet`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  /** ✅ Get Timesheet by Employee & Date */
  getTimesheetByEmployee(employeeId: string, date: string): Observable<any> {
    const body = {
      employee: employeeId, // 👈 backend expects `employee` here (not employee_id)
      date: date,
    };

    return this.http.post(
      `${this.baseUrl}/api/hrms/timesheet/get_timesheet`,
      body,
      { headers: this.getJsonHeaders() }
    );
  }

  /** ✅ Get Timesheet Status by Employee */
  getTimesheetStatusByEmployee(payload: {
    fromDate: string;
    toDate: string;
    employee_id: string;
    page: number;
    limit: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/hrms/timesheet/get_timesheet_status_by_employee`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/hrms/employee/get_employee_by_id/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ---- Update Employee ----
  updateEmployee(
    payload: any,
    files?: { [key: string]: File }
  ): Observable<any> {
    const formData = new FormData();

    // ✅ Append text fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        if (Array.isArray(payload[key]) || typeof payload[key] === 'object') {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    // ✅ Append files if available
    if (files) {
      if (files['aadhar_card'])
        formData.append('aadhar_card', files['aadhar_card']);
      if (files['pan_card']) formData.append('pan_card', files['pan_card']);
      if (files['passport_photo'])
        formData.append('passport_photo', files['passport_photo']);
      if (files['employee_sign'])
        formData.append('employee_sign', files['employee_sign']);
      if (files['tenth_certificate'])
        formData.append('tenth_certificate', files['tenth_certificate']);
      if (files['twelfth_certificate'])
        formData.append('twelfth_certificate', files['twelfth_certificate']);
      if (files['graduation_certificate'])
        formData.append(
          'graduation_certificate',
          files['graduation_certificate']
        );
      if (files['resume']) formData.append('resume', files['resume']);
      if (files['previous_pay_slips'])
        formData.append('previous_pay_slips', files['previous_pay_slips']);
      if (files['previous_offer_letter'])
        formData.append(
          'previous_offer_letter',
          files['previous_offer_letter']
        );
      if (files['previous_experience_letter'])
        formData.append(
          'previous_experience_letter',
          files['previous_experience_letter']
        );
      if (files['form16']) formData.append('form16', files['form16']);
    }

    return this.http.post(
      `${this.baseUrl}/api/hrms/employee/update_employee`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        }),
      }
    );
  }
}
