import { Component } from '@angular/core';
import {StripeService } from '../../Services/stripe.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PricingCardComponent {

  constructor(private stripeService: StripeService, private router: Router) {}

  pricingTiers = [
    {
      name: 'Basic',
      price: '₹0',
      description: 'Sign up for free',
      features: [
        'description',
      ],
      button:'Sign up'
    },
    {
      name: 'Standard',
      price: '₹799',
      oldPrice: '₹899',
      description: '₹899/mo',
      description_style: 'strike',
      features: [
        'description',
      ],
      button:'Register your interest'
    },
  ];

  onClick(action:String){
    if(action == 'Sign up')
      window.open('/signup',"_self")
    else
     this.initiateCheckout();
  }

  initiateCheckout() {
    this.stripeService.createStripeSession().subscribe(
      response => {
        window.location.href = response.redirectUrl;
      },
      error => {
        console.error('Error creating Stripe session:', error);
        this.router.navigate(['/error']);
      }
    );
  }
}

