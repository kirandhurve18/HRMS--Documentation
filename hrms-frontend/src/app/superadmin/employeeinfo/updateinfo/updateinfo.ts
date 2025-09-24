import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Superadmin } from '../../../core/services/superadmin';
import { ToastrService } from 'ngx-toastr';
import { Registration } from '../registration/registration'; // ✅ Import Registration component

@Component({
  selector: 'app-updateinfo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Registration], // ✅ Added Registration here
  templateUrl: './updateinfo.html',
  styleUrls: ['./updateinfo.css']
})
export class Updateinfo implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private superadmin: Superadmin,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get employee id from route
    this.employeeId = this.route.snapshot.paramMap.get('id')!;

    // Build form
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.email]],
      personal_email: ['', [Validators.email]],
      background_verification: this.fb.array([])
    });

    // Load employee data from API
    this.loadEmployeeData();
  }

  // ✅ Getter for background verification FormArray
  get backgroundVerification(): FormArray {
    return this.employeeForm.get('background_verification') as FormArray;
  }

  // ✅ Load employee details by ID
  private loadEmployeeData() {
    this.superadmin.getEmployeeById(this.employeeId).subscribe({
      next: (res) => {
        if (res && res.data) {
          const data = res.data;

          // Patch basic fields
          this.employeeForm.patchValue({
            first_name: data.first_name,
            last_name: data.last_name,
            company_email: data.company_email,
            personal_email: data.personal_email,
          });

          // Patch background verification
          this.backgroundVerification.clear();
          if (data.background_verification && data.background_verification.length) {
            data.background_verification.forEach((item: any) => {
              this.backgroundVerification.push(
                this.fb.group({
                  designation: [item.designation],
                  name: [item.name],
                  email: [item.email],
                  number: [item.number],
                })
              );
            });
          }
        }
      },
      error: (err) => {
        this.toastr.error('Failed to load employee data', 'Error');
        console.error(err);
      }
    });
  }

  // ✅ Update employee API call
  updateEmployee() {
    if (this.employeeForm.invalid) {
      this.toastr.warning('Please fill required fields');
      return;
    }

    const payload = {
      _id: this.employeeId,
      data: this.employeeForm.value
    };

    this.superadmin.updateEmployee(payload).subscribe({
      next: () => {
        this.toastr.success('Employee updated successfully!', 'Success');
      },
      error: (err) => {
        this.toastr.error('Update failed', 'Error');
        console.error(err);
      }
    });
  }
}
