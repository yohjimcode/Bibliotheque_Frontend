import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    Toolbar,
    IconField, 
    InputIcon, ButtonModule, InputTextModule, IconField, InputIcon, AvatarModule

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isConnected = false;

  disconnect() {
    if (this.isConnected) {
      this.isConnected = false
    }
    else this.isConnected = true;
  }

}
