import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Superadmin } from '../../../core/services/superadmin';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission.html',
  styleUrls: ['./permission.css']
})
export class Permission implements OnInit {
toggleSelectAll($event: Event) {
throw new Error('Method not implemented.');
}
closeAddTaskPopup: any;
openEditRoleModal(_t9: any) {
throw new Error('Method not implemented.');
}
  roleList: any[] = [];
  fullRoleList: any[] = [];
  permissions: any[] = [];

  modalTitle = 'Add Role';
  currentRole = { name: '', status: 'Active', permissions: [] as any[] };

  constructor(private superadminService: Superadmin) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  // ✅ Fetch all roles
  loadRoles() {
    this.superadminService.getRoles().subscribe({
      next: (res) => {
        if (res.success) {
          this.roleList = res.data.map((r: any) => ({
            name: r.role_name,
            users: r.user_count || 0
          }));

          this.fullRoleList = res.data.map((r: any) => ({
            name: r.role_name,
            modules: r.modules?.join(', ') || '',
            users: r.user_count || 0,
            status: r.status || 'Active'
          }));
        }
      },
      error: (err) => console.error('Error loading roles:', err)
    });
  }

  // ✅ Fetch menus for permissions
  loadPermissions() {
    this.superadminService.getMenus().subscribe({
      next: (res) => {
        if (res.success) {
          this.permissions = res.data.map((m: any) => ({
            name: m.name,
            key: m.key,
            read: false,
            write: false,
            create: false
          }));
        }
      },
      error: (err) => console.error('Error loading menus:', err)
    });
  }

  // ✅ Open Add Role Modal
  openAddRoleModal() {
    this.modalTitle = 'Add Role';
    this.currentRole = { name: '', status: 'Active', permissions: [] };

    // Reset permissions
    this.permissions.forEach(p => {
      p.read = false;
      p.write = false;
      p.create = false;
    });
  }

  // ✅ Close modal & reset form
  closeAddRoleModal() {
    this.currentRole = { name: '', status: 'Active', permissions: [] };
    this.permissions.forEach(p => {
      p.read = false;
      p.write = false;
      p.create = false;
    });
  }

  // ✅ Save new role
  saveRole() {
    if (!this.currentRole.name.trim()) {
      alert('⚠️ Please enter a role name');
      return;
    }

    const payload = {
      role_name: this.currentRole.name.trim(),
      status: this.currentRole.status || 'Active',
      permissions: this.permissions
        .filter(p => p.read || p.write || p.create)
        .map(p => ({
          key: p.key,
          read: p.read,
          write: p.write,
          create: p.create
        }))
    };

    console.log('Payload to save:', payload);

    this.superadminService.addRole(payload).subscribe({
      next: (res) => {
        if (res.success) {
          alert('✅ Role added successfully');
          this.loadRoles();
          this.closeAddRoleModal(); // reset after save
        } else {
          alert(res.message || '❌ Failed to add role');
        }
      },
      error: (err) => {
        console.error('Error adding role:', err);
        alert('Error while adding role');
      }
    });
  }
}
