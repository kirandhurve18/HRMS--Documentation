import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Superadmin } from '../../core/services/superadmin';

@Component({
  selector: 'app-festival',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './festival.html',
  styleUrl: './festival.css'
})
export class Festival implements OnInit {
  searchTerm: string = '';
  entriesToShow: number = 10;
  festivals: any[] = [];

  // Modal state
  showAddModal: boolean = false;

  // New festival model
  newFestival = {
    name: '',
    date: '',
    isFixed: false
  };

  loading: boolean = false;

  constructor(private superadmin: Superadmin) {}

  ngOnInit(): void {
    this.loadFestivals();
  }

  loadFestivals() {
    this.superadmin.getFestivalLeaves().subscribe({
      next: (res) => {
        this.festivals =
          res?.data?.map((item: any, index: number) => ({
            sr: index + 1,
            name: item.festival,
            date: new Date(item.festival_date).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }),
            day: item.festival_day
          })) || [];
      },
      error: (err) => {
        console.error('Failed to load festival leaves:', err);
      }
    });
  }

  get filteredFestivals() {
    const searchLower = this.searchTerm.toLowerCase();
    const filtered = this.festivals.filter(
      (fest) =>
        fest.name.toLowerCase().includes(searchLower) ||
        fest.date.toLowerCase().includes(searchLower) ||
        fest.day.toLowerCase().includes(searchLower)
    );
    return filtered.slice(0, this.entriesToShow);
  }

  openAddFestival() {
    this.showAddModal = true;
  }

  closeAddFestival() {
    this.showAddModal = false;
    this.newFestival = { name: '', date: '', isFixed: false };
  }

  submitFestival() {
    if (!this.newFestival.name || !this.newFestival.date) {
      alert('Please fill in all fields');
      return;
    }

    const dateObj = new Date(this.newFestival.date);
    const day = dateObj.toLocaleString('en-US', { weekday: 'long' });

    // ✅ backend expects a single object, not an array
    const payload = {
      festival: this.newFestival.name,
      festival_date: this.newFestival.date,
      festival_day: day
    };

    this.loading = true;

    this.superadmin.addFestivalLeaves(payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.loadFestivals(); // refresh from backend
        this.closeAddFestival();
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to add festival:', err);
        alert('Failed to add festival. Please try again.');
      }
    });
  }
}
