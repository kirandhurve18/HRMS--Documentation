import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Superadmin } from '../../../core/services/superadmin';
import { ToastrService } from 'ngx-toastr';

interface Designation {
  _id: string;
  designation_name: string;
  departmentId: string;
  status: string;
}

interface SubDesignation {
  _id: string;
  sub_designation_name: string;
  status: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private superadmin: Superadmin,
    private toastr: ToastrService
  ) {}

  isUpdateMode: boolean = false;

  // Documents list
  docs: string[] = [
    'Aadhar Card',
    'PAN Card',
    'Passport Size Photo',
    'Employee Email Signature',
    '10th Certificate',
    '12th Certificate',
    'Graduation Certificate',
    'Resume',
    'Previous Offer Letter',
    'Previous Experience Letter',
  ];

  employment_type: string[] = ['FULLTIME', 'CONTRACT', 'INTERNSHIP'];


  departments: any[] = [];

  designations: Designation[] = [];

 
  sub_designations: SubDesignation[] = []; 

 teamLeads: any[] = [];

    teamManagers: any[] = [];
  
roles: any[] = [];

  bloodGroups: string[] = ['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O-', 'O+'];

  qualifications: string[] = ['10th', '12th', 'Graduation', 'Post Graduation'];

  uploadedFiles: { [key: string]: File } = {};

  // Employee form data
  // formData: any = {
  //   employee_id: '',
  //   role_id: '',
  //   team_lead_id: '',
  //   team_managers_id:'',
  //   first_name: '',
  //   middle_name: '',
  //   last_name: '',
  //   company_email: '',
  //   password: '',
  //   personal_email: '',
  //   designations: '', 
  //   sub_designation: '', 
  //   is_team_lead: false,
  //   departments: '', 
  //   employment_type: '',
  //   employee_number: '',
  //   alternate_number: '',
  //   emergency_number: '',
  //   family_member_relation: '',
  //   current_address: '',
  //   is_current_add_same_as_permanent: true,
  //   permanent_address: '',
  //   date_of_birth: '',
  //   gender: '',
  //   blood_group: '',
  //   work_mode: '',
  //   date_of_joining: '',
  //   notice_period: '',
  //   work_experience: '',
  //   salary: '',
  //   bank_name: '',
  //   bank_account_number: '',
  //   ifsc_code: '',
  //   is_active: true,
  //   tenth_passing_year: '',
  //   tenth_percentage: '',
  //   twelfth_passing_year: '',
  //   twelfth_percentage: '',
  //   graduation_passing_year: '',
  //   graduation_percentage: '',
  //   post_graduation_passing_year: '',
  //   post_graduation_percentage: '',
  //   aadhar_card_number: '',
  //   pan_card_number: '',
  //   pf_account_number: '',
  //   uan_number: '',
  //   esi_number: '',
  //   assigned_menus: ['', ''],
  // };

//    formData: any ={
//   "employee_id": "EMP0876212",
//   "role_id": "68b6e4d43105bcd8afd868f6",
//   "team_lead_id": null,
//   "team_managers_id": ["68b7bf35d2a0644277c6cabe"],
//   "first_name": "Saniya",
//   "middle_name": "P",
//   "last_name": "Patel",
//   "company_email": "saniya1234.patel@desteksolutions.com",
//   "password": "saniya@123",
//   "personal_email": "john.personjal@gmail.com",
//   "designation_id": "68b5318426b5d1d4f731bf3b",
//   "sub_designation_id": "68b6e6793105bcd8afd86905",
//   "is_team_lead": false,
//   "department_id": "68b5312626b5d1d4f731bf36",
//   "employment_type": "FULLTIME",
//   "employee_number": "123456",
//   "alternate_number": "9876543210",
//   "emergency_number": "9123456789",
//   "family_member_relation": "Father",
//   "current_address": "Office no 202B, Town Square, New Airport Rd, Mhada Colony, Viman Nagar, Pune, Maharashtra 411014",
//   "is_current_add_same_as_permanent": true,
//   "permanent_address": "123 Main Street, City",
//   "date_of_birth": "2025-09-03T00:00:00.000Z",
//   "gender": "Female",
//   "blood_group": "AB+",
//   "work_mode": "Office",
//   "date_of_joining": "2025-09-04T00:00:00.000Z",
//   "notice_period": 45,
//   "work_experience": 5,
//   "salary": 650000,
//   "bank_name": "HDFC",
//   "bank_account_number": "8965336589",
//   "ifsc_code": "HDFC0001234",
//   "is_active": true,
//   "tenth_passing_year": 2018,
//   "tenth_percentage": 91.20,
//   "twelfth_passing_year": 2020,
//   "twelfth_percentage": 73.23,
//   "graduation_passing_year": 2024,
//   "graduation_percentage": 81.70,
//   "post_graduation_passing_year": 2026,
//   "post_graduation_percentage": 78.23,
//   "aadhar_card_number": "411561869826",
//   "pan_card_number": "7896541236",
//   "pf_account_number": "123654789",
//   "uan_number": "8965231457",
//   "esi_number": "1236589652",
//   "assigned_menus": [],
//   "probation_period_ends_on": "2025-09-16T00:00:00.000Z"
// }

formData: any = {
  "employee_id": "",
  "role_id": "",
  "team_lead_id": null,
  "team_managers_id": [],
  "first_name": "",
  "middle_name": "",
  "last_name": "",
  "company_email": "",
  "password": "",
  "personal_email": "",
  "designation_id": "",
  "designation": "",
  "sub_designation": "",
  "sub_designation_id": "",
  "is_team_lead": false,
  "department_id": "",
  "department": "",
  "employment_type": "",
  "employee_number": "",
  "alternate_number": "",
  "emergency_number": "",
  "family_member_relation": "",
  "current_address": "",
  "is_current_add_same_as_permanent": true,
  "permanent_address": "",
  "date_of_birth": "",
  "gender": "",
  "blood_group": "",
  "work_mode": "",
  "date_of_joining": "",
  "notice_period": "",
  "work_experience": "",
  "salary": "",
  "bank_name": "",
  "bank_account_number": "",
  "ifsc_code": "",
  "is_active": true,
  "tenth_passing_year": "",
  "tenth_percentage": "",
  "twelfth_passing_year": "",
  "twelfth_percentage": "",
  "graduation_passing_year": "",
  "graduation_percentage": "",
  "post_graduation_passing_year": "",
  "post_graduation_percentage": "",
  "aadhar_card_number": "",
  "pan_card_number": "",
  "pf_account_number": "",
  "uan_number": "",
  "esi_number": "",
  "assigned_menus": [],
  "probation_period_ends_on": ""
}



  

  qualificationMap: any = {
    '10th': {
      year: this.formData.tenth_passing_year || '',
      percentage: this.formData.tenth_percentage || '',
    },
    '12th': {
      year: this.formData.twelfth_passing_year || '',
      percentage: this.formData.twelfth_percentage || '',
    },
    Graduation: {
      year: this.formData.graduation_passing_year || '',
      percentage: this.formData.graduation_percentage || '',
    },
    'Post Graduation': {
      year: this.formData.post_graduation_passing_year || '',
      percentage: this.formData.post_graduation_percentage || '',
    },
  };

  syncQualificationData() {
    this.formData.tenth_passing_year = this.qualificationMap['10th'].year;
    this.formData.tenth_percentage = this.qualificationMap['10th'].percentage;

    this.formData.twelfth_passing_year = this.qualificationMap['12th'].year;
    this.formData.twelfth_percentage = this.qualificationMap['12th'].percentage;

    this.formData.graduation_passing_year = this.qualificationMap['Graduation'].year;
    this.formData.graduation_percentage = this.qualificationMap['Graduation'].percentage;

    this.formData.post_graduation_passing_year =
      this.qualificationMap['Post Graduation'].year;
    this.formData.post_graduation_percentage =
      this.qualificationMap['Post Graduation'].percentage;
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadDesignations();
     this.loadSubDesignations(); 
     this.loadTeamLeads();// 🔹 fetch sub-designations dynamically
     this.loadTeamManagers();
     this.loadRoles();


    const currentUrl = this.router.url;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id || currentUrl.includes('/updateinfo')) {
        this.isUpdateMode = true;
        // Load employee details by ID and populate formData if needed
      }
    });
  }

  // 🔹 Fetch Departments from API
  loadDepartments() {
    this.superadmin.getDepartments().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.departments = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.toastr.error('Failed to load departments');
      },
    });
  }

  // 🔹 Fetch Designations from API
  loadDesignations() {
    this.superadmin.getDesignations().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.designations = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching designations:', err);
        this.toastr.error('Failed to load designations');
      },
    });
  }

  // 🔹 Fetch Sub-Designations from API
  loadSubDesignations() {
    this.superadmin.getSubdesignations().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.sub_designations = res.data;
        }
      },
      error: (err) => {
        console.error('Error fetching sub-designations:', err);
        this.toastr.error('Failed to load sub-designations');
      },
    });
    
  }

  // 🔹 Fetch Team Leads from API
// 🔹 Fetch Team Leads from API
loadTeamLeads() {
  this.superadmin.getTeamLeads().subscribe({
    next: (res: any) => {
      if (res.success) {
        this.teamLeads = res.data; // ✅ response is wrapped
      }
    },
    error: (err) => {
      console.error('Error fetching team leads:', err);
      this.toastr.error('Failed to load team leads');
    },
  });
}

// 🔹 Fetch Team Managers from API
loadTeamManagers() {
  this.superadmin.getTeamManagers().subscribe({
    next: (res: any) => {
      if (res.success) {
        this.teamManagers = res.data; // ✅ use res.data, not res
        console.log('Team Managers:', this.teamManagers);
      }
    },
    error: (err) => {
      console.error('Error loading team managers:', err);
      this.toastr.error('Failed to load team managers');
    },
  });
}
loadRoles() {
  this.superadmin.getRoles().subscribe({
    next: (res: any) => {
      if (res.success) {
        this.roles = res.data; // ✅ API usually wraps in .data
        console.log("Roles loaded:", this.roles);
      }
    },
    error: (err) => {
      console.error("Error fetching roles:", err);
      this.toastr.error("Failed to load roles");
    }
  });
}



  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFiles[fieldName] = file;
    }
  }

  onDocumentUpload(event: any, index: number) {
    const file = event.target.files[0];
    const docKey = this.docs[index].toLowerCase().replace(/\s+/g, '_');
    if (file) {
      this.uploadedFiles[docKey] = file;
    }
  }

onSave() {
  this.syncQualificationData();

  // Separate files from text fields
  const files: { [key: string]: File } = {};
  Object.keys(this.uploadedFiles).forEach((key) => {
    files[key] = this.uploadedFiles[key];
  });

  // Pass formData + files
  console.log("shtafgdh");
  this.superadmin.addNewEmployee(this.formData, files).subscribe({
    next: (res) => {

      this.toastr.success('Employee created successfully!');
      this.router.navigate(['/superadmin/employeeinfo']);
    },
 

    error: (err) => {
      console.log("vdgcbhj");
      this.toastr.error(err.error.message || 'Something went wrong');
    },
  });
}

  // Permissions for roles
  permissions = [
    { name: 'Dashboard', read: false, write: false, create: false },
    { name: 'Mark Attendance', read: false, write: false, create: false },
    { name: 'Festival Leaves', read: false, write: false, create: false },
    { name: 'Leave Module', read: false, write: false, create: false },
    { name: 'Review Team Leaves', read: false, write: false, create: false },
    { name: 'Rewards & Recognitions', read: false, write: false, create: false },
    { name: 'Timesheet Module', read: false, write: false, create: false },
    { name: 'Team Submissions', read: false, write: false, create: false },
    { name: 'Employee Info', read: false, write: false, create: false },
    { name: 'Leave Summary', read: false, write: false, create: false },
    { name: 'Attendance Report', read: false, write: false, create: false },
    { name: 'Admin Settings', read: false, write: false, create: false },
  ];

  isEditing = false;
  modalTitle = 'Add Role';
  currentRole = { name: '', status: '', permissions: [] };

  openAddRoleModal() {
    this.modalTitle = 'Add Role';
    this.isEditing = false;
    this.currentRole = { name: '', status: '', permissions: [] };

    // Reset permissions
    this.permissions.forEach((p) => {
      p.read = false;
      p.write = false;
      p.create = false;
    });
  }

  closeAddTaskPopup(): void {
    this.currentRole = { name: '', status: '', permissions: [] };
  }
}
